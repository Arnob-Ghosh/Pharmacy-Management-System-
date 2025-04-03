<?php

namespace App\Http\Controllers;

use DB;

use Log;
use App\Models\Order;
use App\Models\Client;
use App\Models\Inventory;

use App\Models\SalesReturn;
use Illuminate\Http\Request;

use App\Models\StoreInventory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SalesReturnController extends Controller
{
    public function create(){
        $orders = Order::where([['subscriber_id', Auth::user()->subscriber_id]])->get()->unique('orderId');
        // log::info($orders);
        return view('sales-return/sales-return-add', ['orders' => $orders]);
    }

    public function search(Request $request, $invoiceno){

        $data = Order::join('ordered_products', 'orders.id', 'ordered_products.orderId')
        ->where([
                ['orders.orderId', $invoiceno],
                ['orders.subscriber_id', Auth::user()->subscriber_id]
            ])
        ->get();

        $data2 = Order::join('ordered_products', 'orders.id', 'ordered_products.orderId')
        ->join('products', 'ordered_products.productId', 'products.id')
        ->where([
                ['orders.orderId', $invoiceno],
                ['orders.subscriber_id', Auth::user()->subscriber_id]
            ])
        ->select('products.freeItemName', 'products.requiredQuantity', 'products.freeQuantity', 'products.productName', 'products.offerItemId')
        ->get();


        foreach($data as $item){
            $clientId = $item->clientId;
        }

        if($clientId != 0){
            $client = Client::where('id', $clientId)->first();
            $clientName = $client->name;
            $clientId = $client->id;

            return response()->json([
                'status' => 200,
                'data'=> $data,
                'data2'=> $data2,
                'clientName'=> $clientName,
                'clientId'=> $clientId,
                'message' => 'Success'
            ]);
        }

        return response()->json([
                'status' => 200,
                'data'=> $data,
                'data2'=> $data2,
                'message' => 'Success'
            ]);

    }

    public function detailsView($orderId){
        return view('sales-return/sales-return-details');
    }

    public function store(Request $request){
                    Log::info($request);

            $checkReturn = SalesReturn::where([
                    ['invoice_no', $request->invoiceNo],
                    ['subscriber_id', Auth::user()->subscriber_id]
                ])
            ->get();

            if($checkReturn->isEmpty()){
                foreach($request->productList as $product){

                    // Log::info('Ok');
                    if((int)$product['returnQty'] > 0){

                        $sales_return = new SalesReturn;
                        $sales_return->invoice_no = $request->invoiceNo;
                        $sales_return->net_return = doubleval($request->netReturn);
                        $sales_return->total_tax_return = doubleval($request->totalTax);
                        $sales_return->total_deduction = doubleval($request->totalDeduction);
                        $sales_return->product_id = (int)$product['productId'];
                        $sales_return->product_name = $product['productName'];
                        $sales_return->return_qty = (int)$product['returnQty'];
                        $sales_return->price = doubleval($product['price']);
                        $sales_return->tax_return = doubleval($product['taxAmount']);
                        $sales_return->deduction = doubleval($product['deductionAmount']);
                        $sales_return->note = $request->note;
                        $sales_return->subscriber_id = Auth::user()->subscriber_id;
                        $sales_return->user_id = Auth::user()->id;
                        $sales_return->store_id = (int)$request->storeId;
                        $sales_return->return_number = $request->returnNumber;

                        $storeId = (int)$request->storeId;
                        $productId = (int)$product['productId'];
                        if($storeId ==0)
                        {
                            $inventories = Inventory::where([
                                ['productId', '=', (int)$product['productId']],
                            ])
                            ->orderBy('created_at', 'desc')
                            ->first();
                            $onHand = $inventories->onHand;
                            $productOutgoing = $inventories->productOutgoing;
                            $inventory = Inventory::find($inventories->id);
                            $inventory->onHand = $onHand + doubleval($product['returnQty']);
                            $inventory->productOutgoing = $productOutgoing - doubleval($product['returnQty']);

                            $inventory->save();
                            $sales_return->save();

                        }
                        else{
                        $store_inventories = StoreInventory::where([
                                            ['store_id', '=', $storeId],
                                            ['productId', '=', $productId]
                                        ])
                                        ->orderBy('created_at', 'desc')
                                        ->first();
                        // Log::info($store_inventories);
                        $onHand = $store_inventories->onHand;
                        $productOutgoing = $store_inventories->productOutgoing;
                        $store_inventory = StoreInventory::find($store_inventories->id);
                        $store_inventory->onHand = $onHand + (int)$product['returnQty'];

                        if($productOutgoing > (int)$product['returnQty']){
                            $store_inventory->productOutgoing = $productOutgoing - (int)$product['returnQty'];
                        }
                        $store_inventory->save();
                        $sales_return->save();
                    }
                    }

                }

            return response() -> json([
                    'status'=>200,
                    'message' => 'Return successfully.'
                ]);

            }else{
                return response() -> json([
                    'status'=>200,
                    'message' => 'Already returned.'
                ]);
            }
    }

    public function listView(){
        return view('sales-return/sales-return-list');
    }

    public function list(Request $request){
        $data = SalesReturn::where('subscriber_id', Auth::user()->subscriber_id)->orderBy('created_at','desc')->get()->unique('return_number');
        // $data = SalesReturn::crossjoin('orders', 'sales_returns.invoice_no', 'orders.orderId')
        // ->crossjoin('clients', 'orders.clientId', 'clients.id')
        // ->select('sales_returns.*', 'clients.name', 'clients.mobile')
        // ->where('sales_returns.subscriber_id', Auth::user()->subscriber_id)->get()->unique('sales_returns.return_number');

         $x = [];
        foreach($data as $item){
            $y = [
                'id' => $item->id,
                'invoice_no' => $item->invoice_no,
                'net_return' => $item->net_return,
                'total_tax_return' => $item->total_tax_return,
                'total_deduction' => $item->total_deduction,
                'product_id' => $item->product_id,
                'product_name' => $item->product_name,
                'return_qty' => $item->return_qty,
                'price' => $item->price,
                'tax_return' => $item->tax_return,
                'deduction' => $item->deduction,
                'note' => $item->note,
                'subscriber_id' => $item->subscriber_id,
                'user_id' => $item->user_id,
                'store_id' => $item->store_id,
                'return_number' => $item->return_number,

            ];

            $x[] = $y;
        }

        if($request -> ajax()){
            return response()->json([
                'data'=>$x,
                'message'=>'Success'
            ]);
        }
    }

    public function details(Request $request, $returnNumber){

        // $data = SalesReturn::where([['return_number', $returnNumber],['subscriber_id', Auth::user()->subscriber_id]])->first();

        $returnProducts = SalesReturn::where([['return_number', $returnNumber],['subscriber_id', Auth::user()->subscriber_id]])->get();
        // log::info($returnProducts);
        $data = Order::join('sales_returns', 'orders.orderId', 'sales_returns.invoice_no')
        ->leftJoin('clients', 'orders.clientId', 'clients.id')
        ->select('sales_returns.*', 'clients.name', 'clients.mobile')
        ->where([
            ['sales_returns.return_number', $returnNumber],
            ['sales_returns.subscriber_id', Auth::user()->subscriber_id]
        ])
        ->first();

        $name = 'Walking Customer';
        $mobile = 'N/A';
        if(!is_null($data->name) ==1) {
            $name = $data->name;
        }
        if (!is_null($data->mobile) == 1) {
            $mobile = $data->mobile;
        }

        // log::info($name);

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'returnProducts'=>$returnProducts,
            ]);
        }

        return view('sales-return/sales-return-details', ['data' => $data, 'name' => $name, 'mobile' => $mobile]);
        // return View::make('sales-return.sales-return-details', compact('data'))->render();
    }
}
