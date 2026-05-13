<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'material',
        'description',
        'small_description',
        'raw_material_part_number',
    ];
}
