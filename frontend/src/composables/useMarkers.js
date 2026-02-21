import * as THREE from 'three'

export function useMarkers(threeState) {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  let sprites = []

  const createMarkerTexture = (name, quality) => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')

    let color = '#3B82F6'
    if (quality > 1000) color = '#EF4444'
    
    ctx.beginPath()
    ctx.arc(64, 64, 50, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.shadowColor = 'rgba(0,0,0,0.5)'
    ctx.shadowBlur = 10
    ctx.fill()

    ctx.strokeStyle = 'white'
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.font = 'bold 20px Arial'
    ctx.fillStyle = 'white'
    ctx.shadowBlur = 0
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(name, 64, 64)

    return new THREE.CanvasTexture(canvas)
  }

  const createMarkers = (points) => {
    if (!threeState.value?.scene) {
      console.error('❌ Сцена не доступна!')
      return
    }
    
    const scene = threeState.value.scene
    console.log('📌 Создаем маркеры в сцене:', scene)
    
    sprites.forEach(sprite => scene.remove(sprite))
    sprites = []

    points.forEach(point => {
      const texture = createMarkerTexture(point.name, point.airQuality)
      
      const material = new THREE.SpriteMaterial({
        map: texture,
        depthTest: true,
        depthWrite: false,
        transparent: true,
      })
      
      const sprite = new THREE.Sprite(material)
      sprite.position.set(point.position[0], point.position[1], point.position[2])
      sprite.scale.set(5, 5, 1)
      sprite.renderOrder = 1

      sprite.userData = {
        id: point.id,
        name: point.name,
        type: 'marker',
        showInfo: false,

      }

      scene.add(sprite)
      sprites.push(sprite)
    })
    
    console.log(`✅ Создано ${sprites.length} маркеров`)
  }

  const checkIntersections = (event) => {
    if (!threeState.value?.camera || !threeState.value?.scene || sprites.length === 0) {
      return
    }

    const camera = threeState.value.camera

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    
    const intersects = raycaster.intersectObjects(sprites)

    if (intersects.length > 0) {
      const sprite = intersects[0].object
      console.log('🎯 Ховер на:', sprite.userData)
      
      // Подсветка текущего
      sprite.scale.set(6, 6, 1)

      sprites.forEach(s => {
        if (s !== sprite) {
          s.scale.set(5, 5, 1)
        }
      })
    } else {
      sprites.forEach(s => {
        s.scale.set(5, 5, 1)
      })
    }
  }

  const highlightMarker = (id) => {
    console.log('✨ Подсветка маркера:', id)
    sprites.forEach(sprite => {
      if (sprite.userData.id === id) {
        sprite.scale.set(6, 6, 1)
      } else {
        sprite.scale.set(5, 5, 1)
      }
    })
  }

  // Функция для очистки
  const dispose = () => {
    if (threeState.value?.scene) {
      sprites.forEach(sprite => threeState.value.scene.remove(sprite))
    }
    sprites = []
  }

  

  return {
    createMarkers,
    checkIntersections,
    highlightMarker,
    dispose
  }
}