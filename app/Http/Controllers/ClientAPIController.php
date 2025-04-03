<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Order;
use App\Models\Client;
use App\Models\Supplier;
use Illuminate\Http\Request;

use App\Models\ChartOfAccount;

use Illuminate\Support\Facades\Auth;

class ClientAPIController extends Controller
{
    public function store(Request $request){
        // Log::info($request->all());

        // Log::info($request." Hello---------------------");

        if($request->type == "supplier"){

            $supplier = new Supplier;

            $supplier->name             = $request->name;
            $supplier->mobile           = $request->mobile;
            $supplier->type             = $request->type;
            $supplier->email            = $request->email;
            $supplier->address          = $request->address;
            $supplier->note             = $request->note;
            // $supplier->storeId          = (int)$request->storeId;
            $supplier->image            = $request->image;
            $supplier->subscriber_id    =  (int)$request->subscriberId;

            $suppliers = Supplier::where([
                ['subscriber_id', (int)$request->subscriberId]
            ])->get();

            if($suppliers->isNotEmpty()){
                $suppliers = Supplier::where([
                    ['subscriber_id', (int)$request->subscriberId]
                ])->latest()->first();
                $supplier->head_code = (int)$suppliers->head_code + 1;
            }else{
                $supplier->head_code = (50101 * 1000) + 1;
            }


            $supplier->save();

            $id=$supplier->id;
            $coa = new ChartOfAccount;
            $coa->head_code             = $supplier->head_code;
            $coa->head_name             = $request->name;
            $coa->parent_head           = 'Account Payable';
            $coa->parent_head_level     = 50101;
            $coa->head_type             = 'L';
            $coa->is_transaction        = '0';
            $coa->is_active             = '1';
            $coa->is_general_ledger     = '0';
            $coa->subscriber_id         = (int)$request->subscriberId;

            return response() -> json([
                'status'=>200,
                'id'=>$id,
                'message' => 'Supplier created Successfully!'
            ]);

        }else{

             $client = new Client;

            $client->mobile                 = $request->mobile;
            $client->name                   = $request->name;
            $client->type                   = $request->type;
            $client->email                  = $request->email;
            $client->address                = $request->address;
            $client->note                   = $request->note;
            $client->storeId                = (int)$request->storeId;
            $client->image                  = $request->image;
            $client->subscriber_id          = (int)$request->subscriberId;
            session()->put('subscriberId', $request->subscriberId);

            $clients = Client::where([
                ['subscriber_id', (int)$request->subscriberId]
            ])->get();

            if($clients->isNotEmpty()){
                $clients = Client::where([
                    ['subscriber_id', (int)$request->subscriberId]
                ])->latest()->first();
                $client->head_code = (int)$clients->head_code + 1;
            }else{
                $client->head_code = (1010101 * 1000) + 1;
            }

            $client->save();
            // DB::getPdo()->lastInsertId();
            $id=$client->id;
            $coa = new ChartOfAccount;
            $coa->head_code             = $client->head_code;
            $coa->head_name             = $request->name.' '.$request->mobile;
            $coa->parent_head           = 'Customer Receivable';
            $coa->parent_head_level     = 1010101;
            $coa->head_type             = 'A';
            $coa->is_transaction        = '1';
            $coa->is_active             = '1';
            $coa->is_general_ledger     = '1';
            $coa->subscriber_id         = (int)$request->subscriberId;
            
            $coa->save();

            return response() -> json([
                'status'=>200,
                'id'=>$id,
                'message' => 'Client created Successfully!'
            ]);
        }
    }

    public function list($subscriberId){
        $client = Client::where('subscriber_id', $subscriberId)
        ->orderBy('clients.id', 'desc')
        ->get();
        $supplier = Supplier::where('subscriber_id', $subscriberId)->get();


        return response() -> json([
            "status" => "success",
            "statusCode" => 200,
            "message" => "Data found",
            "data" => $client->concat($supplier),
        ]);
    }
}
