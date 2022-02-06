<template>
  <section>
    <base-card>
      <coach-register @submit-data="savedData"></coach-register>
      <h2>Register as a coach now</h2></base-card
    >
  </section>
</template>

<script>
import CoachRegister from '../../components/coaches/coachForm.vue';
export default {
  components: { CoachRegister },
  methods: {
    savedData(data) {
      this.$store.dispatch('coaches/addNewCoachs', data);
      /* this.$router.push('/coaches'); */
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped></style>
