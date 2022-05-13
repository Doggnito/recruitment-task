import { ref } from "vue";

if(!localStorage.getItem('favourites')) { localStorage.setItem('favourites', JSON.stringify([])); }

let storedFavourites = localStorage.getItem('favourites');
storedFavourites = JSON.parse(storedFavourites);
const favouritesUsers = ref(storedFavourites)

const setFavourite = (id) => {
  let storedFavourites = JSON.parse(localStorage.getItem('favourites'));
  storedFavourites.includes(id) ? storedFavourites = storedFavourites.filter(fav => fav !== id) : storedFavourites.push(id)
  localStorage.setItem('favourites', JSON.stringify(storedFavourites))
  favouritesUsers.value = storedFavourites
}

export const useLocalStorage = () => {
  return {
    setFavourite,
    favouritesUsers
  }
}