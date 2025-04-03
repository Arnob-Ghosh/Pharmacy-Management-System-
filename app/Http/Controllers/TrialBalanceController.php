<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use App\Models\Supplier;
use App\Models\Transaction;
use Illuminate\Http\Request;



use App\Models\PaymentMethod;
use App\Models\ChartOfAccount;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class TrialBalanceController extends Controller
{
    public function index(){
        return view('trial-balance/trial-balance');
    }

    public function data(Request $request){

        $data = DB::table("transactions")
                ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name')
                ->where('subscriber_id', Auth::user()->subscriber_id)
                ->orderBy('head_code', 'asc')
                ->groupBy("head_code", "head_name")
                // ->take(5)
                ->get();

        if($request -> ajax()){
            return response()->json([
                'data'=>$data,
                'message'=>'Success!'
            ]);
        }
    }

    public function dateWise(Request $request){
        $from = date($request->startdate). ' 00:00:00';
        $to = date($request->enddate). ' 23:59:59';

        if($request->filled('startdate') && $request->input('enddate') == NULL){

            $data = DB::table("transactions")
                ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name')
                ->whereDate('transaction_date', '=', $from)
                ->where('subscriber_id', Auth::user()->subscriber_id)
                ->orderBy('head_code', 'asc')
                ->groupBy("head_code", "head_name")
                // ->take(5)
                ->get();

            return response()->json([
                'status'=>200,
                'message'=>"Only From date",
                'data' => $data,
            ]);

        }elseif($request->filled('enddate') && $request->input('startdate') == NULL){
            $data = DB::table("transactions")
                ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name')
                ->whereDate('transaction_date', '=', $to)
                ->where('subscriber_id', Auth::user()->subscriber_id)
                ->orderBy('head_code', 'asc')
                ->groupBy("head_code", "head_name")
                // ->take(5)
                ->get();

            return response()->json([
                'status'=>200,
                'message'=>"Only to date",
                'data' => $data,
            ]);
        }else{
            $data = DB::table("transactions")
                ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name')
                ->whereBetween('transaction_date', [$from, $to])
                ->where('subscriber_id', Auth::user()->subscriber_id)
                ->orderBy('head_code', 'asc')
                ->groupBy("head_code", "head_name")
                // ->take(5)
                ->get();

            return response()->json([
                'status'=>200,
                'message'=>"From and to date",
                'data' => $data,
            ]);
        }
    }
}
