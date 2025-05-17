import Demo from '../../theme-default/components/Demo.vue';
import DemoBlock from '../../theme-default/components/DemoBlock.vue';

export function registerComponents(app) {
  app.component('Demo', Demo);
  app.component('DemoBlock', DemoBlock);
}
