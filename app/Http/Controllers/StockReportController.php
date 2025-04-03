<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Batch;
use App\Models\Store;
use App\Models\Product;
use App\Models\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockReportController extends Controller
{
    public function index(){

        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('report/stock-report', ['stores' => $stores]);
    }

    public function inventoryStockData(Request $request){

        // $data = Product::join('inventories', 'products.id', 'inventories.productId')
        //         ->where('products.subscriber_id', Auth::user()->subscriber_id)
        //         ->get();


        $columns = array(
                    0 =>'productName',
                    1 =>'batch_number',
                    2=> 'expiry_date',
                    3=> 'brand',
                    4=> 'mrp',
                    5=> 'price',
                    6=> 'productIncoming',
                    7=> 'productOutgoing',
                    8=> 'onHand'
                );

        $totalData = Product::join('inventories', 'products.id', 'inventories.productId')
                    ->where('inventories.subscriber_id', Auth::user()->subscriber_id)
                    ->count();
        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if(empty($request->input('search.value'))){
            $products = Product::join('inventories', 'products.id', 'inventories.productId')
                ->where('inventories.subscriber_id', Auth::user()->subscriber_id)
                ->offset($start)
                ->limit($limit)
                ->get();

        }else{
            $search = $request->input('search.value');

            $products =  Product::join('inventories', 'products.id', 'inventories.productId')
                    ->where('inventories.subscriber_id', Auth::user()->subscriber_id)
                    ->where('products.productName','LIKE',"%{$search}%")
                    ->offset($start)
                    ->limit($limit)
                    // ->orderBy($order,$dir)
                    ->get();

            $totalFiltered = Product::join('inventories', 'products.id', 'inventories.productId')
                            ->where('inventories.subscriber_id', Auth::user()->subscriber_id)
                            ->where('products.productName','LIKE',"%{$search}%")
                            ->count();
        }
        $data = array();

        if(!empty($products))
        {
            foreach ($products as $product)
            {
                if($product->batch_number!=0){
                    $batch = Batch::where('batch_number',$product->batch_number)->first();
                    $productBatch = $batch->expiry_date;
                }
                else{
                    $productBatch = 'N/A';
                }
                $nestedData['productName'] = $product->productName;
                $nestedData['batch_number'] = $product->batch_number;
                $nestedData['expiry_date'] = $productBatch;
                $nestedData['brand'] = $product->brand;
                $nestedData['mrp'] = $product->mrp;
                $nestedData['price'] = $product->price;
                $nestedData['productIncoming'] = $product->productIncoming;
                $nestedData['productOutgoing'] = $product->productOutgoing;
                $nestedData['onHand'] = $product->onHand;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
                    "draw"            => intval($request->input('draw')),
                    "recordsTotal"    => intval($totalData),
                    "recordsFiltered" => intval($totalFiltered),
                    "data"            => $data
                );

        return json_encode( $json_data);

        // return response()->json([
        //     'data' => $data,
        //     'message' => 'Success'
        // ]);
    }
}
