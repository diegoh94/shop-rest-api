<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    public function allProducts(){

    	$products = Product::all();
    	
    	return response()->json($products);  	
    }

    public function productByCategory($category_id){

    	$categories = Category::all();
    	$products = Product::where('category', $category_id)->get();	

    	return response()->json([
    		'products' => $products,
    		'categories' => $categories,
    	]);  	
    }
}
