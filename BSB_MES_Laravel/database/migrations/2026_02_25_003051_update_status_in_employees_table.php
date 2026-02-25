<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            Schema::table('employees', function (Blueprint $table) {
                // 1. Add the new status column
                $table->enum('status', ['active', 'inactive', 'on_leave'])
                    ->default('active')
                    ->after('is_active');
            });

            // 2. Data Migration: Map old boolean values to new status strings
            DB::table('employees')->where('is_active', true)->update(['status' => 'active']);
            DB::table('employees')->where('is_active', false)->update(['status' => 'inactive']);

            Schema::table('employees', function (Blueprint $table) {
                // 3. Remove the legacy column
                $table->dropColumn('is_active');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            Schema::table('employees', function (Blueprint $table) {
                $table->boolean('is_active')->default(true)->after('status');
            });

            // Reverse the data mapping
            DB::table('employees')->where('status', 'active')->update(['is_active' => true]);
            DB::table('employees')->whereIn('status', ['inactive', 'on_leave'])->update(['is_active' => false]);

            Schema::table('employees', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        });
    }
};
