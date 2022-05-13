<template>
  <div class="d-flex align-center flex-column mx-auto my-5 w-25 bg-grey-lighten-2">
    <div class="d-flex justify-space-between w-100">
      <h2 v-text="userData.first_name + ' ' + userData.last_name" class="d-inline-block pa-3" />
      <v-btn icon size="small" @click="setFavourite(userData.id)" class="ma-2">
        <img v-if="favouritesUsers.includes(userData.id)" width="20" :src=star>
        <img v-else width="20" :src=star_outline>
      </v-btn>
    </div>
    <v-avatar size="200" class="my-5">
      <v-img :src="userData.avatar" />
    </v-avatar>
    <address class="my-5">
      Email: <a :href="`mailto:${userData.email}`" v-text="userData.email" />
    </address>
    <v-btn class="mt-10 mb-5" @click="routerBack">Back to users</v-btn>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import star from '../assets/star.svg'
import star_outline from '../assets/star_outline.svg'
import { useLocalStorage } from '../composables/shared/useLocalStorage.js'

export default defineComponent({
  name: 'SingleUser',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userData = ref({});
    const { setFavourite, favouritesUsers } = useLocalStorage();

    const getUser = async (id) => {
      let response = await fetch(`https://reqres.in/api/users/${id}`);
      let data = await response.json();
      return data;
    };

    const routerBack = () => {
      router.back();
    }

    getUser(route.params.id).then(data => userData.value = { ...data.data });

    return {
      userData,
      favouritesUsers,
      star,
      star_outline,
      routerBack,
      setFavourite
    }
  }
})
</script>
