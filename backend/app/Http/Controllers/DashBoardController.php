<?php

namespace App\Http\Controllers;

use App\Services\AirService;
use App\Services\WaterLevelService;

class DashBoardController extends Controller
{



    public function dashboard()
    {

        $water = app(WaterLevelService::class);
        $air = app(AirService::class);

        $dataWater = $water->getCurrentLevel();
        $dataAir = $air->getCurrentLevel();

        return response()->json([
            'success' => true,
            'timestamps' => now()->format('Y-m-d H:i:s'),
            'data' => [
                'water' => $dataWater,
                'air' => $dataAir,
                'tourism' => 10,
                'actions' => 'Почистить байкал'
            ]
        ], 200);
    }
}
