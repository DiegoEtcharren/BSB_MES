<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOrder extends Model
{
    protected $fillable = [
        'order_number',
        'previous_order_id',
        'legacy_previous_order_number',
        'customer',
        'customer_po',
        'unit_price',
        'quantity',
        'date_entered',
        'required_date',
        'product_type_id',
        'product_size_id',
        'custom_product_size',
        'custom_size_uom',
        'status',
        'operator_id',
    ];

    public function specs()
    {
        return $this->hasOne(ProductionOrderSpec::class);
    }

    public function instructions()
    {
        return $this->hasOne(ProductionOrderInstruction::class);
    }

    public function boms()
    {
        return $this->hasMany(ProductionOrderBom::class, 'order_id');
    }

    public function certificates()
    {
        return $this->hasMany(ProductionOrderCertificate::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function productSize()
    {
        return $this->belongsTo(StandardProductSize::class, 'product_size_id');
    }

    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_id');
    }

    public function previousOrder()
    {
        return $this->belongsTo(ProductionOrder::class, 'previous_order_id');
    }
}

