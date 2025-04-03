<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\PurchaseProductList;

class PurchaseProduct extends Model
{
    use HasFactory;
    protected $table = 'purchase_products'; 
    
    protected $fillable =[
        'supplerId',
        'poNumber',
        'totalPrice',
        'discount',
        'grandTotal',
        'purchaseDate',
        'purchaseNote',
        'created_by',
        'updated_by'
    ];
    
    public $timestamps = true;

    public function purchaseProductList(){
        return $this->hasMany(PurchaseProductList::class);
    }
}
