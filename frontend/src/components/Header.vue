<template>
  <header class="header">
    <!-- Левая часть с лого -->
    <div class="header__logo">
      <span class="header__icon" role="img" aria-label="Логотип">🌊</span>
      <span class="header__brand">IT-Baikal</span>
    </div>

    <!-- Правая часть с автором -->
    <div class="header__user">
      <span class="header__name">Вячеслав Ерофеев</span>
      <div class="header__social">
        <a 
          href="https://github.com/BymBu/IT-baikal/" 
          class="header__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <span class="header__link-icon">📦</span>
          <span class="header__link-text">GitHub</span>
        </a>
        <a 
          href="https://t.me/slepta" 
          class="header__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <span class="header__link-icon">✈️</span>
          <span class="header__link-text">Telegram</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 70px;
  background: var(--bgSoft);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-radius: 20px;
  margin: 12px 12px 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--bgHard);
}

/* Левая часть */
.header__logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__icon {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 160, 255, 0.2));
}

.header__brand {
  font-size: 25px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--text) 0%, var(--text) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

/* Правая часть */
.header__user {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header__name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  opacity: 0.9;
  padding-right: 16px;
  border-right: 1px solid var(--bgHard);
}

.header__social {
  display: flex;
  gap: 8px;
}

.header__link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--bg);
  border-radius: 40px;
  text-decoration: none;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.header__link:hover {
  background: var(--bgHard);
  transform: translateY(-1px);
  border-color: var(--bgHard);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.header__link-icon {
  font-size: 16px;
  opacity: 0.8;
}

.header__link-text {
  line-height: 1;
}

/* Адаптив */
@media (max-width: 360px) {
  .header {
    height: auto !important;
    min-height: 50px;
    padding: 8px 12px !important;
    margin: 6px 6px 0 !important;
    flex-wrap: wrap;
    gap: 8px;
  }

  .header__logo {
    gap: 6px;
  }

  .header__icon {
    font-size: 22px !important;
  }

  .header__brand {
    font-size: 16px !important;
  }

  .header__user {
    gap: 8px !important;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .header__social {
    gap: 4px !important;
  }

  .header__link {
    padding: 4px 8px !important;
    font-size: 11px !important;
    gap: 4px !important;
  }

  .header__link-icon {
    font-size: 12px !important;
  }
}

@media (max-width: 320px) {
  .header__brand {
    font-size: 14px !important;
  }

  .header__link-text {
    display: none;
  }

  .header__link {
    padding: 6px !important;
  }
}

</style>