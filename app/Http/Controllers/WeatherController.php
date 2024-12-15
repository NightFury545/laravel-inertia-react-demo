<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    public function __construct(private readonly WeatherService $weatherService)
    {
    }

    public function getWeather($city): JsonResponse
    {
        $data = $this->weatherService->getWeather($city);

        return response()->json($data);
    }

    public function getWeeklyWeather($city): JsonResponse
    {
        $data = $this->weatherService->getWeeklyWeather($city);

        return response()->json($data);
    }
}
