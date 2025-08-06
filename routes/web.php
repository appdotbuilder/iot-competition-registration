<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

// Team registration routes (public)
Route::controller(TeamController::class)->group(function () {
    Route::get('/teams/register', 'create')->name('teams.create');
    Route::post('/teams', 'store')->name('teams.store');
});

// Admin routes (authenticated)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    
    Route::resource('teams', TeamController::class)->except(['create', 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
