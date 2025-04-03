<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreInventory extends Model
{
    use HasFactory;
    protected $table = 'store_inventories'; 
    
    protected $fillable =[
        'onHand',
        'start_stock',
        'safety_stock',
        'mrp',
        'measuringType',
        'price',
        'created_by',
        'updated_by',
        'productId',
        'store_id',
        
    ];
    public $timestamps = true;
}
