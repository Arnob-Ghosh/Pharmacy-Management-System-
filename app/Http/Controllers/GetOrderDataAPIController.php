<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Payment;

use App\Models\DuePayment;
use Illuminate\Http\Request;
use App\Models\OrderedProduct;
use App\Models\StoreInventory;
use App\Models\OrderedProductTax;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Models\OrderedProductDiscount;

class GetOrderDataAPIController extends Controller
{
    public function salesList(Request $request, $subscriberId, $storeId){
        // $data = Order::leftjoin('clients', 'clients.id', 'orders.clientId')
        // // ->leftjoin('due_payments', 'orders.orderId', 'due_payments.orderId')
        // ->orderBy('orders.id', 'desc')
        // ->where([
        //     ['orders.subscriber_id', $subscriberId],
        //     ['orders.store_id', $storeId]
        // ])
        // ->orderBy('orders.orderDate', 'desc')
        // ->get(['orders.orderId', 'orders.grandTotal', 'orders.orderDate', 'clients.name', 'clients.mobile']);

        // $data = Order::leftjoin('clients', 'clients.id', 'orders.clientId')
        //             ->join('payments', 'orders.id', 'payments.orderId')
        //             ->where([
        //                 ['orders.subscriber_id', $subscriberId],
        //                 ['orders.store_id', $storeId]
        //             ])
        //             ->orderBy('orders.id', 'desc')
        //             ->get(['orders.orderId', 'orders.grandTotal', 'orders.orderDate', 'clients.name', 'clients.mobile', 'payments.total', 'payments.due']);
        $clients = DB::table('clients')
        ->select('id')
        ->where('subscriber_id', $subscriberId)
        ->get();

        $totalDue = 0;
        foreach ($clients as $client) {
            $totalDues = DB::table('deposits')
            ->select('balance')
            ->where([
                ['subscriber_id', $subscriberId],
                ['client_id', $client->id],
                ['store_id', $storeId],
                // [
                //     'balance', '<', 0
                // ]
            ])
            ->orderBy('created_at', 'desc')->limit(1)->first();
            if ($totalDues != null) {
                $totalDue = $totalDue + $totalDues->balance;
            }
        }
        if ($totalDue < 0) {
            $totalDue = -1 * $totalDue;
        } else {
            $totalDue = 0;
        }
        $totalpays = DB::table('deposits')
            ->select(DB::raw("SUM(deposit) as paid"))
            ->where([
                ['subscriber_id', $subscriberId],
                ['store_id', $storeId]
            ])
            ->get();

        // $data = DB::table("deposits")
        //     // ->join('ordered_products', 'orders.id', '=', 'ordered_products.orderId')
        //     ->select(DB::raw("SUM(deposits.deposit) as paid_amount"), DB::raw("SUM(deposits.balance) as due_amount"))
        //     ->where([
        //         ['deposits.subscriber_id', $subscriberId],
        //         ['deposits.store_id', $storeId]
        //     ])
        //     ->orderBy('deposits.id', 'desc')
        //     ->get();

        $paid =0;
        if($totalpays[0]->paid!=null){$paid=$totalpays[0]->paid;}
        $data =(object)[
            'paid_amount'=> $paid,
            'due_amount'=> $totalDue,
        ];

            return response()->json([
                'status'=>200,
                // 'data' => $data,
                'data'=> $data,
            ]);
    }
    public function salesListDetails(Request $request,$startdate, $enddate, $subscriberId, $storeId){
        // $data = Order::leftjoin('clients', 'clients.id', 'orders.clientId')
        // // ->leftjoin('due_payments', 'orders.orderId', 'due_payments.orderId')
        // ->orderBy('orders.id', 'desc')
        // ->where([
        //     ['orders.subscriber_id', $subscriberId],
        //     ['orders.store_id', $storeId]
        // ])
        // ->orderBy('orders.orderDate', 'desc')
        // ->get(['orders.orderId', 'orders.grandTotal', 'orders.orderDate', 'clients.name', 'clients.mobile']);

        // $data = Order::leftjoin('clients', 'clients.id', 'orders.clientId')
        //             ->join('payments', 'orders.id', 'payments.orderId')
        //             ->where([
        //                 ['orders.subscriber_id', $subscriberId],
        //                 ['orders.store_id', $storeId]
        //             ])
        //             ->orderBy('orders.id', 'desc')
        //             ->get(['orders.orderId', 'orders.grandTotal', 'orders.orderDate', 'clients.name', 'clients.mobile', 'payments.total', 'payments.due']);
        $data = DB::table("orders")->leftjoin('clients', 'clients.id', 'orders.clientId')
                    ->join('payments', 'orders.id', 'payments.orderId')
                    ->whereBetween('orders.orderDate', [$startdate, $enddate])
                    ->where([
                        ['orders.subscriber_id', $subscriberId],
                        ['orders.store_id', $storeId]
                    ])
                    ->orderBy('orders.id', 'desc')
                    ->get(['orders.orderId', 'orders.grandTotal', 'orders.orderDate', 'clients.name', 'clients.mobile', 'payments.total', 'payments.due', DB::raw("payments.total-payments.due as paid")]);
          return response()->json([
                'status'=>200,
                'data'=>$data,
            ]);
    }
}
