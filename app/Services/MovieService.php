<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class MovieService
{
    public function __construct(private readonly string $apiKey)
    {
    }
    public function getMovieByTitle(string $title): array|Collection|null
    {
        $response = Http::get("http://www.omdbapi.com/?apikey={$this->apiKey}&t={$title}");
        if ($response->successful()) {
            $movie = $response->json();

            if (isset($movie['Title'])) {
                return [
                    'title' => $movie['Title'],
                    'year' => $movie['Year'],
                    'genre' => $movie['Genre'],
                    'director' => $movie['Director'],
                    'actors' => $movie['Actors'],
                    'plot' => $movie['Plot'],
                    'poster' => $movie['Poster'],
                    'imdbID' => $movie['imdbID'],
                    'rating' => $movie['imdbRating'],
                    'runtime' => $movie['Runtime'],
                    'language' => $movie['Language'],
                    'country' => $movie['Country'],
                ];
            }
        }

        return null;
    }
}
