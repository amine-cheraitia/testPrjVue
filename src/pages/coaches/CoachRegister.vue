<template>
  <section>
    <base-card>
      <coach-register></coach-register>
      <h2>Register as a coach now</h2></base-card
    >
  </section>
</template>

<script>
import CoachRegister from '../../components/coaches/coachForm.vue';
export default {
  components: { CoachRegister },
  props: {},
};
</script>

<style scoped></style>
