<script setup lang="ts" name="mainEmpoyee">
import employeeSearch from "../components/mainEmployee/employeeSearch.vue"
import employeeData from "./mainEmployee/employeeData.vue";
import { ref } from 'vue'

const contentRef = ref<any>(null);
const handleSearch = (form: any) => {
    // 获取子组件的ref
    console.log("contentRef",contentRef.value);
    
    // 调用子组件的方法
    contentRef.value?.getEmployee(form.name)
}

</script>

<template>
<!-- search -->
<employeeSearch  @search="handleSearch"/>
<!-- data -->
<employeeData ref="contentRef"/>
</template>

<style scoped>

</style>