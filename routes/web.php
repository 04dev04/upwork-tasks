<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

Auth::routes();

Route::get( '/', function () {
    return view('index');
})->where('any', '.*');

Route::get('/task/show', [TaskController::class, 'show'])->name('task.show');
Route::post('/task/create', [TaskController::class, 'create'])->name('task.add');
Route::delete('/task/delete/{id}', [TaskController::class, 'delete'])->name('task.delete');
Route::patch('/task/complete/{id}', [TaskController::class, 'complete'])->name('task.complete');