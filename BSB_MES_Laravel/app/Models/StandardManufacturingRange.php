<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StandardManufacturingRange extends Model
{
   use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Engineering role will use these to configure machine tolerances.
     */
    protected $fillable = [
        'product_type_id',
        'range_name',
        'range_name_long',
        'range_rules',
    ];

    /**
     * The attributes that should be cast.
     * This is CRITICAL: It converts the JSON string from MySQL
     * into a clean PHP array automatically.
     */
    protected $casts = [
        'range_rules' => 'array',
    ];

    /**
     * Relationship: Each range belongs to a specific Product Type.
     * Useful for: $range->productType->sku
     */
    public function productType(): BelongsTo
    {
        return $this->belongsTo(ProductType::class);
    }
}
