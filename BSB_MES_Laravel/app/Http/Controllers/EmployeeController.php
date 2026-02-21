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
            'role' => 'sometimes|string|in:admin,supervisor,operator,engineer',
            'status' => 'sometimes|string|in:active,inactive,on_leave',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        // Build query based on parameters to filter information:
        $query = Employee::query();

        if (isset($validated['role'])) {
            $query->where('role', $validated['role']);
        }

        if (isset($validated['status'])) {
            $query->where('status', $validated['status']);
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
