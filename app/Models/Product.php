<?php

namespace App\Models;

use App\Models\Subscriber;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable =[
        'productName',
        'productLabel',
        'brand',
        'category',
        'category_name',
        'subcategory',
        'subcategory_name',
        'sku',
        'barcode',
        'supplier',
        'start_stock',
        'safety_stock',
        'color',
        'size',
        'available_discount',
        'discount',
        'discount_type',
        'offerItemId',
        'available_offer',
        'freeItemName',
        'requiredQuantity',
        'freeQuantity',
        'isExcludedTax',
        'taxName',
        'tax',
        'desc',
        'productImage',
        'shelf',
        'batch_number',
        'expiry_date',
        'box_size',
        'strength',
        'unit',
        'created_by',
        'updated_by',
        'subscriber_id',
    ];
    public $timestamps = true;

    public function subscriber(){
        return $this->belongsTo(Subscriber::class);
    }

    public function inventory(){
        return $this->hasOne(Inventory::class);
    }

}
