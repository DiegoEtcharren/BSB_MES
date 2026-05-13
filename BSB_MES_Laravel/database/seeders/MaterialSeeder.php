<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Material;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materials = [
            [
                'material' => '316 SST',
                'description' => '316 sst',
                'small_description' => '316 sst',
                'raw_material_part_number' => null,
            ],
            [
                'material' => 'Carbon Steel',
                'description' => 'Carbon Steel',
                'small_description' => 'Carbon Steel',
                'raw_material_part_number' => null,
            ],
            [
                'material' => 'Alloy 400',
                'description' => 'Alloy 400',
                'small_description' => 'Alloy 400',
                'raw_material_part_number' => null,
            ],
            [
                'material' => 'Titanium Grade 2',
                'description' => 'Titanium Grade 2',
                'small_description' => 'Titanium Grade 2',
                'raw_material_part_number' => null,
            ],
        ];

        foreach ($materials as $material) {
            Material::create($material);
        }
    }
}
