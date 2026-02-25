<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreEmployeeRequest;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(LoginRequest $request) {
        $credentials = $request->validated(); // At this point, the data is already validated by the request class.

        if (!Auth::attempt($credentials)) { // Auth class will handle user authentification.
            return response([
                'errors' => ['The password is incorrect']
            ], 422); // If the 422 code is not added, web browser will not take the message as an error, and the message cant be displayed.
        }

        $user = Auth::user(); // Load the user information

        return [
            'user' => $user, // User information.
            'role' => $user->role,
            'token' => $user->createToken('main')->plainTextToken, // This token will open the session
            'message' => 'Login successful'
        ];
    }

    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return ['user' => null];
    }

    public function register(StoreEmployeeRequest $request) {
        $validated = $request->validated();

        try {
            $result = DB::transaction(function () use ($validated) {

                $employee = Employee::create([
                    'employee_number' => $validated['employee_number'],
                    'first_name'      => $validated['first_name'],
                    'last_name'       => $validated['last_name'],
                    'department'      => $validated['department'],
                    'email'           => $validated['email'],
                    'hired_at'        => now(),
                    'status'       => 'active',
                ]);

                $user = User::create([
                    'employee_id' => $employee->id,
                    'username'    => $validated['employee_number'],
                    'password'    => Hash::make('Welcome2026'), // Default password.
                    'role'        => $validated['role'],
                ]);

                return [
                    'employee' => $employee,
                    'user'     => $user
                ];
            });

            return response()->json([
                'message' => 'Employee registered successfully',
                'data'    => $result
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to register employee.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
