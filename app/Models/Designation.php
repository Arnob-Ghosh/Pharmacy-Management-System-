<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    use HasFactory;
    protected $table = 'designations';

    protected $fillable = [
        'designation_name',
        'designation_description',
    ];
    public $timestamps = true;
}
