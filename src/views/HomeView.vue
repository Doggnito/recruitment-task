<template>
  <Home />
</template>

<script>
import { defineComponent } from 'vue';
import Home from '../components/Home.vue';

export default defineComponent({
  name: 'UserView',
  components: {
    Home,
  },
});
</script>
