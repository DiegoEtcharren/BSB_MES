<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionOrderCertificate extends Model
{
    protected $fillable = [
        'production_order_id',
        'certificate_id',
        'custom_certificate_name',
        'custom_certificate_description',
    ];

    public function productionOrder()
    {
        return $this->belongsTo(ProductionOrder::class);
    }

    public function certificate()
    {
        return $this->belongsTo(Certificate::class);
    }
}
