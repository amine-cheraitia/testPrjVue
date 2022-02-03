import { createApp } from 'vue';
import route from './route.js';
import App from './App.vue';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

const app = createApp(App);

app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.use(route);
app.use(store);

app.mount('#app');
