<?php

namespace App\Http\Controllers;

use App\Services\AirService;
use App\Services\TourismService;
use App\Services\WaterLevelService;

class DashBoardController extends Controller
{



    public function dashboard()
    {

        $water = app(WaterLevelService::class);
        $air = app(AirService::class);
        $tourism = app(TourismService::class);

        $dataWater = $water->getCurrentLevel();
        $dataAir = $air->getCurrentLevel();
        $dataTourism = $tourism->getCurrentLevel();

        return response()->json([
            'success' => true,
            'timestamps' => now()->format('Y-m-d H:i:s'),
            'data' => [
                'water' => $dataWater,
                'air' => $dataAir,
                'tourism' => $dataTourism,
                'actions' => 'Почистить байкал'
            ]
        ], 200);
    }
}
