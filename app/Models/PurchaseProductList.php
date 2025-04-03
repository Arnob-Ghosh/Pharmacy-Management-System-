<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\PurchaseProduct;

class PurchaseProductList extends Model
{
    use HasFactory;
    protected $table = 'purchase_product_lists'; 
    
    protected $fillable =[
        'productId',
        'productName',
        'quantity',
        'unitPrice',
        'totalPrice',
        'created_by',
        'updated_by',
        'purchaseProductId',
    ];
    
    public $timestamps = true;

    public function purchaseProduct(){
        return $this->belongsTo(PurchaseProduct::class);
    }
}
