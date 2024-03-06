import { createWebHistory, createRouter } from 'vue-router';
import BaseView from '@/page/view/index.vue';
import Thread from '@/page/thread/index.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/:name',
    component: BaseView
  }, {
    path: '/:name/thread/:id',
    component: Thread
  }],
})
export default router