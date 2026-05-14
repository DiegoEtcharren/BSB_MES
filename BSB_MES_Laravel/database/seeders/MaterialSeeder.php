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
            ],
            [
                'material' => 'Carbon Steel',
                'description' => 'Carbon Steel',
                'small_description' => 'Carbon Steel',
            ],
            [
                'material' => 'Alloy 400',
                'description' => 'Alloy 400',
                'small_description' => 'Alloy 400',
            ],
            [
                'material' => 'Titanium Grade 2',
                'description' => 'Titanium Grade 2',
                'small_description' => 'Titanium Grade 2',
            ],
        ];

        foreach ($materials as $material) {
            Material::create($material);
        }
    }
}
