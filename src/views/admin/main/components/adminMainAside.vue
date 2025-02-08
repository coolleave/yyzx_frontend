<script setup lang="ts" name="adminMainAside">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
      <div class="title">
        <img src="@\assets\images\logo.png" alt="">
        <h5>宇优在线后台管理</h5>
      </div>
      <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
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
</template>


<style scoped>
</style>
