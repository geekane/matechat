<template>
  <d-tooltip position="top" :content="$t('underDevelop')">
    <span class="container">
      <i class="icon-add"></i>
      <span>{{ $t("appendix") }}</span>
    </span>
  </d-tooltip>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  display: flex;
  gap: 4px;
  align-items: center;
  color: $devui-text;
  cursor: pointer;

  span {
    font-size: $devui-font-size-sm;
  }

  i {
    font-size: $devui-font-size-icon;
  }
}
</style>
