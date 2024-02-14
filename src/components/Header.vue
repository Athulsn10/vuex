<template>
  <div class="fixed-top">
    <div class="navbar bg-dark ">
      <div class="container-fluid">
        <div class="d-flex w-100 h-100 text-light align-items-center justify-content-center">
          <p class="p-0 m-0">50% off on orders above $50</p>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center h-100 fw-bolder py-3 shadow-sm bg-light">
      <p>HOME</p>
      <p>FLAVORS</p>
      <p>EVENTS</p>
      <p>ABOUT</p>
      <div class="ms-auto">
        <button @click="navToCart()" v-if="isCart" class="me-3 btn-dark btn position-relative">CART<i
            class="ms-2 fa-solid fa-heart"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ getItemsInCart }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
        <button class="btn btn-dark me-3" @click="navToHome()" v-else>Home <i class="ms-2 fa-solid fa-house"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getItemsInCart']),
    ...mapState(['isCart'])
  },
  methods: {
    navToCart() {
      this.$router.push('/cart');
    },
    navToHome() {
      this.$router.push('/')
    }
  },
  mounted() {
    // console.log('isCart value:', this.isCart);
  },
};
</script>

<style scoped>
p {
  padding-left: 15px !important;
  margin: 0px;
  padding: 0px;
}
</style>
