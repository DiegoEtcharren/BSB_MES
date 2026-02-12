<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'employee_number',
        'first_name',
        'last_name',
        'department',
        'email',
        'hired_at',
        'is_active'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
