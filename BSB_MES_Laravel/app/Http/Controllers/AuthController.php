<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(LoginRequest $request) {
        $user_data = $request->validated();
        return [
            'user_data' => $user_data
        ];
    }

    public function logout(Request $request) {

    }

    public function register(Request $request) {

    }
}
