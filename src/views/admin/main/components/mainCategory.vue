<script setup lang="ts" name="mainCategory">
import categorySearch from "../components/mainCategory/categorySearch.vue"
import categoryData from "./mainCategory/categoryData.vue";
const searchHandle = (form: any) => {
    console.log("查询分类操作",form.name);
}
</script>

<template>
<div class="mainCategory">
    <categorySearch @search="searchHandle"/>
    <categoryData/>
</div>

</template>

<style scoped>
.mainCategory{
    background-color: #fff;
    padding: 20px;
}
</style>