<template>
  <div class="app-container">

    <header class="header">
      <div class="header__logo">
        <span class="header__img">🌊</span>
        <h1 class="header__name">IT-Baikal</h1>
      </div>
      <div class="header__controls">Панель управления</div>
    </header>

    <div class="bottom-section">

      <aside class="sidebar">
        <nav>
          <button>Воздух</button>
          <button>Вода</button>
          <button>Туристы</button>
        </nav>
      </aside>

      

      <main class="content" ref="container" @wheel.prevent="handleWheel" @mouseup="handleMouseUp"
        @mousedown="handleMouseDown" @mousemove="handleMouseMove"></main>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const container = ref(null)
let camera, scene, renderer
let isDragging = false
let lastX = 0
let lastY = 0
let moveSpeed = 0.5
let zoomSpeed = 0.2

// Векторы направления камеры
let forward = new THREE.Vector3()
let right = new THREE.Vector3()
let up = new THREE.Vector3(0, 1, 0)

function handleMouseDown(e) {
  isDragging = true
  lastX = e.clientX
  lastY = e.clientY
}

function handleMouseMove(e) {
  if (!isDragging || !camera) return

  const deltaX = e.clientX - lastX
  const deltaY = e.clientY - lastY

  // Получаем направления камеры
  camera.getWorldDirection(forward)
  right.crossVectors(forward, up).normalize()

  // Движение в стороны и вперед/назад
  if (e.shiftKey) {
    // Shift + движение = движение вверх/вниз
    camera.position.y -= deltaY * moveSpeed * 0.1

  } else if (e.ctrlKey) {
    // Ctrl + движение = приближение/отдаление
    camera.position.addScaledVector(forward, -deltaY * moveSpeed * 0.1)

  } else {
    // Обычное движение = панорамирование
    camera.position.addScaledVector(right, -deltaX * moveSpeed * 0.1)
    camera.position.addScaledVector(up, deltaY * moveSpeed * 0.1)
  }

  // Камера всегда смотрит вперед
  camera.lookAt(camera.position.clone().add(forward))

  lastX = e.clientX
  lastY = e.clientY
}

function handleMouseUp() {
  isDragging = false
}

function handleWheel(e) {
  if (!camera) return

  // Приближение к курсору мыши
  camera.getWorldDirection(forward)
  camera.position.addScaledVector(forward, e.deltaY * zoomSpeed * -0.1)
}

onMounted(() => {
  // сцена
  scene = new THREE.Scene()

  // камера, рендер
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(60, 50, 60)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)


  // фон, градиент через canvas
  // renderer.setClearColor('#F1F5F9')
  const canvas = Object.assign(document.createElement('canvas'), { width: 2, height: 512 })
  const ctx = canvas.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 0, 512)

  grad.addColorStop(0, '#9BC5E4')
  grad.addColorStop(0.4, '#F6E5C3')
  grad.addColorStop(0.7, '#FFDAB9')
  grad.addColorStop(1, '#FFE4E1')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 2, 512)

  scene.background = new THREE.CanvasTexture(canvas)
  container.value.appendChild(renderer.domElement)

  // Свет
  const ambientLight = new THREE.AmbientLight(0x404060)
  scene.add(ambientLight)

  // Основной солнечный свет
  const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.2)
  sunLight.position.set(10, 30, 20)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  scene.add(sunLight)

  // Заполняющий свет сзади
  const backLight = new THREE.DirectionalLight(0x6688aa, 0.5)
  backLight.position.set(-10, 10, -20)
  scene.add(backLight)

  // Туман
  scene.fog = new THREE.Fog(0xdde39f, 50, 200)

  // Модель Байкала
  new GLTFLoader().load('/models/baikal.glb', (gltf) => {
    gltf.scene.traverse((node) => {

    })
    scene.add(gltf.scene)
  })


  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})
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

.sidebar {
  width: 550px;
  background-color: var(--bgSoft);
  border-right: 1px solid var(--bgHard);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  z-index: 5;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  width: 550px;
}

.sidebar nav {
  display: flex;
  justify-content: space-between;
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

.header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: var(--text);
}

.header__controls {
  color: var(--text);
}

button {
  padding: 10px;
  cursor: pointer;
  background: var(--bg);
  border: none;
  border-radius: 5px;
  width: 100%;
  transition: background 0.3s;
  color: var(--text);
}

button:hover {
  background: var(--bgHard);
}
</style>