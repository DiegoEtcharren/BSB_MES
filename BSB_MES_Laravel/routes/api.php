<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductTypeController;
use App\Http\Controllers\Api\PressureUnitController;
use App\Http\Controllers\Api\StandardProductSizeController;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);


    Route::middleware('role:engineer')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
    });

    // Routes for Supervisors and Engineers
    Route::middleware('role:supervisor,engineer')->group(function () {
        // This creates routes for index, store, show, update, and destroy
        Route::apiResource('employees', EmployeeController::class);
    });

    // Routes for all authenticated staff
    Route::middleware('role:operator,supervisor,engineer')->group(function () {

        // Version 1 API routes:
        Route::prefix('v1')->group(function () {
            Route::get('/pressure-units', [PressureUnitController::class, 'index']);
            Route::get('/pressure-units/{id}', [PressureUnitController::class, 'show']);
            Route::get('/product-types', [ProductTypeController::class, 'index']);
            Route::get('/sizes', [StandardProductSizeController::class, 'index']);
        });
    });
});


Route::post('/login', [AuthController::class, 'login']);

