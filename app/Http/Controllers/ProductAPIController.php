<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Batch;
use App\Models\Store;
use App\Models\Product;
use App\Models\PaymentDirection;
use App\Models\TransactionID;
use Illuminate\Http\Request;
use App\Model\StoreInventory;
use Illuminate\Support\Facades\DB;
use App\Http\Services\ProductService;

class ProductAPIController extends Controller
{
    public function create($subscriberId){
        return (new ProductService)->create($subscriberId);
    }
    public function transaction(Request $request)
    {
        $transaction= new TransactionID;
        $transaction->transactionid= $request->transactionid;
        $transaction->type= $request->type;
        $transaction->save();
        
        return response() -> json([
            "status" => "success",
            
            
        ]);
        
    }
    public function payment_direction(){
        $payment_direction=PaymentDirection::first();
        
        return response() -> json($payment_direction
            
            
        );
        
    }
    public function store(Request $request, $subscriberId, $storeId){
        return (new ProductService)->store($request, $subscriberId, $storeId);
    }

    public function list(Request $request, $subscriberId, $storeId){

        ini_set('max_execution_time', 300);
        $data1 = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "store_inventories.*", "products.*")
            ->where([
                    // ['products.subscriber_id', $subscriberId],
                    ['store_inventories.store_id', $storeId]
                ])
            ->groupBy("store_inventories.productId")
            ->where(function ($query){
                $query->select("mrp", "price")
                ->from('prices')
                // ->whereColumn('prices.product_id',  'products.id')
                ->orderBy('prices.id')
                ->limit(1);
            })
            ->get();


        $data_array = [];
        foreach($data1 as $d1){

            if($d1->mrp == NULL){
                $mrp = 0;
                $price = 0;
            }else{
                $mrp = $d1->mrp;
                $price = $d1->price;
            }

            $x = [
                'id' => $d1->id,
                'productName' => $d1->productName,
                'productLabel' => $d1->productLabel,
                'brand' => $d1->brand,
                'category' => $d1->category,
                'category_name' => $d1->category_name,
                'subcategory' => $d1->subcategory,
                'subcategory_name' => $d1->subcategory_name,
                'sku' => $d1->sku,
                'barcode' => $d1->barcode,
                'supplier' => $d1->supplier,
                'start_stock' => $d1->start_stock,
                'safety_stock' => $d1->safety_stock,
                'color' => $d1->color,
                'size' => $d1->size,
                'available_discount' => $d1->available_discount,
                'discount' => $d1->discount,
                'discount_type' => $d1->discount_type,
                'available_offer' => $d1->available_offer,
                'offerItemId' => $d1->offerItemId,
                'freeItemName' => $d1->freeItemName,
                'requiredQuantity' => $d1->requiredQuantity,
                'freeQuantity' => $d1->freeQuantity,
                'isExcludedTax' => $d1->isExcludedTax,
                'taxName' => $d1->taxName,
                'tax' => $d1->tax,
                'desc' => $d1->desc,
                'productImage' => $d1->productImage,
                'subscriber_id' => $d1->subscriber_id,
                'shelf' => $d1->shelf,
                'batch_number' => $d1->batch_number,
                'expiry_date' => $d1->expiry_date,
                'box_size' => $d1->box_size,
                'strength' => $d1->strength,
                "created_by"=> $d1->created_by,
                "updated_by"=> $d1->updated_by,
                "created_at"=> $d1->created_at,
                "updated_at"=> $d1->updated_at,
                'onHand' => $d1->totalOnHand,
                "productIncoming"=> $d1->productIncoming,
                "productOutgoing"=> $d1->productOutgoing,
                'mrp' => $mrp,
                "measuringType"=> $d1->measuringType,
                'price' => $price,
                'productId' => $d1->productId,
                "store_id" => $d1->store_id,

            ];

            $data_array[] = $x;
        }

            return response() -> json([
            "status" => "success",
            "statusCode" => 200,
            "message" => "Data found",
            "role" => null,
            "data" => $data_array,
        ]);
    }

    public function allProduct($subscriberId){
        return (new ProductService)->products($subscriberId);
    }

    public function lowStock($subscriberId, $storeId){
        return (new ProductService)->productLowStock($subscriberId, $storeId);
    }

    public function storelist($subscriberId)
    {
            $store = Store::select('id','store_name')->where('subscriber_id', $subscriberId)->get();
            return response()->json([
                'stores' => $store,
            ]);
    }

    public function batchlist($subscriberId)
    {
            $batch = Batch::select('id','batch_number','expiry_date')->where('subscriber_id', $subscriberId)->get();
            return response()->json([
                'batchs' => $batch,
            ]);
    }
}
