<?php

namespace App\Http\Controllers;

use App\Models\Vat;

use App\Models\Leaf;

use App\Models\Batch;
use App\Models\Brand;
use App\Models\Price;
use App\Models\Store;

use App\Models\Product;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Supplier;
use App\Models\Inventory;
use App\Models\ProductUnit;
use App\Models\Subcategory;
use App\Models\ProductImage;
use App\Models\StoreProduct;
use Illuminate\Http\Request;
use App\Models\StoreInventory;


use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function create(){
        $categories = Category::where('subscriber_id', 1)->orWhere('subscriber_id', Auth::user()->subscriber_id)->get();
        // $subcategories = Subcategory::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $brands = Brand::where('subscriber_id', 1)->orWhere('subscriber_id', Auth::user()->subscriber_id)->get();
        $products = Product::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $discounts = Discount::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $taxs = Vat::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $suppliers = Supplier::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $batches = Batch::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $leaves = Leaf::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $units= ProductUnit::where('subscriber_id', Auth::user()->subscriber_id)->get();
        return view('product/product-add-new', ['categories' => $categories,
        'suppliers' => $suppliers, 'stores' => $stores, 'brands' => $brands, 'products' => $products, 'discounts'=> $discounts, 'tax'=>$taxs, 'stores'=>$stores, 'batches'=>$batches,'units'=>$units, 'leaves'=>$leaves]);
    }

    public function showSubcategory($id){
        $subcategory = Subcategory::where('category_id', $id)->get();
        $category = Category::find($id)->category_name;

        if($subcategory && $category){
            return response()->json([
                'status'=>200,
                'subcategory'=>$subcategory,
                'category'=>$category,
            ]);
        }
    }

    public function isTaxExcluded($id){

        $tax = Vat::where([
                ['taxName', $id],
                ['subscriber_id', Auth::user()->subscriber_id]
            ])->get();

        if($tax){
            return response()->json([
                'status'=>200,
                'tax'=>$tax,
            ]);
        }
    }

    public function showDiscount($id){

        $discount = Discount::where([
                ['id', $id],
                ['subscriber_id', Auth::user()->subscriber_id]
            ])->get();

        if($discount){
            return response()->json([
                'status'=>200,
                'discount'=>$discount,
            ]);
        }
    }

    public function store(Request $req){

            // $req =  json_decode($request['json']);
            // Log::info('Solved '.$req->productName);
            // Log::info('Json '.$request['json']);
            // Log::info('Image '.$request['image']);

            // return $request['image'];

        //PRODUCT-----------------------------------------------------------------------------------------------------------------

        $messages = [
            'productName.required'    =>   "Product name is required.",
            'productLabel.required'   =>   "Product label is required.",
            'brand.required'      =>   "Brand name is required.",
            'category.required'     =>   "Category is required.",
            'safety_stock.required'  =>   "Safty stock is required.",
            'measuringType.required'           =>   "Unit is required.",
            'productIncoming.required'=>   "Product incoming is required.",
            'mrp.required'            =>   "MRP number is required.",
            'price.required'          =>   "Purchase cost is required.",
            'purchase_date.required'   =>   "Purchase date is required.",
            // 'productName.unique'       =>   "Product already exists."
        ];

        $validator = Validator::make($req->all(), [
            'productName'    => 'required',
            'productLabel'   => 'required',
            'brand'      => 'required',
            'category'     => 'required',
            'safety_stock'  => 'required',
            'measuringType'           => 'required',
            'productIncoming'=> 'required',
            'mrp'            => 'required',
            'price'          => 'required',
            'purchase_date'   => 'required'
        ], $messages);

        if ($validator->passes()) {
            // Log::info('Success');
                $product = new Product;

                $product->productName               = $req->productName;
                $product->productLabel              = $req->productLabel;
                $product->brand                     = $req->brand;

                $product->category                  = $req->category;
                $product->category_name             = $req->category_name;

                $product->subcategory               = $req->subcategory;
                $product->subcategory_name          = $req->subcategory_name;

                $product->sku                       = $req->sku;
                $product->barcode                   = $req->barcode;
                $product->supplier	                = $req->supplier;

                if((int)$req->start_stock == NULL){
                    $product->start_stock      = 0;
                }else{
                    $product->start_stock	            = (int)$req->start_stock;
                }

                if((int)$req->safety_stock == NULL){
                    $product->safety_stock      = 0;
                }else{
                    $product->safety_stock	            = (int)$req->safety_stock;
                }

                if($req->shelf == NULL){
                    $product->shelf      = 0;
                }else{
                    $product->shelf	            = $req->shelf;
                }

                if($req->batchNumber == NULL){
                    $product->batch_number      = 0;
                }else{
                    $product->batch_number	            = $req->batchNumber;
                }

                $product->expiry_date	            = $req->expiryDate;

                $product->box_size	            = (int)$req->boxSize;

                $product->strength                     = $req->strength;


                $product->discount_type             = $req->discount_type;
                $product->available_discount        = $req->available_discount;

                if(doubleval($req->discount) == NULL){
                    $product->discount      = 0;
                }else{
                    $product->discount                  = doubleval($req->discount);
                }

                $product->offerItemId               = $req->offerItemId;
                $product->available_offer           = $req->available_offer;
                $product->freeItemName              = $req->freeItemName;

                if((int)$req->requiredQuantity == NULL){
                    $product->requiredQuantity      = 0;
                }else{
                    $product->requiredQuantity      = (int)$req->requiredQuantity;
                }

                if((int)$req->freeQuantity == NULL){
                    $product->freeQuantity          = 0;
                }else{
                    $product->freeQuantity          = (int)$req->freeQuantity;
                }

                $product->taxName                   = $req->taxName;
                $product->isExcludedTax             = $req->isExcludedTax;

                if(doubleval($req->tax) == NULL){
                    $product->tax      = 0;
                }else{
                    $product->tax                       = doubleval($req->tax);
                }

                $product->desc                      = $req->desc;

                $product->subscriber_id             = Auth::user()->subscriber_id;

                // $product->productImage              = $req->productImage;
                $product->unit              = $req->measuringType;

                $product->save();



            //INVENTORY------------------------------------------------------------------------------------------------------------

                $inventory = new Inventory;

                $total = 0;

                foreach($req->storeProducts as $storeProduct){
                    $total = $total + (int)$storeProduct['onHand'];
                }

                $inventory->onHand              = (int)$req->productIncoming - $total;

                if((int)$req->productIncoming == NULL){
                    $inventory->productIncoming     = 0;
                }else{
                    $inventory->productIncoming     = (int)$req->productIncoming;
                }

                if(doubleval($req->mrp) == NULL){
                $inventory->mrp      = 0;
                }else{
                    $inventory->mrp                 = doubleval($req->mrp);
                }

                $inventory->measuringType       = $req->measuringType;

                if(doubleval($req->price) == NULL){
                $inventory->price      = 0;
                }else{
                    $inventory->price               = doubleval($req->price);
                }

                $purchaseDateStr                = strtotime($req->purchase_date);
                $inventory->purchase_date       = date('Y-m-d', $purchaseDateStr);

                $inventory->productId           = $product->id;

                if($req->batchNumber == NULL){
                    $inventory->batch_number      = 0;
                }else{
                    $inventory->batch_number	            = $req->batchNumber;
                }

                $inventory->subscriber_id           = Auth::user()->subscriber_id;
                $inventory->save();

                //-----------------------------------------PRICE
                $price = new Price;
                $price->product_id = $product->id;
                $price->price = doubleval($req->price);
                $price->mrp = doubleval($req->mrp);
                $price->quantity = (int)$req->productIncoming;
                $price->subscriber_id = Auth::user()->subscriber_id;
                $price->store_id = 0;
                $price->product_in_num = 0;
                $price->batch_number = $req->batchNumber;

                $price->save();

                foreach($req->storeProducts as $storeProduct){



                    //STORE_INVENTORY------------------------------------------------------------------------------------------------------
                    $storeInventory = new StoreInventory;

                    if((int)$storeProduct['onHand'] == NULL){
                        $storeInventory->onHand             = 0;
                    }else{
                        $storeInventory->onHand             = (int)$storeProduct['onHand'];
                    }

                    if((int)$storeProduct['onHand'] == NULL){
                        $storeInventory->productIncoming        = 0;
                    }else{
                        $storeInventory->productIncoming        = (int)$storeProduct['onHand'];
                    }

                    if((int)$storeProduct['safety_stock'] == NULL){
                        $storeInventory->safety_stock       = 0;
                    }else{
                        $storeInventory->safety_stock       = (int)$storeProduct['safety_stock'];
                    }

                    if(doubleval($storeProduct['mrp']) == NULL){
                        $storeInventory->mrp                = 0;
                    }else{
                        $storeInventory->mrp                = doubleval($storeProduct['mrp']);
                    }

                    $storeInventory->measuringType          = $storeProduct['measuringType'];

                    if(doubleval($storeProduct['price']) == NULL){
                        $storeInventory->price              = 0;
                    }else{
                        $storeInventory->price              = doubleval($storeProduct['price']);
                    }

                    $storeInventory->productId              = $product->id;

                    $storeInventory->store_id               = (int)$storeProduct['store_id'];

                    if($req->batchNumber == NULL){
                        $storeInventory->batch_number      = 0;
                    }else{
                        $storeInventory->batch_number	            = $req->batchNumber;
                    }

                    $storeInventory->save();

                    $price = new Price;
                    $price->product_id = $product->id;
                    $price->price = doubleval($req->price);
                    $price->mrp = doubleval($req->mrp);
                    $price->quantity = (int)$req->productIncoming;
                    $price->subscriber_id = Auth::user()->subscriber_id;
                    $price->store_id = (int)$storeProduct['store_id'];
                    $price->product_in_num = 0;
                    $price->batch_number = $req->batchNumber;

                    $price->save();

            }

            return response() -> json([
                'status'=>200,
                'message' => 'Product added Successfully!'
            ]);
        }

        return response()->json(['error'=>$validator->errors()]);

    }

    public function imageStore(Request $request){
        $productImage = new ProductImage;

        if ($request -> hasFile('imagefile')) {
            $file = $request -> file ('imagefile');
            $extension = $file->getClientOriginalExtension();
            $size = $file->getSize();
            // $filename = time() . '.' .$file->getClientOriginalName();
            $filename = $file->getClientOriginalName();
            $file->move('uploads/products/', $filename);
            $productImage->imageName  = $filename;

            $productImage->imageExtension = $extension;
            $productImage->imageSize = $size;

            $productImage->save();
        }



        return response() -> json([
            'status'=>200,
            'imageName' => $filename,
            'message' => 'Product Image created Successfully!'
        ]);

    }

    public function imageUpdate(Request $request, $id){

       $imageId = Product::join('product_images', 'products.productImage', '=', 'product_images.imageName')
                            ->where([
                                ['products.id', $id],
                                ['products.subscriber_id', Auth::user()->subscriber_id]
                            ])
                            ->get(['product_images.id']);


        // Log::info($imageId);

       if($imageId->isEmpty()){

            return response() -> json([
                'status'=>200,
                'message' => 'Not Found'
            ]);

        }else{

            foreach($imageId as $p){
                $i =  $p->id;
            }

            $productImage = ProductImage::find($i);

            if ($request -> hasFile('imagefile')) {

                $path = 'uploads/products/'.$productImage->imageName;
                if(File::exists($path)){
                    File::delete($path);
                }

                $file = $request -> file ('imagefile');
                $extension = $file->getClientOriginalExtension();
                $size = $file->getSize();
                $filename = time() . '.' .$file->getClientOriginalName();
                // $filename = $file->getClientOriginalName();
                $file->move('uploads/products/', $filename);
                $productImage->imageName  = $filename;

                $productImage->imageExtension = $extension;
                $productImage->imageSize = $size;

            }

            $productImage->save();

            $product = Product::find($id);
            $product->productImage = $filename;
            $product->save();

            return response() -> json([
                'status'=>200,
                'imageName' => $filename,
                'message' => 'Product Image updated Successfully!'
            ]);
        }

    }


    public function listView(){
        return view('product/product-list');
    }

    public function list(Request $request){

        // $data = Product::join('inventories', 'products.id', '=', 'inventories.productId')
        // ->where([
        //             ['products.subscriber_id', Auth::user()->subscriber_id]
        //         ])
        // ->get(['products.*', 'inventories.*']);

        // if($request -> ajax()){
        //     return response()->json([
        //         'product'=>$data,
        //     ]);
        // }

        $columns = array(
                    0 =>'id',
                    1 =>'productName',
                    2=> 'productLabel',
                    3=> 'brand',
                    4=> 'category_name',
                    5=> 'strength',
                );

        $totalData = Product::where('subscriber_id', Auth::user()->subscriber_id)->count();
        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $product = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if(empty($request->input('search.value'))){
            $products = Product::where('subscriber_id', Auth::user()->subscriber_id)
                ->offset($start)
                ->limit($limit)
                ->orderBy('productName', 'asc')
                ->get();

        }else{
            $search = $request->input('search.value');

            $products = Product::where('subscriber_id', Auth::user()->subscriber_id)
                    ->where('productName','LIKE',"%{$search}%")
                    ->offset($start)
                    ->limit($limit)
                    ->orderBy($product,$dir)
                    ->get();

            $totalFiltered = Product::where('subscriber_id', Auth::user()->subscriber_id)
                            ->where('productName','LIKE',"%{$search}%")
                            ->count();
        }

        $data = array();

        if(!empty($products))
        {
            foreach ($products as $product)
            {
                $nestedData['id'] = $product->id;
                $nestedData['productName'] = $product->productName;
                $nestedData['productLabel'] = $product->productLabel;
                $nestedData['brand'] = $product->brand;
                $nestedData['category_name'] = $product->category_name;
                $nestedData['strength'] = $product->strength;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
                    "draw"            => intval($request->input('draw')),
                    "recordsTotal"    => intval($totalData),
                    "recordsFiltered" => intval($totalFiltered),
                    "data"            => $data
                );

        return json_encode( $json_data);


    }

    public function defaultListView(){
        return view('product/default-product-list');
    }

    public function defaultList(Request $request){

        $columns = array(
                    0 =>'id',
                    1 =>'productName',
                    2=> 'productLabel',
                    3=> 'brand',
                    4=> 'category_name',
                    5=> 'strength',
                );

        $totalData = Product::where('subscriber_id', 1)->count();
        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $product = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if(empty($request->input('search.value'))){
            $products = Product::where('subscriber_id', 1)
                ->offset($start)
                ->limit($limit)
                ->orderBy('productName', 'asc')
                ->get();

        }else{
            $search = $request->input('search.value');

            $products = Product::where('subscriber_id', 1)
                    ->where('productName','LIKE',"%{$search}%")
                    ->offset($start)
                    ->limit($limit)
                    ->orderBy($product,$dir)
                    ->get();

            $totalFiltered = Product::where('subscriber_id', 1)
                            ->where('productName','LIKE',"%{$search}%")
                            ->count();
        }

        $data = array();

        if(!empty($products))
        {
            foreach ($products as $product)
            {
                $nestedData['id'] = $product->id;
                $nestedData['productName'] = $product->productName;
                $nestedData['productLabel'] = $product->productLabel;
                $nestedData['brand'] = $product->brand;
                $nestedData['category_name'] = $product->category_name;
                $nestedData['strength'] = $product->strength;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
                    "draw"            => intval($request->input('draw')),
                    "recordsTotal"    => intval($totalData),
                    "recordsFiltered" => intval($totalFiltered),
                    "data"            => $data
                );

        return json_encode( $json_data);
    }

    public function edit(Request $request, $id){
        $categories = Category::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $subcategories = Subcategory::all();
        $brands = Brand::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $products = Product::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $suppliers = Supplier::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $tax = Vat::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $batches = Batch::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $leaves = Leaf::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $units = ProductUnit::where('subscriber_id', Auth::user()->subscriber_id)->get();
        $p = Product::find($id);

        $data = Product::join('inventories', 'products.id', '=', 'inventories.productId')
                        ->where([
                            ['products.id', $id],
                            ['products.subscriber_id', Auth::user()->subscriber_id],
                            ['inventories.subscriber_id', Auth::user()->subscriber_id]
                        ])
                        ->get(['products.*', 'inventories.*']);

        if($request -> ajax()){
            return response()->json([
                'status'=>200,
                'product'=>$data,
            ]);
        }

        return view('product/product-edit', ['categories' => $categories, 'subcategories' => $subcategories,
            'brands' =>$brands, 'units' => $units, 'products' => $products, 'p' => $p, 'suppliers' => $suppliers, 'tax' => $tax, 'batches'=>$batches, 'leaves'=>$leaves ]);
    }

    public function update(Request $req, $id){

        $messages = [
            'productname.required'    =>   "Product name is required.",
            'productlabel.required'   =>   "Product label is required.",
            'productbrand.required'      =>   "Brand name is required.",
            'categoryid.required'     =>   "Category is required.",
            'startingstock.required'  =>   "Starting stock is required.",
            'unit.required'           =>   "Unit is required.",
            'productincoming.required'=>   "Product incoming is required.",
            'sellingprice.required'            =>   "MRP number is required.",
            'purchasecost.required'          =>   "Purchase cost is required.",
            'purchasedate.required'   =>   "Purchase date is required.",
            // 'productName.unique'       =>   "Product already exists."
        ];

        $validator = Validator::make($req->all(), [
            'productname'    => 'required',
            'productlabel'   => 'required',
            'productbrand'      => 'required',
            'categoryid'     => 'required',
            'startingstock'  => 'required',
            'unit'           => 'required',
            'productincoming'=> 'required',
            'sellingprice'            => 'required',
            'purchasecost'          => 'required',
            'purchasedate'   => 'required'
        ], $messages);

        if ($validator->passes()) {

            $product = Product::find($id);

            //PRODUCT-----------------------------------------------------------------------------------------------------------------

            $product->productName               = $req->productname;
            $product->productLabel              = $req->productlabel;
            $product->brand                     = $req->productbrand;

            $product->category                  = $req->categoryid;

            $category = Category::find($req->categoryid);
            $product->category_name             = $category->category_name;

            $product->subcategory               = (int)$req->subcategory;
            $product->subcategory_name          = $req->subcategory_name;

            $product->sku                       = $req->sku;
            $product->barcode                   = $req->barcode;
            $product->supplier	                = $req->supplier;

            if((int)$req->startingstock == NULL){
                $product->start_stock      = 0;
            }else{
                $product->start_stock	            = (int)$req->startingstock;
            }

            if((int)$req->safetystock == NULL){
                $product->safety_stock      = 0;
            }else{
                $product->safety_stock	            = (int)$req->safetystock;
            }

            $product->shelf                     = $req->shelf;
            $product->batch_number              = $req->batchnumber;
            $product->expiry_date               = $req->expirydate;
            $product->box_size                  = $req->boxsize;
            //---------------------------
            $product->strength                  = $req->strength;

            // $product->color                     = $req->color;
            // $product->size                      = $req->size;

            $product->discount_type             = $req->discounttype;
            $product->available_discount        = $req->availablediscount;

            if(doubleval($req->discount) == NULL){
                $product->discount      = 0;
            }else{
                $product->discount                  = doubleval($req->discount);
            }

            $product->offerItemId               = $req->offeritemid;
            $product->available_offer           = $req->availableoffer;

            $freeItemName = Product::find($req->offeritemid);
            // Log::info($freeItemName);

            if($freeItemName == null){
                $freeItem = 'NULL';
            }else{
                $freeItem = $freeItemName->productName;
            }

            $product->freeItemName              = $freeItem;

            if((int)$req->requiredquantity == NULL){
                $product->requiredQuantity      = 0;
            }else{
                $product->requiredQuantity      = (int)$req->requiredquantity;
            }

            if((int)$req->freequantity == NULL){
                $product->freeQuantity          = 0;
            }else{
                $product->freeQuantity          = (int)$req->freequantity;
            }

            $product->taxName                   = $req->taxname;
            $product->isExcludedTax             = $req->taxexcluded;

            if(doubleval($req->tax) == NULL){
                $product->tax      = 0;
            }else{
                $product->tax                       = doubleval($req->tax);
            }

            $product->desc                      = $req->desc;

            $product->subscriber_id             = Auth::user()->subscriber_id;

            // $product->productImage             = $req->productImage;

            $product->save();



        //INVENTORY------------------------------------------------------------------------------------------------------------

            $productId = Product::join('inventories', 'products.id', '=', 'inventories.productId')
                                ->where([
                                    ['products.id', $id],
                                    ['products.subscriber_id', Auth::user()->subscriber_id]
                                ])
                                ->get(['inventories.id']);

           // Log::info($productId);

            foreach($productId as $p){
                $inventoryId = $p->id;
            }

            $inventory = Inventory::find($inventoryId);

            $total = 0;


            if((int)$req->productincoming == NULL){
            $inventory->onHand      = 0;
            }else{
                $inventory->onHand     = (int)$req->productincoming;
            }

            if((int)$req->productincoming == NULL){
            $inventory->productIncoming      = 0;
            }else{
                $inventory->productIncoming     = (int)$req->productincoming;
            }

            if(doubleval($req->sellingprice) == NULL){
                $inventory->mrp      = 0;
            }else{
                $inventory->mrp                 = doubleval($req->sellingprice);
            }

            $inventory->measuringType       = $req->unit;

            if(doubleval($req->purchasecost) == NULL){
                $inventory->price      = 0;
            }else{
                $inventory->price               = doubleval($req->purchasecost);
            }

            $purchaseDateStr                = strtotime($req->purchasedate);
            $inventory->purchase_date       = date('Y-m-d', $purchaseDateStr);

            $inventory->productId           = $id;

            $inventory->subscriber_id           = Auth::user()->subscriber_id;
            $inventory->save();


            $imageId = Product::join('product_images', 'products.productImage', '=', 'product_images.imageName')
                            ->where([
                                ['products.id', $id],
                                ['products.subscriber_id', Auth::user()->subscriber_id]
                            ])
                            ->get(['product_images.id']);


            // Log::info($imageId);

            if($imageId->isEmpty()){
                $productImage = new ProductImage;

                if ($req -> hasFile('imagefile')) {
                    $file = $req -> file ('imagefile');
                    $extension = $file->getClientOriginalExtension();
                    $size = $file->getSize();
                    // $filename = time() . '.' .$file->getClientOriginalName();
                    $filename = $file->getClientOriginalName();
                    $file->move('uploads/products/', $filename);
                    $productImage->imageName  = $filename;

                    $productImage->imageExtension = $extension;
                    $productImage->imageSize = $size;

                    $productImage->save();

                    $product1 = Product::find($id);
                    $product1->productImage = $filename;
                    $product1->save();
                }



            }else{

                foreach($imageId as $p){
                    $i =  $p->id;
                }

                $productImage = ProductImage::find($i);

                if ($req -> hasFile('imagefile')) {

                    $path = 'uploads/products/'.$productImage->imageName;
                    if(File::exists($path)){
                        File::delete($path);
                    }

                    $file = $req -> file ('imagefile');
                    $extension = $file->getClientOriginalExtension();
                    $size = $file->getSize();
                    $filename = time() . '.' .$file->getClientOriginalName();
                    // $filename = $file->getClientOriginalName();
                    $file->move('uploads/products/', $filename);
                    $productImage->imageName  = $filename;

                    $productImage->imageExtension = $extension;
                    $productImage->imageSize = $size;
                    $productImage->save();

                    $product1 = Product::find($id);
                    $product1->productImage = $filename;
                    $product1->save();
                }

            }

            return response() -> json([
                'status'=>200,
                'message' => 'Product updated successfully!'
            ]);
        }

        return response()->json(['error'=>$validator->errors()]);
    }

    public function destroy($id){
        Product::find($id)->delete($id);

        return redirect('product-list')->with('status', 'Deleted successfully!');
    }

}
