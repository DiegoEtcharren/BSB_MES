<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            Schema::table('users', function (Blueprint $table) {
            // 1. Drop the FK:
                $table->dropForeign('users_employee_id_foreign');

            // 2. Drop column:
                $table->dropColumn('employee_id');
            });

            Schema::table('users', function (Blueprint $table) {
                // 2. Re-add the column with the proper MES constraint
                $table->foreignId('employee_id')
                    ->after('id')
                    ->nullable()
                    ->unique()
                    ->constrained('employees')
                    ->onDelete('cascade');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['employee_id']);
                $table->dropColumn('employee_id');
                $table->foreignId('employee_id')
                    ->nullable()
                    ->after('id')
                    ->constrained('employees')
                    ->unique();
            });
        });
    }
};
