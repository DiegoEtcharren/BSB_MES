<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create the Employee Record (The Physical Entity)
        $employeeId = DB::table('employees')->insertGetId([
            'employee_number' => '1907',
            'first_name' => 'Diego',
            'last_name' => 'Etcharren',
            'department' => 'Engineering',
            'email' => 'diegoe96@gmail.com',
            'hired_at' => '2026-05-11',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Create the User Record (The System Credential)
        DB::table('users')->insert([
            'employee_id' => $employeeId,
            'username' => 'admin',
            'password' => Hash::make('Welcome2022.'),
            'role' => 'engineer',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
