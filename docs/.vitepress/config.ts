import { defineConfig } from 'vitepress';
import { demoblockPlugin, VitePluginDemoblock } from 'vitepress-theme-demoblock';
import vueI18n from "@intlify/unplugin-vue-i18n/vite";
import sideBarEn from './theme/themeConfig/sideBar-en';
import sideBarZh from './theme/themeConfig/sideBar-zh';

export default defineConfig({
  title: 'MateChat - 轻松构建你的AI应用',
  description: 'MateChat - 前端智能化场景解决方案UI库，轻松构建你的AI应用。已服务于华为内部多个应用智能化改造，并助力CodeArts、InsCode AI IDE等智能化助手搭建。是一款企业级开箱即用的产品。全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: 'chat,AI,vue,GPT,web,MateChat,开源,open source,智能化,components,组件库' }]
  ],
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin);
    },
  },
  vite: {
    plugins: [
      VitePluginDemoblock(),
      vueI18n({ ssr: true })
    ],
    ssr: {
      noExternal: ['devui-theme', 'vue-devui', 'xss'],
    },
  },
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'nav.guide', link: '/use-guide/introduction' },
      { text: 'nav.component', link: '/components/introduction/demo' },
      { text: 'nav.demo', link: '/playground/playground' },
    ],
    sidebar: {
      ...sideBarZh,
      ...sideBarEn,
    },
    outline: { level: 3 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  lang: 'zh',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
  },
});
