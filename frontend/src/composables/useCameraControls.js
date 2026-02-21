import { ref } from "vue";
import * as THREE from "three";

export function useCameraControls(threeState) {
  const isDragging = ref(false);
  const lastX = ref(0);
  const lastY = ref(0);
  const moveSpeed = 0.5;
  const zoomSpeed = 0.2;

  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  const bounds = {
    minX: -10,
    maxX: 120,
    minY: 10,
    maxY: 100,
    minZ: -10,
    maxZ: 100,
  };

  const handleMouseDown = (e) => {
    isDragging.value = true;
    lastX.value = e.clientX;
    lastY.value = e.clientY;
    console.log("🖱️ Mouse down", isDragging.value);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.value || !threeState.value?.camera) {
      return;
    }

    const deltaX = e.clientX - lastX.value;
    const deltaY = e.clientY - lastY.value;

    const camera = threeState.value.camera;

    const oldPosition = camera.position.clone();

    camera.getWorldDirection(forward);
    right.crossVectors(forward, up).normalize();

    if (e.shiftKey) {
      camera.position.y -= deltaY * moveSpeed * 0.1;
    } else if (e.ctrlKey) {
      camera.position.addScaledVector(forward, -deltaY * moveSpeed * 0.1);
    } else {
      camera.position.addScaledVector(right, -deltaX * moveSpeed * 0.1);
      camera.position.addScaledVector(up, deltaY * moveSpeed * 0.1);
    }

    // Проверка границ
    
    if (
      camera.position.x < bounds.minX ||
      camera.position.x > bounds.maxX ||
      camera.position.y < bounds.minY ||
      camera.position.y > bounds.maxY ||
      camera.position.z < bounds.minZ ||
      camera.position.z > bounds.maxZ
    ) {
      camera.position.copy(oldPosition);
    } else {
      lastX.value = e.clientX;
      lastY.value = e.clientY;
    }
  };

  const handleMouseUp = () => {
    isDragging.value = false;
    console.log("🖱️ Mouse up");
  };

  const handleWheel = (e) => {
    if (!threeState.value?.camera) return;
    const camera = threeState.value.camera;
    const oldPosition = camera.position.clone();

    camera.getWorldDirection(forward);
    camera.position.addScaledVector(forward, e.deltaY * zoomSpeed * -0.1);

    // Проверка границ

    if (
      camera.position.x < bounds.minX ||
      camera.position.x > bounds.maxX ||
      camera.position.y < bounds.minY ||
      camera.position.y > bounds.maxY ||
      camera.position.z < bounds.minZ ||
      camera.position.z > bounds.maxZ
    ) {
      camera.position.copy(oldPosition);
    }
  };

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  };
}
