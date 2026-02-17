<?php

use App\Http\Controllers\WaterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/dashboard', [WaterController::class, 'dashboard']);