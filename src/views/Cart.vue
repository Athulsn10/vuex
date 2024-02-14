<template>
    <div class="container-fluid mt-4 ">
        <div class="container-fluid" v-if="cartIceCreams.length>0">
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
                                        <span class="fw-medium">{{ iceCream.ingredients.join(', ') }}</span>
                                    </p>
                                    <p class="p-0 m-0 fw-bolder">${{ iceCream.price }}</p>
                                    <div class="d-flex align-items-center mt-4">
                                        <button @click="removeCart(iceCream)" class="btn btn-dark">Remove from cart</button>
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
                        <p class="fs-5 fw-bolder ms-1 mt-3">Total: ${{ totalPrice }}</p>
                        <button class="btn btn-danger py-0 m-2">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5" v-else>
            <div class="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
                <h1>Your Cart Is Empty!</h1>
                <button @click="navToHome()" class="btn btn-dark mt-3">back to home <i class="ms-2 fa-solid fa-house"></i></button>
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
            const total = this.cartIceCreams.reduce((acc, iceCream) => acc + iceCream.price, 0);
            return total.toFixed(2);
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
        },
        navToHome(){
            this.$router.push('/')  
        }
    },
    mounted() {
        this.getIce(),
        this.$store.dispatch('toggleCart');
    }
}
</script>

<style></style>