<script setup lang="ts" name="employeeSearch">
import { ref } from 'vue'
import{ Search } from '@element-plus/icons-vue'

const emit = defineEmits(['search'])
const form = ref({
  name: ''
})

// 点击查询
const search = () => {
  // 发送信号
  emit('search', form.value)
}
</script>

<template>
<div class="search">
    <el-form :model="form" label-width="auto" style="max-width: 260px">
    <el-form-item label="员工姓名">
      <el-input v-model="form.name" placeholder="请输入员工姓名"/>
    </el-form-item>
</el-form>
<!-- 提交按钮 -->
<el-button type="primary" @click="search">
  <el-icon style="margin-right: 5px;"><Search /></el-icon>
  查询
</el-button>
</div>


</template>

<style scoped>
.search{
    background-color: #F5F5F5;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    /* 元素垂直居中对齐 */
    align-items: center;
    margin-top: 20px;
}
.el-form {
  display: flex;
  align-items: center;
  margin: 0;
}

.el-form-item {
  margin: 0;
}
</style>