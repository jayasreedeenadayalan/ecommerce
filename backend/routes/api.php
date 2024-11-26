<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*$Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::post('createProduct',[ProductController::class,'addProduct']);
Route::get('list',[ProductController::class,'list']);
Route::get('edit/{id}',[ProductController::class,'viewProduct']);
Route::put('update/{id}',[ProductController::class,'update']);
Route::post('changeStatus',[ProductController::class,'changeStatus']);
Route::get('searchProduct/{key}',[ProductController::class,'searchProduct']);
