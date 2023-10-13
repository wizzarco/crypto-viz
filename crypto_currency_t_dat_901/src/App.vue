<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Footer from "./components/layouts/Footer.vue";
</script>
