<template>
  <div class="carousel-container">
    <d-carousel ref="carousel" height="80%" arrowTrigger="never" :show-dots="false">
      <d-carousel-item class="d-carousel-item" v-for="(src, i) in items" :key="i">
        <img :src="src" />
      </d-carousel-item>
    </d-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref<string[]>([
  '/png/home/interact/1.png',
  '/png/home/interact/2.png',
  '/png/home/interact/3.png',
  '/png/home/interact/4.png',
  '/png/home/interact/5.png',
]);
const carousel = ref();

function go(i: number) {
  carousel.value?.goto?.(i);
}
defineExpose({ go });
</script>

<style lang="scss" scoped>
.carousel-container {
  width: 100%;
  height: 100%;
  .d-carousel-item {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
