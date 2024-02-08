import { createApp } from 'vue';
import App from './App.vue';
import jq from 'jquery';
import './index.scss';

jq(() => {
  if (!/\d{5,6}(\w)?\.(com|xyz)/g.test(location.host) || !(document.getElementsByClassName('vwbg')[0] || document.getElementsByClassName('vodlist')[0] || document.getElementsByClassName('mysrha')[0])) return
  jq(document.body).addClass("yellowUpApp")

  console.clear()
  console.log('yellowUp插件已加载，版本:', __APP_VERSION__);
  const rootEl = document.createElement('div')
  document.body.append(rootEl);
  createApp(App).mount(rootEl);
})
