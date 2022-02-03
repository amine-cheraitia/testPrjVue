import { createApp } from 'vue';
import route from './route.js';
import App from './App.vue';
import store from './store/index.js';
const app = createApp(App);

app.use(route);
app.use(store);

app.mount('#app');
