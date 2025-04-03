<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Store;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Exports\ExportProduct;
use App\Imports\ImportProduct;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Imports\ImportProductIntoInventory;

class ProductExcelController extends Controller
{
     public function index(){
        $stores = Store::where('subscriber_id',Auth::user()->subscriber_id)->get();
        return view('product/product-excel',['stores' => $stores]);
    }

    public function demo(){
        $path = 'uploads/excel/demo.xlsx';
        $fileName = 'demo.xlsx';
        return Response::download($path, $fileName, ['Content-Type: application/xlsx']);
    }

    public function import(Request $request){

        $file = $request -> file ('file');
        if ($request->hasFile('file')) {
            $validator = Validator::make(
                [
                    'file'      => $file,
                    'extension' => strtolower($file->getClientOriginalExtension()),
                ],
                [
                    'extension'      => 'required|in:xlsx,csv',
                ]
            );

            if ($validator->fails()) {
                return back()->withErrors($validator);
            }

            if($request->addORin=='add')
            {
                Excel::import(new ImportProduct, $request->file('file')->store('files'));
                return redirect()->back();
            }
            elseif($request->addORin=='in')
            {
                Session::put('productInStore', $request->store);
                Excel::import(new ImportProductIntoInventory, $request->file('file')->store('files'));
                return redirect()->back();
            }

        }else{
            return Redirect::back()->withErrors(['msg' => 'File required! Please select a .xlsx file.']);
        }

    }

    public function export(Request $request){
        return Excel::download(new ExportProduct, 'products.xlsx');
    }
}
