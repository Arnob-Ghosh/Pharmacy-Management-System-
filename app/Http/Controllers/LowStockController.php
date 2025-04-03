<?php

namespace App\Http\Controllers;

use DB;
use Log;
use App\Models\Store;
use App\Models\Product;

use App\Models\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LowStockController extends Controller
{
    public function index(){
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('stock/low-stock', ['stores' => $stores]);
    }

    public function lowStockData(Request $request){

        $data = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->join('stores', 'store_inventories.store_id', 'stores.id')
            ->select("products.productName", "products.brand", "products.productLabel", "store_inventories.safety_stock", "store_inventories.onHand", "stores.store_name", "store_inventories.batch_number")
            ->where([
                ['store_inventories.created_by', '=', Auth::user()->subscriber_id ],
            ])
            ->whereRaw('store_inventories.safety_stock > store_inventories.onHand')
            ->get();

        return response()->json([
            'data' => $data,
            'message' => 'Success'
        ]);
    }

    public function lowStocStorekData(Request $request, $storeId){

        if($storeId == 'option_select'){
            $data = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->join('stores', 'store_inventories.store_id', 'stores.id')
                ->select("products.productName", "products.brand", "products.productLabel", "store_inventories.safety_stock", "store_inventories.onHand", "stores.store_name", "store_inventories.batch_number")
                ->where([
                    ['store_inventories.created_by', '=', Auth::user()->subscriber_id ]
                ])
                ->whereRaw('store_inventories.safety_stock > store_inventories.onHand')
                ->get();

            return response()->json([
                'data' => $data,
                'message' => 'Success'
            ]);
        }else{
            $data = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->join('stores', 'store_inventories.store_id', 'stores.id')
                ->select("products.productName", "products.brand", "products.productLabel", "store_inventories.safety_stock", "store_inventories.onHand", "stores.store_name", "store_inventories.batch_number")
                ->where([
                    ['store_inventories.created_by', '=', Auth::user()->subscriber_id ],
                    ['store_inventories.store_id', $storeId]
                ])
                ->whereRaw('store_inventories.safety_stock > store_inventories.onHand')
                ->get();

            return response()->json([
                'data' => $data,
                'message' => 'Success'
            ]);
        }

    }
}
