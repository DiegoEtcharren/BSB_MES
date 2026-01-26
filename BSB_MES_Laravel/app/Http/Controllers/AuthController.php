<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(LoginRequest $request) {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'errors' => ['The password is incorrect']
            ], 422); // If the 422 code is not added, web browser will not take the message as an error, and the message cant be displayed.
        }

        $user = Auth::user();

        return [
            'user' => $user,
            'token' => $user->createToken('main')->plainTextToken,
            'message' => 'Login successful'
        ];
    }

    public function logout(Request $request) {

    }

    public function register(Request $request) {

    }
}
