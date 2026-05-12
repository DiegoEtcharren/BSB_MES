<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StandardProductComponentsJRSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * This seeder populates components for the "JRS" product type across various sizes.
     * Data for the blades is sourced from image_80ca09.png.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // 1. Retrieve the Product Type ID for "JRS":
        $productTypeId = DB::table('product_types')
            ->where('name', 'JRS')
            ->value('id');

        if (!$productTypeId) {
            $this->command->error('Product Type "JRS" not found in product_types table.');
            return;
        }

        // 2. Define the sizes and their corresponding Blade Part Numbers:
        $sizeData = [
            '1"'   => 'SF-5-0001-092',
            '1.5"' => 'SF-5-0003-092',
            '2"'   => 'SF-5-0005-092',
            '3"'   => 'SF-5-0007-092',
            '4"'   => 'SF-5-0008-092',
            '6"'   => 'SF-5-0011-092',
        ];

        foreach ($sizeData as $label => $bladePartNo) {
            // Lookup size ID from standard_product_sizes
            $sizeId = DB::table('standard_product_sizes')
                ->where('size_value', $label)
                ->value('id');

            if (!$sizeId) {
                $this->command->warn("Size label '{$label}' not found. Skipping components for this size.");
                continue;
            }

            $components = [
                // Sequence 1: Blade:
                [
                    'product_type_id'       => $productTypeId,
                    'product_size_id'       => $sizeId,
                    'component_sequence'    => 1,
                    'component_name'        => "{$label} JRS BLADE",
                    'component_part_number' => $bladePartNo,
                    'created_at'            => $now,
                    'updated_at'            => $now,
                ],
                // Sequence 2: Top (No part number)
                [
                    'product_type_id'       => $productTypeId,
                    'product_size_id'       => $sizeId,
                    'component_sequence'    => 2,
                    'component_name'        => "{$label} JRS Top",
                    'component_part_number' => "N/A",
                    'created_at'            => $now,
                    'updated_at'            => $now,
                ],
                // Sequence 3: Nametag (Static part number)
                [
                    'product_type_id'       => $productTypeId,
                    'product_size_id'       => $sizeId,
                    'component_sequence'    => 3,
                    'component_name'        => "Nametag",
                    'component_part_number' => "B0-1-5038-000",
                    'created_at'            => $now,
                    'updated_at'            => $now,
                ],
            ];

            DB::table('standard_product_components')->insert($components);
        }

        $this->command->info('JRS product components seeded successfully');
    }
}
