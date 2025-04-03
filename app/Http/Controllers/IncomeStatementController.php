<?php

namespace App\Http\Controllers;


use App\Models\Bank;
use App\Models\Supplier;
use App\Models\Transaction;

use Illuminate\Http\Request;


use App\Models\PaymentMethod;
use App\Models\ChartOfAccount;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\IncomeStatementController;

class IncomeStatementController extends Controller
{
    public function index()
    {
        return view('income-statement/income-statement');
    }

    public function data(Request $request)
    {
        $data = DB::table("transactions")
            ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name', 'head_type')
            ->where([['subscriber_id', Auth::user()->subscriber_id], ['head_type', 'I']])
            ->orderBy('head_code', 'asc')
            ->groupBy("head_code", "head_name", "head_type")
            // ->take(5)
            ->get();

        $totalRevenue = 0;
        if ($data) {
            foreach ($data as $d) {
                $totalRevenue = $totalRevenue + $d->totalDebit;
                // Log::info($total);
            }
        } else {
            $totalRevenue = 0;
        }


        $data1 = DB::table("transactions")
            ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name', 'head_type')
            ->where([['subscriber_id', Auth::user()->subscriber_id], ['head_type', 'E']])
            ->orderBy('head_code', 'asc')
            ->groupBy("head_code", "head_name", "head_type")
            // ->take(5)
            ->get();

        $totalExpense = 0;
        if ($data1) {
            foreach ($data1 as $d) {
                $totalExpense = $totalExpense + $d->totalDebit;
                // Log::info($total);
            }
        } else {
            $totalExpense = 0;
        }


        if ($request->ajax()) {
            return response()->json([
                'data' => $data,
                'data1' => $data1,
                'totalRevenue' => $totalRevenue,
                'totalExpense' => $totalExpense,
                'message' => 'Success!'
            ]);
        }
    }

    public function dateWiseData(Request $request)
    {
        $start_date = date($request->startdate) . ' 00:00:00';
        $end_date = date($request->enddate) . ' 23:59:59';

        $data = DB::table("transactions")
            ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name', 'head_type')
            ->where([['subscriber_id', Auth::user()->subscriber_id], ['head_type', 'I']])
            ->whereBetween('transaction_date', [$start_date, $end_date])
            ->orderBy('head_code', 'asc')
            ->groupBy("head_code", "head_name", "head_type")
            // ->take(5)
            ->get();

        $totalRevenue = 0;
        if ($data) {
            foreach ($data as $d) {
                $totalRevenue = $totalRevenue + $d->totalDebit;
                // Log::info($total);
            }
        } else {
            $totalRevenue = 0;
        }


        $data1 = DB::table("transactions")
            ->select(DB::raw("SUM(debit) as totalDebit"), DB::raw("SUM(credit) as totalCredit"), 'head_code', 'head_name', 'head_type')
            ->where([['subscriber_id', Auth::user()->subscriber_id], ['head_type', 'E']])
            ->whereBetween('transaction_date', [$start_date, $end_date])
            ->orderBy('head_code', 'asc')
            ->groupBy("head_code", "head_name", "head_type")
            // ->take(5)
            ->get();

        $totalExpense = 0;
        if ($data1) {
            foreach ($data1 as $d) {
                $totalExpense = $totalExpense + $d->totalDebit;
                // Log::info($total);
            }
        } else {
            $totalExpense = 0;
        }


        if ($request->ajax()) {
            return response()->json([
                'data' => $data,
                'data1' => $data1,
                'totalRevenue' => $totalRevenue,
                'totalExpense' => $totalExpense,
                'message' => 'Success!'
            ]);
        }
    }
}
