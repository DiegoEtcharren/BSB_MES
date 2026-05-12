<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductType;
use Illuminate\Support\Facades\DB;
use App\Models\StandardManufacturingRange; //

class StandardManufacturingRangesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product = ProductType::where('name', 'JRS')->first();

        if (!$product) {
            $this->command->error("Product name not found. Seeder aborted.");
            return;
        }

        $data = [
            [
                'id' => 1,
                'product_type_id' => $product->id,
                'range_name' => '0%',
                'range_name_long' => '0% JRS',
                'range_rules' => json_encode([
                    ["operator" => "<=", "threshold" => 49, "lower_bound" => ["offset" => -1, "multiplier" => 1], "upper_bound" => ["offset" => 1, "multiplier" => 1]],
                    ["operator" => ">", "threshold" => 49, "lower_bound" => ["offset" => 0, "multiplier" => 0.98], "upper_bound" => ["offset" => 0, "multiplier" => 1.02]]
                ]),
            ],
            [
                'id' => 2, // Adjusted to follow 0%
                'product_type_id' => $product->id,
                'range_name' => '2%',
                'range_name_long' => '2% JRS',
                'range_rules' => json_encode([
                    ["operator" => "<=", "threshold" => 49, "lower_bound" => ["offset" => -2, "multiplier" => 1], "upper_bound" => ["offset" => 1, "multiplier" => 1]],
                    ["operator" => ">", "threshold" => 49, "lower_bound" => ["offset" => 0, "multiplier" => 1.02], "upper_bound" => ["offset" => 0, "multiplier" => 0.96]]
                ]),
            ],
            [
                'id' => 3,
                'product_type_id' => $product->id,
                'range_name' => '5%',
                'range_name_long' => '5% JRS',
                'range_rules' => json_encode([
                    ["operator" => "<=", "threshold" => 49, "lower_bound" => ["offset" => -1, "multiplier" => 0.95], "upper_bound" => ["offset" => 1, "multiplier" => 1]],
                    ["operator" => ">", "threshold" => 49, "lower_bound" => ["offset" => 0, "multiplier" => 0.95], "upper_bound" => ["offset" => 0, "multiplier" => 1]]
                ]),
            ],
            [
                'id' => 4,
                'product_type_id' => $product->id,
                'range_name' => '10%',
                'range_name_long' => '10% JRS',
                'range_rules' => json_encode([
                    ["operator" => "<=", "threshold" => 49, "lower_bound" => ["offset" => -1, "multiplier" => 0.9], "upper_bound" => ["offset" => 1, "multiplier" => 1]],
                    ["operator" => ">", "threshold" => 49, "lower_bound" => ["offset" => 0, "multiplier" => 0.9], "upper_bound" => ["offset" => 0, "multiplier" => 1]]
                ]),
            ],
        ];

        foreach ($data as $item) {
            DB::table('standard_manufacturing_ranges')->updateOrInsert(
                ['id' => $item['id']],
                array_merge($item, ['updated_at' => now(), 'created_at' => now()])
            );
        }
    }
}
