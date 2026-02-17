<?php

namespace App\Services;

class ActionsService 
{
    public function getCurrentLevel()
    {
        $allActions = [
            [
                'id' => 1,
                'title' => 'Субботник «Чистый берег»',
                'type' => 'cleanup',
                'location' => 'пос. Листвянка',
                'date' => '2026-03-15',
                'description' => 'Сбор мусора на побережье после зимнего сезона.',
                'icon' => '🧹'
            ],
            [
                'id' => 2,
                'title' => 'Прием опасных отходов',
                'type' => 'recycling',
                'location' => 'г. Улан-Удэ, пл. Советов',
                'date' => '2026-03-10',
                'description' => 'Сдай батарейки и лампы безопасно для природы.',
                'icon' => '♻️'
            ],
            [
                'id' => 3,
                'title' => 'Лекция «Тайны Байкала»',
                'type' => 'education',
                'location' => 'Онлайн',
                'date' => '2026-03-20',
                'description' => 'Встреча с учеными.',
                'icon' => '🎓'
            ],
            [
                'id' => 4,
                'title' => 'Высадка кедра',
                'type' => 'planting',
                'location' => 'Иволгинский район',
                'date' => '2026-04-05',
                'description' => 'Посадим 100 деревьев вместе!',
                'icon' => '🌲'
            ],
            [
                'id' => 5,
                'title' => 'Эко-патруль «Стоп-свалка»',
                'type' => 'monitoring',
                'location' => 'Ольхонский район',
                'date' => '2026-03-25',
                'description' => 'Рейд по популярным туристическим стоянкам.',
                'icon' => '👁️'
            ]
        ];

        $count = rand(1, 3);

        shuffle($allActions);

        $selectedActions = array_slice($allActions, 0, $count);

        foreach ($selectedActions as &$action) {
            // 80% шанс, что акция активна
            $action['is_active'] = (rand(1, 10) > 2); 
        }

        return $selectedActions;
    }
}