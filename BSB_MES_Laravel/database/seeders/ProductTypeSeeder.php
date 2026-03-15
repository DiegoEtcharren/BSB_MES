<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run(): void
    {
        $now = Carbon::now();

        $productTypes = [
            ['name' => 'AV', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'AVV', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'JRS', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'RB-90', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'HILO', 'created_at' => $now, 'updated_at' => $now],
        ];

        // insertOrIgnore prevents SQL errors if the seed is run multiple times
        DB::table('product_types')->insertOrIgnore($productTypes);
    }
}
