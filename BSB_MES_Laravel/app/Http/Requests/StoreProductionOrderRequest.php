<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductionOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Order Info
            'order_number' => 'required|string|unique:production_orders,order_number',
            'previous_order' => 'nullable|string',
            'customer' => 'required|string',
            'customer_po' => 'nullable|string',
            'unit_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'date_entered' => 'required|date',
            'required_date' => 'required|date',

            // Product Size
            'product_type_id' => 'required|exists:product_types,id',
            'product_size_id' => 'nullable|exists:standard_product_sizes,id',
            'custom_product_size' => 'nullable|string',
            'custom_size_uom' => 'nullable|string',
            'operator_id' => 'nullable|integer|exists:users,id',

            // Pressure & Temp
            'burst_pressure' => 'nullable|numeric',
            'pressure_unit_id' => 'nullable|exists:pressure_units,id',
            'temperature' => 'nullable|numeric',
            'temperature_units' => 'nullable|string|in:fahrenheit,celsius',

            // Tolerances
            'lower_manufacturing_range' => 'nullable|numeric',
            'upper_manufacturing_range' => 'nullable|numeric',

            // BOM
            'bom' => 'nullable|array',
            'bom.*.component_name' => 'required|string',
            'bom.*.component_part_number' => 'required|string',
            'bom.*.material' => 'required|integer|exists:materials,id',

            // Instructions & Nametags
            'special_instructions' => 'nullable|string',
            'shipping_instructions' => 'nullable|string',
            'stamping_mode' => 'nullable|string|in:none,bulk,individual',
            'stamping_data' => 'nullable|array',

            // Certificates
            'certificates' => 'nullable|array',
            'certificates.*' => 'exists:certificates,id',
            'custom_certificates' => 'nullable|array',
            'custom_certificates.*.name' => 'required|string',
            'custom_certificates.*.description' => 'nullable|string',
        ];
    }
}
