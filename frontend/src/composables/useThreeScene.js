import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ref } from "vue";

export function useThreeScene(containerRef, threeState) {
  // переменная дня и ночи
  const day = ref(true);

  // инициализация
  const initScene = () => {
    console.log("🎬 Инициализация Three.js сцены...");

    // Сцена
    const scene = new THREE.Scene();

    // Камера
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(60, 50, 60);
    camera.lookAt(0, 0, 0);

    // Рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.value.appendChild(renderer.domElement);

    // Сохраняем в состояние
    threeState.value = {
      scene,
      camera,
      renderer,
    };

    // Установка фона и света
    setupBackground(scene, day.value);
    setupLights(scene, day.value);

    // Смена дня и ночи каждые 60сек
    setInterval(() => {
      day.value = !day.value;
    }, 60000);

    // Модель
    loadModel(scene);

    // Анимация
    animate(renderer, scene, camera);

    console.log("✅ Сцена инициализирована!", threeState.value);
  };

  // Функция установки фона
  const setupBackground = (scene) => {
    const canvas = Object.assign(document.createElement("canvas"), {
      width: 2,
      height: 512,
    });
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, 512);

    grad.addColorStop(0, "#9BC5E4");
    grad.addColorStop(0.4, "#F6E5C3");
    grad.addColorStop(0.7, "#FFDAB9");
    grad.addColorStop(1, "#FFE4E1");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2, 512);

    scene.background = new THREE.CanvasTexture(canvas);
  };

  // Функция установки света
  const setupLights = (scene) => {
    const oldLights = [];
    scene.traverse((object) => {
      if (object.isLight) {
        oldLights.push(object);
      }
    });
    oldLights.forEach((light) => scene.remove(light));

    scene.fog = null;

    const ambientLight = new THREE.AmbientLight(0xffe4e1, 1.2);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffeedd, 1.0);
    frontLight.position.set(0, 20, 30);
    scene.add(frontLight);

    const sunLight = new THREE.DirectionalLight(0xffdab9, 1.8);
    sunLight.position.set(10, 30, 20);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0x6688aa, 0.5);
    backLight.position.set(-10, 10, -20);
    scene.add(backLight);

    scene.fog = new THREE.Fog(0xdde39f, 50, 200);
  };

  // Загрузка модели
  const loadModel = (scene) => {
    const loader = new GLTFLoader();
    loader.load(
      "/models/baikal.glb",
      (gltf) => {
        console.log("✅ Модель загружена!");
        scene.add(gltf.scene);
      },
      (progress) => {
        console.log(
          "📊 Прогресс:",
          Math.round((progress.loaded / progress.total) * 100) + "%",
        );
      },
      (error) => {
        console.error("❌ Ошибка загрузки модели:", error);
      },
    );
  };

  // Анимация three.js
  const animate = (renderer, scene, camera) => {
    const animateLoop = () => {
      requestAnimationFrame(animateLoop);
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    animateLoop();
  };

  return {
    initScene,
    day,
  };
}
