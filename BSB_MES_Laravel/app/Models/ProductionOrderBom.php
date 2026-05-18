<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOrderBom extends Model
{
    protected $table = 'production_order_bom';

    protected $fillable = [
        'order_id',
        'component_name',
        'component_part_number',
        'component_sequence',
        'component_material',
    ];

    public function productionOrder()
    {
        return $this->belongsTo(ProductionOrder::class, 'order_id');
    }
}
