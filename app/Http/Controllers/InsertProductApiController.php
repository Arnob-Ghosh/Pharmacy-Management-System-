<?php

namespace App\Http\Controllers;

use Session;
use App\Models\Price;
use App\Models\Store;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\StoreInventory;

class InsertProductApiController extends Controller
{
    public function store(Request $request){



        $subscriberId = $request->subscriberId;
        Session::put('subscriberId', $subscriberId);
        $storeName = $request->storeName;

        $store = Store::where('store_name', $storeName)->first();
        $storeId = $store->id;

        foreach($request->productList as $product){

                $productId = $product['productId'];

                $storeInventories = StoreInventory::where([
                    ['productId', $productId],
                    ['store_id', $storeId]
                ])
                ->get();

            if($storeInventories->isEmpty()){

                $storeInventoryN = new StoreInventory;
                $storeInventoryN->onHand = (int)$product['quantity'];
                $storeInventoryN->productIncoming = (int)$product['quantity'];
                $storeInventoryN->safety_stock = (int)$product['quantity'];
                $storeInventoryN->mrp = $product['mrp'];
                $storeInventoryN->price = $product['unitPrice'];
                $storeInventoryN->productId = $product['productId'];
                $storeInventoryN->store_id = $storeId;
                $storeInventoryN->batch_number =  $product['batchNumber'];

                $storeInventoryN->save();

                $price = new Price;
                $price->product_id = $product['productId'];
                $price->price = $product['unitPrice'];
                $price->mrp = $product['mrp'];
                $price->quantity = (int)$product['quantity'];
                $price->subscriber_id = $subscriberId;
                $price->store_id = $storeId;
                $price->batch_number = $product['batchNumber'];
                $price->product_in_num = 0;

                $price->save();
                // $purchase->save();

            }else{
                foreach($storeInventories as $storeInventory){
                    $storeInventoryId = $storeInventory->id;
                }

                $storeInventoryX = StoreInventory::find($storeInventoryId);

                $onHand = $storeInventoryX->onHand;
                $productIncoming = $storeInventoryX->productIncoming;
                $mrp = $storeInventoryX->mrp;
                $price = $storeInventoryX->price;

                $purchaseQuantity = (int)$product['quantity'];
                $purchaseMrp = doubleval($product['mrp']);
                $purchaseUnitPrice = doubleval($product['unitPrice']);

                $storeInventoryX->onHand = $onHand + $purchaseQuantity;
                $storeInventoryX->productIncoming = $productIncoming + $purchaseQuantity;

                if($mrp != $purchaseMrp || $price != $purchaseUnitPrice){

                    $price = new Price;
                    $price->product_id = $product['productId'];
                    $price->price = $product['unitPrice'];
                    $price->mrp = $product['mrp'];
                    $price->quantity = (int)$product['quantity'];
                    $price->subscriber_id = $subscriberId;
                    $price->store_id = $storeId;
                    $price->batch_number = $product['batchNumber'];
                    $price->product_in_num = 0;

                    $price->save();

                    $storeInventoryX->mrp = $purchaseMrp;
                    $storeInventoryX->price = $purchaseUnitPrice;
                    $storeInventoryX->save();
                }

                $storeInventoryX->save();
                // $purchase->save();
            }

        }


    }

    public function list(){
        $data = Product::join('inventories', 'products.id', 'inventories.productId')
        ->where('products.id', '>=', 13320)
        ->where('products.id', '<=', 15569)
        ->get();
        $array = [];

        foreach($data as $item){
            $arr = [
                'productId' => $item->id,
                'quantity' => 500,
                'unitPrice' => $item->price,
                'mrp' => $item->mrp,
                'batchNumber' => 0,

            ];

            $array[] = $arr;
        }


        return response() -> json([
            'status'=>200,
            'subscriberId' => 1,
            'storeName' => 'iNovex Pharma',
            'productList' => $array,
        ]);
    }
}
