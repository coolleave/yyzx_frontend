<script setup lang="ts" name="index" >
import { RouterView } from 'vue-router';
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<template>
<Header/>
<RouterView></RouterView>
<Footer/>
</template>

<style scoped>

</style>