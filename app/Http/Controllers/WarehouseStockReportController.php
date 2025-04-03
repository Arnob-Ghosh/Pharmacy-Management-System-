<?php

namespace App\Http\Controllers;

use DB;
use Log;
use App\Models\Store;
use App\Models\Product;

use App\Models\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WarehouseStockReportController extends Controller
{
    public function index(){
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('stock/warehouse-stock', ['stores' => $stores]);
    }

    public function inventoryStockData(Request $request){

        $columns = array(
                    0 =>'productName',
                    1=> 'brand',
                    2=> 'mrp',
                    3=> 'price',
                    4=> 'totalProductIncoming',
                    5=> 'totalProductOutgoing',
                    6=> 'totalOnHand'
                );

        $totalData = DB::table("products")
                    ->join('inventories', 'products.id', '=', 'inventories.productId')
                    ->select(DB::raw("SUM(inventories.onHand) as totalOnHand"), DB::raw("SUM(inventories.productIncoming) as totalProductIncoming"),
                            DB::raw("SUM(inventories.productOutgoing) as totalProductOutgoing"), "inventories.productId", "inventories.mrp","inventories.price",
                            "products.productName", "products.brand",)
                    ->where([
                        ['inventories.subscriber_id', '=', Auth::user()->subscriber_id ]
                    ])
                    // ->groupBy("inventories.productId", "inventories.mrp","inventories.price",
                    //         "products.productName", "products.brand")
                    ->count();
        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if(empty($request->input('search.value'))){
            $products = DB::table("products")
                ->join('inventories', 'products.id', '=', 'inventories.productId')
                ->select(DB::raw("SUM(inventories.onHand) as totalOnHand"), DB::raw("SUM(inventories.productIncoming) as totalProductIncoming"),
                        DB::raw("SUM(inventories.productOutgoing) as totalProductOutgoing"), "inventories.productId", "inventories.mrp","inventories.price",
                        "products.productName", "products.brand",)
                ->where([['inventories.subscriber_id', '=', Auth::user()->subscriber_id ]])

                ->offset($start)
                ->limit($limit)
                ->groupBy("inventories.productId", "inventories.mrp","inventories.price",  "products.productName", "products.brand")
                ->get();

        }else{
            $search = $request->input('search.value');

            $products =  DB::table("products")
                    ->join('inventories', 'products.id', '=', 'inventories.productId')
                    ->select(DB::raw("SUM(inventories.onHand) as totalOnHand"), DB::raw("SUM(inventories.productIncoming) as totalProductIncoming"),
                            DB::raw("SUM(inventories.productOutgoing) as totalProductOutgoing"), "inventories.productId", "inventories.mrp","inventories.price",
                            "products.productName", "products.brand",)
                    ->where([['inventories.subscriber_id', '=', Auth::user()->subscriber_id ]])
                    ->where('inventories.productName','LIKE',"%{$search}%")
                    ->offset($start)
                    ->limit($limit)
                    // ->orderBy($order,$dir)
                    ->groupBy("inventories.productId", "inventories.mrp","inventories.price",
                            "products.productName", "products.brand")
                    ->get();

            $totalFiltered = DB::table("products")
                    ->join('inventories', 'products.id', '=', 'inventories.productId')
                    ->select(DB::raw("SUM(inventories.onHand) as totalOnHand"), DB::raw("SUM(inventories.productIncoming) as totalProductIncoming"),
                            DB::raw("SUM(inventories.productOutgoing) as totalProductOutgoing"), "inventories.productId", "inventories.mrp","inventories.price",
                            "products.productName", "products.brand",)
                    ->where([['inventories.subscriber_id', '=', Auth::user()->subscriber_id ]])
                    ->where('products.productName','LIKE',"%{$search}%")
                    ->groupBy("inventories.productId", "inventories.mrp","inventories.price", "products.productName", "products.brand")
                    ->count();
        }

         $data = array();

        if(!empty($products))
        {
            foreach ($products as $product)
            {
                $nestedData['productName'] = $product->productName;
                $nestedData['brand'] = $product->brand;
                $nestedData['mrp'] = $product->mrp;
                $nestedData['price'] = $product->price;
                $nestedData['totalProductIncoming'] = $product->totalProductIncoming;
                $nestedData['totalProductOutgoing'] = $product->totalProductOutgoing;
                $nestedData['totalOnHand'] = $product->totalOnHand;

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
    }
}
