<?php

namespace App\Providers;

use App\Services\CityService;
use App\Services\CountryService;
use App\Services\MovieService;
use App\Services\WeatherService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CityService::class, function () {
            return new CityService(config('services.rapid.key'));
        });

        $this->app->singleton(WeatherService::class, function () {
            return new WeatherService(config('services.weather.key'));
        });

        $this->app->singleton(CountryService::class, function () {
            return new CountryService();
        });

        $this->app->singleton(MovieService::class, function () {
            return new MovieService(config('services.movie.key'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
