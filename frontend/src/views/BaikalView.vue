<template>
  <div class="app-container">
    <HeaderComponent />
    <div class="bottom-section">
      <SidebarComponent @select-point="handlePointSelect" />
      <main class="content" ref="container" @wheel.prevent="handleWheel" @mouseup="handleMouseUp"
        @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave"></main>
    </div>

    <Transition name="fade">
      <div 
        v-if="showTooltipFlag && currentMarker"
        class="marker-tooltip"
        :style="{ left: tooltipPosition.x + 'px', top: tooltipPosition.y + 'px' }"
      >
        <h3>{{ currentMarker.name }}</h3>
        <p>💨 Воздух: {{ currentMarker.airQuality }}</p>
        <p>💧 Вода: {{ currentMarker.waterQuality }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeaderComponent from '../components/Header.vue'
import SidebarComponent from '../components/Sidebar.vue'
import { useThreeScene } from '../composables/useThreeScene'
import { useCameraControls } from '../composables/useCameraControls'
import { useMarkers } from '../composables/useMarkers'

const container = ref(null)

const threeState = ref({
  scene: null,
  camera: null,
  renderer: null
})

const points = [
  { id: 1, name: 'Центр', position: [23, 3, 0], airQuality: 1020, waterQuality: 100 },
  { id: 2, name: 'Угол 1', position: [-30, 3, 40], airQuality: 98, waterQuality: 95 },
  { id: 3, name: 'Угол 2', position: [10, 3, -40], airQuality: 100, waterQuality: 97 },
]

const { initScene } = useThreeScene(container, threeState)
const {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel
} = useCameraControls(threeState)


const { currentMarker, tooltipPosition, showTooltipFlag, createMarkers, highlightMarker, checkIntersections, dispose: disposeMarkers } = useMarkers(threeState)


const onMouseMoveForRaycaster = (event) => {
  if (threeState.value.camera && threeState.value.scene) {
    checkIntersections(event)
  }
}

const handleMouseLeave = () => {
  checkIntersections({ clientX: 0, clientY: 0 })
}

onMounted(() => {
  console.log('🔧 Инициализация...')
  initScene()

  setTimeout(() => {
    if (threeState.value.scene) {
      console.log('📌 Создаем маркеры...')
      createMarkers(points)
    } else {
      console.error('❌ Сцена не создана!')
    }
  }, 500)

  if (container.value) {
    container.value.addEventListener('mousemove', onMouseMoveForRaycaster)
  }
})

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

.content {
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: var(--bg);
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 20px 35px -8px rgba(0,0,0,0.4);
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>