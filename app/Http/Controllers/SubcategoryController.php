<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class SubcategoryController extends Controller
{
    public function create(){
        $categories = Category::where('subscriber_id', 1)->orwhere('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('subcategory/subcategory-add', ['categories' => $categories]);
    }

    public function store(Request $req){

        $messages = [
            'categoryid.required'  =>    "Category is required.",
            'subcategoryname.required'  =>    "Sub-category name is required.",
        ];

        $validator = Validator::make($req->all(), [
            'categoryid' => 'required',
            'subcategoryname' => 'required',
        ], $messages);

        if ($validator->passes()) {
            $subcategory = new Subcategory;

            $subcategory->category_id                 = $req->categoryid;
            $subcategory->subcategory_name            = $req->subcategoryname;

            $subcategory->save();

            return response() -> json([
                'status'=>200,
                'message' => 'Subcategory created Successfully!'
            ]);
        }

        return response()->json(['error'=>$validator->errors()]);

    }

    public function listView(){
        return view('subcategory/subcategory-list');

    }


public function list(Request $request){

    // $subcategory = Subcategory::all();
    $subcategory = Category::join('subcategories', 'categories.id', '=', 'subcategories.category_id')
        ->where('subcategories.created_by', Auth::user()->subscriber_id)
        // ->orwhere('categories.subscriber_id', Auth::user()->subscriber_id)
        ->get(['categories.*', 'subcategories.*']);

    // return $data;
    if($request -> ajax()){
        return response()->json([
            'subcategory'=>$subcategory,
        ]);
    }

}

public function defaultListView(){
    return view('subcategory/default-subcategory-list');

}

public function defaultList(Request $request){

    // $subcategory = Subcategory::all();
    $subcategory = Category::join('subcategories', 'categories.id', '=', 'subcategories.category_id')
        ->where('subcategories.created_by', 1)
        // ->orwhere('categories.subscriber_id', 1)
        ->get(['categories.*', 'subcategories.*']);

    // return $data;
    if($request -> ajax()){
        return response()->json([
            'subcategory'=>$subcategory,
        ]);
    }

}

    public function edit($id){
        $subcategory = Subcategory::find($id);

        if($subcategory){
            return response()->json([
                'status'=>200,
                'subcategory'=>$subcategory,

            ]);
        }
    }

    public function update(Request $req, $id){
        $messages = [
            'subcategoryname.required'  =>    "Sub-category name is required.",
        ];

        $validator = Validator::make($req->all(), [
            'subcategoryname' => 'required',
        ], $messages);

        if ($validator->passes()) {
            $subcategory = Subcategory::find($id);
            $subcategory->subcategory_name                 = $req->subcategoryname;

            $subcategory->save();

            return response() -> json([
                'status'=>200,
                'message' => 'Subcategory Data Updated Successfully'
            ]);
        }

        return response()->json(['error'=>$validator->errors()]);
    }

    public function destroy($id){
        Subcategory::find($id)->delete($id);

        return redirect('subcategory-list')->with('status', 'Deleted successfully!');
    }
}
