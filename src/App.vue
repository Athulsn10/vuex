<template>
  <div class="">
    <Header/>
    <div class="content"><router-view></router-view></div>
    <!-- <Footer/> -->
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
<style scoped>
.content{
  margin-top: 8rem;
}
</style>
