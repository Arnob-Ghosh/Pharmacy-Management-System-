<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\ProductInHistory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use DB;

class ProductInReportController extends Controller
{
    public function index(){

        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('report/product-in-report', ['stores' => $stores]);
    }

    public function onLoad(Request $request){

        $authId = Auth::user()->subscriber_id;

        $data = DB::table("product_in_histories")
                    ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                    // ->whereBetween('created_at', [$from, $to])
                    ->where('subscriber_id', $authId)
                    ->groupBy("product_name", "store_name", "product", "store")
                    ->orderBy("store_name","desc")
                    ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }

    }

    public function reports(Request $request){

        // Log::info($request->startdate);
        // Log::info($request->enddate);
        // Log::info($request->store);

        $authId = Auth::user()->subscriber_id;
        $from = date($request->startdate). ' 00:00:00';
        $to = date($request->enddate). ' 23:59:59';

        if($request->filled('startdate') && $request->filled('enddate') && ($request->input('store') == 'all_store')){

            $data = DB::table("product_in_histories")
                    ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                    ->whereBetween('created_at', [$from, $to])
                    ->where('subscriber_id', $authId)
                    ->groupBy("product_name", "store_name", "product", "store")
                    ->orderBy("store_name","desc")
                    ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }
        }elseif($request->input('startdate') == NULL && $request->input('enddate') == NULL && ($request->input('store') == 'all_store')){
            $data = DB::table("product_in_histories")
                    ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                    // ->whereBetween('created_at', [$from, $to])
                    ->where('subscriber_id', $authId)
                    ->groupBy("product_name", "store_name", "product", "store")
                    ->orderBy("store_name","desc")
                    ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }

        }elseif($request->filled('startdate') && ($request->input('store') == 'all_store') && ($request->input('enddate') == NULL)){
            $data = DB::table("product_in_histories")
                ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                ->whereDate('created_at', '=', $from)
                ->where('subscriber_id',  $authId)
                ->groupBy("product_name", "store_name", "product", "store")
                ->orderBy("qty","desc")
                ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }
        }elseif($request->filled('enddate') && ($request->input('store') == 'all_store') && ($request->input('startdate') == NULL)){
            $data = DB::table("product_in_histories")
                ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                ->whereDate('created_at', '=', $to)
                ->where('subscriber_id',  $authId)
                ->groupBy("product_name", "store_name", "product", "store")
                ->orderBy("qty","desc")
                ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }
        }elseif($request->filled('store') && $request->filled('enddate') && $request->filled('startdate')){

            $data = DB::table("product_in_histories")
                ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                ->whereBetween('created_at', [$from, $to])
                ->where([
                    ['store', '=', $request->store],
                    ['subscriber_id', '=', $authId]
                ])
                ->groupBy("product_name", "store_name", "product", "store")
                ->orderBy("qty","desc")
                ->get();

            //Log::info($data);

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }

        }elseif($request->filled('store') && $request->filled('startdate') && ($request->input('enddate') == NULL)){
            $data = DB::table("product_in_histories")
                ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                ->whereDate('created_at', '=', $from)
                ->where([
                    ['store', '=', $request->store],
                    ['subscriber_id', '=', $authId]
                ])
                ->groupBy("product_name", "store_name", "product", "store")
                ->orderBy("qty","desc")
                ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }
        }elseif($request->filled('store') && $request->filled('enddate') && ($request->input('startdate') == NULL)){
            $data = DB::table("product_in_histories")
                ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                ->whereDate('created_at', '=', $to)
                ->where([
                    ['store', '=', $request->store],
                    ['subscriber_id', '=', $authId]
                ])
                ->groupBy("product_name", "store_name", "product", "store")
                ->orderBy("qty","desc")
                ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }
        }elseif($request->filled('store') && ($request->input('enddate') == NULL) && ($request->input('startdate') == NULL)){
            $data = DB::table("product_in_histories")
                ->select(DB::raw("SUM(quantity) as qty"), "product_name", "store_name", "product", "store")
                // ->whereDate('created_at', '=', $to)
                ->where([
                    ['store', '=', $request->store],
                    ['subscriber_id', '=', $authId]
                ])
                ->groupBy("product_name", "store_name", "product", "store")
                ->orderBy("qty","desc")
                ->get();

            if($data->isEmpty()){
                return response()->json([
                    'status' => 200,
                    'message' => 'No data!',
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data
                ]);
            }
        }


        // Log::info($data);


    }
}
