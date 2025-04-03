<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Price extends Model
{
    use HasFactory;
    protected $table = 'prices';

    protected $fillable =[
        'product_id',
        'price',
        'mrp',
        'quantity',
        'created_by',
        'updated_by',
        'subscriber_id',
        'store_id',
        'batch_number',
        'product_in_num',
    ];
    public $timestamps = true;
}
