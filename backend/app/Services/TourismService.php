<?php

namespace App\Services;

class TourismService
{

    public function getCurrentLevel()
    {

        $locations = ['Ольхон', 'Байкальск', 'Малое море', 'Листвянка'];
        $topLocation = $locations[array_rand($locations)];

        $loadPercent = rand(20, 60);

        $avgTemp = rand(-30, -15);

        $tip = '';
        if ($avgTemp < -25) {
            $tip = 'Холодно! Оденьтесь теплее.';
        } elseif ($topLocation === 'Байкальск') {
            $tip = 'Идеальные условия для катания на горных лыжах.';
        } else {
            $tip = 'Отличное время для экскурсий по прозрачному льду.';
        }

        return [
            'load_percent' => $loadPercent,
            'top_location' => $topLocation,
            'avg_temp_c' => $avgTemp,
            'visitor_tip' => $tip
        ];
    }
}
