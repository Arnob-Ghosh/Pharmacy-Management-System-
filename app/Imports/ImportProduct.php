<?php

namespace App\Imports;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\ProductUnit;
use App\Models\Subcategory;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

// class ImportProduct implements ToModel
class ImportProduct implements ToCollection, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    // public function model(array $row)
    // {
    //     return new Product([
    //         //
    //     ]);
    // }

    public function collection(Collection $rows)
    {

        Validator::make($rows->toArray(), [
             '*.product_name' => 'required',
             '*.generic_name' => 'required',
             '*.brand' => 'required',
             '*.category_name' => 'required',
             '*.safety_stock' => 'required',
             '*.measuring_type' => 'required'
         ])->validate();

        foreach ($rows as $row)
        {
            if($row['subcategory_name']==''){
                $product = Product::where([
                    ['productName',$row['product_name']],
                    ['category_name',$row['category_name']]
                    ])->first();
            }
            else{
                $product = Product::where([
                    ['productName',$row['product_name']],
                    ['category_name',$row['category_name']],
                    ['subcategory_name',$row['subcategory_name']],
                    ])->first();
            }

            if(empty($product)){
                $brand = Brand::where('brand_name',$row['brand'])->first();
                if(empty($brand))
                {
                    $brand = new Brand;
                    $brand->brand_name = $row['brand'];
                    $brand->subscriber_id = Auth::user()->subscriber_id;
                    $brand->save();
                }

                $category = Category::where('category_name',$row['category_name'])->first();
                if(empty($category))
                {
                    $category = new Category;
                    $category->category_name = $row['category_name'];
                    $category->subscriber_id = Auth::user()->subscriber_id;
                    $category->save();
                }
                $subcategoryId=0;
                if($row['subcategory_name']!=''){
                    $subcategory = Subcategory::where([
                        ['subcategory_name',$row['subcategory_name']],
                        ['category_id',$category->id],
                        ])->first();
                    if(empty($subcategory))
                    {
                        $subcategory = new Subcategory;
                        $subcategory->subcategory_name = $row['subcategory_name'];
                        $subcategory->category_id = $category->id;
                        $subcategory->save();
                    }
                    $subcategoryId=$subcategory->id;
                }
                if($row['subcategory_name']!=''){
                    $supplier = Supplier::where('name',$row['supplier'])->first();
                    if(empty($supplier))
                    {
                        $supplier = new Supplier;
                        $supplier->name = $row['supplier'];
                        $supplier->subscriber_id = Auth::user()->subscriber_id;

                        $suppliers = Supplier::where([
                            ['subscriber_id', Auth::user()->subscriber_id]
                        ])->first();

                    if($suppliers){
                            $suppliers = Supplier::where([
                                ['subscriber_id', Auth::user()->subscriber_id]
                            ])->latest()->first();
                            $supplier->head_code = (int)$suppliers->head_code + 1;
                        }else{
                            $supplier->head_code = (50101 * 1000) + 1;
                        }

                        $supplier->save();
                    }
                }

                $unit = ProductUnit::where('name',$row['measuring_type'])->first();
                if(empty($unit))
                {
                    $unit = new ProductUnit;
                    $unit->name = $row['measuring_type'];
                    $unit->subscriber_id = Auth::user()->subscriber_id;
                    $unit->user_id = Auth::user()->id;
                    $unit->save();
                }
                $product = Product::create([
                    'productName'       => $row['product_name'],
                    'productLabel'      => $row['generic_name'],
                    'brand'             => $row['brand'],
                    'category'          => $category->id,
                    'category_name'     => $row['category_name'],
                    'subcategory'       => $subcategoryId,
                    'subcategory_name'  => $row['subcategory_name'],
                    'sku'               => $row['sku'],
                    'barcode'           => $row['barcode'],
                    'supplier'          => $row['supplier'],
                    'start_stock'       => 0,
                    'safety_stock'      => $row['safety_stock'],
                    'shelf'             => $row['shelf'],
                    'batch_number'      => $row['batch_number'],
                    'expiry_date'       => $row['expiry_date'],
                    'box_size'          => $row['box_size'],
                    'strength'          => $row['strength'],
                    'unit'              => $row['measuring_type'],
                    'subscriber_id'     => Auth::user()->subscriber_id,

                ]);
            }
        }
    }
}
