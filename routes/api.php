<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\DivisiController;
use App\Http\Controllers\InstagramController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisiMisiController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [AuthController::class, 'login']);
Route::prefix('/public')->group(function () {
    Route::post('/home/resource', [PageController::class, 'HomeData']);
});

Route::post('/check', [AuthController::class, 'CheckUser']);
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::prefix('user')->group(function () {
        Route::post('/', [UserController::class, 'index']);
        Route::post('/store', [UserController::class, 'store']);
        Route::post('{uuid}/edit', [UserController::class, 'show']);
        Route::post('{uuid}/update', [UserController::class, 'update']);
        Route::delete('{uuid}/delete', [UserController::class, 'delete']);
    });
});