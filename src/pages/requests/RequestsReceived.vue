<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :message="request.message"
          :email="request.userEmail"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import requestItem from '../../components/requests/requestItem.vue';
export default {
  components: { requestItem },
  computed: {
    receivedRequests() {
      return this.$store.getters['requestes/requests'];
    },
    hasRequests() {
      return this.$store.getters['requestes/hasRequests'];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
