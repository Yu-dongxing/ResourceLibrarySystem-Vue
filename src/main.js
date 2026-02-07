import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import ElementTiptapPlugin from 'element-tiptap';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'; // Dark mode css vars
import './styles/theme.less'; // Custom theme styles

// import UUID from "vue-uuid"; // 引入uuid
// import { v4 as uuidv4 } from 'uuid';

// 导入所有 Element Plus 图标
import * as Icons from '@element-plus/icons-vue';

const app = createApp(App);

// Initialize Theme
store.dispatch('theme/initTheme');

// 全局注册所有图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
// .app.use(uuidv4)
app.use(store).use(router).use(ElementTiptapPlugin).use(ElementPlus).mount('#app');