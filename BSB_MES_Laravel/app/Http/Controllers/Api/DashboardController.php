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

        // Past due orders: active and required_date in the past
        $pastDueOrders = ProductionOrder::where('status', '!=', 'completed')
            ->where('required_date', '<', now())
            ->with(['specs.pressureUnit', 'productType', 'productSize', 'operator.employee'])
            ->orderBy('required_date', 'asc')
            ->get();

        // Shipped orders per month: completed status, grouped by month of updated_at
        $shippedOrders = ProductionOrder::where('status', 'completed')
            ->selectRaw("DATE_FORMAT(updated_at, '%Y-%m') as month, SUM(quantity * unit_price) as total_value, COUNT(*) as count")
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->month,
                    'total_value' => $item->total_value ? (float) $item->total_value : 0,
                    'count' => (int) $item->count,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => [
                'active_orders' => [
                    'total_value' => $totalValue ? (float) $totalValue : 0,
                    'count' => $totalOrdersCount,
                ],
                'past_due_orders' => $pastDueOrders,
                'shipped_orders' => $shippedOrders,
            ]
        ]);
    }
}
