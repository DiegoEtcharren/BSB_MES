<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductionOrder;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Active orders: where status is not 'completed'
        $activeOrdersQuery = ProductionOrder::where('status', '!=', 'completed');

        $totalOrdersCount = $activeOrdersQuery->count();

        // Calculate the sum of quantity * unit_price
        // For precision, we'll calculate this either in DB or PHP. Doing it in DB is more efficient.
        // select sum(quantity * unit_price) ...
        $totalValue = ProductionOrder::where('status', '!=', 'completed')
            ->selectRaw('SUM(quantity * unit_price) as total_value')
            ->value('total_value');

        return response()->json([
            'status' => 'success',
            'data' => [
                'active_orders' => [
                    'total_value' => $totalValue ? (float) $totalValue : 0,
                    'count' => $totalOrdersCount,
                ]
            ]
        ]);
    }
}
