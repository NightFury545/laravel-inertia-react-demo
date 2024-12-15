<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/movies', function () {
    return Inertia::render('Movies');
});

Route::get('/weather', function () {
    return Inertia::render('Weather');
});

Route::get('/movies', function () {
    return Inertia::render('Movies');
});

Route::prefix('api')->group(function () {
    Route::get('/countries/{countryCode}/cities', [CityController::class, 'getCitiesByCountry']);
    Route::get('/weather/{city}/week', [WeatherController::class, 'getWeeklyWeather']);
    Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);
    Route::get('/movies/{title}', [MovieController::class, 'getMovieByTitle']);
    Route::get('/countries', [CountryController::class, 'getCountries']);
});
