<template>
  <div class="app-container">
    <HeaderComponent />
    <div class="bottom-section">
      <SidebarComponent @select-point="handlePointSelect" />
      <div class="content-wrapper">
        <div class="night-overlay" :style="{ opacity: isNight ? 0.6 : 0 }"></div>
        <main class="content" ref="container" @wheel.prevent="handleWheel" @mouseup="handleMouseUp"
          @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave"></main>

      </div>
    </div>

    <Notifications />

    <Transition name="fade">
      <div v-if="showTooltipFlag && currentMarker" class="marker-tooltip"
        :style="{ left: tooltipPosition.x + 'px', top: tooltipPosition.y + 'px' }">

        <!-- Заголовок с иконкой в зависимости от типа -->
        <h3>
          <span v-if="currentMarker.type === 'water'">Уровень воды</span>
          <span v-if="currentMarker.type === 'air'">Качество воздуха</span>
          <span v-if="currentMarker.type === 'tourism'">Туризм</span>
          <span v-if="currentMarker.type === 'event'">События</span>
        </h3>

        <!-- ВОДА -->
        <template v-if="currentMarker.type === 'water'">
          <p>📶 Уровень: {{ currentMarker.data.level }}{{ currentMarker.data.unit }} </p>
          <p>📋 Статус: {{ currentMarker.data.status }}</p>
          <p>🔄️ Обновлено: {{ currentMarker.data.updated_at }}</p>
        </template>

        <!-- ВОЗДУХ -->
        <template v-else-if="currentMarker.type === 'air'">
          <p>AQI: {{ currentMarker.data.aqi }}</p>
          <p>PM2.5: {{ currentMarker.data.pm2_5 }}</p>
          <p>PM10: {{ currentMarker.data.pm10 }}</p>
          <p>no2: {{ currentMarker.data.no2 }}</p>
          <p>Статус: {{ currentMarker.data.status_level }}</p>
          <p class="health-message">⚠️ {{ currentMarker.data.health_message }}</p>
        </template>

        <!-- ТУРИЗМ -->
        <template v-else-if="currentMarker.type === 'tourism'">
          <p>👨 Загруженность: {{ currentMarker.data.load_percent }}%</p>
          <p>🌡️ Температура: {{ currentMarker.data.avg_temp_c }}°C</p>
          <p>🔝 Топ место: {{ currentMarker.data.top_location }}</p>
          <p class="tip">💡 {{ currentMarker.data.visitor_tip }}</p>
        </template>

        <!-- СОБЫТИЯ -->
        <template v-else-if="currentMarker.type === 'event'">
          <div class="event">
            <div v-for="action in currentMarker.data" class="event--wrapper">
              <p>{{ action.icon }} {{ action.title }}</p>
              <p>📍 {{ action.location }}</p>
              <p>📆 {{ action.date }}</p>
              <p class="description">{{ action.description }}</p>
            </div>
          </div>


        </template>

      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import HeaderComponent from '../components/Header.vue'
import SidebarComponent from '../components/Sidebar.vue'
import { useThreeScene } from '../composables/useThreeScene'
import { useCameraControls } from '../composables/useCameraControls'
import { useMarkers } from '../composables/useMarkers'
import Notifications from '@/components/Notifications.vue'
import { useNotifications } from '@/stores/notifications'

// Уведомления
const notify = useNotifications()

// контейнер с 3д моделью
const container = ref(null)

// обьекты three.js
const threeState = ref({
  scene: null,
  camera: null,
  renderer: null
})


const { initScene, day } = useThreeScene(container, threeState)

// Свойство для проверки дня и ночи
const isNight = computed(() => !day.value)

const {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel
} = useCameraControls(threeState)


const { currentMarker, tooltipPosition, showTooltipFlag, createMarkers, highlightMarker, checkIntersections, dispose: disposeMarkers } = useMarkers(threeState)

// Проверка наведения на маркер
const onMouseMoveForRaycaster = (event) => {
  if (threeState.value.camera && threeState.value.scene) {
    checkIntersections(event)
  }
}

// Спрятать наведение на маркер
const handleMouseLeave = () => {
  checkIntersections({ clientX: 0, clientY: 0 })
}

// При монтировании компонента инициализируем сцену
onMounted(() => {
  console.log('🔧 Инициализация...')
  initScene()

  if (container.value) {
    container.value.addEventListener('mousemove', onMouseMoveForRaycaster)
  }
})

// При размонтировании убрать за собой, оптимизация
onUnmounted(() => {
  if (container.value) {
    container.value.removeEventListener('mousemove', onMouseMoveForRaycaster)
  }
  disposeMarkers()
  if (threeState.value.renderer) {
    threeState.value.renderer.dispose()
  }
})

const handlePointSelect = (id) => {
  console.log('🎯 Выбран маркер:', id)
  highlightMarker(id)
  notify.show('Маркер добавлен!', 'success')
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: var(--bg);
  user-select: none;
}

.header {
  height: 60px;
  background-color: var(--bgSoft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid var(--bgHard);
  flex-shrink: 0;
  z-index: 10;
  border-radius: 15px;
  margin: 10px 10px 0px 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.bottom-section {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--bg);
}

.content :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

/* Маркеры */

.marker-tooltip {
  position: fixed;
  background: var(--bg);
  backdrop-filter: blur(12px);
  color: white;
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  z-index: 1000;
  transform: translate(15px, -50%);
  border-left: 5px solid #3B82F6;
  min-width: 200px;
}

.marker-tooltip h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.marker-tooltip p {
  margin: 4px 0;
  font-size: 14px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* анимация маркеров */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Обертка для тултипа событий */
.event {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* смена дня ночи */
.night-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  pointer-events: none;
  transition: opacity 3s ease;
  z-index: 2;
  border-radius: 15px;
}

@media (max-width: 1024px) {
  .header {
    padding: 0 15px;
    height: 55px;
  }

  .marker-tooltip {
    min-width: 180px;
    padding: 14px 20px;
  }

  .marker-tooltip h3 {
    font-size: 15px;
  }

  .marker-tooltip p {
    font-size: 13px;
  }
}

@media (max-width: 768px) {

  .header {
    height: 50px;
    padding: 0 12px;
    margin: 8px 8px 0;
  }

  .header__name {
    font-size: 20px;
  }

  .bottom-section {
    flex-direction: column;
    position: relative;
  }



  .sidebar nav {
    flex-wrap: wrap;
  }

  .sidebar button {
    flex: 1 1 auto;
    padding: 8px;
    font-size: 14px;
  }

  .content-wrapper {
    margin: 8px !important;
    height: calc(100vh - 130px);
  }

  .marker-tooltip {
    min-width: 160px;
    padding: 12px 16px;
    transform: translate(10px, -50%);
  }
}

@media (max-width: 600px) {
  .header {
    flex-wrap: wrap;
    height: auto;
    min-height: 50px;
    padding: 10px;
    gap: 10px;
  }

  .header__logo {
    width: 100%;
    justify-content: center;
  }

  .header__user {
    width: 100%;
    justify-content: center;
    gap: 15px;
  }

  .bottom-section {
    position: relative;
  }

  .sidebar {
    top: 80px !important;
    padding: 12px !important;
  }

  .sidebar button {
    font-size: 13px;
    padding: 6px;
  }

  .marker-tooltip {
    min-width: 150px;
    max-width: 220px;
    padding: 10px 14px;
  }

  .marker-tooltip h3 {
    font-size: 14px;
  }

  .marker-tooltip p {
    font-size: 12px;
    gap: 4px;
  }
}

@media (max-width: 360px) {
  .header {
    padding: 6px 8px;
    margin: 5px 5px 0;
  }

  .header__logo {
    gap: 5px;
  }

  .header__name {
    font-size: 18px;
  }

  .header__user {
    gap: 8px;
  }

  .header__link {
    padding: 4px 8px;
    font-size: 11px;
  }

  .sidebar {
    top: 70px !important;
    padding: 10px !important;
  }

  .sidebar button {
    font-size: 12px;
    padding: 5px;
  }

  .content-wrapper {
    margin: 5px !important;
    border-radius: 10px !important;
    height: calc(100vh - 110px);
  }

  .marker-tooltip {
    min-width: 140px !important;
    max-width: 200px !important;
    padding: 8px 12px !important;
    transform: translate(5px, -50%) !important;
  }

  .marker-tooltip h3 {
    font-size: 13px !important;
    margin-bottom: 4px !important;
  }

  .marker-tooltip p {
    font-size: 10px !important;
    margin: 2px 0 !important;
  }

  .event--wrapper p {
    font-size: 10px !important;
    word-break: break-word;
  }

  .night-overlay {
    border-radius: 10px !important;
  }
}

@media (max-width: 320px) {
  .header__link-text {
    display: none;
  }

  .header__link {
    padding: 6px;
  }

  .marker-tooltip {
    min-width: 130px !important;
    max-width: 160px !important;
    padding: 6px 10px !important;
  }

  .marker-tooltip h3 {
    font-size: 12px !important;
  }

  .marker-tooltip p {
    font-size: 9px !important;
  }
}
</style>