<template>
  <v-container>
    <v-autocomplete
      v-model="searchValue"
      :items="searchItems"
      label="Partly broken for vue3"
    >
    </v-autocomplete>
    <v-table>
      <thead>
        <th class="text-left pl-4">Id</th>
        <th class="text-left pl-4">Email</th>
        <th class="text-left pl-4">First Name</th>
        <th class="text-left pl-4">Last Name</th>
        <th class="text-left pl-4">Avatar</th>
        <th class="text-left pl-4">Favourite</th>
        <th class="text-left pl-4">Profile</th>
      </thead>
      <tbody>
        <tr v-for="user in usersData.data" :key="user.id">
          <td v-text="user.id" />
          <td>
            <a :href="`mailto:${user.email}`" v-text="user.email" class="text-black text-decoration-none" />
          </td>
          <td v-text="user.first_name" />
          <td v-text="user.last_name" />
          <td><v-avatar><v-img :src="user.avatar" /></v-avatar></td>
          <td>
            <v-btn icon size="small" @click="setFavourite(user.id)">
              <img v-if="favouritesUsers.includes(user.id)" width="20" :src=star>
              <img v-else width="20" :src=star_outline>
            </v-btn>
          </td>
          <td>
            <v-btn size="small" @click="navigateToProfile(user.id)">
              Navigate to profile
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      class="my-5"
      :length="usersData.total_pages"
    ></v-pagination>
  </v-container>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import star from '../assets/star.svg'
import star_outline from '../assets/star_outline.svg'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '../composables/shared/useLocalStorage.js'

export default defineComponent({
  name: 'UsersPage',
  setup() {
    const router = useRouter();
    const usersData = ref({});
    const currentPage = ref(1);
    const searchItems = ref([]);
    const { setFavourite, favouritesUsers } = useLocalStorage();

    const getUsers = async (page) => {
      let response = await fetch(`https://reqres.in/api/users?page=${page}`);
      let data = await response.json();
      return data;
    };

    const getUsersInfo = async () => {
      await getUsers(currentPage.value).then(data => usersData.value = { ...data });
      usersData.value.data.forEach(user => {
        searchItems.value.push(user.first_name + ' ' + user.last_name);
      });
      for (let page = 1; page < usersData.value.total_pages; page++) {
        await getUsers(page).then(data => usersData.value = { ...data });
        usersData.value.data.forEach(user => {
          searchItems.value.push(user.first_name + ' ' + user.last_name);
        });
      }
      await getUsers(currentPage.value).then(data => usersData.value = { ...data });
    }

    const navigateToProfile = (id) => {
      router.push({name: 'user', params: {id: id}});
    }

    watch(currentPage, () => {
      getUsers(currentPage.value).then(data => usersData.value = data);
    });

    getUsersInfo();
    
    return {
      currentPage,
      usersData,
      star,
      star_outline,
      favouritesUsers,
      searchItems,
      searchValue: '',
      setFavourite,
      navigateToProfile,
    }
  }
})
</script>