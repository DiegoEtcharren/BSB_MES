<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionOrderInstruction extends Model
{
    protected $fillable = [
        'production_order_id',
        'attach_tabs',
        'nametag_instructions',
        'special_instructions',
        'shipping_instructions',
    ];

    protected $casts = [
        'nametag_instructions' => 'array',
    ];

    public function productionOrder()
    {
        return $this->belongsTo(ProductionOrder::class);
    }
}
