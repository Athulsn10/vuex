<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-center w-100 ">
      <input @keydown.enter="search" type="text" v-model="searchItem" class="form-control w-50" placeholder="Search Item">
    </div>
    <div class="row mt-4">
      <div class="col-lg-3 col-md-4 col-sm-2 mb-3 d-flex justify-content-center" v-for="iceCream in itemsToDisplay"
        :key="iceCream.id">
        <div class="card" style="width: 18rem;">
          <img loading="lazy" :src="iceCream.photo" class="card-img-top" alt="Ice Cream Image"
            style="height: 300px; object-fit: cover;">
          <div class="card-body p-0 px-1 d-flex flex-column text-align-center">
            <div style="height: 90px;">
              <p class="fw-bolder fs-4 p-0 m-0 card-title text-center">{{ iceCream.name }}</p>
              <p class="card-text text-center p-0 m-0">Ingredients: {{ iceCream.ingredients.join(', ') }}</p>
            </div>
            <button v-if="!iceCream.cart" class="btn btn-primary m-2" @click="addToCart(iceCream)">${{ iceCream.price }}
              Add to cart<i class="ms-2 fa-solid fa-heart-crack"></i></button>
            <button v-else class="btn btn-dark m-2" @click="removeCart(iceCream)">-${{ iceCream.price }} Remove from
              cart<i class="ms-2 fa-solid fa-heart"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      iceCreams: [],
      searchItem: '',
      url: "http://localhost:3000/iceCreams"
    };
  },
  computed: {
    itemsToDisplay() {
      if (this.searchItem.trim() === '') {
        return this.iceCreams;
      } else {
        return this.iceCreams.filter((iceCream) =>
          iceCream.name.toLowerCase().includes(this.searchItem.toLowerCase())
        );
      }
    },
  },
  methods: {
    getIce() {
      this.$store.dispatch('getData')
        .then(response => {
          this.iceCreams = response;
        })
        .catch(error => {
          console.error('Error fetching ice creams:', error);
        });
    },
    addToCart(iceCream) {
      const selectedItem = {
        id: iceCream.id,
        name: iceCream.name,
        photo: iceCream.photo,
        ingredients: iceCream.ingredients,
        price: iceCream.price,
        cart: true
      };
      // console.log(selectedItem);
      axios.put(`${this.url}/${iceCream.id}`, selectedItem)
        .then(response => {
          // console.log("Resource updated successfully!", response.data);
          this.getIce();
          this.$store.dispatch('updateItemsInCart');
        })
        .catch(error => {
          console.error("Error updating resource:", error);
        });
    },
    removeCart(iceCream) {
      const selectedItem = {
        id: iceCream.id,
        name: iceCream.name,
        photo: iceCream.photo,
        ingredients: iceCream.ingredients,
        price: iceCream.price,
        cart: false
      };
      // console.log(selectedItem);
      axios.put(`${this.url}/${iceCream.id}`, selectedItem)
        .then(response => {
          // console.log("Resource updated successfully!", response.data);
          this.getIce();
          this.$store.dispatch('updateItemsInCart');
        })
        .catch(error => {
          console.error("Error updating resource:", error);
        });
    },
    async openCart() {
      await this.$store.dispatch('toggleCart', true);
      // const value = this.$store.state.isCart;
      // console.log(value);
    },
    search() {
      console.log(this.searchItem);
    }

  },
  mounted() {
    this.getIce();
    this.openCart();
    this.$store.dispatch('updateItemsInCart');
  }
};
</script>


<style scoped></style>
