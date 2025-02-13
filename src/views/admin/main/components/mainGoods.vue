<script setup lang="ts" name="mainEmpoyee">
import goodsData from './mainGoods/goodsData.vue';
import goodsSearch from './mainGoods/goodsSearch.vue';
import { ref } from 'vue';
const dataRef = ref();
const handleSearch = (form: any) => {
  dataRef.value.searchForm.name = form.name;
  dataRef.value.searchForm.categoryId = form.categoryId;
  console.log(dataRef.value.searchForm);
  dataRef.value.queryGoods();
}

// 条件分页查询


</script>

<template>
<!-- 商品搜索栏 -->
<goodsSearch @search="handleSearch"/>
<!-- 商品数据信息栏 -->
<goodsData ref="dataRef"/>
</template>

<style scoped>

</style>