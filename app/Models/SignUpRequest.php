<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SignUpRequest extends Model
{
    use HasFactory;
    protected $table = 'sign_up_requests';

    protected $fillable =[
        'name',
        'store_name',
        'store_count',
        'business_type',
        'mobile',
        'email',
        'address',
        'registration_type',
        'package',
        'branch',
        'password',
    ];
    public $timestamps = true;
}
