<script setup lang="ts" name="GoodsDetail">
import { ref } from 'vue';
import {
  ElCard,
  ElTag,
  ElButton,
  ElStatistic,
  ElRow,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'

const activeNames = ref(['delivery'])
</script>

<template>
  <div class="goods-container">
    <el-card shadow="hover" class="goods-card">
      <el-row :gutter="30">
        <!-- 商品主信息 -->
        <el-col :xs="24" :sm="16">
          <div class="goods-header">
            <el-tag type="success" effect="dark">上市销售</el-tag>
            <h1 class="goods-title">15英寸笔记本电脑包 黑色</h1>
          </div>

          <el-statistic
            class="goods-price"
            :value="321"
            :precision="2"
            prefix="¥"
            value-style="color: #f56c6c; font-size: 36px;"
          />

          <el-descriptions :column="1" border class="goods-info">
            <el-descriptions-item label="分类">电子产品</el-descriptions-item>
            <el-descriptions-item label="库存">
              <span class="stock-num">333</span>
            </el-descriptions-item>
          </el-descriptions>

          <div class="action-btns">
            <el-button 
              type="danger" 
              size="large"
              class="buy-btn"

            >
              <template #icon>
                <el-icon><ShoppingCart /></el-icon>
              </template>
              立即购买
            </el-button>
          </div>
        </el-col>

        <!-- 配送信息 -->
        <el-col :xs="24" :sm="8">
          <el-collapse v-model="activeNames" class="delivery-info">
            <el-collapse-item title="配送信息" name="delivery">
              <div class="delivery-content">
                <p class="tip-text">关于配送时间的预估仅供参考，实际配送受清关或天气等不可抗力因素的影响...</p>
                
                <ul class="delivery-list">
                  <li>支持中国全境配送（港澳台除外）</li>
                  <li>偏远地区配送时间可能延长</li>
                  <li>不支持晚间送货、预约服务</li>
                  <li>无法配送时会及时通知</li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.goods-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.goods-card {
  border-radius: 12px;
  :deep(.el-card__body) {
    padding: 30px;
  }
}

.goods-header {
  margin-bottom: 25px;
  .el-tag {
    margin-bottom: 10px;
  }
}

.goods-title {
  color: #303133;
  font-size: 24px;
  margin: 0;
}

.goods-price {
  margin: 20px 0;
}

.goods-info {
  margin: 25px 0;
  :deep(.el-descriptions__body) {
    background: #f5f7fa;
  }
}

.stock-num {
  color: #67c23a;
  font-weight: 600;
}

.action-btns {
  margin-top: 35px;
  .buy-btn {
    width: 100%;
    height: 50px;
    font-size: 18px;
    letter-spacing: 1px;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245,108,108,0.3);
    }
  }
}

.delivery-info {
  border-radius: 8px;
  :deep(.el-collapse-item__header) {
    font-size: 16px;
    font-weight: 600;
  }
}

.delivery-content {
  color: #606266;
  line-height: 1.8;
  
  .tip-text {
    margin: 0 0 15px 0;
  }
}

.delivery-list {
  padding-left: 18px;
  margin: 0;
  li {
    margin-bottom: 8px;
    position: relative;
    &::before {
      content: "•";
      color: #f56c6c;
      margin-right: 8px;
    }
  }
}

@media (max-width: 768px) {
  .goods-container {
    padding: 0 10px;
  }
  
  .goods-title {
    font-size: 20px;
  }
  
  .buy-btn {
    font-size: 16px !important;
  }
}
</style>