<?php

namespace Tests\Feature;

use App\Models\ProductionOrder;
use App\Models\ProductType;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_dashboard_kpis_and_past_due_orders()
    {
        // Authenticate as engineer
        $user = User::create([
            'username' => 'testengineer',
            'role' => 'engineer',
            'password' => bcrypt('password'),
        ]);
        Sanctum::actingAs($user, ['*']);

        // Create a product type
        $productType = new ProductType();
        $productType->name = 'JRS';
        $productType->save();

        // Order 1: Past Due (pending, required date is in the past)
        $pastDueOrder1 = ProductionOrder::create([
            'order_number' => 'SO-PAST-1',
            'customer' => 'Customer A',
            'date_entered' => Carbon::now()->subDays(5),
            'required_date' => Carbon::now()->subDays(2),
            'product_type_id' => $productType->id,
            'status' => 'pending',
            'quantity' => 10,
            'unit_price' => 50.00,
        ]);

        // Order 2: Past Due (inProgress, required date is in the past, closer to now than order 1)
        $pastDueOrder2 = ProductionOrder::create([
            'order_number' => 'SO-PAST-2',
            'customer' => 'Customer B',
            'date_entered' => Carbon::now()->subDays(4),
            'required_date' => Carbon::now()->subDays(1),
            'product_type_id' => $productType->id,
            'status' => 'inProgress',
            'quantity' => 5,
            'unit_price' => 100.00,
        ]);

        // Order 3: Completed (required date is in the past, but status is completed, so NOT past due)
        $completedOrder = ProductionOrder::create([
            'order_number' => 'SO-COMP-3',
            'customer' => 'Customer C',
            'date_entered' => Carbon::now()->subDays(6),
            'required_date' => Carbon::now()->subDays(3),
            'product_type_id' => $productType->id,
            'status' => 'completed',
            'quantity' => 8,
            'unit_price' => 150.00,
        ]);

        // Order 4: Future Order (pending, required date is in the future, so NOT past due)
        $futureOrder = ProductionOrder::create([
            'order_number' => 'SO-FUT-4',
            'customer' => 'Customer D',
            'date_entered' => Carbon::now(),
            'required_date' => Carbon::now()->addDays(2),
            'product_type_id' => $productType->id,
            'status' => 'pending',
            'quantity' => 20,
            'unit_price' => 10.00,
        ]);

        // Request the dashboard KPIs endpoint
        $response = $this->getJson('/api/v1/dashboard/kpis');

        // Assert response status
        $response->assertStatus(200);

        // Assert JSON structure and counts
        $response->assertJson([
            'status' => 'success',
            'data' => [
                'active_orders' => [
                    'count' => 3, // Order 1, Order 2, Order 4 (excluding Order 3 because it is completed)
                    'total_value' => (10 * 50.00) + (5 * 100.00) + (20 * 10.00), // 500 + 500 + 200 = 1200
                ]
            ]
        ]);

        $responseData = $response->json('data');
        $this->assertArrayHasKey('past_due_orders', $responseData);

        $pastDueOrders = $responseData['past_due_orders'];
        $this->assertCount(2, $pastDueOrders);

        // Check ordering: Order 1 (2 days ago) should be first, Order 2 (1 day ago) should be second
        $this->assertEquals('SO-PAST-1', $pastDueOrders[0]['order_number']);
        $this->assertEquals('SO-PAST-2', $pastDueOrders[1]['order_number']);
    }
}
