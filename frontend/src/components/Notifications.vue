<template>
    <Transition name="slide-fade">
        <div v-if="store.visible" class="notification" :class="store.type">
            <div class="notification-content">
                <span class="icon">{{ icons[store.type] }}</span>
                <span class="message">{{ store.message }}</span>
            </div>
            <button class="close" @click="store.hide">✕</button>
        </div>
    </Transition>
</template>

<script setup>
import { useNotifications } from '@/stores/notifications';



const store = useNotifications()

const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
}


</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 300px;
  padding: 16px 20px;
  background: var(--bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  z-index: 9999;
  border-left: 4px solid;
  backdrop-filter: blur(10px);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 20px;
}

.message {
  color: var(--text);
  font-size: 14px;
}

.close {
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 16px;
  opacity: 0.7;
  padding: 0 5px;
}

.close:hover {
  opacity: 1;
}

/* Типы уведомлений */
.notification.success { border-left-color: #10b981; }
.notification.error { border-left-color: #ef4444; }
.notification.warning { border-left-color: #f59e0b; }
.notification.info { border-left-color: #3b82f6; }

/* Анимации */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>