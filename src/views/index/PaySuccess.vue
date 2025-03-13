<script setup lang="ts" name="SuccessHome">
import { ElCard, ElButton, ElIcon } from 'element-plus'
import { CircleCheck, House } from '@element-plus/icons-vue'

const orderInfo = {
  orderId: '202308210001',
  amount: 321,
  paymentMethod: '支付宝'
}
</script>

<template>
  <div class="success-container">
    <el-card shadow="hover" class="success-card">
      <!-- 成功图标 -->
      <div class="success-icon">
        <el-icon :size="80" color="#67c23a">
          <CircleCheck />
        </el-icon>
      </div>

      <!-- 主要内容 -->
      <div class="success-content">
        <h1 class="success-title">支付成功！</h1>
        <p class="success-subtitle">感谢您的购买</p>

        <!-- 简要订单信息 -->
        <div class="order-summary">
          <div class="summary-item">
            <span class="label">订单编号：</span>
            <span class="value">{{ orderInfo.orderId }}</span>
          </div>
          <div class="summary-item">
            <span class="label">支付金额：</span>
            <span class="price">¥{{ orderInfo.amount }}</span>
          </div>
          <div class="summary-item">
            <span class="label">支付方式：</span>
            <span class="value">{{ orderInfo.paymentMethod }}</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <el-button 
          type="danger" 
          class="home-btn"
          @click="$router.push('/')"
        >
          <el-icon class="btn-icon"><House /></el-icon>
          返回首页
        </el-button>

        <!-- 附加提示 -->
        <p class="contact-tip">
          如有任何问题请联系客服：400-800-1234
        </p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.success-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 0 20px;
  min-height: 70vh;
}

.success-card {
  border-radius: 12px;
  text-align: center;
  :deep(.el-card__body) {
    padding: 40px 30px;
  }
}

.success-icon {
  margin-bottom: 25px;
  animation: bounceIn 0.8s ease;
}

.success-content {
  padding: 0 20px;
}

.success-title {
  color: #303133;
  font-size: 28px;
  margin: 0 0 10px 0;
}

.success-subtitle {
  color: #909399;
  font-size: 16px;
  margin-bottom: 35px;
}

.order-summary {
  text-align: left;
  margin: 30px auto;
  max-width: 400px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
}

.label {
  color: #606266;
  font-size: 14px;
}

.value {
  color: #303133;
  font-weight: 500;
}

.price {
  color: #f56c6c;
  font-size: 16px;
  font-weight: 600;
}

.home-btn {
  width: 220px;
  height: 50px;
  font-size: 16px;
  margin: 30px 0 20px;
  transition: all 0.3s;
  
  .btn-icon {
    margin-right: 8px;
    font-size: 18px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245,108,108,0.3);
  }
}

.contact-tip {
  color: #909399;
  font-size: 13px;
  margin: 15px 0 0;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .success-card {
    :deep(.el-card__body) {
      padding: 30px 15px;
    }
  }

  .success-title {
    font-size: 24px;
  }

  .home-btn {
    width: 100%;
  }
  
  .order-summary {
    padding: 15px;
  }
}
</style>