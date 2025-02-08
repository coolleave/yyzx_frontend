<script setup lang="ts" name="adminMainIndex">
import adminMainAside from './components/adminMainAside.vue';
import adminMainHeader from './components/adminMainHeader.vue';
import adminMainMain from './components/adminMainMain.vue';
import { ref } from 'vue';
const isFold = ref(false)
const handleFold = (isFoldemits:boolean) => {
    isFold.value = isFoldemits
}
</script>

<template>
  <div class="common-layout" style="height: 100vh;">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '200px'">
        <adminMainAside :isFold="isFold" />
      </el-aside>

      <el-container>

        <el-header>
            <adminMainHeader @foldEmit="handleFold" />
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
        /* width: 200px; */
    }
    .el-header {
        padding:0;
    }
    .el-main {
        background-color: #f0f0f0;
        color: #333;
    }
/* aside折叠动画过渡 */
.el-aside {
    transition: width 0.5s;
}
</style>