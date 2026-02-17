<?php

use App\Http\Controllers\DashBoardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/dashboard', [DashBoardController::class, 'dashboard']);