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

      <main class="content" ref="container"></main> <!-- Убрал placeholder -->

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const container = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(50, 50, 50)
  camera.lookAt(0, -5, 0)
  
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // Свет
  scene.add(new THREE.DirectionalLight(0xffffff, 1))
  scene.add(new THREE.AmbientLight(0x404040))

  // Модель
  new GLTFLoader().load('/models/baikal.glb', (gltf) => {
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
}

.header {
  height: 60px;
  background-color: rgb(242, 244, 245);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
  z-index: 10;
}

.bottom-section {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  z-index: 5;
}

.content {
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #87CEEB; /* Временный фон пока не загрузится three */
}

/* Стили для canvas чтоб занимал всю область */
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
}

button {
  padding: 10px;
  cursor: pointer;
  background: #eee;
  border: none;
  border-radius: 5px;
  width: 100%;
  transition: background 0.3s;
}

button:hover {
  background: #ddd;
}
</style>