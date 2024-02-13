<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-8">
                <ul class="list-group">
                    <li class="list-group-item" v-for="iceCream in cartIceCreams" :key="iceCream.id">
                                <div class="row">
                                    <div class="col-3">
                                        <img width="200"
                                            src="https://img.freepik.com/free-vector/ice-cream-cone-cartoon-icon-illustration-sweet-food-icon-concept-isolated-flat-cartoon-style_138676-2924.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707696000&semt=ais"
                                            alt="">
                                    </div>
                                    <div class="col-9 mt-4">
                                        <h2 class="card-title">{{ iceCream.name }} Icecream</h2>
                                        <p><span>Ingredients: </span>
                                            <span class="fw-medium"> {{ iceCream.ingredients.join(', ') }}</span>
                                        </p>
                                        <p class="p-0 m-0 fw-bolder">${{ iceCream.price }}</p>
                                        <div class="d-flex align-items-center mt-4">
                                            <button  @click="removeCart(iceCream)" class="btn btn-dark">Remove from cart</button>
                                            <button class="btn btn-primary ms-3">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                    </li>
                </ul>
            </div>
            <div class="col-4">
                <ul class="list-group">
                    <li class="list-group-item" v-for="iceCream in cartIceCreams" :key="iceCream.id">
                    <p class="p-0 m-0 fw-medium">{{ iceCream.name }} Icecream</p>
                    <p class="p-0 m-0 text-danger">Price: ${{ iceCream.price }}</p>
                    </li>
                </ul>
                <div class="d-flex justify-content-between">
                    <p class="fs-5 fw-bolder ms-1 mt-3">Total: $ {{ totalPrice }}</p>
                    <button class="btn btn-danger py-0 m-2">place Order</button>
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
    computed: {
        cartIceCreams() {
            return this.iceCreams.filter(iceCream => iceCream.cart === true);
        },
        totalPrice() {
      return this.cartIceCreams.reduce((total, iceCream) => total + iceCream.price, 0);
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
                    console.log("Resource updated successfully!", response.data);
                    this.getIce();
                })
                .catch(error => {
                    console.error("Error updating resource:", error);
                });
        }
    },
    mounted() {
        this.getIce()
    }
}
</script>

<style></style>