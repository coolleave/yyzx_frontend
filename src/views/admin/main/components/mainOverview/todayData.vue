<script setup lang="ts" name="todayData">
import { ElCard, ElRow, ElCol, ElIcon } from 'element-plus'
import { Money, TrendCharts, Goods } from '@element-plus/icons-vue'
import { reactive, computed, onMounted } from 'vue';
import { Timer, Bicycle, CircleCheck, CircleClose, List } from '@element-plus/icons-vue'
import { getBuinessData, getOrderData } from '@/api/admin/overviewApi'
// 营业额相关数据
const todayData = reactive({
  turnover: 200.13,
  validOrders: 12,
  completionRate: 16,
  averagePrice: 30,
  newUsers: 18
})

const currentDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需加1
  const day = today.getDate().toString().padStart(2, '0');
  
  return `${year}年${month}月${day}日`; // 拼接为 'xx年xx月xx日'
});

// 获取营业额数据
const getTodayData = async()=>{
  const res = await getBuinessData();
  todayData.turnover = res.data.turnover;
  todayData.validOrders = res.data.validOrders;
  todayData.completionRate = res.data.orderCompletionRate;
  todayData.averagePrice = res.data.unitPrice;
  todayData.newUsers = res.data.newUsers;
}

// 订单管理相关数据
const orderStatus = reactive({
  pending: 12,
  delivering: 10,
  completed: 18,
  canceled: 1,
  total: 41
})

// 获取订单数据
const getOrderStatus = async()=>{
  const res = await getOrderData();
  orderStatus.pending = res.data.waitingOrders;
  orderStatus.delivering = res.data.deliverOrders;
  orderStatus.completed = res.data.completedOrders;
  orderStatus.canceled = res.data.canceledOrders;
  orderStatus.total = res.data.allOrders;
}


onMounted(()=>{
  getTodayData();
  getOrderStatus();
})
</script>

<template>
  <div class="today-data">
    <h3 class="title">今日数据（{{currentDate}}）</h3>
    <ElRow :gutter="20">
      <!-- 营业额 -->
      <ElCol :span="6">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon turnover">
              <Money />
            </ElIcon>
            <div class="content">
              <span class="label">营业额</span>
              <div class="value">¥ {{ todayData.turnover }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- 有效订单 -->
      <ElCol :span="6">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon orders">
              <List />
            </ElIcon>
            <div class="content">
              <span class="label">有效订单</span>
              <div class="value">{{ todayData.validOrders }} 单</div>
            </div>
          </div>
        </ElCard>
      </ElCol>
      
      <!-- 订单完成率 -->
      <ElCol :span="6">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon rate">
              <TrendCharts />
            </ElIcon>
            <div class="content">
              <span class="label">订单完成率</span>
              <div class="value">{{ todayData.completionRate }}%</div>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- 平均客单价 -->
      <ElCol :span="6">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon price">
              <Goods />
            </ElIcon>
            <div class="content">
              <span class="label">平均客单价</span>
              <div class="value">¥ {{ todayData.averagePrice }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

  <div class="order-management">
    <h3 class="title">订单管理（5）</h3>
    <div class="orderData">
    <ElRow :gutter="20">
      <!-- 待接单 -->
      <ElCol :span="4.8">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon pending">
              <Timer />
            </ElIcon>
            <div class="content">
              <span class="label">待接单</span>
              <div class="value">{{ orderStatus.pending }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- 待派送 -->
      <ElCol :span="4.8">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon delivering">
              <Bicycle />
            </ElIcon>
            <div class="content">
              <span class="label">待派送</span>
              <div class="value">{{ orderStatus.delivering }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- 已完成 -->
      <ElCol :span="4.8">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon completed">
              <CircleCheck />
            </ElIcon>
            <div class="content">
              <span class="label">已完成</span>
              <div class="value">{{ orderStatus.completed }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- 已取消 -->
      <ElCol :span="4.8">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon canceled">
              <CircleClose />
            </ElIcon>
            <div class="content">
              <span class="label">已取消</span>
              <div class="value">{{ orderStatus.canceled }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>

      <!-- 全部订单 -->
      <ElCol :span="4.8">
        <ElCard shadow="hover">
          <div class="data-item">
            <ElIcon :size="40" class="icon total">
              <List />
            </ElIcon>
            <div class="content">
              <span class="label">全部订单</span>
              <div class="value">{{ orderStatus.total }}</div>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
    <div class="detail-link">
      <a href="#">查看订单明细 ></a>
    </div>
  </div>
  </div>
</template>

<style scoped>
.today-data {
  padding: 20px;
  
  .title {
    margin-bottom: 20px;
    color: #333;
    font-weight: 600;
  }
  .data-item {
    display: flex;
    align-items: center;
    padding: 15px 0;

    .icon {
      margin-right: 15px;
      padding: 10px;
      border-radius: 8px;
      
      &.turnover {
        color: #67C23A;
        background: #f0f9eb;
      }
      &.orders {
        color: #409EFF;
        background: #ecf5ff;
      }
      &.rate {
        color: #E6A23C;
        background: #fdf6ec;
      }
      &.price {
        color: #F56C6C;
        background: #fef0f0;
      }
      &.users {
        color: #909399;
        background: #f4f4f5;
      }
    }

    .content {
      .label {
        font-size: 14px;
        color: #999;
      }
      .value {
        margin-top: 8px;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .mt-20 {
    margin-top: 20px;
  }
}

.order-management {
  padding: 20px;
  margin-top: 20px;
}

.title {
    margin-bottom: 20px;
    color: #333;
    font-weight: 600;
  }

  .data-item {
    display: flex;
    align-items: center;
    padding: 15px 0;

    .icon {
      margin-right: 15px;
      padding: 10px;
      border-radius: 8px;
      
      &.pending {
        color: #409EFF;
        background: #ecf5ff;
      }
      &.delivering {
        color: #E6A23C;
        background: #fdf6ec;
      }
      &.completed {
        color: #67C23A;
        background: #f0f9eb;
      }
      &.canceled {
        color: #F56C6C;
        background: #fef0f0;
      }
      &.total {
        color: #909399;
        background: #f4f4f5;
      }
    }

    .content {
      .label {
        font-size: 14px;
        color: #999;
      }
      .value {
        margin-top: 8px;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .detail-link {
    margin-top: 15px;
    text-align: right;
    
    a {
      color: #409EFF;
      text-decoration: none;
      font-size: 14px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
.orderData {
  display: flex;
}
</style>