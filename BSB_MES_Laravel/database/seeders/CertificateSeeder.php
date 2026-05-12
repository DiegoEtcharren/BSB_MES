<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certificates = [
            ['name' => 'BTC', 'description' => '', 'is_active' => true],
            ['name' => 'MILL', 'description' => '', 'is_active' => true],
            ['name' => 'C OF C', 'description' => '', 'is_active' => true],
            ['name' => 'ASME', 'description' => '', 'is_active' => true],
            ['name' => 'CE', 'description' => '', 'is_active' => true],
        ];

        DB::table('certificates')->insert($certificates);
    }
}
