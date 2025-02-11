<script setup lang="ts" name="mainCategory">
import categorySearch from "../components/mainCategory/categorySearch.vue"
import categoryData from "./mainCategory/categoryData.vue";
import { ref } from 'vue'

const dataRef = ref<any>(null);
const searchHandle = (form: any) => {
    dataRef.value.getTableData(form.name);
}
</script>

<template>
<div class="mainCategory">
    <categorySearch @search="searchHandle"/>
    <categoryData ref="dataRef"/>
</div>

</template>

<style scoped>
.mainCategory{
    background-color: #fff;
    padding: 20px;
}
</style>