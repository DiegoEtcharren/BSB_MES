<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductType;
use App\Models\StandardProductSize;
use App\Models\StandardProductComponent;

class StandardProductComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Retrieve the exact ID for the 'JRS' Product Type
        // This will throw a ModelNotFoundException if 'JRS' does not exist.
        $productType = ProductType::where('name', 'JRS')->firstOrFail();

        // 2. Define the size_values based on the existing DB entries
        $sizeValues = [1.0, 1.5, 2.0, 3.0, 4.0, 6.0];

        // 3. Define the standard BOM template
        $components = [
            ['name' => 'Blade', 'part_number' => 'SF-5-00***-000', 'sequence' => 1],
            ['name' => 'Top', 'part_number' => 'SF-5-00***-000', 'sequence' => 2],
            ['name' => 'Nametag', 'part_number' => 'B0-0-00**-000', 'sequence' => 3],
        ];

        // 4. Iterate, lookup the size, and attach the components
        foreach ($sizeValues as $sizeValue) {

            // Retrieve the exact ID based on the numeric size_value
            $sizeRecord = StandardProductSize::where('size_value', $sizeValue)->firstOrFail();

            // Attach the standard components using the retrieved IDs
            foreach ($components as $comp) {
                StandardProductComponent::updateOrCreate(
                    [
                        'product_type_id' => $productType->id,
                        'product_size_id' => $sizeRecord->id,
                        'component_name' => $comp['name'],
                    ],
                    [
                        'component_part_number' => $comp['part_number'],
                        'component_sequence' => $comp['sequence'],
                    ]
                );
            }
        }
    }
}