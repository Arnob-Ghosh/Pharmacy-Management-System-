<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductInHistory;

class ProductInReportDetailsController extends Controller
{
    public function index(Request $request, $storeId, $productId){

        $details = ProductInHistory::where([
                    ['store', '=', $storeId],
                    ['product', '=', $productId]
                ])->get();

        foreach($details as $data){
            $store_name = $data->store_name;
            $product_name = $data->product_name;
        }

        return view('report/product-in-report-details', ['details' => $details, 'store_name' => $store_name, 'product_name' => $product_name ]);
    }
}
