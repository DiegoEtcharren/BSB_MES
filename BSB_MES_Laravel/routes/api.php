<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);


    Route::middleware('role:engineer')->group(function () {
        // Route::post('/machine/setup', [MachineController::class, 'configure']);
    });

    // Routes for Supervisors and Engineers
    Route::middleware('role:supervisor,engineer')->group(function () {
        // Route::get('/reports/efficiency', [ReportController::class, 'index']);
    });

    // Routes for all authenticated staff
    Route::middleware('role:operator,supervisor,engineer')->group(function () {
        // Route::post('/production/log', [ProductionController::class, 'store']);
    });
});


Route::post('/login', [AuthController::class, 'login']);

