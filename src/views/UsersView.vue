<template>
  <Users />
</template>

<script>
import { defineComponent } from 'vue';
import Users from '../components/Users.vue';

export default defineComponent({
  name: 'UsersView',
  components: {
    Users,
  },
});
</script>
