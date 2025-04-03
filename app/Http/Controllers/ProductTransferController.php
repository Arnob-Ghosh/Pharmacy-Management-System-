<?php

namespace App\Http\Controllers;

use App\Models\Store;

use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Models\StoreInventory;
use Monolog\Handler\IFTTTHandler;


use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\File;
use App\Models\ProductTransferHistory;

class ProductTransferController extends Controller
{
    public function index(){

        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $products = Product::where('subscriber_id', Auth::user()->subscriber_id)->get();

        return view('product/product-transfer', ['stores' => $stores, 'products' => $products]);
    }

    public function productTransfer(Request $request){

        log::info($request);
  
        foreach($request->productList as $product){

            $fromStoreId = $product['fromStoreId'];
           // log::info($fromStoreId);
            $toStoreId = $product['toStoreId'];
           // log::info($toStoreId);
            if($fromStoreId == "inventory"){

                //FROM INVENTORY
                $productId = (int)$product['productId'];

                // $product = Product::where('id', $productId)->first();
                // $productName = $product->productName;

                $inventory = Inventory::where('productId', $productId)->where('subscriber_id', Auth::user()->subscriber_id)->first();

                $inventory = Inventory::find($inventory->id);

                $fromStoreMrp = $inventory->mrp;
                $fromStoreMeasuringType = $inventory->measuringType;
                $fromStorePrice = $inventory->price;


                $inventoryOnHand = $inventory->onHand;
                $productOutgoing = $inventory->productOutgoing;
                $check = $inventoryOnHand - (int)$product['quantity'];

                if($check >= 0 ){
                    $inventory->onHand = $inventoryOnHand - (int)$product['quantity'];
                    $inventory->productOutgoing = $productOutgoing + (int)$product['quantity'];
                }else{
                    return response()->json([
                        'status' => 200,
                        'message' => 'Inventory low! Please check your inventory then try again.',
                    ]);
                }

                $inventory->save();

                //TO STORE OR INVENTORY
                if($toStoreId == "inventory"){
                    $toProductId = (int)$product['productId'];
                    $toInventoryId = Inventory::where('productId', $toProductId)->where('subscriber_id', Auth::user()->subscriber_id)->first()->id;
                    $toInventory = Inventory::find($toInventoryId);
                    $toInventoryOnHand = $toInventory->onHand;
                    $toProductIncoming = $toInventory->productIncoming;

                    $toInventory->onHand = $toInventoryOnHand + (int)$product['quantity'];
                    $toInventory->productIncoming = $toProductIncoming + (int)$product['quantity'];
                    $toInventory->save();
                    $inventory->save();
                }else{
                    $toStores = StoreInventory::where([
                            ['store_id', '=', (int)$product['toStoreId']],
                            ['productId', '=', (int)$product['productId'] ],
                        ])->get();

                    if($toStores->isEmpty()){

                        $newStoreInventory = new StoreInventory;

                        $newStoreInventory->onHand = (int)$product['quantity'];
                        $newStoreInventory->productIncoming = (int)$product['quantity'];
                        $newStoreInventory->safety_stock = (int)$product['quantity'];
                        $newStoreInventory->mrp = $fromStoreMrp;
                        $newStoreInventory->measuringType = $fromStoreMeasuringType;
                        $newStoreInventory->price = $fromStorePrice;
                        $newStoreInventory->productId = (int)$product['productId'];
                        $newStoreInventory->store_id = (int)$product['toStoreId'];

                        $history = new ProductTransferHistory;

                        $history->from_store        = $product['fromStoreId'];
                        $history->to_store          = $product['toStoreId'];
                        $history->product           = $product['productId'];
                        $history->quantity          = $product['quantity'];
                        $history->subscriber_id     = Auth::user()->subscriber_id;
                        $history->user_id           = Auth::user()->id;

                        $history->save();
                        $newStoreInventory->save();
                        $inventory->save();

                        // return response()->json([
                        //     'status' => 200,
                        //     'message' => 'The product is transferd and added to the store '.$product['toStore'],
                        // ]);

                    }else{
                        foreach($toStores as $toStore){
                            $toStoreId = $toStore->id;
                        }

                        $toStoreFind = StoreInventory::find($toStoreId);

                        $toStoreOnHand = $toStoreFind->onHand;
                       // Log::info($toStoreOnHand);
                        $toProductIncoming = $toStoreFind->productIncoming;

                        $toStoreFind->onHand =  $toStoreFind->onHand + (int)$product['quantity'];
                        $toStoreFind->productIncoming = $toProductIncoming + (int)$product['quantity'];




                        //-----------------------------------------------------------
                        $history = new ProductTransferHistory;

                        $history->from_store        = $product['fromStoreId'];
                        $history->to_store          = $product['toStoreId'];
                        $history->product           = $product['productId'];
                        $history->quantity          = $product['quantity'];
                        $history->subscriber_id     = Auth::user()->subscriber_id;
                        $history->user_id           = Auth::user()->id;

                        $history->save();
                        $toStoreFind->save();
                        $inventory->save();
                    }

                }

            }else{

                //FROM STORE
                $fromStores = StoreInventory::where([
                            ['store_id', '=', (int)$product['fromStoreId']],
                            ['productId', '=', (int)$product['productId']]
                        ])->get();

                if($fromStores->isEmpty()){
                    return response()->json([
                        'status' => 200,
                        'message' => 'No product in '.$product['fromStore'].'! Please add the product in your store to transfer.',
                    ]);
                }else{

                    foreach($fromStores as $fromStore){
                        $fromStoreId = $fromStore->id;
                    }

                    $fromStoreFind = StoreInventory::find($fromStoreId);

                    $fromStoreOnhand = $fromStoreFind->onHand;
                    $fromProductOutgoing = $fromStoreFind->productOutgoing;

                    // Log::info($fromStoreOnhand);

                    if($fromStoreOnhand == 0 || $fromStoreOnhand < (int)$product['quantity']){
                        return response()->json([
                            'status' => 200,
                            'message' => 'Inventory low! Please check your inventory then try again.',
                        ]);
                    }else{
                        $fromStoreMrp           = $fromStoreFind->mrp;
                        $fromStoreMeasuringType = $fromStoreFind->measuringType;
                        $fromStorePrice         = $fromStoreFind->price;

                        $fromStoreFind->onHand =  $fromStoreOnhand - (int)$product['quantity'];
                        $fromStoreFind->productOutgoing =  $fromProductOutgoing + (int)$product['quantity'];

                        // $fromStoreFind->save();


                        //TO STORE OR INVENTORY
                        if($toStoreId == "inventory"){
                            $toProductId = (int)$product['productId'];
                            $toInventoryId = Inventory::where('productId', $toProductId)->first()->id;
                            $toInventory = Inventory::find($toInventoryId);
                            $toInventoryOnHand = $toInventory->onHand;
                            $toIncoming = $toInventory->productIncoming;
                            $toInventory->onHand = $toInventoryOnHand + (int)$product['quantity'];
                            $toInventory->productIncoming = $toIncoming + (int)$product['quantity'];

                            $fromStoreFind->save();
                            $toInventory->save();
                        }else{
                            $toStores = StoreInventory::where([
                                    ['store_id', '=', (int)$product['toStoreId']],
                                    ['productId', '=', (int)$product['productId'] ]
                                ])->get();

                            if($toStores->isEmpty()){
                                // Log::info('Empty');

                                $newStoreInventory = new StoreInventory;

                                $newStoreInventory->onHand = (int)$product['quantity'];
                                $newStoreInventory->productIncoming = (int)$product['quantity'];
                                // $newStoreInventory->safety_stock = (int)$product['quantity'];
                                $newStoreInventory->mrp = $fromStoreMrp;
                                $newStoreInventory->measuringType = $fromStoreMeasuringType;
                                $newStoreInventory->price = $fromStorePrice;
                                $newStoreInventory->productId = (int)$product['productId'];
                                $newStoreInventory->store_id = (int)$product['toStoreId'];




                                $history = new ProductTransferHistory;

                                $history->from_store        = $product['fromStoreId'];
                                $history->to_store          = $product['toStoreId'];
                                $history->product           = $product['productId'];
                                $history->quantity          = $product['quantity'];
                                $history->subscriber_id     = Auth::user()->subscriber_id;
                                $history->user_id           = Auth::user()->id;

                                $history->save();
                                $fromStoreFind->save();
                                $newStoreInventory->save();

                                // return response()->json([
                                //     'status' => 200,
                                //     'message' => 'Product Transfered and added successfully!',
                                // ]);

                            }else{
                                // Log::info('Not empty');

                                foreach($toStores as $toStore){
                                    $toStoreId = $toStore->id;
                                }

                                $toStoreFind = StoreInventory::find($toStoreId);
                                $toStoreOnhand = $toStoreFind->onHand;
                                $toProductIncomingX = $toStoreFind->productIncoming;
                                $toStoreFind->onHand =  $toStoreOnhand + (int)$product['quantity'];
                                $toStoreFind->productIncoming =  $toProductIncomingX + (int)$product['quantity'];



                                $history = new ProductTransferHistory;

                                $history->from_store        = $product['fromStoreId'];
                                $history->to_store          = $product['toStoreId'];
                                $history->product           = $product['productId'];
                                $history->quantity          = $product['quantity'];
                                $history->subscriber_id     = Auth::user()->subscriber_id;
                                $history->user_id           = Auth::user()->id;

                                $fromStoreFind->save();
                                $history->save();
                                $toStoreFind->save();
                            }
                        }
                    }
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product Transfered successfully!',
        ]);

    }

    function transferallproducts($from, $to){

        $fromStore = Store::find($from);
        $toStore = Store::find($to);

        if (isset($fromStore) && isset($toStore))
        {
            $fromStoreProducts = StoreInventory::where('store_id',$from)->get();
            if(isset($fromStoreProducts))
            {
                $toStoreProducts = StoreInventory::where('store_id',$to)->get();
                if(isset($toStoreProducts[0]))
                {
                    foreach ($fromStoreProducts as $fromStoreProduct) {

                        $newStoreInventory = StoreInventory::where([
                            ['store_id', $to],
                            ['productId', $fromStoreProduct->productId],
                            ['batch_number', $fromStoreProduct->batch_number],
                        ])->first();
                        if(isset($newStoreInventory))
                        {
                            //log::info('has product');
                            $newStoreInventory->onHand = $newStoreInventory->onHand + $fromStoreProduct->onHand;
                            $newStoreInventory->productIncoming = $newStoreInventory->productIncoming + $fromStoreProduct->onHand;
                            $newStoreInventory->safety_stock = $fromStoreProduct->safety_stock;
                            $newStoreInventory->mrp = $fromStoreProduct->mrp;
                            $newStoreInventory->measuringType = $fromStoreProduct->measuringType;
                            $newStoreInventory->price = $fromStoreProduct->price;
                            $newStoreInventory->save();
                        }
                        else{
                            // log::info('create product');

                            $newStoreInventory = new StoreInventory;
                            $newStoreInventory->onHand = $fromStoreProduct->onHand;
                            $newStoreInventory->productIncoming = $fromStoreProduct->onHand;
                            $newStoreInventory->safety_stock = $fromStoreProduct->safety_stock;
                            $newStoreInventory->mrp = $fromStoreProduct->mrp;
                            $newStoreInventory->measuringType = $fromStoreProduct->measuringType;
                            $newStoreInventory->price = $fromStoreProduct->price;
                            $newStoreInventory->productId = $fromStoreProduct->productId;
                            $newStoreInventory->store_id = $to;
                            $newStoreInventory->batch_number = $fromStoreProduct->batch_number;
                            $newStoreInventory->save();
                        }

                        $StoreProduct = StoreInventory::where([
                            ['store_id', $from],
                            ['productId', $fromStoreProduct->productId],
                            ['batch_number', $fromStoreProduct->batch_number],
                        ])->first();
                        $StoreProduct->onHand = 0;
                        $StoreProduct->productOutgoing = $StoreProduct->productOutgoing + $fromStoreProduct->onHand;
                        $StoreProduct->save();

                       
                    }
                }
                else
                {
                    // log::info('new store');
                    foreach($fromStoreProducts as $fromStoreProduct)
                    {
                    // log::info($fromStoreProduct);

                    $newStoreInventory = new StoreInventory;
                    $newStoreInventory->onHand = $fromStoreProduct->onHand;
                    $newStoreInventory->productIncoming = $fromStoreProduct->onHand;
                    $newStoreInventory->safety_stock = $fromStoreProduct->safety_stock;
                    $newStoreInventory->mrp = $fromStoreProduct->mrp;
                    $newStoreInventory->measuringType = $fromStoreProduct->measuringType;
                    $newStoreInventory->price = $fromStoreProduct->price;
                    $newStoreInventory->productId = $fromStoreProduct->productId;
                    $newStoreInventory->store_id = $to;
                    $newStoreInventory->batch_number = $fromStoreProduct->batch_number;
                    $newStoreInventory->save();

                    $StoreProduct = StoreInventory::where([
                        ['store_id', $from],
                        ['productId', $fromStoreProduct->productId],
                        ['batch_number', $fromStoreProduct->batch_number],
                    ])->first();
                    $StoreProduct->onHand = 0;
                    $StoreProduct->productOutgoing = $StoreProduct->productOutgoing + $fromStoreProduct->onHand;
                    $StoreProduct->save();

                  
                    }
                }
                return response()->json([
                    'status' => 200,
                    'message' => 'Product Transfered Successfully!',
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Store has no Product to Transfered!',
            ]);
        }
        else{
        return response()->json([
            'status' => 200,
            'message' => 'Product Transfered Failed!',
        ]);
    }
    }
    function transferallfrominventory($to)
    {
        ini_set('max_execution_time', 500);
        $toStore = Store::find($to);

        if (isset($toStore)) {
            $fromStoreProducts = Inventory::all();
            if (isset($fromStoreProducts)) {
                $toStoreProducts = StoreInventory::where('store_id', $to)->get();
                if (isset($toStoreProducts[0])) {
                    // log::info('old store');
                    foreach ($fromStoreProducts as $fromStoreProduct) {

                        $newStoreInventory = StoreInventory::where([
                            ['store_id', $to],
                            ['productId', $fromStoreProduct->productId],
                            ['batch_number', $fromStoreProduct->batch_number],
                        ])->first();
                        if (isset($newStoreInventory)) {
                            // log::info('has product');
                            $newStoreInventory->onHand = $newStoreInventory->onHand + $fromStoreProduct->onHand;
                            $newStoreInventory->productIncoming = $newStoreInventory->productIncoming + $fromStoreProduct->onHand;
                            $newStoreInventory->safety_stock = 50;
                            $newStoreInventory->mrp = $fromStoreProduct->mrp;
                            $newStoreInventory->measuringType = $fromStoreProduct->measuringType;
                            $newStoreInventory->price = $fromStoreProduct->price;
                            $newStoreInventory->save();
                        } else {
                            // log::info('create product');

                            $newStoreInventory = new StoreInventory;
                            $newStoreInventory->onHand = $fromStoreProduct->onHand;
                            $newStoreInventory->productIncoming = $fromStoreProduct->onHand;
                            $newStoreInventory->safety_stock = $fromStoreProduct->safety_stock;
                            $newStoreInventory->mrp = $fromStoreProduct->mrp;
                            $newStoreInventory->measuringType = $fromStoreProduct->measuringType;
                            $newStoreInventory->price = $fromStoreProduct->price;
                            $newStoreInventory->productId = $fromStoreProduct->productId;
                            $newStoreInventory->store_id = $to;
                            $newStoreInventory->batch_number = $fromStoreProduct->batch_number;
                            $newStoreInventory->save();
                        }

                        $StoreProduct = Inventory::where([
                            ['productId', $fromStoreProduct->productId],
                            ['batch_number', $fromStoreProduct->batch_number],
                        ])->first();
                        $StoreProduct->onHand = 0;
                        $StoreProduct->productOutgoing = $StoreProduct->productOutgoing + $fromStoreProduct->onHand;
                        $StoreProduct->save();

                        
                    }
                } else {
                    // log::info('new store');
                    foreach ($fromStoreProducts as $fromStoreProduct) {
                        // log::info($fromStoreProduct);

                        $newStoreInventory = new StoreInventory;
                        $newStoreInventory->onHand = $fromStoreProduct->onHand;
                        $newStoreInventory->productIncoming = $fromStoreProduct->onHand;
                        $newStoreInventory->safety_stock = $fromStoreProduct->safety_stock;
                        $newStoreInventory->mrp = $fromStoreProduct->mrp;
                        $newStoreInventory->measuringType = $fromStoreProduct->measuringType;
                        $newStoreInventory->price = $fromStoreProduct->price;
                        $newStoreInventory->productId = $fromStoreProduct->productId;
                        $newStoreInventory->store_id = $to;
                        $newStoreInventory->batch_number = $fromStoreProduct->batch_number;
                        $newStoreInventory->save();

                        $StoreProduct = Inventory::where([
                            ['productId', $fromStoreProduct->productId],
                            ['batch_number', $fromStoreProduct->batch_number],
                        ])->first();
                        $StoreProduct->onHand = 0;
                        $StoreProduct->productOutgoing = $StoreProduct->productOutgoing + $fromStoreProduct->onHand;
                        $StoreProduct->save();

                       
                    }
                }
                return response()->json([
                    'status' => 200,
                    'message' => 'Product Transfered Successfully!',
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Store has no Product to Transfered!',
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'Product Transfered Failed!',
            ]);
        }
    }

    public function storeWiseData(Request $request, $productId, $storeId)
    {
        $product=Product::find($productId);
        if($storeId=='inventory'){
            $data = Inventory::join('batches', 'inventories.productId')
            ->select('inventories.batch_number')
            ->where([
                ['batches.subscriber_id', Auth::user()->subscriber_id],
                ['inventories.productId', $productId],
                ['inventories.onHand', '>', 0]
            ])
                ->distinct()
                ->get();


            // Log::info($data);
            return response()->json([
                'data' => $data,
                'type' => $product->type,
                'barcode' => $product->barcode,
                'message' => 'Success'
            ]);
        }
        else
        {
            $data = StoreInventory::join('batches', 'store_inventories.productId', 'batches.product_id')
            ->select('store_inventories.batch_number')
            ->where([
                ['batches.subscriber_id', Auth::user()->subscriber_id],
                ['store_inventories.productId', $productId],
                ['store_inventories.store_id', $storeId],
                ['store_inventories.onHand', '>', 0]
            ])
                ->distinct()
                ->get();

            // Log::info($data);
            return response()->json([
                'data' => $data,
                'type' => $product->type,
                'barcode' => $product->barcode,
                'message' => 'Success'
            ]);
        }
    }
}
