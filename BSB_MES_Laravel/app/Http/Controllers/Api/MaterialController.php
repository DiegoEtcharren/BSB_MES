<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\JsonResponse;

class MaterialController extends Controller
{
    /**
     * Retrieve all materials.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $materials = Material::all();

        return response()->json([
            'status' => 'success',
            'data' => $materials,
        ]);
    }
}
