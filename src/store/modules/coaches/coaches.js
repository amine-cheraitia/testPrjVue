export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    addNewCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    /* ajouter des coaches sur firebase */
    async addNewCoachs(context, payload) {
      const userId = context.rootGetters.userId;
      const data = {
        firstName: payload.first,
        lastName: payload.last,
        areas: payload.areas,
        description: payload.desc,
        hourlyRate: payload.rate,
      };
      const response = await fetch(
        `https://coach-app-16507-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        //error
      }
      responseData;
      context.commit('addNewCoach', {
        ...data,
        id: userId,
      });
    },
    /* Charger les coaches via fire base */
    async loadCoaches(context) {
      if (!context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch(
        `https://coach-app-16507-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
      ); // le await permet d'attendre le résultat du fetch
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }
      const coaches = [];
      for (const key in responseData) {
        // vu que firebase a une structure bizzare genre .coaches/c1.json .coaches/c2.json on utilis cette boucle
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
        };
        coaches.push(coach);
        console.log(coach);
      }
      context.commit('setCoaches', coaches);
      context.commit('setFetchTimeStamp');
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      /* coaches.find((coach) => coach.id === rootGetters.userId); */

      return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60; // v 26 si cache supérieur a 1 min retourne  false
    },
  },
};
