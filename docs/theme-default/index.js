import './styles/fonts.css';
import './styles/global.scss';
import Layout from './components/Layout.vue';
export * from './without-fonts';
export { Layout };

import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';
import { ThemeKey } from './components/datas/type';

// 默认使用无限主题
export const themeServiceInstance = ThemeServiceInit(
  {
    infinityTheme,
    galaxyTheme,
  },
  'infinityTheme',
);
if (typeof localStorage !== 'undefined' && localStorage.getItem('theme') === ThemeKey.Galaxy) {
  themeServiceInstance.applyTheme(galaxyTheme);
}
