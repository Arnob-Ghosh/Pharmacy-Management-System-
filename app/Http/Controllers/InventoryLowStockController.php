<?php

namespace App\Http\Controllers;

use DB;
use Log;
use App\Models\Store;
use App\Models\Product;

use App\Models\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InventoryLowStockController extends Controller
{
    public function index(){
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('stock/inventory-low-stock', ['stores' => $stores]);
    }

    public function lowStockData(Request $request){

        $data = DB::table("products")
            ->join('inventories', 'products.id', '=', 'inventories.productId')
            ->select("products.productName", "products.brand", "products.productLabel", "products.safety_stock", "inventories.onHand", "inventories.batch_number")
            ->where([
                ['inventories.subscriber_id', '=', Auth::user()->subscriber_id ]
            ])
            ->whereRaw('products.safety_stock > inventories.onHand')
            ->get();

        return response()->json([
            'data' => $data,
            'message' => 'Success'
        ]);
    }
}
