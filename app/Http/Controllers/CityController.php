<?php

namespace App\Http\Controllers;

use App\Services\CityService;
use Illuminate\Http\JsonResponse;

class CityController extends Controller
{
    public function __construct(private readonly CityService $cityService)
    {
    }

    public function getCitiesByCountry($countryCode): JsonResponse
    {
        $data = $this->cityService->getCitiesByCountry($countryCode);

        return response()->json($data);
    }
}

