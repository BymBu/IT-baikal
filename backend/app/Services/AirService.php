<?php

namespace App\Services;

class AirService
{
    public function getCurrentLevel()
    {
        $pm25 = rand(35, 90);
        $pm10 = $pm25 + rand(20, 40);
        $aqi = rand(40, 90);

        // Определяем статус и сообщение динамически
        $status = 'good';
        $message = 'Воздух относительно чистый.';

        if ($aqi > 100) {
            $status = 'unhealthy';
            $message = 'Высокое загрязнение! Основная причина — частный сектор. Рекомендуется носить маску.';
        } elseif ($aqi > 50) {
            $status = 'moderate';
            $message = 'Умеренное загрязнение. Чувствительным группам стоит быть осторожнее.';
        }

        return [
            'aqi' => $aqi,
            'pm2_5' => round($pm25, 1),
            'pm10' => round($pm10, 1),
            'no2' => round(rand(20, 80) / 10, 1),
            'dominant_pollutant' => 'PM2.5',
            'health_message' => $message,
            'status_level' => $status
        ];
    }
}
