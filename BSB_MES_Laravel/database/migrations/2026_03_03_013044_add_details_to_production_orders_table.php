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
        Schema::table('production_orders', function (Blueprint $table) {
            // Adding customer_po after the customer column
            $table->string('customer_po')->nullable()->after('customer');

            // Adding financial and volume data
            $table->decimal('unit_price', 10, 2)->default(0.00)->after('customer_po');
            $table->unsignedInteger('quantity')->default(1)->after('unit_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('production_orders', function (Blueprint $table) {
            $table->dropColumn(['customer_po', 'unit_price', 'quantity']);
        });
    }
};
