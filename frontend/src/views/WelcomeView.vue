<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <main class="welcome">
        <div class="content">
            <h2 class="welcome__subtitle">❄️ Добро пожаловать</h2>
            <h1 class="welcome__title">IT-Baikal</h1>
            <p class="welcome__description">Цифровая экосистема озера Байкал</p>
            <RouterLink to="/baikal">
                <button class="btn">
                    <span>Открыть</span>
                    <span class="btn__arrow">→</span>
                </button>
            </RouterLink>
        </div>
        <div class="ice-decoration"></div>
    </main>
</template>

<style scoped>
.welcome {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.welcome::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(/img/baikal.jpg);
    background-size: cover;
    background-position: center;
    filter: blur(8px) brightness(0.7);
    transform: scale(1.1);
    z-index: -2;
}

.welcome::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 20, 30, 0.4) 0%, rgba(0, 40, 60, 0.2) 100%);
    z-index: -1;
}

.content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    animation: fadeUp 1s ease;
}

.welcome__subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    opacity: 0.9;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.welcome__title {
    font-size: 8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #fff 0%, #a8d8ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 5px 30px rgba(0, 160, 255, 0.3);
    letter-spacing: 4px
}

.welcome__description {
    font-size: 1.25rem;
    opacity: 0.8;
    margin-bottom: 2rem;
    font-weight: 300;
    letter-spacing: 1px;
}

.btn {
    position: relative;
    padding: 1.2rem 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 60px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
    z-index: -1;
}

.btn:hover {
    border-color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn:hover::before {
    width: 300px;
    height: 300px;
}

.btn__arrow {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
}

.btn:hover .btn__arrow {
    transform: translateX(5px);
}

.ice-decoration {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg, transparent 0%, rgba(200, 230, 255, 0.1) 100%);
    clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 30%);
    z-index: 0;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* адаптив */
@media (max-width: 768px) {
    .welcome__title {
        font-size: 4rem;
    }

    .welcome__subtitle {
        font-size: 1.2rem;
    }

    .btn {
        padding: 1rem 2rem;
        font-size: 1.1rem;
    }
}
</style>