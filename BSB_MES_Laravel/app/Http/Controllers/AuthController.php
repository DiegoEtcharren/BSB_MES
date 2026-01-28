<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
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
            'token' => $user->createToken('main')->plainTextToken, // This token will open the session
            'message' => 'Login successful'
        ];
    }

    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return ['user' => $null];
    }

    public function register(Request $request) {

    }
}
