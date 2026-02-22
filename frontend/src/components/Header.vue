<template>
  <header class="header">
    <div class="header__logo">
      <span class="header__img">🌊</span>
      <h1 class="header__name">IT-Baikal</h1>
    </div>
    <div class="header__author">
      <p class="header__author-name">Ерофеев Вячеслав</p>
      <div class="header__links">
        <a href="https://github.com/BymBu/IT-baikal/" class="header__author-github">GitHub</a>
        <a href="t.me/slepta" class="header__author-github">Телеграм</a>
      </div>

    </div>
  </header>
</template>

<style scoped>
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

.header__links {
  display: flex;
  gap: 5px;
}

.header__author {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;
  gap: 5px;
}

.header__author-github {
  color: var(--text);
}
</style>