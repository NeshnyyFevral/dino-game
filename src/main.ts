import '@/scss/style.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

// @ts-ignore
import App from '@/App.vue';

const pinia = createPinia();
const app = createApp(App);

app
  .use(pinia)
  .mount('#app');
