<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChartOfAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

use Log;

class ChartOfAccountController extends Controller
{
    public function index(Request $request){
        return view('chart-of-accounts/chart-of-accounts');
    }

    public function data(){
        $datas = ChartOfAccount::where('subscriber_id', Auth::user()->subscriber_id)->get();

        
        foreach($datas as $data){
            $coas = [
                'id' => $data->head_code,
                'parent' => $data->parent_head_level,
                'text' => $data->head_name,
                'icon' => 'fa fa-folder',
                // 'parent_head_level' => $data->parent_head_level,
                // 'head_type' => $data->head_type,
                // 'is_transaction' => $data->is_transaction,
                // 'is_active' => $data->is_active,
                // 'is_general_ledger' => $data->is_general_ledger
            ];

            $data_arr[] = $coas;
        }

        return response() -> json([
            'status'=>200,
            'message' => 'Success!',
            'data' => $data_arr
        ]);
    }   

    public function getData(Request $request, $headCode){
        $datas = ChartOfAccount::where([
            ['subscriber_id', Auth::user()->subscriber_id], 
            ['head_code', $headCode]
        ])->get();

        return response() -> json([
            'status'=>200,
            'message' => 'Success!',
            'data' => $datas
        ]);
    }

    public function getDataUpdate(Request $request, $id){
        $messages = [
            'headname.required'  =>    "Head name is required."
        ];

        $validator = Validator::make($request->all(), [
            'headname' => 'required'
        ], $messages);

        if ($validator->passes()) {
            $coa = ChartOfAccount::find($id);
            $coa->head_name             = $request->headname;
            $coa->is_transaction        = $request->istransactionX;
            $coa->is_active             = $request->isactiveX;
            $coa->is_general_ledger     = $request->isglX;
            $coa->save();
            
            return response() -> json([
                'status'=>200,
                'message' => 'Account updated successfully'
            ]);
        }
        return response()->json(['error'=>$validator->errors()]);       
    }   

    public function store(Request $request){
        $messages = [
            'headname.required'  =>    "Head name is required."
        ];

        $validator = Validator::make($request->all(), [
            'headname' => 'required'
        ], $messages);

        if ($validator->passes()) {
            $coa = new ChartOfAccount;
            $coa->head_code             = $request->headcode;
            $coa->head_name             = $request->headname;
            $coa->parent_head             = $request->parenthead;
            $coa->parent_head_level             = $request->parentheadlevel;
            $coa->head_type             = $request->headtype;
            $coa->is_transaction        = $request->istransactionX;
            $coa->is_active             = $request->isactiveX;
            $coa->is_general_ledger     = $request->isglX;
            $coa->subscriber_id     = Auth::user()->subscriber_id;
            $coa->save();
            
            return response() -> json([
                'status'=>200,
                'message' => 'Account created successfully'
            ]);
        }
        return response()->json(['error'=>$validator->errors()]);       
    }

    public function getDataNew(Request $request, $headCode){
        $datas = ChartOfAccount::where([
            ['subscriber_id', Auth::user()->subscriber_id], 
            ['parent_head_level', $headCode]
        ])->latest()->first();

        // Log::info($datas);

        return response() -> json([
            'status'=>200,
            'message' => 'Success!',
            'data' => $datas
        ]);
    }
}
