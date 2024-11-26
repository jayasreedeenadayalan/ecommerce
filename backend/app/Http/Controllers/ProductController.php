<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //create product method
    function addProduct(Request $req){
        if(!empty( $req->input('productname') ) && !empty( $req->input('price')) && !empty( $req->input('description'))){

            $product = new Product;
            $product->product_name = $req->input('productname');
            $product->product_price = $req->input('price');
            $product->product_description = $req->input('description');
            $product->product_url = $req->file('productUrl')->store('products');
            $product->status = 1;
            $product->save();


        }else{
            $product['message'] = 'input is missing';
        }
        return $product;


    }
    //To isplay the list of product
    function list(){

        return Product::all();
    }
    //delete Product
    function deleteProduct($id){
        if($id != ''){
            $delete = Product::where('id',$id)->delete();
            if($delete)
            $product["result"] = "Delete SuccessFully";
            else
            $product["result"] = "Operation failed";
        }else{
            $product["result"] = "Oops Something went wrong!!!";
        }
        return $product;
    }
    /*get the single product by using Id
      for edit
     */
    function viewProduct($id){
        if($id != ''){
            $result = Product::find($id);
            if(!empty($result)){
                $product = $result;

            }else{
                $product["result"] = "No Records Found!!";

            }

        }else{
            $product["result"] = "Oops Something went wrong!!!";
        }
        return $product;

    }
   /*update the edited product
      for edit
     */
    function update(Request $request,$id){
        $product = Product::find($id);
        $product->product_name = !empty($request->input('productname')) ? $request->input('productname') :$product->product_name;
        $product->product_price = !empty($request->input('price')) ? $request->input('price') :  $product->product_price;
        $product->product_description = !empty($request->input('description')) ?$request->input('description') :$product->product_description;
        if(!empty($request->file('productUrl'))
         ){
            $product->product_url = $request->file('productUrl')->store('products');

        }
        if($product->save()){
            return $product;
        }else{
            $product['result'] = "Product not updated";
            return $product;
        }

    }
    //change Status
    function changeStatus(Request $req){
        $id = $req->input("id");
        $status = $req->input("getstatus");
        if($status == "0"){
            $changeStatus = "1";
        }else{
            $changeStatus = "0";
        }
        if($id !="" && $status !=""){
            $product = Product::find($id);
            $product->status = $changeStatus;
            if($product->save()){
                $product['result'] = "status changed successfully";
            }else{
                $product['result'] = "oops something went wrong";
            }

        }else{
            $product['result'] = "oops something went wrong";
        }
        return $product;

    }
    // Search Product
    function SearchProduct($key){

        $result = Product::where("product_name","like","%$key%")->get();
        if(!empty($result)){
            return $result;

        }else{
            $result['data'] = "No Results Found!!";
            return $result;
        }

    }
}
