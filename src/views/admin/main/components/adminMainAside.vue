<script setup lang="ts" name="adminMainAside">
import { de } from 'element-plus/es/locales.mjs';

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const ref = defineProps({
  isFold: Boolean
})


</script>
<!-- :collapse="1" -->
<template>
  <div class="admin-aside">
    
    <div class="menu">
      <el-menu
        default-active="1"
        :collapse="isFold"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2c3e50"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
      <div class="title">
      <img src="@/assets/images/logo.png" alt="logo" class="logo">
      <h5 v-if="!isFold">宇优后台管理</h5>
    </div>
        <!-- 总览 -->
        <el-menu-item index="1">
          <template #title>
            <i class="iconfont icon-overview"></i>
            <span>总览</span>
          </template>
        </el-menu-item>

        <!-- 员工管理 -->
        <el-menu-item index="2">
          <i class="iconfont icon-admin"></i>
          <span>员工管理</span>
        </el-menu-item>

        <!-- 分类管理 -->
        <el-menu-item index="3">
          <i class="iconfont icon-category"></i>
          <span>分类管理</span>
        </el-menu-item>

        <!-- 订单管理 -->
        <el-menu-item index="4">
          <i class="iconfont icon-order"></i>
          <span>订单管理</span>
        </el-menu-item>

        <!-- 用户管理 -->
        <el-menu-item index="5">
          <i class="iconfont icon-user"></i>
          <span>用户管理</span>
        </el-menu-item>

        <!-- 系统信息 -->
        <el-menu-item index="6">
          <i class="iconfont icon-system"></i>
          <span>系统信息</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.admin-aside {
  background-color: #2c3e50; /* 背景色 */
  color: #ecf0f1; /* 默认文本颜色 */
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.title {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  color: #ecf0f1;
}

.title .logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

h5 {
  font-size: 20px;
  font-weight: 500;
  color: #ecf0f1;
}

.menu {
  flex-grow: 1;
  padding: 10px 0;
  overflow-y: auto;
  color: 2c3e50;
}
.el-menu{
  border-right: 0;
}

.el-menu-vertical-demo {
  border: none;
  padding: 0;
}

.el-menu-item {
  font-size: 16px;
  font-weight: 400;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.el-menu-item:hover {
  background-color: #34495e;
}

.el-menu-item .iconfont {
  margin-right: 10px;
  font-size: 20px;
  color: #ecf0f1;
}

.el-menu-item span {
  color: #ecf0f1;
}

.el-menu-item.is-active {
  background-color: #409EFF;
  color: #fff;
}

.el-menu-item.is-active .iconfont {
  color: #fff;
}

.el-menu-item.is-active span {
  color: #fff;
}


</style>
