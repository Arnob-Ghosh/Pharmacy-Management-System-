<?php

namespace App\Http\Controllers;

use App\Models\Pos;
use App\Models\User;
use App\Models\Batch;
use App\Models\Price;
use App\Models\Store;
use App\Models\Client;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Inventory;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
// use App\Models\Variant;
use App\Models\StoreInventory;

use App\Models\PurchaseProduct;
use App\Models\PurchaseProductList;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class NewSalesController extends Controller
{
    public function create(Request $request)
    {
        // if ($request->session()->has('storeId') && $request->session()->has('posId')) {
            $products = Product::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $suppliers = Supplier::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $clients = Client::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $batches = Batch::where('subscriber_id', Auth::user()->subscriber_id)->get();
            $methods = PaymentMethod::where('subscriber_id', Auth::user()->subscriber_id)->get();
            // $variants = Variant::where([
            //     ['subscriber_id', Auth::user()->subscriber_id],
            // ])->get();
            //  Log::info($products);

            // return $products;
            return view('new-sales/new-sales', ['products' => $products, 'clients' => $clients, 'stores' => $stores, 'batches' => $batches, 'methods' => $methods]);
        // } else {
        //     return redirect('new-sales-pos-login');
        // }
    }

    //new

    public function posLoginView()
    {
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();

        return view('new-sales/new-sales-pos-login', ['stores' => $stores]);
    }
    public function posLogin(Request $request)
    {

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

        if ($pos->pos_pin == $request->posPin) {
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


            return response()->json(['url' => url('/new-sales-create'), 'message' => 'Success!']);
        } else {

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
            'url'=>url('/new-sales-pos-login')
        ]);

    }
}
