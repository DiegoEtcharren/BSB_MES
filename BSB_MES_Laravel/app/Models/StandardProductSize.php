<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StandardProductSize extends Model
{
    public function standardProductComponents(): HasMany
    {
        return $this->hasMany(StandardProductComponent::class, 'product_size_id');
    }
}
