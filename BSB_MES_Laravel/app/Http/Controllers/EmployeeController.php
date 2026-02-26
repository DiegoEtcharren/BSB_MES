<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreEmployeeRequest;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Validate request information:
        $validated = $request->validate([
            'role' => 'sometimes|string|in:engineer,supervisor,operator',
            'status' => 'sometimes|string|in:active,inactive,on_leave',
            'search'   => 'sometimes|nullable|string|max:255',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        // Build query based on parameters to filter information:
        $query = Employee::query();

        if (isset($validated['role'])) {
            $query->whereHas('user', function ($userQuery) use ($validated) {
                $userQuery->where('role', $validated['role']);
            });
        }

        if (isset($validated['status']) && $validated['status'] !== '') {
            if ($validated['status'] === 'active') {
                $query->where('status', 'active');
            } elseif ($validated['status'] === 'inactive') {
                $query->where('status', 'inactive');
            } elseif ($validated['status'] === 'on_leave') {
                $query->where('status', 'on_leave');
            }
        }

            // Search logic:
            if (!empty($validated['search'])) {
            $searchTerm = $validated['search'];

            // We wrap the search clauses in a function to group the SQL 'OR' statements:
            $query->where(function ($q) use ($searchTerm) {
                $q->where('first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('last_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('employee_number', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('email', 'LIKE', "%{$searchTerm}%")
                    ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                        $userQuery->where('username', 'LIKE', "%{$searchTerm}%");
                    });
            });
        }

        // Pagination:
        $perPage = $validated['per_page'] ?? 10;
        $employees = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreEmployeeRequest $request, string $id)
    {
        // 1. Validate request info:
        $validated = $request->validated();

        // 2. Find employee + user:
        $employee = Employee::findOrFail($id);
        $user = $employee->user;


        DB::beginTransaction();

        try {

            // 3. Update user:
            $userData = [
                'role'  => $validated['role'],
            ];

            $user->update($userData);

            // 4. Update employee:
            $employee->update([
                'first_name' => $validated['first_name'],
                'last_name'  => $validated['last_name'],
                'employee_number' => $validated['employee_number'],
                'department'      => $validated['department'],
                'email'  => $validated['email'],
                'status'       => $validated['status']
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Employee updated successfully',
                'data'    => [
                    'employee' => $employee->fresh(), // fresh() retrieves the updated model from DB
                    'user'     => $user->fresh()
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while updating the operator',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::transaction(function () use ($id) {
                $employee = Employee::findOrFail($id);

                if ($employee->user) {
                    $employee->user->delete();
                }

                $employee->delete();
            });

            return response()->json([
                'message' => 'Employee deactivated successfully'
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'message' => 'An error occurred while deactivating the employee.'
            ], 500);
        }
    }
}
