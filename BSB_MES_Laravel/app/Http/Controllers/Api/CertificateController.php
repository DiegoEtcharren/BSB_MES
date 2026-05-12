<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::where('is_active', true)->get();
        return response()->json([
            'status' => 'success',
            'data' => $certificates
        ]);
    }
}
