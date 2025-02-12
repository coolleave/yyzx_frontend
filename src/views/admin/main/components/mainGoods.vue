<script setup lang="ts" name="mainEmpoyee">
import goodsData from './mainGoods/goodsData.vue';
import goodsSearch from './mainGoods/goodsSearch.vue';
const handleSearch = (form: any) => {
  console.log(form)
}
</script>

<template>
<!-- 商品搜索栏 -->
<goodsSearch @search="handleSearch"/>
<!-- 商品数据信息栏 -->
<goodsData />
</template>

<style scoped>

</style>