<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Models\StoreInventory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\File;

class StoerWiseProductController extends Controller
{
    public function data(Request $request, $storeId){

        $data = Product::join('store_inventories', 'products.id', 'store_inventories.productId')
                ->select('products.productName', 'products.id')
                ->where([
                    // ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['store_inventories.store_id', $storeId]
                ])
                ->groupBy('products.productName', 'products.id')
                ->orderBy('products.id', 'asc')
                ->get();


        return response()->json([
            'data' => $data,
            'message' => 'Success'
        ]);
    }

    public function inventoryData(Request $request){
        // $data = Inventory::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $data = Inventory::join('products', 'products.id', '=', 'inventories.productId')
            ->where('inventories.subscriber_id', Auth::user()->subscriber_id)
            ->select('inventories.*', 'products.*')
            ->get();

        return response()->json([
            'data' => $data,
            'message' => 'Success'
        ]);
    }
}
