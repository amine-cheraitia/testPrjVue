import { createStore } from 'vuex';
import coaches from './modules/coaches/coaches.js';
import requestes from './modules/requestes/requestes.js';

const store = createStore({
  modules: {
    coaches: coaches,
    requestes: requestes,
  },
});

export default store;
