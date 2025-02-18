<script setup lang="ts" name="mainOrder">
import orderData from './mainOrder/orderData.vue';
import orderSearch from './mainOrder/orderSearch.vue';
import { ref } from 'vue';
const dataRef = ref();
const handleSearch = (form: any) => {
    dataRef.value.pageDataform = { ...dataRef.value.pageDataform, ...form};
    dataRef.value.getOrderData();
}


</script>

<template>
    <div class="mainCategory">
    <!-- 搜索栏 -->
        <orderSearch @search="handleSearch"/>
    <!-- 数据栏 -->
        <orderData ref="dataRef"/>
    </div>
</template>

<style scoped>
.mainCategory{
    background-color: #fff;
    padding: 20px;
}
</style>