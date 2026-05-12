<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductionOrderRequest;
use App\Models\ProductionOrder;
use App\Models\ProductionOrderBom;
use App\Models\ProductionOrderCertificate;
use App\Models\ProductionOrderInstruction;
use App\Models\ProductionOrderSpec;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductionOrderController extends Controller
{
    public function store(StoreProductionOrderRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            // Create Production Order
            $order = ProductionOrder::create([
                'order_number' => $validated['order_number'],
                // Assuming legacy_previous_order_number is what gets mapped to previous_order string field for now
                'legacy_previous_order_number' => $validated['previous_order'] ?? null,
                'customer' => $validated['customer'],
                'customer_po' => $validated['customer_po'] ?? null,
                'unit_price' => $validated['unit_price'] ?? 0,
                'quantity' => $validated['quantity'],
                'date_entered' => $validated['date_entered'],
                'required_date' => $validated['required_date'],
                'product_type_id' => $validated['product_type_id'],
                'product_size_id' => $validated['product_size_id'] ?? null,
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
                    ProductionOrderBom::create([
                        'order_id' => $order->id,
                        'component_name' => $bomItem['component_name'],
                        'component_part_number' => $bomItem['component_part_number'],
                        'component_sequence' => $index + 1,
                        'component_material' => $bomItem['material'],
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
}
