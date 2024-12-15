<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class CountryService
{
    public function getAllCountries(): array|Collection
    {
        $response = Http::get('https://restcountries.com/v3.1/all?fields=name,cca2');
        if ($response->successful()) {
            return collect($response->json())->map(function ($country) {
                return [
                    'name' => $country['name']['common'],
                    'code' => $country['cca2']
                ];
            });
        }

        return [];
    }
}

