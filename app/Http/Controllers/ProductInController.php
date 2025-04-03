<?php

namespace App\Http\Controllers;

use App\Models\Leaf;
use App\Models\Batch;
use App\Models\Price;
use App\Models\Store;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Models\StoreInventory;
use App\Models\ProductInHistory;
use Illuminate\Support\Facades\Auth;
use Log;
class ProductInController extends Controller
{
    public function index(){

        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $products = Product::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $batches = Batch::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $leaves = Leaf::where('subscriber_id', Auth::user()->subscriber_id)->get();

        return view('product/product-in', ['stores' => $stores, 'products' => $products, 'batches' => $batches, 'leaves' => $leaves]);
    }

    public function productIn(Request $request){
        log::info($request);
        foreach($request->productList as $product){
            if($product['storeId'] != "null"){
                $storeInventory = StoreInventory::where([
                                    ['store_id', '=', $product['storeId']],
                                    ['productId', '=', $product['productId']],
                                    ['batch_number', '=', $product['batchNumber']]
                                ])->get();


                if($storeInventory->isEmpty()){

                    $storeInventoryZ = StoreInventory::where([
                                    ['store_id', '=', $product['storeId']],
                                    ['productId', '=', $product['productId']]
                                ])->get();


                    foreach($storeInventoryZ as $storeInZ){
                        $storeId = $storeInZ->id;
                    }

                    $newStore = new StoreInventory;
                    if ($storeInventoryZ->isEmpty()!=1){
                    // log::info('Store@product');
                    $store = StoreInventory::find($storeId);

                    $onHand = $store->onHand;
                    $productIncoming = $store->productIncoming;
                    $mrp = $store->mrp;
                    $price = $store->price;
                    $batch = $store->batch_number;
                    $measuringType = $store->measuringType;
                    $newStore->measuringType = $measuringType;
                    }
                    else{
                        $mrp = 0;
                        $price = 0;
                    }

                    $newStore->onHand = $product['quantity'];
                    $newStore->productIncoming = $product['quantity'];
                    $newStore->safety_stock = $product['quantity'];
                    $newStore->mrp = $product['mrp'];
                    // $newStore->measuringType = $measuringType;
                    $newStore->price = $product['unitPrice'];
                    $newStore->productId = $product['productId'];
                    $newStore->store_id = $product['storeId'];

                    if($product['batchNumber'] == NULL){
                        $newStore->batch_number = 0;
                    }else{
                        $newStore->batch_number = $product['batchNumber'];
                    }

                    $newStore->save();

                    $history = new ProductInHistory;
                    $history->store = $product['storeId'];
                    $history->store_name = $product['store'];
                    $history->product = $product['productId'];
                    $history->product_name = $product['product'];
                    $history->quantity = $product['quantity'];
                    $history->unit_price = $product['unitPrice'];
                    $history->mrp = $product['mrp'];
                    $history->subscriber_id = Auth::user()->subscriber_id;
                    $history->user_id = Auth::user()->id;
                    $history->product_in_num = $product['productInNum'];
                    $history->batch_number = $product['batchNumber'];

                    $history->save();


                    if( $mrp != $product['mrp'] || $price != $product['unitPrice'] ){

                        $price = new Price;

                        $price->product_id = $product['productId'];
                        $price->price = $product['unitPrice'];
                        $price->mrp = $product['mrp'];
                        $price->quantity = $product['quantity'];
                        $price->store_id = $product['storeId'];
                        $price->subscriber_id = Auth::user()->subscriber_id;
                        $price->product_in_num = $product['productInNum'];
                        $price->batch_number = $product['batchNumber'];
                        $price->save();
                    }

                    // return response()->json([
                    //     'status' => 200,
                    //     'message' => 'Product-In successfully!',
                    // ]);

                }else{
                    foreach($storeInventory as $storeIn){
                        $storeId = $storeIn->id;
                    }

                    $store = StoreInventory::find($storeId);

                        $onHand = $store->onHand;
                        $productIncoming = $store->productIncoming;
                        $mrp = $store->mrp;
                        $price = $store->price;
                        $batch = $store->batch_number;
                        $measuringType = $store->measuringType;


                        // Log::info($batch);
                        // Log::info($product['batchNumber']);
                        // Log::info($product['batchNumber']);

                    if($batch == $product['batchNumber']){
                        $store->onHand = $product['quantity'] + $onHand;

                        $store->productIncoming = $product['quantity'] + $productIncoming;

                        $store->mrp = $product['mrp'];
                        $store->price = $product['unitPrice'];

                        $store->save();
                    }else{
                        $newStore = new StoreInventory;

                        $newStore->onHand = $product['quantity'];
                        $newStore->productIncoming = $product['quantity'];
                        $newStore->safety_stock = $product['quantity'];
                        $newStore->mrp = $product['mrp'];
                        $newStore->measuringType = $measuringType;
                        $newStore->price = $product['unitPrice'];
                        $newStore->productId = $product['productId'];
                        $newStore->store_id = $product['storeId'];

                        if($product['batchNumber'] == NULL){
                            $newStore->batch_number = 0;
                        }else{
                            $newStore->batch_number = $product['batchNumber'];
                        }


                        $newStore->save();

                    }


                    $history = new ProductInHistory;
                    $history->store = $product['storeId'];
                    $history->store_name = $product['store'];
                    $history->product = $product['productId'];
                    $history->product_name = $product['product'];
                    $history->quantity = $product['quantity'];
                    $history->unit_price = $product['unitPrice'];
                    $history->mrp = $product['mrp'];
                    $history->subscriber_id = Auth::user()->subscriber_id;
                    $history->user_id = Auth::user()->id;
                    $history->product_in_num = $product['productInNum'];
                    $history->batch_number = $product['batchNumber'];

                    $history->save();


                    if( $mrp != $product['mrp'] || $price != $product['unitPrice'] ){

                        $price = new Price;

                        $price->product_id = $product['productId'];
                        $price->price = $product['unitPrice'];
                        $price->mrp = $product['mrp'];
                        $price->quantity = $product['quantity'];
                        $price->store_id = $product['storeId'];
                        $price->subscriber_id = Auth::user()->subscriber_id;
                        $price->product_in_num = $product['productInNum'];
                        $price->batch_number = $product['batchNumber'];
                        $price->save();
                    }
                }

            }else{
                $inventorises = Inventory::where([
                                ['productId', '=', $product['productId'] ]
                            ])->get();

                foreach($inventorises as $inventory){
                    $inventoryId = $inventory->id;
                }

                $inventory = Inventory::find($inventoryId);

                    $onHand          = $inventory->onHand;
                    $productIncoming = $inventory->productIncoming;
                    $mrp             = $inventory->mrp;
                    $price           = $inventory->price;
                    $batch           = $inventory->batch_number;
                    $measuringType   = $inventory->measuringType;

                if($batch == $product['batchNumber']){
                        $inventory->onHand = $product['quantity'] + $onHand;
                        $inventory->productIncoming = $product['quantity'] + $productIncoming;
                        $inventory->mrp = $product['mrp'];
                        $inventory->price = $product['unitPrice'];

                        $inventory->save();
                    }else{
                        $inventory = new Inventory;

                        $inventory->onHand = $product['quantity'];
                        $inventory->productIncoming = $product['quantity'];
                        $inventory->mrp = $product['mrp'];
                        $inventory->measuringType = $measuringType;
                        $inventory->price = $product['unitPrice'];
                        $inventory->purchase_date = $product['date'];
                        $inventory->productId = $product['productId'];
                        $inventory->batch_number = $product['batchNumber'];
                        $inventory->subscriber_id = Auth::user()->subscriber_id;

                        $inventory->save();

                    }

                $history = new ProductInHistory;
                $history->store = 0;
                $history->store_name = "Inventory";
                $history->product = $product['productId'];
                $history->product_name = $product['product'];
                $history->quantity = $product['quantity'];
                $history->unit_price = $product['unitPrice'];
                $history->mrp = $product['mrp'];
                $history->subscriber_id = Auth::user()->subscriber_id;
                $history->user_id = Auth::user()->id;
                $history->product_in_num = $product['productInNum'];
                $history->batch_number = $product['batchNumber'];

                $history->save();

                if( $mrp != $product['mrp'] || $price != $product['unitPrice'] ){

                    $price = new Price;

                    $price->product_id = $product['productId'];
                    $price->price = $product['unitPrice'];
                    $price->mrp = $product['mrp'];
                    $price->quantity = $product['quantity'];
                    $price->store_id = 0;
                    $price->subscriber_id = Auth::user()->subscriber_id;
                    $price->product_in_num = $product['productInNum'];
                    $price->batch_number = $product['batchNumber'];

                    $price->save();

                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product-In successfully!',
        ]);

    }
}
