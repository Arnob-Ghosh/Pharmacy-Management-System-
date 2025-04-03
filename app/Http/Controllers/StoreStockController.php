<?php

namespace App\Http\Controllers;

use DB;
use Log;
use App\Models\Store;
use App\Models\Product;
use App\Models\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreStockController extends Controller
{
    public function index(){

        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('stock/store-stock', ['stores' => $stores]);
    }

    public function price($id){
        if($id==0)
        {
        $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price")
                    ->where([
                        // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                        ['store_inventories.store_id', '=', Auth::user()->store_id]
                        ])
                    ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
                    ->get();
        $totalSellingPrice=0;
        $totalPurchasePrice=0;
        foreach($products as $product)
        {
            $totalSellingPrice=$totalSellingPrice + $product->totalOnHand*$product->mrp;
            $totalPurchasePrice=$totalPurchasePrice + $product->totalOnHand*$product->price;
        }
        return ['totalSellingPrice' => $totalSellingPrice, 'totalPurchasePrice' => $totalPurchasePrice];
        }
        else{
            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price")
                    ->where([
                        // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                        ['store_inventories.store_id', '=', $id]
                        ])
                    ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
                    ->get();
        $totalSellingPrice=0;
        $totalPurchasePrice=0;
        foreach($products as $product)
        {
            $totalSellingPrice=$totalSellingPrice + $product->totalOnHand*$product->mrp;
            $totalPurchasePrice=$totalPurchasePrice + $product->totalOnHand*$product->price;
        }
        return ['totalSellingPrice' => $totalSellingPrice, 'totalPurchasePrice' => $totalPurchasePrice];
    }
    }
    public function storeStockDataDefault(Request $request){
        // $defaultStore = Store::where('subscriber_id', Auth::user()->subscriber_id)->first();

        $columns = array(
            0 => 'productName',
            1 => 'brand',
            2 => 'mrp',
            3 => 'price',
            4 => 'totalProductIncoming',
            5 => 'totalProductOutgoing',
            6 => 'totalOnHand'
        );

    $totalData = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                    DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                    "products.productName", "products.brand",)
            ->where([
                // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                // ['store_inventories.store_id', $defaultStore->id],
                ['store_inventories.store_id', Auth::user()->store_id]
            ])
            // ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price",
            //         "products.productName", "products.brand")
            ->count();
    $totalFiltered = $totalData;

    $limit = $request->input('length');
    $start = $request->input('start');
    $order = $columns[$request->input('order.0.column')];
    $dir = $request->input('order.0.dir');

    if(empty($request->input('search.value'))){
        $products = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                    DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                    "products.productName", "products.brand",)
            ->where([
                // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                // ['store_inventories.store_id', $defaultStore->id],
                ['store_inventories.store_id', Auth::user()->store_id]
            ])
            ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
            ->offset($start)
            ->limit($limit)
            ->get();

    }else{
        $search = $request->input('search.value');

        $products = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                    DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                    "products.productName", "products.brand",)
            ->where([
                // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                // ['store_inventories.store_id', $defaultStore->id],
                ['store_inventories.store_id', Auth::user()->store_id]
            ])
            ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
            ->where('products.productName','LIKE',"%{$search}%")
            ->offset($start)
            ->limit($limit)
            // ->orderBy($order,$dir)
            ->get();

        $totalFiltered = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                        DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                        "products.productName", "products.brand",)
                ->where([
                    // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                    // ['store_inventories.store_id', $defaultStore->id],
                    ['store_inventories.store_id', Auth::user()->store_id]
                ])
                ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
                ->where('products.productName','LIKE',"%{$search}%")
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

    public function storeStockData(Request $request, $storeId){

        $columns = array(
                0 => 'productName',
                1 => 'brand',
                2 => 'mrp',
                3 => 'price',
                4 => 'totalProductIncoming',
                5 => 'totalProductOutgoing',
                6 => 'totalOnHand'
            );

        $totalData = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                        DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                        "products.productName", "products.brand",)
                ->where([
                    // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                    ['store_inventories.store_id', $storeId]
                ])
                // ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                //         "products.productName", "products.brand")
                ->count();
        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if(empty($request->input('search.value'))){
            $products = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                        DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                        "products.productName", "products.brand",)
                ->where([
                    // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                    ['store_inventories.store_id', $storeId]
                ])
                ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
                ->offset($start)
                ->limit($limit)
                ->get();

        }else{
            $search = $request->input('search.value');

            $products = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                        DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                        "products.productName", "products.brand",)
                ->where([
                    // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                    ['store_inventories.store_id', $storeId]
                ])
                ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
                ->where('products.productName','LIKE',"%{$search}%")
                ->offset($start)
                ->limit($limit)
                // ->orderBy($order,$dir)
                ->get();

            $totalFiltered = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), DB::raw("SUM(store_inventories.productIncoming) as totalProductIncoming"),
                            DB::raw("SUM(store_inventories.productOutgoing) as totalProductOutgoing"), "store_inventories.productId", "store_inventories.mrp","store_inventories.price",
                            "products.productName", "products.brand",)
                    ->where([
                        // ['products.subscriber_id', '=', Auth::user()->subscriber_id ],
                        ['store_inventories.store_id', $storeId]
                    ])
                    ->groupBy("store_inventories.productId", "store_inventories.mrp","store_inventories.price", "products.productName", "products.brand")
                    ->where('products.productName','LIKE',"%{$search}%")
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
