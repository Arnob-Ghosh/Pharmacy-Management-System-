<?php

namespace App\Http\Services;

use Session;
use Carbon\Carbon;
use App\Models\Vat;
use App\Models\Leaf;
use App\Models\Brand;
use App\Models\Price;
use App\Models\Product;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Supplier;
use App\Models\Inventory;
use App\Models\ProductUnit;
use App\Models\StoreInventory;
use Illuminate\Support\Facades\Validator;

class ProductService
{
    public function create($subscriberId){
        Session::put('subscriberId', $subscriberId);
        $categories = Category::where('subscriber_id', 1)->orWhere('subscriber_id', $subscriberId)->get();
        $brands = Brand::where('subscriber_id', 1)->orWhere('subscriber_id', $subscriberId)->get();
        $discounts = Discount::where('subscriber_id', $subscriberId)->get();
        $taxs = Vat::where('subscriber_id', $subscriberId)->get();
        $suppliers = Supplier::where('subscriber_id', $subscriberId)->get();
        $leaves = Leaf::where('subscriber_id', $subscriberId)->get();
        $units= ProductUnit::where('subscriber_id', $subscriberId)->get();

        return response() -> json([
            "message" => "success",
            "status" => 200,
            "categories" => $categories,
            "brands" => $brands,
            "suppliers" => $suppliers,
            "units" => $units,
            "leaves" => $leaves,
            "discounts" => $discounts,
            "taxs" => $taxs
        ]);
    }

    public function store($req, $subscriberId, $storeId){

        Session::put('subscriberId', $subscriberId);
        // Log::info($req);
        // $req =  json_decode($request['json']);
        // Log::info('Solved '.$req->productName);
        // Log::info('Json '.$request['json']);
        // Log::info('Image '.$request['image']);

        // return $request['image'];

    //PRODUCT-----------------------------------------------------------------------------------------------------------------

    $messages = [
        'productName.required'      =>   "Product name is required.",
        'productLabel.required'     =>   "Product label is required.",
        'brand.required'            =>   "Brand name is required.",
        'category.required'         =>   "Category is required.",
        'safetyStock.required'      =>   "Safty stock is required.",
        'measuringType.required'    =>   "Unit is required.",
        'productIncoming.required'  =>   "Product incoming is required.",
        'mrp.required'              =>   "MRP number is required.",
        'price.required'            =>   "Purchase cost is required.",
        // 'purchaseDate.required'     =>   "Purchase date is required.",
        // 'productName.unique'       =>   "Product already exists."
    ];

    $validator = Validator::make($req->all(), [
        'productName'       => 'required',
        'productLabel'      => 'required',
        'brand'             => 'required',
        'category'          => 'required',
        'safetyStock'       => 'required',
        'measuringType'     => 'required',
        'productIncoming'   => 'required',
        'mrp'               => 'required',
        'price'             => 'required',
        // 'purchaseDate'      => 'required'
    ], $messages);

    if ($validator->passes()) {
    // Log::info('Success');
        $product = Product::where([
            ['productName',$req->productName],
            ['productLabel',$req->productLabel],
            ['brand',$req->brand],
            ['category_name',$req->categoryName]
        ])->get();
        if($product->isEmpty())
        {
            $timestamp = Carbon::now();
            $date = $timestamp->toDateString();

            $product = new Product;
            $product->productName               = $req->productName;
            $product->productLabel              = $req->productLabel;
            $product->brand                     = $req->brand;

            $product->category                  = $req->category;
            $product->category_name             = $req->categoryName;

            $product->subcategory               = $req->subcategory;
            $product->subcategory_name          = $req->subcategoryName;

            $product->sku                       = $req->sku;
            $product->barcode                   = $req->barcode;
            $product->supplier	                = $req->supplier;

            if((int)$req->start_stock == NULL){
                $product->start_stock      = 0;
            }else{
                $product->start_stock	            = (int)$req->startStock;
            }
            if((int)$req->safety_stock == NULL){
                $product->safety_stock      = 0;
            }else{
                $product->safety_stock	            = (int)$req->safetyStock;
            }
            if($req->shelf == NULL){
                $product->shelf      = 0;
            }else{
                $product->shelf	            = $req->shelf;
            }
            $product->box_size	            = (int)$req->boxSize;


            $product->strength                  = $req->strength;

            $product->discount_type             = $req->discountType;
            $product->available_discount        = $req->availableDiscount;
            if(doubleval($req->discount) == NULL){
                $product->discount      = 0;
            }else{
                $product->discount                  = doubleval($req->discount);
            }
            $product->taxName                   = $req->taxName;
            $product->isExcludedTax             = $req->isExcludedTax;
            if(doubleval($req->tax) == NULL){
                $product->tax      = 0;
            }else{
                $product->tax                   = doubleval($req->tax);
            }

            $product->subscriber_id             = $subscriberId;
            $product->unit                      = $req->measuringType;
            $product->save();

            //INVENTORY------------------------------------------------------------------------------------------------------------
            $inventory = new Inventory;
            $inventory->onHand              = 0;
            $inventory->productIncoming     = 0;
            $inventory->mrp                 = $req->mrp;
            $inventory->measuringType       = $req->measuringType;
            $inventory->price               = $req->price;
            $inventory->purchase_date       = $date;
            $inventory->productId           = $product->id;
            $inventory->subscriber_id       = $subscriberId;
            $inventory->save();
            //STORE_INVENTORY------------------------------------------------------------------------------------------------------
            $storeInventory = new StoreInventory;
            $storeInventory->onHand             = (int)$req->productIncoming;
            $storeInventory->productIncoming    = (int)$req->productIncoming;
            $storeInventory->safety_stock       = (int)$req->safetyStock;
            $storeInventory->mrp                = $req->mrp;
            $storeInventory->measuringType      = $req->measuringType;
            $storeInventory->price              = $req->price;
            $storeInventory->productId          = $product->id;
            $storeInventory->store_id           = $storeId;
            $storeInventory->save();

            $price = new Price;
            $price->product_id = $product->id;
            $price->price = doubleval($req->price);
            $price->mrp = doubleval($req->mrp);
            $price->quantity = (int)$req->productIncoming;
            $price->subscriber_id = $subscriberId;
            $price->store_id = $storeId;
            $price->product_in_num = 0;
            $price->save();

            return response() -> json([
                'status'=>200,
                'message' => 'Product added Successfully!'
            ]);
        }
        else{
            return response() -> json([
                'status'=>400,
                'message' => 'Product Exist!'
            ]);
        }
    }

    return response()->json(['error'=>$validator->errors()]);

    }

    public function products($subscriberId){
        $products = Product::Select('id','productName','strength')->where('subscriber_id', 1)->orWhere('subscriber_id', $subscriberId)->get();
        return response() -> json([
            "message" => "success",
            "status" => 200,
            "products" => $products
        ]);
    }

    public function productLowStock($subscriberId, $storeId){
        $products = StoreInventory::join('products', 'products.id', 'store_inventories.productId')
        ->Select('products.id','products.productName','products.category_name','products.strength', 'store_inventories.onHand', 'store_inventories.safety_stock')
        ->where('store_inventories.store_id', $storeId)
        ->get();

        $stocks=[];
        foreach($products AS $product){
            if($product->onHand < $product->safety_stock)
            {
                $stock['id']=$product->id;
                $stock['name']=$product->productName;
                $stock['categoryName']=$product->category_name;
                $strength='N/A';
                if($product->strength!=null){
                    $stock['strength']=$product->strength;
                }
                else{
                    $stock['strength']=$strength;
                }
                $stock['onHand']=$product->onHand;
                $stock['safetyStock']=$product->safety_stock;

                $stocks[] = $stock;
            }
        }
        return response() -> json($stocks);
    }
}
