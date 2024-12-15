<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CityService
{
    public function __construct(private readonly string $apiKey)
    {
    }

    public function getCitiesByCountry(string $countryCode): array
    {
        $response = Http::withHeaders([
            'X-RapidAPI-Key' => $this->apiKey,
        ])->get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds={$countryCode}");

        if ($response->successful()) {
            return collect($response->json()['data'])->map(function ($city) {
                return [
                    'id' => $city['id'] ?? null,
                    'name' => $city['city'] ?? null,
                    'region' => $city['region'] ?? null,
                ];
            })->toArray();
        }

        return [];
    }
}
