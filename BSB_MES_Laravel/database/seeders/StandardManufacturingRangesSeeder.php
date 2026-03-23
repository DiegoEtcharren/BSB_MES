<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductType;
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

        // Configuration array for all JRS ranges
        $ranges = [
            ['name' => '0%',  'low_mult' => 1],
            ['name' => '5%',  'low_mult' => 0.95],
            ['name' => '10%', 'low_mult' => 0.9],
        ];

        foreach ($ranges as $range) {
            StandardManufacturingRange::create([
                'product_type_id' => $product->id,
                'range_name'      => $range['name'],
                'range_name_long' => "{$range['name']} JRS",
                'range_rules'     => [
                    // Logic for Nominal <= 40
                    [
                        'operator'    => '<=',
                        'threshold'   => 40,
                        'lower_bound' => ['multiplier' => $range['low_mult'], 'offset' => -1],
                        'upper_bound' => ['multiplier' => 1,                 'offset' => 1],
                    ],
                    // Logic for Nominal > 40
                    [
                        'operator'    => '>',
                        'threshold'   => 40,
                        'lower_bound' => ['multiplier' => 0.90, 'offset' => -1],
                        'upper_bound' => ['multiplier' => 1.10, 'offset' => 1],
                    ]
                ],
            ]);
        }
    }
}
