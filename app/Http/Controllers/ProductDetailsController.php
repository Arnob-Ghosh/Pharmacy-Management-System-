<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductDetailsController extends Controller
{
    public function index($id){
        return view('product/product-details', ["productId" => $id]);
    }

    public function show($id){
        $data = Product::where([
            ['id', $id],
            // ['subscriber_id', Auth::user()->subscriber_id]
        ])->first();

        return response()->json([
                'data'=>$data,
            ]);
    }
}
