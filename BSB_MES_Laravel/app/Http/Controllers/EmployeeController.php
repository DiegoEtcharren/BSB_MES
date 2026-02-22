<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

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

        if (isset($validated['status'])) {
            if ($validated['status'] === 'active') {
                $query->where('is_active', true);
            } elseif ($validated['status'] === 'inactive') {
                $query->where('is_active', false);
            }
        }

        if (isset($validated['status']) && $validated['status'] !== '') {
        if ($validated['status'] === 'active') {
            $query->where('is_active', true);
        } elseif ($validated['status'] === 'inactive') {
            $query->where('is_active', false);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
