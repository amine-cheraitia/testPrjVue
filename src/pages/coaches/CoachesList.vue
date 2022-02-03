<template>
  <div>filter</div>
  <div class="controls">
    <button>Refresh</button>
    <router-link to="/register">Register as Coach</router-link>
  </div>
  <ul v-if="hasCoaches">
    liste
    <coach-item
      v-for="coach in coaches"
      :key="coach.id"
      :id="coach.id"
      :firstName="coach.firstName"
      :lastName="coach.lastName"
      :rate="coach.hourlyRate"
      :areas="coach.areas"
    ></coach-item>
    <li v-for="(item, index) in coaches" :key="index">
      {{ item.firstName }}
    </li>
  </ul>
  <h4 v-else>No coaches found.</h4>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
export default {
  components: { CoachItem },
  computed: {
    coaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
