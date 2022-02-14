let timer;
export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.didAutoLogout = false;
      state.token = payload.token;
      state.userId = payload.userId;
      /* state.tokenExpiration = payload.tokenExpiration; */
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    logout(context) {
      context.commit('setUser', {
        userId: null,
        token: null,
        /* tokenExpiration: null, */
      });
      //supprimer le localstorage
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      clearTimeout(timer);
    },
    async login(context, payload) {
      /*       const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxJ333Sm5mSEJm2VbmZ8EQ7QOugundan8',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || 'Failed to authenticate'
        );
        throw error;
      }
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      }); */

      return context.dispatch('auth', { ...payload, mode: 'login' });
    },
    async signup(context, payload) {
      /*       const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxJ333Sm5mSEJm2VbmZ8EQ7QOugundan8',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || 'Failed to authenticate'
        );
        throw error;
      }
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      }); */
      return context.dispatch('auth', { ...payload, mode: 'signup' });
    },
    //refactoring (login & signup + localstorage en plus)
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxJ333Sm5mSEJm2VbmZ8EQ7QOugundan8';
      if (mode === 'signup') {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxJ333Sm5mSEJm2VbmZ8EQ7QOugundan8';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to authenticate'
        );
        throw error;
      }
      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;
      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(function () {
        context.dispatch('AutoLogout');
      }, expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        /* tokenExpiration: expirationDate, */
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn < 0) {
        // si le token a expiré on le relog pas
        return;
      }

      setTimeout(function () {
        //arriver a la fin du temps d'expiration on le fait deco
        context.dispatch('AutoLogout');
      }, expiresIn);

      //si le token et userid existe et le token n'a pas expiré on le fait logé
      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId,
          /* tokenExpiration: null, */
        });
      }
    },
    AutoLogout(context) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
