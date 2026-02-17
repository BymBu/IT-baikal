<?php

namespace App\Http\Controllers;

use App\Services\WaterLevelService;

class WaterController extends Controller
{



    public function dashboard()
    {

        $service = app(WaterLevelService::class);
        $data = $service->getCurrentLevel();

        return response()->json([
            'success' => true,
            'timestamps' => now()->format('Y-m-d H:i:s'),
            'data' => [
                'water' => $data,
                'air' => 101,
                'tourism' => 10,
                'actions' => 'Почистить байкал'
            ]
        ], 200);
    }
}
