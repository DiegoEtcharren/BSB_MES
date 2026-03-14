<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PressureUnitsSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // Base Unit: PSI (1.0)
        $units = [
            [
                'name' => 'Pounds per Square Inch',
                'symbol' => 'psi',
                'conversion_multiplier' => 1.0,
                'is_active' => true,
            ],
            [
                'name' => 'Bar',
                'symbol' => 'bar',
                'conversion_multiplier' => 14.5038,
                'is_active' => true,
            ],
            [
                'name' => 'Kilopascal',
                'symbol' => 'kPa',
                'conversion_multiplier' => 0.145038,
                'is_active' => true,
            ],
            [
                'name' => 'Megapascal',
                'symbol' => 'MPa',
                'conversion_multiplier' => 145.038,
                'is_active' => true,
            ],
            [
                'name' => 'Kilogram per Square Centimeter',
                'symbol' => 'kg/cm²',
                'conversion_multiplier' => 14.2233,
                'is_active' => true,
            ],
        ];

        foreach ($units as $unit) {
            DB::table('pressure_units')->updateOrInsert(
                ['symbol' => $unit['symbol']],
                array_merge($unit, ['created_at' => $now, 'updated_at' => $now])
            );
        }
    }
}