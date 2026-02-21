import * as THREE from "three";
import { ref } from "vue";

export function useMarkers(threeState) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let sprites = [];

  const currentMarker = ref(null);
  const tooltipPosition = ref({ x: 0, y: 0 });
  const showTooltipFlag = ref(false);

  const createMarkerTexture = (name, quality) => {
    let color = "#3B82F6";
    if (quality > 1000) color = "#EF4444";
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Хитбокс невидимый
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fill();

    // кружок
    ctx.beginPath();
    ctx.arc(128, 128, 35, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 15;
    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = "bold 18px Montserrat";
    ctx.fillStyle = "white";
    ctx.shadowBlur = 0;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, 128, 128);

    return new THREE.CanvasTexture(canvas);
  };

  const createMarkers = (points) => {
    if (!threeState.value?.scene) {
      console.error("❌ Сцена не доступна!");
      return;
    }

    const scene = threeState.value.scene;
    console.log("📌 Создаем маркеры в сцене:", scene);

    sprites.forEach((sprite) => scene.remove(sprite));
    sprites = [];

    points.forEach((point) => {
      const texture = createMarkerTexture(point.name, point.airQuality);

      const material = new THREE.SpriteMaterial({
        map: texture,
        depthTest: true,
        depthWrite: false,
        transparent: true,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(
        point.position[0],
        point.position[1],
        point.position[2],
      );
      sprite.scale.set(15, 15, 15);
      sprite.renderOrder = 1;

      sprite.userData = {
        id: point.id,
        name: point.name,
        airQuality: point.airQuality,
        waterQuality: point.waterQuality,
        type: "marker",
      };

      scene.add(sprite);
      sprites.push(sprite);
    });

    console.log(`✅ Создано ${sprites.length} маркеров`);
  };

  const checkIntersections = (event) => {
    if (
      !threeState.value?.camera ||
      !threeState.value?.scene ||
      sprites.length === 0
    ) {
      return;
    }

    const camera = threeState.value.camera;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(sprites);

    if (intersects.length > 0) {
      const sprite = intersects[0].object;
      console.log("🎯 Ховер на:", sprite.userData);

      showTooltipFlag.value = true;
      currentMarker.value = sprite.userData;
      tooltipPosition.value = { x: event.clientX, y: event.clientY };

      // Подсветка текущего
      sprite.scale.set(15, 15, 15);

      sprites.forEach((s) => {
        if (s !== sprite) {
          sprite.scale.set(15, 15, 15);
        }
      });
    } else {
      showTooltipFlag.value = false;
      currentMarker.value = null;

      sprites.forEach((s) => {
        sprite.scale.set(15, 15, 15);
      });
    }
  };

  const highlightMarker = (id) => {
    console.log("✨ Подсветка маркера:", id);
    sprites.forEach((sprite) => {
      if (sprite.userData.id === id) {
        sprite.scale.set(15, 15, 15);
      } else {
        sprite.scale.set(15, 15, 15);
      }
    });
  };

  // Функция для очистки
  const dispose = () => {
    if (threeState.value?.scene) {
      sprites.forEach((sprite) => threeState.value.scene.remove(sprite));
    }
    sprites = [];
  };

  return {
    currentMarker,
    tooltipPosition,
    showTooltipFlag,
    createMarkers,
    checkIntersections,
    highlightMarker,
    dispose,
  };
}
