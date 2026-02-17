<?php

namespace App\Services;

class WaterLevelService
{

    public function getCurrentLevel()
    {
        $levelRaw = rand(45554, 45785) / 100;
        $level = round($levelRaw, 2);

        return [
            'level' => $level,
            'unit' => 'm',
            'status' => $this->getStatus($levelRaw),
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
