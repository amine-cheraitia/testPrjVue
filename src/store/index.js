import { createStore } from 'vuex';
import coaches from './modules/coaches/coaches.js';
import requestes from './modules/requestes/requestes.js';
import auth from './modules/auth/index.js';

const store = createStore({
  modules: {
    coaches: coaches,
    requestes: requestes,
    auth: auth,
  },
  /*   state() {
    return {
      userId: 'c5',
    };
  }, */
  /*   getters: {
    userId(state) {
      return state.userId;
    },
  }, */
});

export default store;
