<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionOrderSpec extends Model
{
    protected $fillable = [
        'production_order_id',
        'burst_pressure',
        'pressure_unit_id',
        'pressure_range',
        'design_pressure',
        'design_pressure_min',
        'design_pressure_max',
        'min_pressure',
        'max_pressure',
        'temperature',
        'temperature_units',
        'manufacturing_range_min_ambient',
        'manufacturing_range_max_ambient',
        'manufacturing_range_min_temperature',
        'manufacturing_range_max_ambient_temperature',
    ];

    public function productionOrder()
    {
        return $this->belongsTo(ProductionOrder::class);
    }

    public function pressureUnit()
    {
        return $this->belongsTo(PressureUnit::class);
    }
}
