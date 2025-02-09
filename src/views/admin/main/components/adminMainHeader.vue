<script setup lang="ts" name="adminMainHeader">
import {
  Fold,
  Expand,
  Setting,
  User,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { defineEmits, computed } from 'vue'
import {adminGetStatusApi,adminSetStatusApi} from "@/api/admin/shopApi"
import { onMounted } from 'vue'
// 定义折叠状态
const isFold = ref(false)

// 定义发送折叠信号
const emit = defineEmits(['foldEmit'])
// 折叠展开切换
const foldChange = () => {
  // 状态切换
  isFold.value = !isFold.value
  // 发送信号
  emit('foldEmit', isFold.value)
}

// 初始化店铺状态
const status = ref(1)  // 0代表未营业，1代表营业中
const getStatus  = async()=>{
  const res = await adminGetStatusApi();
  status.value = res.data;
}



// 计算属性，根据status返回对应的文本和类名
const statusText = computed(() => {
  return status.value === 0 ? '未营业' : '营业中'
})

const statusClass = computed(() => {
  return status.value === 0 ? 'status-closed' : 'status-open'
})

// 设置店铺状态
const setStatus = async(newStatus: number) => {
  await adminSetStatusApi(newStatus)
  status.value = newStatus
}

onMounted(()=>{
    getStatus()
})

</script>

<template>
  <div class="adminMainHeader">
    <!-- 左侧内容：折叠按钮和店铺状态 -->
    <div class="left-content">
      <!-- 折叠面板按钮 -->
      <el-icon @click="foldChange" class="fold-btn">
        <component :is="isFold ? Expand : Fold" />
      </el-icon>

      <!-- 店铺状态显示 -->
      <div :class="statusClass" class="status-text">
        {{ statusText }}
      </div>
    </div>

    <!-- 右侧内容：设置店铺状态按钮和个人中心 -->
    <div class="right-content">
      <!-- 设置店铺状态按钮 -->
      <el-popover trigger="click" placement="bottom" width="150" class="popover-content">
        <!-- 设置按钮和文字 -->
        <template v-slot:reference>
          <div class="icon-text">
            <el-icon class="icon-btn">
              <Setting />
            </el-icon>
            <span>设置状态</span>
          </div>
        </template>

        <!-- 选择营业状态 -->
        <el-button
          size="small"
          @click="setStatus(1)"
          :class="{'status-option': true, 'active': status === 1}"
          type="text"
        >
          营业中
        </el-button>
        <el-button
          size="small"
          @click="setStatus(0)"
          :class="{'status-option': true, 'active': status === 0}"
          type="text"
        >
          未营业
        </el-button>
      </el-popover>

      <!-- 个人中心按钮 -->
      <el-icon class="icon-btn">
        <User />
      </el-icon>
    </div>
  </div>
</template>

<style scoped>
.adminMainHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: rgb(44, 62, 80);
  height: 60px;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 15px; /* 适当增加间距 */
}

.fold-btn {
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease; /* 动画效果 */
}

.fold-btn:hover {
  transform: scale(1.1); /* 鼠标悬停时放大 */
}

.status-text {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.status-closed {
  color: red;
}

.status-open {
  color: green;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-btn {
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon-btn:hover {
  transform: scale(1.1); /* 鼠标悬停时放大 */
}

.icon-text {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.popover-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-option {
  padding: 5px 10px;
  text-align: left;
  width: 100%;
  font-size: 14px;
  color: #409EFF;
  transition: background-color 0.3s ease;
  display: flex; /* 设置为flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height: 36px; /* 固定按钮高度 */
}

.status-option:hover {
  background-color: #f0f5ff;
}

.active {
  background-color: #e6f7ff;
  color: #409EFF;
  font-weight: bold;
}
.el-button+.el-button{
    margin-left: 0px;
}
</style>
