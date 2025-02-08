<script setup lang="ts" name="adminMainIndex">
import adminMainAside from './components/adminMainAside.vue';
import adminMainHeader from './components/adminMainHeader.vue';
import adminMainMain from './components/adminMainMain.vue';
</script>

<template>
  <div class="common-layout" style="height: 100vh;">
    <el-container class="main-content">
      <el-aside width="300px">
        <adminMainAside />
      </el-aside>

      <el-container>

        <el-header>
            <adminMainHeader />
        </el-header>

        <el-main>
            <adminMainMain />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
    .main-content {
        height: 100%;
    }
    .el-aside {
        width: 200px;
    }
    .el-header {
        background-color: #409EFF;
        color: #fff;
    }
    .el-main {
        background-color: #f0f0f0;
        color: #333;
    }
</style>