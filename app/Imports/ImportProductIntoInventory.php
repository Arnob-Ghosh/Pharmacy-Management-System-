<?php

namespace App\Imports;

use App\Models\Brand;
use App\Models\Price;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Inventory;
use App\Models\ProductUnit;
use App\Models\Subcategory;
use App\Models\StoreInventory;
use App\Models\ProductInHistory;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

// class ImportProductIntoInventory implements ToModel
class ImportProductIntoInventory implements ToCollection, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    // public function model(array $row)
    // {
    //     return new Product([
    //         //
    //     ]);
    // }

    public function collection(Collection $rows)
    {
        $store=session()->get('productInStore');
        Validator::make($rows->toArray(), [
            '*.product_name'    => 'required',
            '*.generic_name'    => 'required',
            '*.brand'           => 'required',
            '*.category_name'   => 'required',
            '*.safety_stock'    => 'required',
            '*.measuring_type'  => 'required',
            '*.product_incoming'=> 'required',
            '*.mrp'             => 'required',
            '*.price'           => 'required',
            '*.purchase_date'   => 'required',
         ])->validate();

         foreach ($rows as $row)
        {
            if($row['subcategory_name']==''){
                $product = Product::where([
                    ['productName',$row['product_name']],
                    ['category_name',$row['category_name']]
                    ])->first();
            }
            else{
                $product = Product::where([
                    ['productName',$row['product_name']],
                    ['category_name',$row['category_name']],
                    ['subcategory_name',$row['subcategory_name']],
                    ])->first();
            }

            if(empty($product)){
                $brand = Brand::where('brand_name',$row['brand'])->first();
                if(empty($brand))
                {
                    $brand = new Brand;
                    $brand->brand_name      = $row['brand'];
                    $brand->subscriber_id   = Auth::user()->subscriber_id;
                    $brand->save();
                }

                $category = Category::where('category_name',$row['category_name'])->first();
                if(empty($category))
                {
                    $category = new Category;
                    $category->category_name = $row['category_name'];
                    $category->subscriber_id = Auth::user()->subscriber_id;
                    $category->save();
                }
                $subcategoryId=0;
                if($row['subcategory_name']!=''){
                    $subcategory = Subcategory::where([
                        ['subcategory_name',$row['subcategory_name']],
                        ['category_id',$category->id],
                        ])->first();
                    if(empty($subcategory))
                    {
                        $subcategory = new Subcategory;
                        $subcategory->subcategory_name  = $row['subcategory_name'];
                        $subcategory->category_id       = $category->id;
                        $subcategory->save();
                    }
                    $subcategoryId=$subcategory->id;
                }
                if($row['subcategory_name']!=''){
                    $supplier = Supplier::where('name',$row['supplier'])->first();
                    if(empty($supplier))
                    {
                        $supplier = new Supplier;
                        $supplier->name             = $row['supplier'];
                        $supplier->subscriber_id    = Auth::user()->subscriber_id;

                        $suppliers = Supplier::where([
                            ['subscriber_id', Auth::user()->subscriber_id]
                        ])->first();

                    if($suppliers){
                            $suppliers = Supplier::where([
                                ['subscriber_id', Auth::user()->subscriber_id]
                            ])->latest()->first();
                            $supplier->head_code = (int)$suppliers->head_code + 1;
                        }else{
                            $supplier->head_code = (50101 * 1000) + 1;
                        }

                        $supplier->save();
                    }
                }

                $unit = ProductUnit::where('name',$row['measuring_type'])->first();
                if(empty($unit))
                {
                    $unit = new ProductUnit;
                    $unit->name             = $row['measuring_type'];
                    $unit->subscriber_id    = Auth::user()->subscriber_id;
                    $unit->user_id          = Auth::user()->id;
                    $unit->save();
                }
                $product = Product::create([
                    'productName'       => $row['product_name'],
                    'productLabel'      => $row['generic_name'],
                    'brand'             => $row['brand'],
                    'category'          => $category->id,
                    'category_name'     => $row['category_name'],
                    'subcategory'       => $subcategoryId,
                    'subcategory_name'  => $row['subcategory_name'],
                    'sku'               => $row['sku'],
                    'barcode'           => $row['barcode'],
                    'supplier'          => $row['supplier'],
                    'start_stock'       => 0,
                    'safety_stock'      => $row['safety_stock'],
                    'shelf'             => $row['shelf'],
                    'batch_number'      => $row['batch_number'],
                    'expiry_date'       => $row['expiry_date'],
                    'box_size'          => $row['box_size'],
                    'strength'          => $row['strength'],
                    'unit'              => $row['measuring_type'],
                    'subscriber_id'     => Auth::user()->subscriber_id,

                ]);
            }

            if($store==0){
                $InventoryProduct = Inventory::where([
                    ['productId',$product->id],
                    ['subscriber_id',Auth::user()->subscriber_id]
                    ])->first();
                if(empty($InventoryProduct)){

                    $inventory = Inventory::create([
                        'onHand'            => $row['product_incoming'],
                        'productIncoming'   => $row['product_incoming'],
                        'mrp'               => $row['mrp'],
                        'measuringType'     => $row['measuring_type'],
                        'price'             => $row['price'],
                        'purchase_date'     =>\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['purchase_date']),
                        'productId'         => $product->id,
                        'batch_number'      => $row['batch_number'],
                        'created_by'        => Auth::user()->subscriber_id,
                        'subscriber_id'     => Auth::user()->subscriber_id,
                    ]);

                    $history = new ProductInHistory;
                    $history->store             = 0;
                    $history->store_name        = 'Inventory';
                    $history->product           = $product->id;
                    $history->product_name      = $product->productName;
                    $history->quantity          = $row['product_incoming'];
                    $history->unit_price        = $row['price'];
                    $history->mrp               = $row['mrp'];
                    $history->subscriber_id     = Auth::user()->subscriber_id;
                    $history->user_id           = Auth::user()->id;
                    $history->product_in_num    = 0;
                    $history->batch_number      = $row['batch_number'];
                    $history->save();

                    $price = Price::create([
                        'price'         => $row['price'],
                        'mrp'           => $row['mrp'],
                        'quantity'      => $row['product_incoming'],
                        'created_by'    => Auth::user()->subscriber_id,
                        'subscriber_id' => Auth::user()->subscriber_id,
                        'store_id'      => 0,
                        'product_in_num'=> 0,
                        'batchNumber'   => $row['batch_number'],
                        'product_id'    => $product->id,
                    ]);
                }
                else{
                    $mrp=$InventoryProduct->mrp;
                    $price=$InventoryProduct->price;
                    $onHand = $InventoryProduct->onHand;
                    $productIncoming = $InventoryProduct->productIncoming;

                    $InventoryProduct->onHand           = $onHand+$row['product_incoming'];
                    $InventoryProduct->productIncoming  = $productIncoming+$row['product_incoming'];
                    $InventoryProduct->mrp              = $row['mrp'];
                    $InventoryProduct->price            = $row['price'];
                    $InventoryProduct->created_by       = Auth::user()->subscriber_id;
                    $InventoryProduct->subscriber_id    = Auth::user()->subscriber_id;
                    $InventoryProduct->productId        = $product->id;
                    $InventoryProduct->save();

                    $history = new ProductInHistory;
                    $history->store             = 0;
                    $history->store_name        = 'Inventory';
                    $history->product           = $product->id;
                    $history->product_name      = $product->productName;
                    $history->quantity          = $row['product_incoming'];
                    $history->unit_price        = $row['price'];
                    $history->mrp               = $row['mrp'];
                    $history->subscriber_id     = Auth::user()->subscriber_id;
                    $history->user_id           = Auth::user()->id;
                    $history->product_in_num    = 0;
                    $history->batch_number      = $row['batch_number'];
                    $history->save();

                    if( $mrp != $row['mrp'] || $price != $row['price'] ){

                        $price = new Price;
                        $price->product_id      = $product->id;
                        $price->price           = $row['price'];
                        $price->mrp             = $row['mrp'];
                        $price->quantity        = $row['product_incoming'];
                        $price->store_id        = 0;
                        $price->subscriber_id   = Auth::user()->subscriber_id;
                        $price->product_in_num  = 0;
                        $price->batchNumber     = $row['batch_number'];
                        $price->save();
                    }
                }
            }
            else{
                $storeName=Store::find($store);
                $StoreInventory = StoreInventory::where([
                    ['productId',$product->id],
                    ['store_id',$store]
                    ])->first();
                if(empty($StoreInventory)){

                    $storeInventory = StoreInventory::create([
                        'onHand'            => $row['product_incoming'],
                        'productIncoming'   => $row['product_incoming'],
                        'safety_stock'      => $row['safety_stock'],
                        'mrp'               => $row['mrp'],
                        'measuringType'     => $row['measuring_type'],
                        'price'             => $row['price'],
                        'productId'         => $product->id,
                        'batch_number'      => $row['batch_number'],
                        'store_id'          => $store,
                        'created_by'        => Auth::user()->subscriber_id,
                    ]);

                    $history = new ProductInHistory;
                    $history->store             = $store;
                    $history->store_name        = $storeName;
                    $history->product           = $product->id;
                    $history->product_name      = $product->productName;
                    $history->quantity          = $row['product_incoming'];
                    $history->unit_price        = $row['price'];
                    $history->mrp               = $row['mrp'];
                    $history->subscriber_id     = Auth::user()->subscriber_id;
                    $history->user_id           = Auth::user()->id;
                    $history->product_in_num    = 0;
                    $history->batch_number      = $row['batch_number'];
                    $history->save();

                    $price = Price::create([
                        'price'         => $row['price'],
                        'mrp'           => $row['mrp'],
                        'quantity'      => $row['product_incoming'],
                        'created_by'    => Auth::user()->subscriber_id,
                        'subscriber_id' => Auth::user()->subscriber_id,
                        'store_id'      => $store,
                        'product_in_num'=> 0,
                        'batchNumber'   => $row['batch_number'],
                        'product_id'    => $product->id,
                    ]);
                }
                else{
                    $mrp=$StoreInventory->mrp;
                    $price=$StoreInventory->price;
                    $onHand = $StoreInventory->onHand;
                    $productIncoming = $StoreInventory->productIncoming;

                    $StoreInventory->onHand             = $onHand+$row['product_incoming'];
                    $StoreInventory->productIncoming    = $productIncoming+$row['product_incoming'];
                    $StoreInventory->mrp                = $row['mrp'];
                    $StoreInventory->price              = $row['price'];
                    $StoreInventory->updated_by         = Auth::user()->subscriber_id;
                    $StoreInventory->productId          = $product->id;
                    $StoreInventory->save();

                    $history = new ProductInHistory;
                    $history->store         = $store;
                    $history->store_name    = $storeName;
                    $history->product       = $product->id;
                    $history->product_name  = $product->productName;
                    $history->quantity      = $row['product_incoming'];
                    $history->unit_price    = $row['price'];
                    $history->mrp           = $row['mrp'];
                    $history->subscriber_id = Auth::user()->subscriber_id;
                    $history->user_id       = Auth::user()->id;
                    $history->product_in_num= 0;
                    $history->batch_number  = $row['batch_number'];
                    $history->save();

                    if( $mrp != $row['mrp'] || $price != $row['price'] ){

                        $price = new Price;
                        $price->product_id      = $product->id;
                        $price->price           = $row['price'];
                        $price->mrp             = $row['mrp'];
                        $price->quantity        = $row['product_incoming'];
                        $price->store_id        = $store;
                        $price->subscriber_id   = Auth::user()->subscriber_id;
                        $price->product_in_num  = 0;
                        $price->batchNumber     = $row['batch_number'];
                        $price->save();
                    }
                }
            }
        }
    }
}
