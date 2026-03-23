<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StandardManufacturingRange;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ManufacturingRangeController extends Controller
{
    public function getRulesByProduct(int $productId): JsonResponse
    {
        $ranges = StandardManufacturingRange::with('productType')
            ->where('product_type_id', $productId)
            ->get();

        if ($ranges->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No manufacturing ranges found for this product ID.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $ranges
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $range = StandardManufacturingRange::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $range
        ]);
    }
}
