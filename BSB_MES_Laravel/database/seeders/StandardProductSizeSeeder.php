<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StandardProductSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $sizes = [
            // 1 inch / 25 mm
            ['size_value' => 1.0, 'units' => 'in', 'display_name' => '1"', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['size_value' => 25.0, 'units' => 'mm', 'display_name' => '25 mm', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // 1.5 inch / 40 mm
            ['size_value' => 1.5, 'units' => 'in', 'display_name' => '1.5"', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['size_value' => 40.0, 'units' => 'mm', 'display_name' => '40 mm', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // 2 inch / 50 mm
            ['size_value' => 2.0, 'units' => 'in', 'display_name' => '2"', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['size_value' => 50.0, 'units' => 'mm', 'display_name' => '50 mm', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // 3 inch / 80 mm
            ['size_value' => 3.0, 'units' => 'in', 'display_name' => '3"', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['size_value' => 80.0, 'units' => 'mm', 'display_name' => '80 mm', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // 4 inch / 100 mm
            ['size_value' => 4.0, 'units' => 'in', 'display_name' => '4"', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['size_value' => 100.0, 'units' => 'mm', 'display_name' => '100 mm', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // 6 inch / 150 mm
            ['size_value' => 6.0, 'units' => 'in', 'display_name' => '6"', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['size_value' => 150.0, 'units' => 'mm', 'display_name' => '150 mm', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('standard_product_sizes')->insertOrIgnore($sizes);
    }
}