<?php

namespace App\Http\Controllers;

use App\Services\ActionsService;
use App\Services\AirService;
use App\Services\TourismService;
use App\Services\WaterLevelService;

class DashBoardController extends Controller
{
    public function __construct(
        private WaterLevelService $waterService,
        private AirService $airService,
        private TourismService $tourismService,
        private ActionsService $actionsService
    ) {}

    public function dashboard()
    {
        $dataWater = $this->waterService->getCurrentLevel();
        $dataAir = $this->airService->getCurrentLevel();
        $dataTourism = $this->tourismService->getCurrentLevel();
        $dataActions = $this->actionsService->getCurrentLevel();

        return response()->json([
            'success' => true,
            'timestamp' => now()->format('Y-m-d H:i:s'),
            'data' => [
                'water' => $dataWater,
                'air' => $dataAir,
                'tourism' => $dataTourism,
                'actions' => $dataActions
            ]
        ]);
    }
}
