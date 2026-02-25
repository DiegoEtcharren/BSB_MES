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
        'status'
    ];

    protected $appends = ['role', 'username'];

    public function getRoleAttribute()
    {
        return $this->user ? $this->user->role : 'Unassigned';
    }

    public function getUsernameAttribute()
    {
        return $this->user ? $this->user->username : 'No Account';
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
