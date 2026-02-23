<template>
  <aside class="sidebar">
    <nav>
      <button @click="$emit('select-point', 1)">Центр</button>
      <button @click="$emit('select-point', 2)">Угол 1</button>
      <button @click="$emit('select-point', 3)">Угол 2</button>
    </nav>
  </aside>
</template>

<script setup>
defineEmits(['select-point'])
</script>

<style scoped>
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
  gap: 10px;
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