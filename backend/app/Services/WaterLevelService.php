<?php

namespace App\Services;

class WaterLevelService
{

    public function getCurrentLevel()
    {
        return [
            'level' => round(rand(45554, 45785) / 100, 2),
            'unit' => 'm',
            'status' => $this->getStatus(rand(45554, 45785) / 100),
            'updated_at' => now()->format('Y-m-d H:i:s')
        ];
    }

    private function getStatus($level)
    {
        if ($level < 456.0) return 'low';
        if ($level < 457.0) return 'normal';
        return 'high';
    }

}
