<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTransferHistory extends Model
{
    use HasFactory;
    protected $table = 'product_transfer_histories';

    protected $fillable =[
        'from_store',
        'to_store',
        'product',
        'quantity',
        'price',
        'created_by',
        'updated_by',
        'subscriber_id',
        'user_id'
    ];
    public $timestamps = true;
}
