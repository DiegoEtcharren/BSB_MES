<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StandardProductSize;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StandardProductSizeController extends Controller
{

    public function index(): JsonResponse
    {
        $sizes = StandardProductSize::where('is_active', true)
            ->orderBy('size_value', 'asc')
            ->get();

        return response()->json($sizes, 200);
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
    public function show(StandardProductSize $standardProductSize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StandardProductSize $standardProductSize)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StandardProductSize $standardProductSize)
    {
        //
    }
}
