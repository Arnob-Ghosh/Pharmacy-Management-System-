<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;


class ProductImageController extends Controller
{
    public function image($imageName){
        // $path = public_path().'/uploads/products/'.$imageName;
        $path = '/home/bikroyik/public_html/pharmacy/uploads/products/'.$imageName;
        return Response::download($path);        
    }
}
