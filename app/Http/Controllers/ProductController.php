<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    public function showProducts(Request $request) 
    {
    	if ($request->has('category_id')) {
			$products = Product::where('category', $request->input('category_id'))->get();
    	} else {
    		$products = Product::all();
    	}
    	
    	return response()->json($products);  	
    }
}
