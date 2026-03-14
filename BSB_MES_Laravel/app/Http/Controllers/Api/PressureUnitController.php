<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PressureUnit;
use Illuminate\Http\Request;

class PressureUnitController extends Controller
{
    public function index()
    {
        $units = PressureUnit::select('id', 'name', 'symbol', 'conversion_multiplier')
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($units);
    }
}
