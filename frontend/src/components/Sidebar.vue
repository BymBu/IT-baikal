<template>
  <aside class="sidebar">
    <nav>
      <button @click="$emit('select-point', 1)">💧 Вода</button>
      <button @click="$emit('select-point', 2)">🌬️ Воздух</button>
      <button @click="$emit('select-point', 3)">👥 Туристы</button>
      <button @click="$emit('select-point', 4)">📅 Ивенты</button>
    </nav>
  </aside>
</template>

<script setup>
defineEmits(['select-point'])
</script>

<style scoped>
.sidebar {
  background-color: var(--bgSoft);
  border-right: 1px solid var(--bgHard);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  z-index: 100;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  width: 550px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--bgHard);
  transition: all 0.3s ease;
}

.sidebar nav {
  display: flex;
  gap: 10px;
}

button {
  padding: 12px 16px;
  cursor: pointer;
  background: var(--bg);
  border: none;
  border-radius: 12px;
  width: 100%;
  transition: all 0.2s ease;
  color: var(--text);
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
}

button:hover {
  background: var(--bgHard);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--bgHard);
}

button:active {
  transform: translateY(0);
}

/* ===== АДАПТИВ ===== */

/* Планшеты */
@media (max-width: 1024px) {
  .sidebar {
    width: 480px;
    top: 75px;
    padding: 18px;
  }

  button {
    padding: 10px 14px;
    font-size: 14px;
  }
}

/* Маленькие планшеты */
@media (max-width: 768px) {
  .sidebar {
    width: calc(100% - 20px);
    max-width: 500px;
    top: 70px;
    padding: 15px;
    margin: 8px;
  }

  .sidebar nav {
    gap: 8px;
  }

  button {
    padding: 10px 12px;
    font-size: 14px;
  }
}

/* Большие телефоны */
@media (max-width: 600px) {
  .sidebar {
    width: calc(100% - 16px);
    top: 65px;
    padding: 12px;
    margin: 6px;
    border-radius: 12px;
  }

  .sidebar nav {
    flex-wrap: wrap;
  }

  button {
    flex: 1 1 calc(50% - 4px);
    padding: 10px;
    font-size: 13px;
    white-space: nowrap;
  }
}

/* Твои 360px */
@media (max-width: 360px) {
  .sidebar {
    width: calc(100% - 12px);
    top: 60px;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
  }

  .sidebar nav {
    gap: 5px;
  }

  button {
    flex: 1 1 100%;
    padding: 8px;
    font-size: 12px;
    justify-content: flex-start;
  }

  button:last-child {
    margin-bottom: 0;
  }
}

/* Самые маленькие */
@media (max-width: 320px) {
  .sidebar {
    padding: 8px;
  }

  button {
    padding: 6px;
    font-size: 11px;
  }
}
</style>