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
        Schema::create('standard_manufacturing_ranges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_type_id')
                  ->constrained('product_types')
                  ->onDelete('cascade');
            $table->string('range_name');
            $table->string('range_name_long');
            $table->json('range_rules');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('standard_manufacturing_ranges');
    }
};
