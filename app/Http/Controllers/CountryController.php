<?php

namespace App\Http\Controllers;

use App\Services\CountryService;
use Illuminate\Http\JsonResponse;

class CountryController extends Controller
{
    public function __construct(private readonly CountryService $countryService)
    {
    }

    public function getCountries(): JsonResponse
    {
        $data = $this->countryService->getAllCountries();

        return response()->json($data);
    }
}

