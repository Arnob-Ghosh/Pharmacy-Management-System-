<?php

namespace App\Http\Controllers;

use Redirect;

use App\Models\Pos;
use App\Models\Vat;
use App\Models\Store;
use App\Models\Client;
use App\Models\Product;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Session\Session;


class PosCartController extends Controller
{
    public function index(Request $request){

        if($request->session()->has('storeId') && $request->session()->has('posId')){

            $clients = Client::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $methods = PaymentMethod::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $storeId = $request->session()->get('storeId');
            $posId = $request->session()->get('posId');
            $posName = $request->session()->get('posName');

            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "products.category_name", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $storeId]
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);

            // Log::info($products->links());

            return view('pos/pos', ['customers' => $clients, 'stores' => $stores, "storeId" => $storeId, "posId" => $posId, "posName" => $posName, "methods" => $methods, "products" => $products]);
        }else{
            return redirect('pos-login');
        }

    }


    public function search(Request $request, $keyword){

        $sessionStoreId = $request->session()->get('storeId');
        $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "products.category_name", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId],
                            ['products.productName','LIKE','%'.$keyword."%"]
                        ])
                    ->orWhere([
                        // ['products.subscriber_id', Auth::user()->subscriber_id],
                        ['store_inventories.store_id', $sessionStoreId],
                        ['products.barcode', $keyword]
                    ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(Auth::user()->subscriber_id)
                    ->simplePaginate(12);



        if($request -> ajax()){
            return response()->json([
                'status' => 200,
                'message' => 'success',
                'products'=>$products,
            ]);
        }

    }

    public function newSalesSearch($storeId, $keyword){
        $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "store_inventories.*", "products.*", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $storeId],
                            ['products.productName','LIKE','%'.$keyword."%"]
                        ])
                    ->orWhere([
                        // ['products.subscriber_id', Auth::user()->subscriber_id],
                        ['store_inventories.store_id', $storeId],
                        ['products.barcode', $keyword]
                    ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(Auth::user()->subscriber_id)
                    // ->simplePaginate(12);
                    ->get();



        // if($request -> ajax()){
            return response()->json([
                'status' => 200,
                'message' => 'success',
                'products'=>$products,
            ]);
        // }

    }




    public function categories(Request $request){


        //Log::info("s");

        $sessionStoreId = $request->session()->get('storeId');

        $categories = Category::where('subscriber_id', 1)->orwhere('subscriber_id', Auth::user()->subscriber_id)->get();

        $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "products.category_name", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId]
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'categories' => $categories,
                'products' => $products,
            ]);
        }
    }

    public function fetch(Request $request){

        $sessionStoreId = $request->session()->get('storeId');

        if($request->ajax()){
            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"),"products.category_name", "products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId]
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);

            // return view('pagination_child', compact('data'))->render();
            return response()->json([
                'message' => 'Success',
                'products' => $products,
            ]);
        }
    }

    public function fetchSearch(Request $request, $keyword){
        $sessionStoreId = $request->session()->get('storeId');
        $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.category_name","products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId],
                            ['products.productName','LIKE','%'.$keyword."%"]
                        ])
                    ->orWhere([
                        // ['products.subscriber_id', Auth::user()->subscriber_id],
                        ['store_inventories.store_id', $sessionStoreId],
                        ['products.barcode', $keyword]
                    ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(Auth::user()->subscriber_id)
                    ->simplePaginate(12);



        if($request -> ajax()){
            return response()->json([
                'status' => 200,
                'message' => 'success',
                'products'=>$products,
            ]);
        }
    }

     public function fetchCategorySearch(Request $request, $id){
        $sessionStoreId = $request->session()->get('storeId');

        if($id == "all_products"){
            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.category_name","products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId],
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);
        }else{
            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.category_name","products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId],
                            ['products.category', $id]
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);
        }

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'products'=>$products,
            ]);
        }
     }

    public function searchCategories(Request $request, $id){

        $sessionStoreId = $request->session()->get('storeId');

        if($id == "all_products"){
            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.category_name","products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId],
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);
        }else{
            $products = DB::table("products")
                    ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
                    ->join('categories', 'categories.id', 'products.category')
                    ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.category_name","products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength", "categories.category_image")
                    ->where([
                            // ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['store_inventories.store_id', $sessionStoreId],
                            ['products.category', $id]
                        ])
                    ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength", "categories.category_image")
                    // ->take(1)
                    ->simplePaginate(12);
        }



        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'products'=>$products,
            ]);
        }
    }




    public function productAdd(Request $request, $id){
        // $products = Product::join('inventories', 'products.id', '=', 'inventories.productId')
        // ->where('products.id', $id)
        // ->get(['products.*', 'inventories.*']);
        // $products = Product::find($id);

        // $products = Product::join('prices', 'products.id', '=', 'prices.product_id')
        // ->where([
        //         ['products.subscriber_id', 1],
        //     ])
        // ->get("products.*");

        $sessionStoreId = $request->session()->get('storeId');


        $products = DB::table("products")
        ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
        ->select("products.*", "store_inventories.mrp")
        ->where([
            // ['products.subscriber_id', Auth::user()->subscriber_id],
            ['store_inventories.store_id', $sessionStoreId],
            ['products.id', $id]
        ])
        ->orderBy('store_inventories.id', 'desc')
        ->take(1)
        ->get();


        // foreach($data as $d){
        //     $da = $d->id;
        // }
       // Log::info($products);

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'session' => $id,
                'products'=>$products,
            ]);
        }
    }

    public function customerSearch(Request $request, $id){
        $client = Client::where('id', $id)->get();

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'customer'=>$client,
            ]);
        }
    }

    public function discountSearch(Request $request, $id){
        $discount = Discount::where('discount', $id)->get();

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'discount'=>$discount,
            ]);
        }
    }

    public function taxSearch(Request $request, $id){
        $tax = Vat::where('taxAmount', $id)->get();

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'tax'=>$tax,
            ]);
        }
    }

    public function posLoginView(){
         $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();

         $userStoreId = Auth::user()->store_id;
        // log::info($userStoreId);
        return view('pos/pos-login', ['stores' => $stores, 'userStoreId' => $userStoreId]);
    }

    public function posSearch(Request $request, $id){

        $poses = DB::table("p_o_s")
        ->where([
            ['store_id', $id],
            ['pos_status','Active']
        ])
        ->get();

        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'poses'=>$poses,
            ]);
        }
    }

    public function posLogin(Request $request){

        $posId = (int)$request->posId;
        $subscriberId = Auth::user()->subscriber_id;

        $subscriber = Subscriber::find($subscriberId);
        $orgName = $subscriber->org_name;
        $binNumber = $subscriber->bin_number;

        $store = Store::find((int)$request->storeId);
        $storeAddress = $store->store_address;


        $pos = Pos::find($posId);

        $clients = Client::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();

        if($pos->pos_pin == $request->posPin){
            // Session::put('storeId', (int)$request->storeId);
            // Session::put('storeName', $request->storeName);
            // Session::put('storeAddress', $storeAddress);
            // Session::put('posId', (int)$request->posId);
            // Session::put('posName', $pos->pos_name);
            // Session::put('orgName', $orgName);
            // Session::put('binNumber', $binNumber);

            //new version seassion
            $request->session()->put('storeId', (int)$request->storeId);
            $request->session()->put('storeName', $request->storeName);
            $request->session()->put('storeAddress', $storeAddress);
            $request->session()->put('posId', (int)$request->posId);
            $request->session()->put('posName', $pos->pos_name);
            $request->session()->put('orgName', $orgName);
            $request->session()->put('binNumber', $binNumber);


            return response()->json(['url'=>url('/pos'), 'message' => 'Success!']);

        }else{

            return response()->json(['message' => 'POS PIN not matched!']);

        }
    }

    public function posLogout(Request $request){

        $request->session()->forget('storeId');
        $request->session()->forget('storeName');
        $request->session()->forget('storeAddress');
        $request->session()->forget('posId');
        $request->session()->forget('posName');
        $request->session()->forget('orgName');
        $request->session()->forget('binNumber');

        return response()->json([
            'url'=>url('/pos-login')
        ]);

    }

    public function productAdd2(Request $request, $id, $storeId){
            if($storeId='Inventory')
            $storeId=0;
        // $sessionStoreId = $request->session()->get('storeId');

        $products = DB::table("products")
                ->where([
                    // ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['products.id', $id]
                ])
                ->get();

        // $data = DB::table("prices")
        //         ->join('products', 'prices.product_id', '=', 'products.id')
        //         ->select("prices.mrp")
        //         ->where([
        //             ['prices.subscriber_id', Auth::user()->subscriber_id],
        //             ['prices.store_id', $storeId],
        //             // ['variants.id', $variantId]
        //         ])
        //         ->orderBy('prices.id', 'desc')
        //         ->take(1)
        //         ->get();

        $data = DB::table("products")
                ->join('prices', 'products.id', '=', 'prices.product_id')
                ->select("products.*", "prices.mrp")
                ->where([
                    // ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['prices.store_id', $storeId],
                    ['prices.subscriber_id', Auth::user()->subscriber_id],
                    ['products.id', $id]
                ])
                ->orderBy('prices.id', 'desc')
                ->take(1)
                ->get();

        // $onHand = DB::table("products")
        //     ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
        //     ->select("store_inventories.onHand")
        //     ->where([
        //         ['store_inventories.productId', $id],
        //         // ['store_inventories.variant_id', $variantId],
        //         ['store_inventories.store_id', $storeId]

        //     ])
        //     ->first();

        $onHand = DB::table("products")
            ->join('store_inventories', 'products.id', '=', 'store_inventories.productId')
            ->select(DB::raw("SUM(store_inventories.onHand) as totalOnHand"), "products.productName", "products.productImage", "products.id", "store_inventories.productId", "products.strength")
            ->where([
                    // ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['store_inventories.store_id', $storeId],
                    ['store_inventories.productId', $id]
                ])
            ->groupBy("store_inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength")
            // ->take(1)
            ->first();
            if($storeId==0)
            {
                $onHand = DB::table("products")
            ->join('inventories', 'products.id', '=', 'inventories.productId')
            ->select(DB::raw("SUM(inventories.onHand) as totalOnHand"), "products.productName", "products.productImage", "products.id", "inventories.productId", "products.strength")
            ->where([
                    ['products.subscriber_id', Auth::user()->subscriber_id],
                    ['inventories.productId', $id]
                ])
            ->groupBy("inventories.productId", "products.productName", "products.productImage", "products.id", "products.strength")
            // ->take(1)
            ->first();
            }



        foreach($products as $p){

            foreach($data as $d){
                $x =[
                    "id" => $p->id,
                    "productName" => $p->productName,
                    "productLabel" => $p->productLabel,
                    "brand" => $p->brand,
                    "category" => $p->category,
                    "category_name" => $p->category_name,
                    "subcategory" => $p->subcategory,
                    "subcategory_name" => $p->subcategory_name,
                    "sku" => $p->sku,
                    "barcode" => $p->barcode,
                    "supplier" => $p->supplier,
                    "available_discount" => $p->available_discount,
                    "discount" => $p->discount,
                    "discount_type" => $p->discount_type,
                    "available_offer" => $p->available_offer,
                    "offerItemId" => $p->offerItemId,
                    "freeItemName" => $p->freeItemName,
                    "requiredQuantity" => $p->requiredQuantity,
                    "freeQuantity" => $p->freeQuantity,
                    "isExcludedTax" => $p->isExcludedTax,
                    "taxName" => $p->taxName,
                    "tax" => $p->tax,
                    "created_by" => $p->created_by,
                    "updated_by" => $p->updated_by,
                    "created_at" => $p->created_at,
                    "updated_at" => $p->updated_at,
                    "subscriber_id" => $p->subscriber_id,
                    "productImage" => $p->productImage,
                    "mrp" => $d->mrp,
                    // "variant_name" => $d->variant_name,
                    // "variant_id" => $d->variant_id

                ];

            }
        }

        $y[] = $x;



        if($request -> ajax()){
            return response()->json([
                'message' => 'Success',
                'products'=>$y,
                'onHand' => $onHand->totalOnHand


            ]);
        }
    }
}
