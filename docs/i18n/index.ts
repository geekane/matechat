import { createI18n } from 'vue-i18n';
import en from './en.json';
import zh from './zh.json';

const i18n = createI18n({
  locale: typeof localStorage !== 'undefined' ? localStorage.getItem('locale') || 'zh' : 'zh', // 默认语言
  fallbackFormat: 'en',
  legacy: false,
  messages: {
    en,
    zh,
  },
  globalInjection: true,
});

export default i18n;
