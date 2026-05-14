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
                'material' => 'Nickel 400',
                'description' => 'Nickel 400 (Monel 400)',
                'small_description' => 'Monel',
            ],
            [
                'material' => 'Inconel 600',
                'description' => 'Nickel 600 (Inconel 600)',
                'small_description' => 'Inconel',
            ],
            [
                'material' => 'Hastelloy C-276',
                'description' => 'Hastelloy C-276',
                'small_description' => 'Hastelloy C-276',
            ],
        ];

        foreach ($materials as $material) {
            Material::create($material);
        }
    }
}
