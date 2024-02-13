<template>
  <div class="">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import HomeView from './views/HomeView.vue';
export default {
 components:{
  Header,
  Footer,
  HomeView
 }
};
</script>
