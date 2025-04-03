<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Store;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\StoreInventory;
use App\Models\Price;
use App\Models\ProductInHistory;
use App\Models\Batch;
use App\Models\Leaf;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use DB;


class ProductDataController extends Controller
{
    public function getProductData(Request $request){

        if ($request->ajax()) {

            $term = trim($request->term);
            $products = DB::table('products')->select('id','productName', 'category_name', 'strength')
                ->where('productName', 'LIKE',  '%' . $term. '%')
                ->orderBy('productName', 'asc')->simplePaginate(10);

            $morePages=true;

            $pagination_obj= json_encode($products);

            if (empty($products->nextPageUrl())){
                $morePages=false;
            }

            $results = array(
              "results" => $products->items(),
              "pagination" => array(
                "more" => $morePages
              )
            );

            // Log::info(json_encode($results));

            return \Response::json($results);
        }
    }

    public function getProductPrice($productId){
        $products = DB::table("products")
                ->join('prices', 'products.id', '=', 'prices.product_id')
                ->select("products.*", "prices.mrp", "prices.price")
                ->where([
                    ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['products.id', $productId]
                ])
                ->orderBy('prices.id', 'desc')
                ->take(1)
                ->get();

        return response()->json([
            'message' => 'Success',
            'products'=>$products,
        ]);

    }

    public function getStoreProduct(Request $request, $storeId){

        if ($request->ajax()) {

            $term = trim($request->term);

            if($storeId === "inventory"){
                $products = DB::table('products')->select('id','productName', 'category_name', 'strength')
                ->where('productName', 'LIKE',  '%' . $term. '%')
                ->where('subscriber_id', Auth::user()->subscriber_id)
                ->orderBy('productName', 'asc')->simplePaginate(10);

            }else{
                $products = Product::join('store_inventories', 'products.id', 'store_inventories.productId')
                ->select('products.productName', 'products.id')
                ->where([
                    ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['store_inventories.store_id', $storeId],
                    ['products.productName', 'LIKE',  '%' . $term. '%']
                ])
                ->groupBy('products.productName', 'products.id')
                ->orderBy('products.productName', 'asc')
                ->simplePaginate(10);
            }

            $morePages=true;

            $pagination_obj= json_encode($products);

            if (empty($products->nextPageUrl())){
                $morePages=false;
            }

            $results = array(
              "results" => $products->items(),
              "pagination" => array(
                "more" => $morePages
              )
            );

            return \Response::json($results);
        }
    }
}
