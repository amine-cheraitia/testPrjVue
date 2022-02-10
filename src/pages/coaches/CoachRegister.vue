<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a coach now</h2>
        <coach-register @submit-data="savedData"></coach-register>
      </base-card>
    </section>
  </div>
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
