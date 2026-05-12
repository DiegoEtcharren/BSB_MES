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
            ['name' => 'BTC', 'description' => 'Burst Test Certificate', 'is_active' => true],
            ['name' => 'MILL', 'description' => 'Material MILL Certificate', 'is_active' => true],
            ['name' => 'C OF C', 'description' => 'Certifcate of Conformance', 'is_active' => true],
            ['name' => 'ASME', 'description' => 'American Society of Mechanical Engineers', 'is_active' => true],
            ['name' => 'CE', 'description' => 'Conformité Européenne', 'is_active' => true],
        ];

        DB::table('certificates')->insert($certificates);
    }
}
