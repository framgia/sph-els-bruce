<?php

use App\Http\Controllers\CatergoryController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|

*/
//public routes
Route::post('/register', [UsersController::class, 'register']);
Route::post('/login', [UsersController::class, 'login']);


//Protect routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/', UsersController::class);
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::get('/dashboard', [UsersController::class, 'index']);

    Route::post('/admin/create-word', [WordController::class, 'store']);
    Route::get('/admin/get-lesson/{id}', [LessonController::class, 'select']);


    Route::post('/create-result', [ResultController::class, 'create']);

    Route::get('/view-lesson/{id}', [LessonController::class, 'index']);
    Route::post('/admin/create-lesson', [LessonController::class, 'create']);


    Route::post('/admin/create-category', [CatergoryController::class, 'create']);
    Route::get('/admin/view-category', [CatergoryController::class, 'index']);

    Route::get('/admin/edit-category/{id}', [CatergoryController::class, 'edit']);

    Route::put('/admin/update-category/{id}', [CatergoryController::class, 'update']);
    Route::delete('/admin/delete-category/{id}', [CatergoryController::class, 'destroy']);
});
