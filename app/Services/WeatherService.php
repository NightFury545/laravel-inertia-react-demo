<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    public function __construct(private readonly string $apiKey)
    {
    }

    public function getWeather($city): ?array
    {
        $response = Http::get("http://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$this->apiKey}&units=metric&lang=ua");

        if ($response->successful()) {
            return [
                'temperature' => $response->json()['main']['temp'],
                'description' => $response->json()['weather'][0]['description'],
                'humidity' => $response->json()['main']['humidity'],
                'wind_speed' => $response->json()['wind']['speed'],
                'pressure' => $response->json()['main']['pressure'],
                'clouds' => $response->json()['clouds']['all'],
            ];
        }

        return null;
    }

    public function getWeeklyWeather($city): ?array
    {
        $response = Http::get("http://api.openweathermap.org/data/2.5/forecast?q={$city}&appid={$this->apiKey}&units=metric&cnt=7&lang=ua");

        if ($response->successful()) {
            $data = $response->json();
            $forecast = [];

            foreach ($data['list'] as $day) {
                $forecast[] = [
                    'date' => date('Y-m-d', $day['dt']), // Дата
                    'temperature' => $day['main']['temp'], // Температура
                    'description' => $day['weather'][0]['description'], // Опис погоди
                    'humidity' => $day['main']['humidity'], // Вологість
                    'wind_speed' => $day['wind']['speed'], // Швидкість вітру
                    'pressure' => $day['main']['pressure'], // Тиск
                    'clouds' => $day['clouds']['all'], // Хмарність
                ];
            }

            return $forecast;
        }

        return [];
    }
}
