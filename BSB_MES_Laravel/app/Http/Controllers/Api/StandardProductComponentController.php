<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StandardProductComponent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StandardProductComponentController extends Controller
{
    /**
     * Retrieve standard product components with optional filtering.
     * * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // 1. Initialize the query with eager loading for relational data
        $query = StandardProductComponent::with(['productType', 'productSize']);

        // 2. Apply Filters (Essential for MES dynamic BOM lookups)

        // Filter by Product Type (e.g., 'JRS')
        if ($request->has('product_type_id')) {
            $query->where('product_type_id', $request->input('product_type_id'));
        }

        // Filter by Product Size (e.g., 1.5")
        if ($request->has('product_size_id')) {
            $query->where('product_size_id', $request->input('product_size_id'));
        }

        // 3. Order by sequence to ensure the React frontend renders the BOM correctly
        $query->orderBy('component_sequence', 'asc');

        // 4. Execute and return
        $components = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $components,
            'count' => $components->count()
        ]);
    }
}
