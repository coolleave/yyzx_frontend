
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { defineEmits, computed } from 'vue'
import { adminGetStatusApi, adminSetStatusApi } from "@/api/admin/shopApi"
import { ElButton, ElDialog } from 'element-plus'
import { Fold, Expand, Setting, User } from '@element-plus/icons-vue'
import  router from "@/router/index"
import { useAdminStore } from '@/stores/admin/adminStore'
import {adminLogoutApi} from "@/api/admin/employeeApi"
// 定义折叠状态
const isFold = ref(false)

// 定义发送折叠信号
const emit = defineEmits(['foldEmit'])

// 折叠展开切换
const foldChange = () => {
  isFold.value = !isFold.value
  emit('foldEmit', isFold.value)
}

// 初始化店铺状态
const status = ref(1)  // 0代表未营业，1代表营业中
const getStatus = async () => {
  const res = await adminGetStatusApi()
  status.value = res.data
}

// 计算属性，根据status返回对应的文本和类名
const statusText = computed(() => {
  return status.value === 0 ? '未营业' : '营业中'
})

const statusClass = computed(() => {
  return status.value === 0 ? 'status-closed' : 'status-open'
})

// 设置店铺状态
const setStatus = async (newStatus: number) => {
  await adminSetStatusApi(newStatus)
  status.value = newStatus
}

const dialogVisible = ref(false)  // 控制对话框的显示与隐藏

// 弹出退出确认对话框
const showLogoutDialog = () => {
  dialogVisible.value = true
}

// 退出登录操作
const logout = async() => {
  console.log('用户已退出登录')
  await adminLogoutApi()
  
  // 清除token
  localStorage.removeItem('token')
  const adminStore = useAdminStore()
  adminStore.adminInfo = ''
  // 跳到登录页
  router.push('/adminLogin')
  dialogVisible.value = false  // 关闭对话框
}

// 取消退出登录
const cancelLogout = () => {
  dialogVisible.value = false  // 关闭对话框
}

onMounted(() => {
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
        <template v-slot:reference>
          <div class="icon-text">
            <el-icon class="icon-btn">
              <Setting />
            </el-icon>
            <span>设置状态</span>
          </div>
        </template>

        <el-button
          size="small"
          @click="setStatus(1)"
          :class="{'status-option': true, 'active': status === 1}"
        >
          营业中
        </el-button>
        <el-button
          size="small"
          @click="setStatus(0)"
          :class="{'status-option': true, 'active': status === 0}"
        >
          未营业
        </el-button>
      </el-popover>

      <!-- 个人中心按钮 -->
      <el-icon class="icon-btn">
        <User />
      </el-icon>

      <!-- 退出登录按钮 -->
      <el-button type="primary" @click="showLogoutDialog">
        退出登录
      </el-button>

        <!-- 退出确认对话框 -->
  <el-dialog
    v-model="dialogVisible"
    title="确认退出"
    width="400px"
    :before-close="cancelLogout"
  >
    <p>您确定要退出登录吗？</p>
    <template #footer>
      <el-button @click="cancelLogout" size="small">取消</el-button>
      <el-button type="primary" @click="logout" size="small">确定</el-button>
    </template>
  </el-dialog>
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
  gap: 15px;
}

.fold-btn {
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.fold-btn:hover {
  transform: scale(1.1);
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
  transform: scale(1.1);
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
}

.status-option:hover {
  background-color: #f0f5ff;
}

.active {
  background-color: #e6f7ff;
  color: #409EFF;
  font-weight: bold;

}

.el-button+.el-button {
  margin-left: 0px;
}

/* Style the dialog */
.el-dialog {
  max-width: 100%;
  margin: 0 auto; /* Center the dialog */
}

.el-dialog__header {
  background-color: #409EFF;
  color: white;
}

.el-dialog__body {
  font-size: 14px;
}

.el-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.el-button {
  margin: 0;
}
</style>
