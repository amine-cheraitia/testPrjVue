<template>
  <div>filter</div>
  <base-card>
    <div class="controls">
      <base-button mode="outline">Refresh</base-button>
      <base-button :link="true" to="/register">Register as Coach</base-button>
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
    </ul>
    <h4 v-else>No coaches found.</h4>
  </base-card>
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
