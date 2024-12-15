<?php

namespace App\Http\Controllers;

use App\Services\MovieService;
use Illuminate\Http\JsonResponse;

class MovieController extends Controller
{
    public function __construct(private readonly MovieService $movieService)
    {
    }

    public function getMovieByTitle(string $title): JsonResponse
    {
        $data = $this->movieService->getMovieByTitle($title);

        return response()->json($data);
    }
}
