<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DuePayment;
use App\Models\Client;

use Illuminate\Support\Facades\Auth;

use DB;
use Log;

class DueReportController extends Controller
{

    public function indexView()
    {
        return view('report/due-report');
    }

    public function index(Request $request)
    {

        // $duePayment = DB::table("clients")
        //     ->join('due_payments', 'clients.id', '=', 'due_payments.clientId')
        //     ->select(DB::raw("SUM(due_payments.due_amount) as td"), "due_payments.clientId", "clients.name")
        //     ->where([
        //         ['due_payments.subscriber_id', '=', Auth::user()->subscriber_id ]
        //     ])
        //     ->groupBy("due_payments.clientId", "clients.name")
        //     ->get();

        // Log::info($duePayment);

        $duePayment = DB::table("clients")
            ->join('deposits', 'clients.id', '=', 'deposits.client_id')
            ->select(DB::raw("SUM(deposits.due) as totalDue"), DB::raw("SUM(deposits.deposit) as totalDeposit"), "deposits.client_id", "clients.name")
            ->where([
                ['deposits.subscriber_id', '=', Auth::user()->subscriber_id],
                ['deposits.balance', '<',0]
            ])
            ->groupBy("deposits.client_id", "clients.name")
            ->orderBy("deposits.created_at", "desc")
            ->get();
            //Log::info($duePayment);
        if ($duePayment->isEmpty()) {
            return response()->json([
                'message' => 'No data found.',
            ]);
        } else {

            foreach ($duePayment as $dueP) {
                $lastBalance = DB::table('deposits')->where('client_id', $dueP->client_id)->latest()->first();

                $x = [
                    "totalDue" => $dueP->totalDue,
                    "totalDeposit" => $dueP->totalDeposit,
                    "client_id" => $dueP->client_id,
                    "name" => $dueP->name,
                    "balance" => -1*$lastBalance->balance,
                ];

                $data[] = $x;
            }
        }

        if ($request->ajax()) {
            return response()->json([
                'message' => 'Success',
                'due' => $data,
            ]);
        }
    }

    public function showDetails(Request $request, $clientId)
    {

        $client = Client::find($clientId);
        $datas = DB::table('deposits')
        // ->select('deposits.*', DB::raw('(deposits.deposit + deposits.due) AS totalPurchase'))
        ->select('deposits.*')
        ->where([
            ['deposits.client_id', $clientId],
            ['deposits.subscriber_id', Auth::user()->subscriber_id]
        ])
        ->distinct('deposits')
        ->get();

        // $purchaseDeposit = DB::table("clients")
        // ->join('deposits', 'clients.id', '=', 'deposits.client_id')
        // ->where([
        //     ['deposits.client_id', $clientId],
        //     ['deposits.subscriber_id', '=', Auth::user()->subscriber_id],
        //     ['deposits.status', '=', 'WEB deposit']
        // ])
        // ->get();

        $purchaseDeposit = DB::table("clients")
        ->join('payments', 'clients.id', '=', 'payments.clientId')
        ->where([
            ['payments.subscriber_id', '=', Auth::user()->subscriber_id],
            ['payments.clientId', '=', $clientId],
        ])
        // ->groupBy("payments.clientId", "clients.name")
            // ->orderBy("deposits.created_at", "desc")
            ->get();

        //Log::info($datas);
        // Log::info($purchaseDeposit);

        foreach ($datas as $data){
            if($data->order_id== '0' || $data->order_id == '')
            {
                $data->totalPurchase = 0;
            }
            foreach ($purchaseDeposit as $purdep) {
                // Log::info($purchaseDeposit);

                if ($data->created_at == $purdep->created_at) {
                    $data->totalPurchase = $purdep->total;
                }
            }
        }

        // Log::info($datas);
        return view('report/due-report-details', ["datas" => $datas, 'client' => $client]);
        //old query

        // $datas = DB::table("deposits")
        //     // ->select(DB::raw("SUM(due) as due"), DB::raw("SUM(deposit) as deposit"), "deposit_date")
        //     ->where([
        //         ['client_id', $clientId],
        //         ['subscriber_id', '=', Auth::user()->subscriber_id ]
        //     ])
        //     ->get();

        // Log::info($datas);

        //End old query
        // $datas = DB::table('deposits')
        //     ->select('deposits.*', DB::raw('(deposits.deposit + deposits.due) AS totalPurchase'), 'orders.orderId')
        //     ->join('orders', 'orders.clientId', '=', 'deposits.client_id')
        //     ->where([['deposits.client_id', $clientId], ['orders.clientId', $clientId], ['deposits.subscriber_id', Auth::user()->subscriber_id]])
        //     ->get();

        // return view('report/due-report-details', ["datas" => $datas, 'client' => $client]);
    }
}
