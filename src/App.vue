<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import theHeader from './components/layout/theHeader.vue';
export default {
  name: 'name',
  components: { theHeader },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;

  /*  width: 100vw; */
}

body {
  margin: 0;
}
</style>
