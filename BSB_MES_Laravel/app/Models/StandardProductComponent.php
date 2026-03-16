<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StandardProductComponent extends Model
{
    use HasFactory;

    protected $table = 'standard_product_components';
    protected $fillable = [
        'product_type_id',
        'product_size_id',
        'component_name',
        'component_part_number',
        'component_sequence',
    ];

    public function productType(): BelongsTo
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }

    public function productSize(): BelongsTo
    {
        return $this->belongsTo(StandardProductSize::class, 'product_size_id');
    }
}