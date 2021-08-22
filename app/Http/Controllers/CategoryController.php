<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function showCategories(){

    	$categories = Category::all();
    	
    	return response()->json($categories);  	
    }
}
