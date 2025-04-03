<?php

namespace App\Http\Controllers;

use Log;
use Carbon\Carbon;
use App\Models\Store;
use App\Models\Product;

use App\Models\Inventory;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ExpiredStockController extends Controller
{
    public function index()
    {
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('stock/expired-stock', ['stores' => $stores]);
    }

    public function expiredStockData(Request $request)
    {

        $todayDate = Carbon::today();

        $data = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->join('stores', 'store_inventories.store_id', 'stores.id')
            ->join('batches', 'store_inventories.batch_number', 'batches.batch_number')
            ->select(
                "products.productName",
                "batches.batch_number",
                "batches.expiry_date",
                "store_inventories.onHand",
                "stores.store_name"
            )
            ->where([
                ['store_inventories.created_by', '=', Auth::user()->subscriber_id],
                ['batches.subscriber_id', '=', Auth::user()->subscriber_id],
                ['batches.expiry_date', '<', $todayDate]
            ])
            ->get();

        return response()->json([
            'data' => $data,
            'message' => 'Success'
        ]);
    }

    public function expiredStoreStockData(Request $request, $storeId)
    {

        $todayDate = Carbon::today();

        if ($storeId == 'option_select') {
            $data = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->join('stores', 'store_inventories.store_id', 'stores.id')
                ->join('batches', 'store_inventories.batch_number', 'batches.batch_number')
                ->select(
                    "products.productName",
                    "batches.batch_number",
                    "batches.expiry_date",
                    "store_inventories.onHand",
                    "stores.store_name"
                )
                ->where([
                    ['store_inventories.created_by', '=', Auth::user()->subscriber_id],
                    ['batches.subscriber_id', '=', Auth::user()->subscriber_id],
                    ['batches.expiry_date', '<', $todayDate]
                ])
                ->get();

            return response()->json([
                'data' => $data,
                'message' => 'Success'
            ]);
        } else {
            $data = DB::table("products")
                ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                ->join('stores', 'store_inventories.store_id', 'stores.id')
                ->join('batches', 'store_inventories.batch_number', 'batches.batch_number')
                ->select(
                    "products.productName",
                    "batches.batch_number",
                    "batches.expiry_date",
                    "store_inventories.onHand",
                    "stores.store_name"
                )
                ->where([
                    // ['products.subscriber_id', '=', Auth::user()->subscriber_id],
                    ['batches.subscriber_id', '=', Auth::user()->subscriber_id],
                    ['store_inventories.store_id', $storeId],
                    ['batches.expiry_date', '<', $todayDate]
                ])
                ->get();

            return response()->json([
                'data' => $data,
                'message' => 'Success'
            ]);
        }
    }
}
