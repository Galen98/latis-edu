<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//dashboard
Route::get('/dashboard', [SiswaController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
//siswa
Route::get('/siswa', [SiswaController::class, 'create'])->middleware(['auth', 'verified'])->name('create.siswa');
Route::post('/siswa', [SiswaController::class, 'store'])->middleware(['auth', 'verified'])->name('store.siswa');
Route::get('/siswa/edit', [SiswaController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit.siswa');
Route::post('/siswa/update', [SiswaController::class, 'update'])->middleware(['auth', 'verified'])->name('update.siswa');
Route::post('/siswa/delete', [SiswaController::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete.siswa');

Route::middleware('auth')->group(function () {
    Route::get('/profiles', [ProfileController::class, 'editProfile'])->name('profile.edit');
    Route::post('/profiles', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
