import { createApp } from 'vue'
import App from './App.vue'
import myrouter from './router.js';

createApp(App).use(myrouter).mount('#app')
