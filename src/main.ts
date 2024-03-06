import { createApp } from 'vue';
import App from './App.vue';
import './index.scss';
import router from '@/router';
import { createPinia } from 'pinia';
import jQuery from 'jquery';
//@ts-ignore
window.jQuery = jQuery;
const rootEl = document.createElement('div')
document.body.append(rootEl);
jQuery(() => {
  createApp(App).use(router).use(createPinia()).mount(rootEl);
  console.log('4chan-plus done. version:', __APP_VERSION__);
})
