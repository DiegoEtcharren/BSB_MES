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
        // Build query:
        $query = Employee::query();

        if ($request->has('role')) {
            $query->where('role', $request->query('role'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        // Pagination:
        $perPage = $request->query('per_page', 10);
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
