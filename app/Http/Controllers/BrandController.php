<?php

namespace App\Http\Controllers;

use Log;

use App\Models\Brand;
use App\Models\Subscriber;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function create(){
        return view('brand/brand-add');
    }

    public function store(Request $req){

        $messages = [
            'brandname.required'  =>    "Brand name is required.",
            'brandname.unique'  =>    "Brand already in exists.",
            'brandorigin.required'  =>    "Brand origin is required.",
        ];

        $validator = Validator::make($req->all(), [
            'brandname' => 'required',
            'brandname' => 'unique:brands,brand_name',
            'brandorigin' => 'required',
        ], $messages);

        if ($validator->passes()) {
            $brand = new Brand;

            $brand->subscriber_id                 = Auth::user()->subscriber_id;
            $brand->brand_name                    = $req->brandname;
            $brand->brand_origin                    = $req->brandorigin;

            if ($req -> hasFile('brandlogo')) {
                $file = $req -> file ('brandlogo');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' .$extension;
                $file->move('uploads/brands/', $filename);
                $brand->brand_logo = $filename;
            }


            $brand->save();

            return response() -> json([
                'status'=>200,
                'message' => 'Brand created Successfully!'
            ]);
        }

        return response()->json(['error'=>$validator->errors()]);

    }

    public function listView(){
        return view('brand/brand-list');
    }

    public function list(Request $request){

        $brand = Brand::where('subscriber_id', Auth::user()->subscriber_id)->get();

        if($request -> ajax()){
            return response()->json([
                'brand'=>$brand,
            ]);
        }
    }

    public function defaultListView(){
        return view('brand/default-brand-list');
    }

    public function defaultList(Request $request){

        $brand = Brand::where('subscriber_id', 1)->get();

        if($request -> ajax()){
            return response()->json([
                'brand'=>$brand,
            ]);
        }
    }

    public function edit($id){
        $brand = Brand::find($id);

        if($brand){
            return response()->json([
                'status'=>200,
                'brand'=>$brand,

            ]);
        }
    }

    public function update(Request $req, $id){

        $messages = [
            'brandname.required'  =>    "Brand name is required.",
            'brandorigin.required'  =>    "Brand origin is required.",
        ];

        $validator = Validator::make($req->all(), [
            'brandname' => 'required',
            'brandorigin' => 'required',
        ], $messages);

        if ($validator->passes()) {
            $brand = Brand::find($id);

            $brand->brand_name                    = $req->brandname;
            $brand->brand_origin                    = $req->brandorigin;

            if ($req -> hasFile('brandlogo')) {

                $path = 'uploads/brands/'.$brand->brand_logo;
                if(File::exists($path)){
                    File::delete($path);
                }

                $file = $req -> file ('brandlogo');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' .$extension;
                $file->move('uploads/brands/', $filename);
                $brand->brand_logo = $filename;
            }

            $brand->save();

            return response() -> json([
                'status'=>200,
                'message' => 'Brand updated successfully'
            ]);
        }
        return response()->json(['error'=>$validator->errors()]);

    }

    public function destroy($id){
        Brand::find($id)->delete($id);

        return redirect('brand-list')->with('status', 'Deleted successfully!');
    }
}
