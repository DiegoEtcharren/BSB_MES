<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductionOrderRequest;
use App\Models\ProductionOrder;
use App\Models\ProductionOrderBom;
use App\Models\ProductionOrderCertificate;
use App\Models\ProductionOrderInstruction;
use App\Models\ProductionOrderSpec;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductionOrderController extends Controller
{
    public function index(Request $request)
    {

        // Validate request information:
        $validated = $request->validate([
            'status' => 'sometimes|string|in:inProgress,completed,pending',
            'search'   => 'sometimes|nullable|string|max:255',
            'per_page' => 'sometimes|integer|min:1|max:100',
            'due_date_range' => 'sometimes|nullable|string|in:today,this_week,next_7_days,overdue,this_month',
        ]);

        $query = ProductionOrder::with(['specs.pressureUnit', 'productType', 'productSize']);

        if (isset($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        if (!empty($validated['due_date_range'])) {
            $now = Carbon::now();
            $today = $now->copy()->startOfDay();

            switch ($validated['due_date_range']) {
                case 'today':
                    $query->whereDate('required_date', $today);
                    break;
                case 'this_week':
                    $startOfWeek = $now->copy()->startOfWeek();
                    $endOfWeek = $now->copy()->endOfWeek();
                    $query->whereBetween('required_date', [$startOfWeek, $endOfWeek]);
                    break;
                case 'next_7_days':
                    $endOf7Days = $now->copy()->addDays(7)->endOfDay();
                    $query->whereBetween('required_date', [$today, $endOf7Days]);
                    break;
                case 'overdue':
                    $query->whereDate('required_date', '<', $today)
                          ->where('status', '!=', 'completed');
                    break;
                case 'this_month':
                    $startOfMonth = $now->copy()->startOfMonth();
                    $endOfMonth = $now->copy()->endOfMonth();
                    $query->whereBetween('required_date', [$startOfMonth, $endOfMonth]);
                    break;
            }
        }

        // Search logic:
        if (!empty($validated['search'])) {
                $searchTerm = $validated['search'];

                // We wrap the search clauses in a function to group the SQL 'OR' statements:
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('order_number', 'LIKE', "%{$searchTerm}%")
                    ->orWhereHas('productType', function ($productTypeQuery) use ($searchTerm) {
                        $productTypeQuery->where('name', 'LIKE', "%{$searchTerm}%");
                    });
                });
            }

        $perPage = $request->input('per_page', 10);
        $orders = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    public function store(StoreProductionOrderRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            // Determine previous order routing
            $previousOrderId = null;
            $legacyPreviousOrderNumber = null;

            if (!empty($validated['previous_order'])) {
                $existingOrder = ProductionOrder::where('order_number', $validated['previous_order'])->first();
                if ($existingOrder) {
                    $previousOrderId = $existingOrder->id;
                } else {
                    $legacyPreviousOrderNumber = $validated['previous_order'];
                }
            }

            // Create Production Order
            $order = ProductionOrder::create([
                'order_number' => $validated['order_number'],
                'previous_order_id' => $previousOrderId,
                'legacy_previous_order_number' => $legacyPreviousOrderNumber,
                'customer' => $validated['customer'],
                'customer_po' => $validated['customer_po'] ?? null,
                'unit_price' => $validated['unit_price'] ?? 0,
                'quantity' => $validated['quantity'],
                'date_entered' => $validated['date_entered'],
                'required_date' => $validated['required_date'],
                'product_type_id' => $validated['product_type_id'],
                'product_size_id' => $validated['product_size_id'] ?? null,
                'custom_product_size' => $validated['custom_product_size'] ?? null,
                'custom_size_uom' => $validated['custom_size_uom'] ?? null,
                'status' => 'pending',
            ]);

            // Create Production Order Specs
            ProductionOrderSpec::create([
                'production_order_id' => $order->id,
                'burst_pressure' => $validated['burst_pressure'] ?? null,
                'pressure_unit_id' => $validated['pressure_unit_id'] ?? null,
                'min_pressure' => $validated['lower_manufacturing_range'] ?? null,
                'max_pressure' => $validated['upper_manufacturing_range'] ?? null,
                'temperature' => $validated['temperature'] ?? null,
                'temperature_units' => $validated['temperature_units'] ?? null,
            ]);

            // Handle Nametag Instructions
            $nametagInstructions = 'None';
            if (($validated['stamping_mode'] ?? 'none') === 'bulk') {
                $nametagInstructions = [
                    'Bulk' => $validated['stamping_data'][0]['label_1'] ?? ''
                ];
            } elseif (($validated['stamping_mode'] ?? 'none') === 'individual') {
                $labels = [];
                if (!empty($validated['stamping_data'])) {
                    foreach ($validated['stamping_data'] as $item) {
                        $labels[] = array_values($item)[0] ?? '';
                    }
                }
                $nametagInstructions = [
                    'Individual' => $labels
                ];
            }

            // Create Production Order Instructions
            ProductionOrderInstruction::create([
                'production_order_id' => $order->id,
                'nametag_instructions' => $nametagInstructions,
                'special_instructions' => $validated['special_instructions'] ?? null,
                'shipping_instructions' => $validated['shipping_instructions'] ?? null,
            ]);

            // Create BOM
            if (!empty($validated['bom'])) {
                foreach ($validated['bom'] as $index => $bomItem) {
                    $material = Material::find($bomItem['material']);
                    ProductionOrderBom::create([
                        'order_id' => $order->id,
                        'component_name' => $bomItem['component_name'],
                        'component_part_number' => $bomItem['component_part_number'],
                        'component_sequence' => $index + 1,
                        'component_material' => $material ? $material->material : (string)$bomItem['material'],
                    ]);
                }
            }

            // Create Certificates
            if (!empty($validated['certificates'])) {
                foreach ($validated['certificates'] as $certId) {
                    ProductionOrderCertificate::create([
                        'production_order_id' => $order->id,
                        'certificate_id' => $certId,
                    ]);
                }
            }

            if (!empty($validated['custom_certificates'])) {
                foreach ($validated['custom_certificates'] as $customCert) {
                    ProductionOrderCertificate::create([
                        'production_order_id' => $order->id,
                        'custom_certificate_name' => $customCert['name'],
                        'custom_certificate_description' => $customCert['description'] ?? null,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Production order created successfully',
                'data' => $order->load(['specs', 'instructions', 'boms', 'certificates']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the production order.'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $order = ProductionOrder::findOrFail($id);
            $order->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Production order deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the production order.'
            ], 500);
        }
    }
}
