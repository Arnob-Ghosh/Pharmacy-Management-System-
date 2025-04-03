<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductInHistory extends Model
{
    use HasFactory;
    protected $table = 'product_in_histories';

    protected $fillable =[
        'store',
        'store_name',
        'product',
        'product_name',
        'quantity',
        'unit_price',
        'mrp',
        'created_by',
        'updated_by',
        'subscriber_id',
        'user_id',
        'product_in_num',
        'batch_number'
    ];
    public $timestamps = true;
}
