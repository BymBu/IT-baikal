import { ref } from 'vue'
import * as THREE from 'three'

export function useCameraControls(threeState) {
  const isDragging = ref(false)
  const lastX = ref(0)
  const lastY = ref(0)
  const moveSpeed = 0.5
  const zoomSpeed = 0.2
  
  const forward = new THREE.Vector3()
  const right = new THREE.Vector3()
  const up = new THREE.Vector3(0, 1, 0)

  const handleMouseDown = (e) => {
    isDragging.value = true
    lastX.value = e.clientX
    lastY.value = e.clientY
    console.log('🖱️ Mouse down', isDragging.value)
  }

  const handleMouseMove = (e) => {
    if (!isDragging.value || !threeState.value?.camera) {
      return
    }

    const deltaX = e.clientX - lastX.value
    const deltaY = e.clientY - lastY.value
    
    const camera = threeState.value.camera

    camera.getWorldDirection(forward)
    right.crossVectors(forward, up).normalize()

    if (e.shiftKey) {
      camera.position.y -= deltaY * moveSpeed * 0.1
    } else if (e.ctrlKey) {
      camera.position.addScaledVector(forward, -deltaY * moveSpeed * 0.1)
    } else {
      camera.position.addScaledVector(right, -deltaX * moveSpeed * 0.1)
      camera.position.addScaledVector(up, deltaY * moveSpeed * 0.1)
    }

    camera.lookAt(camera.position.clone().add(forward))

    lastX.value = e.clientX
    lastY.value = e.clientY
  }

  const handleMouseUp = () => {
    isDragging.value = false
    console.log('🖱️ Mouse up')
  }

  const handleWheel = (e) => {
    if (!threeState.value?.camera) return
    const camera = threeState.value.camera
    camera.getWorldDirection(forward)
    camera.position.addScaledVector(forward, e.deltaY * zoomSpeed * -0.1)
  }

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel
  }
}