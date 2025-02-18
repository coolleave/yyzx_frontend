<script setup lang="ts" name="orderSearch">
import { ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import dayjs from 'dayjs'  // 引入 dayjs

const emit = defineEmits(['search'])

// 订单表单数据
const form = ref({
  status: '',   // 订单状态
  number: '', // 订单号
  beginTime: '', // 开始时间
  endTime: '', // 结束时间
  phone: '', // 手机号
})

const statusList = ref([
  { id: 1, name: "待付款" },
  { id: 2, name: "待接单" },
  { id: 3, name: "已接单" },
  { id: 4, name: "派送中" },
  { id: 5, name: "已完成" },
  { id: 6, name: "已取消" },
])  // 默认状态列表

// 格式化时间
const formatDate = (date: any) => {
  return date ? dayjs(date).format('YYYY-MM-DDTHH:mm:ss') : ''
}

// 点击查询
const search = () => {
  // 格式化 beginTime 和 endTime，如果有值的话
  const formattedBeginTime = formatDate(form.value.beginTime)
  const formattedEndTime = formatDate(form.value.endTime)

  // 更新表单中的时间字段
  form.value.beginTime = formattedBeginTime
  form.value.endTime = formattedEndTime

  // 发送信号
  emit('search', form.value)
}

const clearBtn = () => {
  form.value.status = ''
  form.value.number = ''
  form.value.beginTime = ''
  form.value.endTime = ''
  form.value.phone = ''
}
</script>

<template>
  <div class="search">
    <h2>查询订单</h2>
    <el-form :model="form" class="form-container">
      <!-- 订单状态 -->
      <el-form-item label="订单状态" class="form-item">
        <el-select v-model="form.status" placeholder="请选择订单状态" class="el-select">
          <el-option :label="'请选择'" value="" />
          <el-option
            v-for="status in statusList"
            :key="status.id"
            :label="status.name"
            :value="status.id"
          />
        </el-select>
      </el-form-item>
      
      <!-- 订单号 -->
      <el-form-item label="订单号" class="form-item">
        <el-input v-model="form.number" placeholder="请输入订单号" />
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机号" class="form-item">
        <el-input v-model="form.phone" placeholder="请输入用户手机号" />
      </el-form-item>

      <!-- 开始结束时间 -->
      <el-form-item label="开始时间" class="form-item">
        <el-date-picker
          v-model="form.beginTime"
          type="datetime"
          placeholder="选择时间"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="结束时间" class="form-item">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择时间"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>

      <!-- 提交按钮 -->
      <div class="button-container">
        <el-button type="primary" @click="clearBtn" class="searchBtn">
          <el-icon style="margin-right: 5px;">
            <Refresh />
          </el-icon>
          重置
        </el-button>

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
  flex-wrap: wrap;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
}

.el-form-item {
  margin-bottom: 0;
  width: 250px;
}

.el-select,
.el-input {
  width: 100%;
}

.el-form-item label {
  width: 80px;
  text-align: right;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.searchBtn {
  width: auto;
}
</style>
