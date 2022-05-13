<template>
  <User />
</template>

<script>
import { defineComponent } from 'vue';
import User from '../components/User.vue';

export default defineComponent({
  name: 'UserView',
  components: {
    User,
  },
});
</script>
