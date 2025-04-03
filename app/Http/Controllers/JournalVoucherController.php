<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Bank;
use App\Models\Supplier;
use App\Models\Transaction;

use Illuminate\Http\Request;

use App\Models\PaymentMethod;
use App\Models\ChartOfAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class JournalVoucherController extends Controller
{
    public function index(){

        // $assets = ChartOfAccount::where([
        //         ['subscriber_id', Auth::user()->subscriber_id],
        //         ['head_type', 'A']
        //     ])->get();

        $customerReceivables = ChartOfAccount::where([
            ['subscriber_id', Auth::user()->subscriber_id],
            ['parent_head_level', '1010101']
        ])->get();
    $AccountReceivables = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '10101'],
        ['head_code', '!=', '1010101']
    ])->get();

    $cashAtBanks = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '1010201']
    ])->get();

    $cashEquivalents = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '10102'],
        ['head_code', '!=', '1010201']
    ])->get();

    $inventorys = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '102']
    ])->get();

    $tassets = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['head_code', '103']
    ])->get();


    $equities = ChartOfAccount::where([
            ['subscriber_id', Auth::user()->subscriber_id],
            ['parent_head_level', '2']
        ])->get();


    $expenseAccounts = ChartOfAccount::where([
            ['subscriber_id', Auth::user()->subscriber_id],
            ['parent_head_level', '3']
        ])->get();


    $incomes = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '4']
    ])->get();

    // $liabilities = ChartOfAccount::where([
    //     ['subscriber_id', Auth::user()->subscriber_id],
    //     ['head_type', 'L']
    // ])->get();

    $accountPayables = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '50101']
    ])->get();
    $currentLiabilities = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['parent_head_level', '501'],
        ['head_code', '!=', '50101']
    ])->get();
    $nonCurrentLiabilities = ChartOfAccount::where([
        ['subscriber_id', Auth::user()->subscriber_id],
        ['head_code', '502']
    ])->get();

        return view('journal-voucher/journal-voucher', ['customerReceivables' => $customerReceivables,'AccountReceivables' => $AccountReceivables,'cashAtBanks' => $cashAtBanks,'cashEquivalents' => $cashEquivalents,'inventorys' => $inventorys,'tassets' => $tassets, 'equities' => $equities, 'expenseAccounts' => $expenseAccounts, 'incomes' => $incomes, 'accountPayables' => $accountPayables, 'currentLiabilities' => $currentLiabilities, 'nonCurrentLiabilities' => $nonCurrentLiabilities]);
    }

    public function store(Request $request){
        foreach($request->voucherHeads as $voucherHead){

            $coa = ChartOfAccount::where([
                ['subscriber_id', Auth::user()->subscriber_id],
                ['head_code', $voucherHead['headCode']]
            ])->first();

            // Log::info($coa);

            $transaction = New Transaction;
            $transaction->transaction_id = $request->transactionId;
            $transaction->head_code =  $coa->head_code;
            $transaction->head_name = $coa->head_name;
            $transaction->head_type = $coa->head_type;
            // $transaction->reference_id = $request->poNumber;
            $transaction->reference_note = $request->referenceNote;
            $transaction->transaction_date = $request->transactionDate;
            $transaction->transaction_type  = $request->transaction_type;


            if($voucherHead['creditAmount'] == NULL || $voucherHead['creditAmount'] == 0){
                $transaction->debit = doubleval($voucherHead['debitAmount']);
                $transaction->credit = 0;
                $lastBalance = Transaction::where([
                    ['subscriber_id', Auth::user()->subscriber_id],
                    ['head_code', $voucherHead['headCode']]
                ])->latest()->first();

                if($lastBalance){
                    $transaction->balance = $lastBalance->balance + doubleval($voucherHead['debitAmount']);
                }else{
                    $transaction->balance = doubleval($voucherHead['debitAmount']) * (1);
                }
            }else{
                $transaction->debit = 0;
                $transaction->credit = doubleval($voucherHead['creditAmount']);
                $lastBalance = Transaction::where([
                    ['subscriber_id', Auth::user()->subscriber_id],
                    ['head_code', $voucherHead['headCode']]
                ])->latest()->first();

                if($lastBalance){
                    $transaction->balance = $lastBalance->balance - doubleval($voucherHead['creditAmount']);
                }else{
                    $transaction->balance = doubleval($voucherHead['creditAmount']) * (-1);
                }
            }

            $transaction->subscriber_id = Auth::user()->subscriber_id;
            $transaction->store_id = Auth::user()->store_id;

            $transaction->save();
        }


        return response() -> json([
            'status'=>200,
            'message' => 'Success!'
        ]);
    }
    public function view()
    {
        return view('journal-voucher/journal-voucher-report');
    }
    public function show(Request $request, $transaction_id, $startdate, $enddate, $transaction_type)
    {
        if ($transaction_id == 0) {
            $journal_vouchers = Transaction::whereBetween('transaction_date', [$startdate, $enddate])
                ->where('transaction_type', '=', $transaction_type)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $journal_vouchers = Transaction::where('transaction_id', '=', $transaction_id)
                ->where('transaction_type', '=', $transaction_type)
                ->orderBy('created_at', 'desc')
                ->get();
        }
        // log::info($purchase);
        return response()->json([
            'status' => 200,
            'journal_vouchers' => $journal_vouchers,
            'message' => 'Success!'
        ]);
    }
}
