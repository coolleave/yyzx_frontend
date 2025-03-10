<script setup lang="ts" name="Payment">
import {
  ElCard,
  ElTable,
  ElTableColumn,
  ElInput,
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag
} from 'element-plus'
import { ref } from 'vue'

const remark = ref('')
const orderData = [
  {
    name: '15英寸笔记本电脑包 黑色',
    price: 321,
    quantity: 1
  }
]
</script>

<template>
  <div class="payment-container">
    <el-card shadow="hover" class="payment-card">
      <div class="order-section">
        <h2 class="section-title">订单明细</h2>
        <el-table :data="orderData" class="order-table">
          <el-table-column prop="name" label="商品名称" width="300">
            <template #default="{ row }">
              <div class="product-info">
                <span class="product-name">{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" width="120">
            <template #default="{ row }">
              <span class="price">¥{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="100" />
          <el-table-column label="操作" width="200">
            <template #default>
              <el-input
                v-model="remark"
                placeholder="输入备注信息"
                maxlength="100"
                show-word-limit
                class="remark-input"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row :gutter="30" class="main-content">
        <el-col :span="16">
          <div class="address-section">
            <h2 class="section-title">收货地址</h2>
            <div class="address-card">
              <div class="address-info">
                <el-tag type="success" effect="plain" class="address-tag">
                  <span class="receiver">收件人：ccc</span>
                  <span class="phone">ccc</span>
                </el-tag>
                <p class="detail-address">ccc</p>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="settlement-section">
            <h2 class="section-title">结算价格</h2>
            <div class="price-card">
              <el-descriptions :column="1" border class="price-list">
                <el-descriptions-item label="商品总价">¥321</el-descriptions-item>
                <el-descriptions-item label="商品优惠">
                  <span class="discount">¥0</span>
                </el-descriptions-item>
                <el-descriptions-item label="商品折扣">¥0</el-descriptions-item>
              </el-descriptions>
              
              <div class="total-price">
                <span class="label">合计：</span>
                <span class="value">¥321</span>
              </div>
            </div>

            <div class="action-btns">
              <el-button plain class="back-btn" @click="$router.back()">返回</el-button>
              <el-button type="danger" class="submit-btn">提交订单</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.payment-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.payment-card {
  border-radius: 12px;
  :deep(.el-card__body) {
    padding: 30px;
  }
}

.section-title {
  color: #303133;
  font-size: 18px;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f56c6c;
}

.order-table {
  margin-bottom: 30px;
  :deep(.el-table__header th) {
    background: #f5f7fa;
  }
  
  .product-name {
    font-weight: 500;
  }
  
  .price {
    color: #f56c6c;
    font-weight: 600;
  }
}

.remark-input {
  :deep(.el-input__count) {
    background: transparent;
  }
}

.address-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 20px;
  
  .address-tag {
    padding: 8px 12px;
    .receiver {
      margin-right: 15px;
    }
  }
  
  .detail-address {
    margin: 15px 0 0 0;
    color: #606266;
  }
}

.price-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 20px;
  
  .price-list {
    margin-bottom: 20px;
    
    :deep(.el-descriptions__label) {
      width: 100px;
    }
    
    .discount {
      color: #67c23a;
    }
  }
  
  .total-price {
    text-align: right;
    font-size: 18px;
    
    .label {
      color: #909399;
    }
    
    .value {
      color: #f56c6c;
      font-weight: 600;
      margin-left: 10px;
    }
  }
}

.action-btns {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  
  .back-btn {
    width: 120px;
    border-color: #f56c6c;
    color: #f56c6c;
    
    &:hover {
      background: #fef0f0;
    }
  }
  
  .submit-btn {
    width: 120px;
    font-weight: 500;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245,108,108,0.3);
    }
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    
    .el-col {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  
  .action-btns {
    flex-direction: column;
    
    .el-button {
      width: 100%;
    }
  }
}
</style>