<script setup lang="ts" name="goodsSearch">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { CategoryStore } from '@/stores/admin/categoryStore'
import { categoryPageApi } from "@/api/admin/categoryApi"
const emit = defineEmits(['search'])
const form = ref({
  name: '',
  categoryId: '',  // 添加商品分类字段
  status: ''   // 添加售卖状态字段
})


const categoryList = ref()  // 修改为默认空数组

const getCategoryList = async()=>{
    // 分类列表
    const res = await categoryPageApi({ name: "", page: 1, pageSize: 1000 })
    categoryList.value=res.data.records
}
onMounted( () => {
    getCategoryList()
})

// 售卖状态选项
const sellStatusList = [
  { label: '在售', value: 1 },
  { label: '下架', value: 0 }
]

// 点击查询
const search = () => {
  // 发送信号
  emit('search', form.value)
}
</script>

<template>
  <div class="search">
    <el-form :model="form" class="form-container">
      <el-form-item label="商品名称" class="form-item">
        <el-input v-model="form.name" placeholder="请输入商品名称"/>
      </el-form-item>

      <el-form-item label="商品分类" class="form-item">
        <el-select v-model="form.categoryId" placeholder="请选择商品分类" class="el-select">
          <el-option
            v-for="category in categoryList"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="售卖状态" class="form-item">
        <el-select v-model="form.sellStatus" placeholder="请选择售卖状态" class="el-select">
          <el-option
            v-for="status in sellStatusList"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </el-form-item>

      <!-- 提交按钮 -->
      <div class="button-container">
        <el-button type="primary" @click="search" class="searchBtn">
          <el-icon style="margin-right: 5px;">
            <Search />
          </el-icon>
          查询
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.search {
  background-color: #F5F5F5;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
  flex-wrap: wrap; /* 让输入框换行 */
}

.form-container {
  display: flex;
  flex-wrap: wrap; /* 如果屏幕不够宽时，自动换行 */
  gap: 15px; /* 输入框之间的间距 */
  width: 100%;
}

.el-form-item {
  margin-bottom: 0; /* 移除底部的间距 */
  width: 200px; /* 设置每个输入框的最大宽度 */
}

.el-select,
.el-input {
  width: 100%; /* 让每个输入框占满父容器 */
}

.el-form-item label {
  width: 80px; /* 设置标签宽度 */
  text-align: right; /* 标签右对齐 */
}

/* 新增的按钮容器，用于右对齐 */
.button-container {
  width: 100%; /* 保证按钮占满一行 */
  display: flex;
  justify-content: flex-end; /* 让按钮右对齐 */
  margin-top: 15px; /* 给按钮增加与表单的间距 */
}

.searchBtn {
  width: auto; /* 按钮宽度自适应 */
}
</style>
