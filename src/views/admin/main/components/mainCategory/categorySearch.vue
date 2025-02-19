<script setup lang="ts" name="categoryData">
import { ref } from 'vue';

const searchFrom = ref({
    name: '',
});

// 创建信号
const emit = defineEmits(["search"]);

const onSubmit = () => {
    emit("search", searchFrom.value);
};



</script>

<template>
  <div class="search">
    <el-form :model="searchFrom" class="form">
      <el-form-item label="分类名称">
        <el-input v-model="searchFrom.name" placeholder="请输入分类名称" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
}

.form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.el-form-item {
  margin-bottom: 0;
}

.el-button {
  margin-left: auto; /* 将按钮推到右边 */
}
</style>
