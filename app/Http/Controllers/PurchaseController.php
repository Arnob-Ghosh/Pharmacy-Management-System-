<?php

namespace App\Http\Controllers;

use Log;
use App\Models\User;
use App\Models\Batch;
use App\Models\Price;
use App\Models\Store;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Inventory;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Models\PurchaseReturn;
use App\Models\StoreInventory;
use App\Models\PurchaseProduct;
use App\Models\PurchaseProductList;
use Illuminate\Support\Facades\Auth;



class PurchaseController extends Controller
{
    public function create(){
        $products = Product::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $suppliers = Supplier::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $batches = Batch::where('subscriber_id', Auth::user()->subscriber_id)->get();


        // return $products;
        return view('purchase/purchase', ['products' => $products, 'suppliers' => $suppliers, 'stores' => $stores, 'batches' => $batches]);
    }

    public function store(Request $request){
        $purchaseProduct = new PurchaseProduct;
        $purchaseProduct->supplierId    = (int)$request->supplierId;
        $purchaseProduct->store         = $request->store;
        $purchaseProduct->poNumber      = doubleval($request->poNumber);
      
        $purchaseProduct->totalPrice    = doubleval($request->totalPrice);
        $purchaseProduct->discount      = doubleval($request->discount);
        $purchaseProduct->other_cost    = doubleval($request->otherCost);
        $purchaseProduct->grandTotal    = doubleval($request->grandTotal);

        $purchaseDateStr                = strtotime($request->purchaseDate);
        $purchaseProduct->purchaseDate  = date('Y-m-d', $purchaseDateStr);
        $purchaseProduct->purchaseNote  = $request->purchaseNote;
        $purchaseProduct->subscriber_id	= Auth::user()->subscriber_id;

        $purchaseProduct->save();

        foreach($request->productList as $product){
            $products = new PurchaseProductList;

            $products->productId             = (int)$product['productId'];
            $products->productName           = $product['productName'];
            $products->quantity              = (int)$product['quantity'];
            $products->unitPrice             = doubleval($product['unitPrice']);
            $products->mrp                   = doubleval($product['mrp']);
            $products->totalPrice            = doubleval($product['totalPrice']);
            $products->batch_number         = $product['batchNumber'];
            $products->purchaseProductId     = $purchaseProduct->id;

            $products->save();
        }

        return response() -> json([
            'status'=>200,
            'message' => 'Purchase created Successfully!'
        ]);
    }

    public function listView(Request $request){
        $purchase = PurchaseProduct::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $suppliers = Supplier::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('purchase/purchase-list', ['purchase' => $purchase], compact('suppliers'));
    }

    public function list(Request $request, $startdate, $enddate){

        // $purchase = PurchaseProduct::where('subscriber_id', Auth::user()->subscriber_id)->orderBy('created_at', 'desc')->get();
        $purchase = PurchaseProduct::join('suppliers', 'purchase_products.supplierId', '=', 'suppliers.id')
        ->whereBetween('purchase_products.purchaseDate', [$startdate, $enddate])
        ->where('purchase_products.subscriber_id', Auth::user()->subscriber_id)->orderBy('purchase_products.created_at', 'desc')
        ->get(['suppliers.name', 'purchase_products.*']);

        foreach ($purchase as $p) {
            $purchaseReturn = PurchaseReturn::where('po_no', $p->poNumber)->first();
            if ($purchaseReturn != null) {
                $p['purchaseReturn'] = $purchaseReturn;
            } else {
                $p['purchaseReturn'] = 0.00;
            }
        }
        if ($request->ajax()) {
            return response()->json([
                'purchase' => $purchase,
            ]);
        }
    }
    public function listData(Request $request, $supplier_id, $startdate, $enddate)
    {
        $purchase = PurchaseProduct::join('suppliers', 'purchase_products.supplierId', '=', 'suppliers.id')
        ->whereBetween('purchase_products.purchaseDate', [$startdate, $enddate])
            ->where(
                // ['purchase_products.subscriber_id', '=', Auth::user()->subscriber_id],
                // ['purchase_products.supplierId', '=', $supplier_id],
                'suppliers.id','=', $supplier_id
            )
            ->orderBy('purchase_products.created_at', 'desc')
            ->get(['suppliers.name', 'purchase_products.*']);


        foreach ($purchase as $p) {
            $purchaseReturn = PurchaseReturn::where('po_no', $p->poNumber)->first();
            if ($purchaseReturn != null) {
                $p['purchaseReturn'] = $purchaseReturn;
            } else {
                $p['purchaseReturn'] = 0.00;
            }
        }
        if ($request->ajax()) {
            return response()->json([
                'status' => 200,
                'purchase' => $purchase,
                'message' => 'Success!'
            ]);
        }
    }

    public function productListView(Request $request, $id){
        $productList = PurchaseProductList::where([
                    ['purchaseProductId', $id]
                ])
                ->get();
                $order_by=Subscriber::find(Auth::user()->subscriber_id);
        $purchaseList = PurchaseProduct::where([
                    ['id', $id],
                    ['subscriber_id', Auth::user()->subscriber_id]
                ])
                ->get();

        foreach($purchaseList as $purchase){
            $p =  $purchase->supplierId;
        }

        $supplier = Supplier::where('id', $p)->get();

         return view('purchase/purchaseproduct-list', ['productList' => $productList, 'purchaseList' => $purchaseList, 'supplier' => $supplier,'order_by'=>$order_by->org_name]);
    }

    public function productList(Request $request, $id){
        $productList = PurchaseProductList::where('purchaseProductId', $id)->get();
        $purchaseList = PurchaseProduct::where([
                    ['id', $id],
                    ['subscriber_id', Auth::user()->subscriber_id]
                ])
                ->get();


        foreach($purchaseList as $purchase){
            $p =  $purchase->supplierId;
        }

        $supplier = Supplier::where('id', $p)->get();

        if($request -> ajax()){
            return response()->json([
                'productList'=>$productList,

            ]);
        }


    }

    public function productEdit(Request $request, $id){
        $productList = PurchaseProductList::where('purchaseProductId', $id)->get();
        $purchaseList = PurchaseProduct::where('id', $id)->get();

        foreach($purchaseList as $purchase){
            $p =  $purchase->supplierId;
        }

        $supplier = Supplier::where('id', $p)->get();
        $suppliers = Supplier::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();

        if($request -> ajax()){
            return response()->json([
                'status'=>200,
                'purchaseList'=>$purchaseList,
                'productList'=>$productList,
                'supplier'=>$supplier,
            ]);
        }

        return view('purchase/purchaseproduct-edit', ['productList' => $productList, 'purchaseList' => $purchaseList, 'supplier' => $supplier, 'suppliers' => $suppliers, 'stores' => $stores]);

    }

    public function update(Request $request, $id){
        $purchaseProduct = PurchaseProduct::find($id);

        if ($request->subtotalprice > 0) {
            $purchaseProduct->supplierId        = $request->supplier;
            $purchaseProduct->store             = $request->store;
            $purchaseProduct->purchaseDate      = $request->purchasedate;
            $purchaseProduct->purchaseNote      = $request->note;

            $purchaseProduct->discount        = $request->discount;
            $purchaseProduct->other_cost        = $request->othercost;

            $purchaseProduct->totalPrice         = $request->subtotalprice;
            $purchaseProduct->grandTotal        = $request->grandtotalprice;

            $purchaseProduct->save();
        } else {
            $purchaseProduct->delete($id);
        }

        $purchaseProductList = PurchaseProductList::where('purchaseProductId', $id)->get(); //get purchase products using the purchase id
        // $purchaseList = PurchaseProduct::where('id', $id)->get('discount');

        // $total = 0;

        foreach ($purchaseProductList as $product) {                                          //getting individual products of purchase
            $pid = $product->id;                                                            //getting id of first product

            $ppl = PurchaseProductList::find($pid);                                         //finding the row of product using product id

            if ($request->input('editquantity' . $pid) == NULL &&  $request->input('edittotalprice' . $pid) == NULL) {
                $ppl->delete($pid);
            } else {
                $ppl->quantity      =   $request->input('editquantity' . $pid);
                $ppl->totalPrice    =   $request->input('totalprice' . $pid);

                // $total = $total + $request->input('edittotalprice'.$pid);                       //changing the total price with modified product price

                // $purchaseProduct->totalPrice = $total;

                // foreach($purchaseList as $purchase){                                            //getting discount from purchase list
                //     $dis =  $purchase->discount;
                // }

                // $purchaseProduct->grandTotal = $total - $dis + $purchaseProduct->other_cost;                                   //substracting discount from total price for calculating the grandTotal

                // $purchaseProduct->save();

                $ppl->save();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Updated Successfully'
        ]);
    }

    public function productReceive(Request $request, $id){
        $purchase = PurchaseProduct::find($id);
        $purchase->status = 'received';

        // Log::info($request->store);

        $storeName = $request->store;

        if($storeName =="Warehouse"){
            foreach($request->productList as $product){
                $productId = $product['productId'];
               // $batchNumber = $product['batchNumber'];
               // log::info($productId);
               // log::info($batchNumber);
                $inventories = Inventory::where([
                    ['productId', $productId],
                    //['batch_number', $batchNumber]
                ])->get();
                //log::info($inventories);

                foreach($inventories as $inventory){
                    $inventoryId = $inventory->id;

                }


                $inventoryX = Inventory::find($inventoryId);
                $onHand = $inventoryX->onHand;
                $productIncoming = $inventoryX->productIncoming;
                $mrp = $inventoryX->mrp;
                $price = $inventoryX->price;

                $purchaseQuantity = (int)$product['quantity'];
                $purchaseMrp = doubleval($product['mrp']);
                $purchaseUnitPrice = doubleval($product['unitPrice']);

                $inventoryX->onHand = $onHand + $purchaseQuantity;
                $inventoryX->productIncoming = $productIncoming + $purchaseQuantity;

                if($mrp != $purchaseMrp || $price != $purchaseUnitPrice){

                    $price = new Price;
                    $price->product_id = $product['productId'];
                    $price->price = $product['unitPrice'];
                    $price->mrp = $product['mrp'];
                    $price->quantity = (int)$product['quantity'];
                    $price->subscriber_id = Auth::user()->subscriber_id;
                    $price->store_id = 0;
                    $price->batch_number = $product['batchNumber'];
                    $price->product_in_num = 0;

                    $price->save();

                    $inventoryX->mrp = $purchaseMrp;
                    $inventoryX->price = $purchaseUnitPrice;
                    $inventoryX->save();
                }

                $inventoryX->save();
                $purchase->save();


            }
            // Log::info('Inventory '.$inventoryId);

        }else{
            $stores = Store::where('store_name', $storeName)->get();
            foreach($stores as $store){
                $storeId = $store->id;
            }

            foreach($request->productList as $product){
                $productId = $product['productId'];
                $batchNumber = $product['batchNumber'];

                if( $batchNumber == 0){
                    $storeInventories = StoreInventory::where([
                        ['productId', $productId],
                        ['store_id', $storeId],
                        ['batch_number', 0]
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
                        $price->subscriber_id = Auth::user()->subscriber_id;
                        $price->store_id = $storeId;
                        $price->batch_number = $product['batchNumber'];
                        $price->product_in_num = 0;

                        $price->save();
                        $purchase->save();

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
                            $price->subscriber_id = Auth::user()->subscriber_id;
                            $price->store_id = $storeId;
                            $price->batch_number = $product['batchNumber'];
                            $price->product_in_num = 0;

                            $price->save();

                            $storeInventoryX->mrp = $purchaseMrp;
                            $storeInventoryX->price = $purchaseUnitPrice;
                            $storeInventoryX->save();
                        }

                        $storeInventoryX->save();
                        $purchase->save();
                    }

                    // Log::info('batch0 '.$storeInventories);

                }else{

                    $storeInventories = StoreInventory::where([
                        ['productId', $productId],
                        ['store_id', $storeId],
                        ['batch_number', $batchNumber]
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
                        $price->subscriber_id = Auth::user()->subscriber_id;
                        $price->store_id = $storeId;
                        $price->batch_number = $product['batchNumber'];
                        $price->product_in_num = 0;

                        $price->save();
                        $purchase->save();

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
                            $price->subscriber_id = Auth::user()->subscriber_id;
                            $price->store_id = $storeId;
                            $price->batch_number = $product['batchNumber'];
                            $price->product_in_num = 0;

                            $price->save();

                            $storeInventoryX->mrp = $purchaseMrp;
                            $storeInventoryX->price = $purchaseUnitPrice;
                            $storeInventoryX->save();
                        }

                        $storeInventoryX->save();
                        $purchase->save();

                    }
                }

            }
        }

        return response() -> json([
            'status'=>200,
            'message' => 'Received Successfully'
        ]);
    }

    // public function productDetails(Request $request, $id){
    //     $products = Inventory::where([
    //             ['id', $id],
    //             ['subscriber_id', Auth::user()->subscriber_id]
    //         ])
    //         ->get();

    //         return response() -> json([
    //         'status'=>200,
    //         'products' => $products
    //     ]);
    // }
}
