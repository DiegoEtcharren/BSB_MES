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
Schema::create('standard_product_sizes', function (Blueprint $table) {
            $table->id();
            $table->decimal('size_value', 8, 3)->comment('e.g., 1.5');
            $table->string('units')->comment('e.g., in, mm');
            $table->string('display_name')->comment('e.g., 1.5in');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('product_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('e.g., JRS, AV, RB-90');
            $table->timestamps();
        });

        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('pressure_units', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('symbol')->unique();
            $table->decimal('conversion_multiplier', 10, 4);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('press_machines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('standard_product_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_type_id')->constrained('product_types');
            $table->foreignId('product_size_id')->constrained('standard_product_sizes');
            $table->string('component_name');
            $table->string('component_part_number');
            $table->integer('component_sequence');
            $table->timestamps();
        });

        Schema::create('standard_manufacturing_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_type_id')->constrained('product_types');
            $table->integer('sequence_number');
            $table->enum('step_type', ['laser', 'press', 'testing']);
            $table->timestamps();
        });

        Schema::create('production_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('previous_order_id')->nullable()->constrained('production_orders');
            $table->string('legacy_previous_order_number')->nullable();
            $table->string('customer');
            $table->timestamp('date_entered');
            $table->timestamp('required_date');
            $table->foreignId('product_type_id')->constrained('product_types');

            // Size Handling
            $table->foreignId('product_size_id')->nullable()->constrained('standard_product_sizes');
            $table->string('custom_product_size')->nullable();
            $table->string('custom_size_uom')->nullable();

            $table->string('status')->default('pending');
            $table->timestamps();
        });

        Schema::create('production_order_bom', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('production_orders')->onDelete('cascade');
            $table->string('component_name');
            $table->string('component_part_number');
            $table->integer('component_sequence');
            $table->string('component_material');
            $table->timestamps();
        });

        Schema::create('manufacturing_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('production_orders')->onDelete('cascade');
            $table->integer('sequence_number');
            $table->enum('step_type', ['laser', 'press', 'testing']);
            $table->string('status')->default('pending');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_order_instructions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_order_id')->unique()->constrained('production_orders')->onDelete('cascade');
            $table->boolean('attach_tabs')->nullable();
            $table->text('nametag_instructions')->nullable();
            $table->text('special_instructions')->nullable();
            $table->text('shipping_instructions')->nullable();
            $table->timestamps();
        });

        Schema::create('production_order_specs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_order_id')->unique()->constrained('production_orders')->onDelete('cascade');
            $table->decimal('burst_pressure', 10, 2)->nullable();
            $table->foreignId('pressure_unit_id')->nullable()->constrained('pressure_units');
            $table->string('pressure_range')->nullable();
            $table->decimal('design_pressure', 10, 2)->nullable();
            $table->decimal('design_pressure_min', 10, 2)->nullable();
            $table->decimal('design_pressure_max', 10, 2)->nullable();
            $table->decimal('min_pressure', 10, 2)->nullable();
            $table->decimal('max_pressure', 10, 2)->nullable();
            $table->decimal('temperature', 10, 2)->nullable();
            $table->string('temperature_units')->nullable();
            $table->decimal('manufacturing_range_min_ambient', 10, 2)->nullable();
            $table->decimal('manufacturing_range_max_ambient', 10, 2)->nullable();
            $table->decimal('manufacturing_range_min_temperature', 10, 2)->nullable();
            $table->decimal('manufacturing_range_max_ambient_temperature', 10, 2)->nullable();
            $table->timestamps();
        });

        Schema::create('production_order_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_order_id')->constrained('production_orders')->onDelete('cascade');
            $table->foreignId('certificate_id')->nullable()->constrained('certificates');
            $table->string('custom_certificate_name')->nullable();
            $table->text('custom_certificate_description')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_press_logs');
        Schema::dropIfExists('production_order_certificates');
        Schema::dropIfExists('production_order_specs');
        Schema::dropIfExists('production_order_instructions');
        Schema::dropIfExists('manufacturing_steps');
        Schema::dropIfExists('production_order_bom');
        Schema::dropIfExists('production_orders');
        Schema::dropIfExists('standard_manufacturing_steps');
        Schema::dropIfExists('standard_product_components');
        Schema::dropIfExists('press_machines');
        Schema::dropIfExists('pressure_units');
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('product_types');
        Schema::dropIfExists('standard_product_sizes');
    }
};
