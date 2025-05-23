<template>
    <div class="mc-code-block" :class="themeClass">
      <div class="mc-code-block-header" v-if="!$slots.header">
        <span class="mc-code-lang">{{ language }}</span>
        <slot name="actions">
          <div class="mc-code-block-actions">
            <div class="mc-action-btn mc-toggle-btn" @click="toggleExpand">
              <img src="./asset/all-collapse.svg" />
            </div>
            <div class="mc-action-btn mc-copy-btn" @click="copyCode">
              <img v-if="!copied" src="./asset/copy-new.svg" />
              <img v-else src="./asset/right.svg">
            </div>
          </div>
        </slot>
      </div>
      <slot name="header" v-else></slot>
      <Transition
      name="collapse-transition"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @leave="leave"
      @afterLeave="afterLeave"
      >
        <div v-if="expanded">
          <pre v-if="!$slots.content"><code :class="`hljs language-${language}`" v-html="highlightedCode"></code></pre>
          <slot v-else name="content"></slot>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, type RendererElement } from 'vue';
  import hljs from 'highlight.js';
  import { debounce } from 'lodash-es';
  import { MDCardService } from './MDCardService';
  
  const props = defineProps({
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: ''
    },
    blockIndex: {
      type: Number,
      required: true
    },
    theme: {
      type: String,
      default: 'light'
    }
  });
  
  const mdCardService = new MDCardService();
  
  const expanded = ref(true);
  const copied = ref(false);
  
  const highlightedCode = computed(() => {
    if (props.language && hljs.getLanguage(props.language)) {
      try {
        return hljs.highlight(props.code, { language: props.language }).value;
      } catch (_) {}
    }
    return mdCardService.filterHtml(props.code);
  });
  
  const toggleExpand = () => {
    expanded.value = !expanded.value;
  };
  
  const copyCode = debounce((e: Event) => {
    const target = e.target as HTMLElement;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.code);
    } else {
      const textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.style.zIndex = '-1';
      textarea.value = props.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    target.classList.remove('icon-copy-new');
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  }, 300);
  
  const beforeEnter = (el: RendererElement) => {
    if (!el.dataset) {
      el.dataset = {};
    }
    if (el.style.height) {
      el.dataset.height = el.style.height;
    }
    el.style.maxHeight = 0;
  };
  const enter = (el: RendererElement) => {
    requestAnimationFrame(() => {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.dataset.height) {
        el.style.maxHeight = el.dataset.height;
      } else if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = 0;
      }
      el.style.overflow = 'hidden';
    });
  };
  const afterEnter = (el: RendererElement) => {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset.oldOverflow;
  };
  const beforeLeave = (el: RendererElement) => {
    if (!el.dataset) {
      el.dataset = {};
    }
    el.dataset.oldOverflow = el.style.overflow;
    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  };
  const leave = (el: RendererElement) => {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0;
    }
  };
  const afterLeave = (el: RendererElement) => {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset.oldOverflow;
  };
  
  const themeClass = computed(() => {
    return props.theme === 'dark' ? 'mc-code-block-dark' : 'mc-code-block-light';
  });
  </script>
  
  <style scoped lang="scss">
  @use "sass:meta";
  .mc-code-block-light :deep() {
    @include meta.load-css("highlight.js/styles/a11y-light");
  }
  .mc-code-block-dark :deep() {
    @include meta.load-css("highlight.js/styles/a11y-dark");
  }
  
  @import 'devui-theme/styles-var/devui-var.scss';
  
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  
  .mc-code-block {
    margin: 1rem 0;
    overflow: hidden;
    border-radius: 14px;
  
    pre {
      margin: 0;
    }

    .mc-action-btn {
      width: 24px;
      height: 24px;
    }
  
    .mc-code-block-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      .mc-code-lang {
        font-size: $devui-font-size;
      }
    }
  
    .mc-code-block-actions {
      display: flex;
      align-items: center;
      .mc-copy-btn,
      .mc-toggle-btn {
        cursor: pointer;
        border-radius: 4px;
        font-size: 18px;
        padding: 4px;
      }
    }
  }

   .mc-code-block-light {
    border: 1px solid #d7d8da;
    code.hljs {
      padding: 1em;
    }
    background-color: #f5f5f5;
    .mc-code-lang {
      color: #252b3a
    }
    .mc-code-block-actions {
      .mc-copy-btn,
      .mc-toggle-btn {
        color: #252b3a;
        &:hover {
          background-color: #EBEBEB;
        }
      }
    }
  }

  .mc-code-block-dark {
    border: 1px solid #4e5057;
    code.hljs {
      padding: 1em;
    }
    background-color: #34363A;
    .mc-code-lang {
      color: #CED1DB
    }
    .mc-code-block-actions {
      .mc-copy-btn,
      .mc-toggle-btn {
        color: #CED1DB;
        &:hover {
          background-color: #393a3e;
        }
        img {
          filter: brightness(1.5);
        }
      }
    }
  }
  
  .collapse-transition {
    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  
    &-enter-to,
    &-leave-from {
      opacity: 1;
    }
  
    &-enter-active,
    &-leave-active {
      transition:
        max-height 0.3s cubic-bezier(0.5, 0.05, 0.5, 0.95),
        opacity 0.3s cubic-bezier(0.5, 0.05, 0.5, 0.95);
    }
  }
  </style>