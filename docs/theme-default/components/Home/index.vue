<template>
  <div class="home-container">
    <Header :show-theme="false" :isScroll="isScroll"></Header>
    <MainComp class="main-container"></MainComp>
    <Suspense>
      <template #default>
        <div>
          <div class="intro-container">
            <GradualComp class="gradual-container"></GradualComp>
            <InteractComp class="interact-container"></InteractComp>
            <AIComp class="ai-container"></AIComp>
            <TypicalComp class="typical-container"></TypicalComp>
          </div>
          <div class="demo-container">
            <DemoComp class="comp-container"></DemoComp>
          </div>
          <Footer class="footer-container"></Footer>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { infinityTheme, galaxyTheme } from 'devui-theme';
import GradualComp from './GradualComp.vue'; // 体验无边界
import InteractComp from './InteractComp.vue'; // AI交互
import AIComp from './AIComp.vue'; // AI体验
import TypicalComp from './TypicalComp.vue'; // 组件展示
import DemoComp from './DemoComp.vue'; // 应用案例
import Footer from '../common/Footer.vue'; // 底部
import Header from '../common/Header.vue';
import MainComp from './MainComp.vue'; // 主页
import { themeServiceInstance } from '../../index';
import { ThemeKey } from '../datas/type';

const ThemeConfig = {
  [ThemeKey.Galaxy]: galaxyTheme,
  [ThemeKey.Infinity]: infinityTheme,
};
const isScroll = ref(false);

onMounted(() => {
  themeServiceInstance?.applyTheme(ThemeConfig[ThemeKey.Infinity]);
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  if (localStorage.getItem('theme') === ThemeKey.Galaxy) {
    themeServiceInstance?.applyTheme(ThemeConfig[ThemeKey.Galaxy]);
  }
  window.removeEventListener('scroll', onScroll);
});

function onScroll() {
  const imgs = document.querySelectorAll('img[data-src]');
  const videos = document.querySelectorAll('video[data-src]');
  imgs.forEach((img: any) => {
    const rect = img.getBoundingClientRect();
    if (rect.top < document.documentElement.clientHeight * 2) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
  videos.forEach((video: any) => {
    const rect = video.getBoundingClientRect();
    if (rect.top < document.documentElement.clientHeight * 2) {
      video.src = video.dataset.src;
      video.removeAttribute('data-src');
    }
  });

  isScroll.value = window.scrollY > 0;
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  min-width: 375px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-container {
  width: 100%;
  height: 100vh;
  background: no-repeat center/cover url(/png/home/bgHome.png);
}
.intro-container {
  width: 100%;
  height: 100%;
  background: no-repeat center/cover url(/png/home/introBg.png);

  .gradual-c0ntainer,
  .interact-container,
  .ai-container,
  .typical-container {
    width: 100%;
  }
}
.demo-container {
  width: 100%;
  height: 100%;
  padding-top: 84px;
  background: no-repeat center/cover url(/png/home/demoBg.png);
  .comp-container,
  .eco-container {
    width: 100%;
  }
}
.footer-container {
  width: 100%;
}

@media (max-width: 768px) {
  .main-container {
    height: auto;
    aspect-ratio: 1 / 1.5;
  }
  .demo-container {
    padding-top: 56px;
  }
}
</style>
