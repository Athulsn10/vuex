<template>
  <div class="container-fluid">
    <div class="row mt-4 ms-5">
        <div class="col-3 mb-3" v-for="iceCream in iceCreams" :key="iceCream.id">
      <div class="card" style="width: 18rem;">
        <img src="https://img.freepik.com/free-vector/ice-cream-cone-cartoon-icon-illustration-sweet-food-icon-concept-isolated-flat-cartoon-style_138676-2924.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707696000&semt=ais" class="card-img-top" alt="Ice Cream Image">
        <div class="card-body">
          <h5 class="card-title">{{ iceCream.name }}</h5>
          <p class="card-text">Ingredients: {{ iceCream.ingredients.join(', ') }}</p>
          <button v-if="!iceCream.cart"  class="btn btn-primary" @click="addToCart(iceCream)">${{ iceCream.price }}<i class="ms-2 fa-solid fa-cart-shopping"></i></button>
         <button v-else  class="btn btn-danger" @click="removeCart(iceCream)">Remove<i class="ms-2 fa-regular fa-circle-xmark"></i></button>
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
      url: "http://localhost:3000/iceCreams"
    };
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
        price:iceCream.price,
        cart: true
      };
      // console.log(selectedItem);
      axios.put(`${this.url}/${iceCream.id}`, selectedItem)
        .then(response => {
          console.log("Resource updated successfully!", response.data);
          this.getIce();
        })
        .catch(error => {
          console.error("Error updating resource:", error);
        });
    },
    removeCart(iceCream){
      const selectedItem = {
        id: iceCream.id,
        name: iceCream.name,
        photo: iceCream.photo,
        ingredients: iceCream.ingredients,
        price:iceCream.price,
        cart: false
      };
      // console.log(selectedItem);
      axios.put(`${this.url}/${iceCream.id}`, selectedItem)
        .then(response => {
          console.log("Resource updated successfully!", response.data);
          this.getIce();
        })
        .catch(error => {
          console.error("Error updating resource:", error);
        });
    }
  },
  mounted() {
    this.getIce();
  }
};
</script>


<style scoped>

</style>
