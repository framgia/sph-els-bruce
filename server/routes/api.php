<?php

use App\Http\Controllers\UsersController;
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
    Route::post('/dashboad', [UsersController::class]);
});
