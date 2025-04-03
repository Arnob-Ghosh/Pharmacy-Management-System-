<?php

namespace App\Http\Controllers;

use DB;
use Log;
use Carbon\Carbon;
use App\Models\Store;

use App\Models\Product;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InventoryExpiredStockController extends Controller
{
    public function index(){
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('stock/inventory-expired-stock', ['stores' => $stores]);
    }

    public function expiredStockData(Request $request){
        $todayDate = Carbon::today();
        $data = DB::table("products")
            ->join('inventories', 'products.id', '=', 'inventories.productId')
            ->join('batches', 'inventories.batch_number', 'batches.batch_number')
            ->select("products.productName", "batches.batch_number", "batches.expiry_date", "inventories.onHand")
            ->where([
                ['inventories.subscriber_id', '=', Auth::user()->subscriber_id ],
                ['batches.subscriber_id', '=', Auth::user()->subscriber_id],
                ['batches.expiry_date', '<', $todayDate]
            ])
            ->get();

        return response()->json([
            'data' => $data,
            'message' => 'Success'
        ]);
    }
}
