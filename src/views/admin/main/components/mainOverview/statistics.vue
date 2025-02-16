
<script setup name="statistics">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import {getTurnoverStatistics} from "@/api/admin/overviewApi"

// 图表实例
const turnoverChart = ref(null)
const orderChart = ref(null)
let turnoverChartInstance = null
let orderChartInstance = null

// 数据
const dateRange = ref([])
const chartData = ref({
  dates: [],
  turnover: [],
})
const quickStats = ref({
  totalOrders: 1667,
  validOrders: 1556,
  completionRate: '90%'
})
const salesRank = ref([
  { name: '商品1', amount: 160 },
  { name: '商品2', amount: 120 }
])

// 初始化图表
const initCharts = () => {
  turnoverChartInstance = echarts.init(turnoverChart.value)
//   orderChartInstance = echarts.init(orderChart.value)
  
  const commonOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  }

  turnoverChartInstance.setOption({
    ...commonOption,
    xAxis: { type: 'category', data: chartData.value.dates },
    yAxis: { type: 'value' },
    series: [{ data: chartData.value.turnover, type: 'line' }]
  })

//   orderChartInstance.setOption({
//     ...commonOption,
//     xAxis: { type: 'category', data: chartData.value.dates },
//     yAxis: { type: 'value' },
//     series: [{ data: chartData.value.orders, type: 'line' }]
//   })
}

// 获取数据
const fetchData = async () => {
    if(!dateRange.value || dateRange.value.length === 0){
    //   ElMessage.error('请选择日期范围')
      return
    }
    const beginTime = dateRange.value[0]
    const endTime = dateRange.value[1]
    const res = await getTurnoverStatistics({begin:beginTime,end:endTime})

    // chartData.value.dates = res.data.dateList
     // 处理日期格式
     chartData.value.dates = res.data.dateList.map(date => {
      const [year, month, day] = date.split('-')  // 假设日期格式为 'yy-mm-dd'
      return `${month}-${day}`  // 返回 'mm-dd' 格式
    })
    // quickStats.value = res.stats
    // salesRank.value = res.rank

    nextTick(() => {
      turnoverChartInstance.setOption({
        xAxis: { data: chartData.value.dates },
        series: [{ data: chartData.value.turnover }]
      })
    //   orderChartInstance.setOption({
    //     xAxis: { data: chartData.value.dates },
    //     series: [{ data: chartData.value.orders }]
    //   })
    })
 
}

// 导出Excel
const exportExcel = () => {
  
}

// 模拟API
const mockApiRequest = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        chartData: {
          dates: ['4-1', '4-2', '4-3', '4-4', '4-5'],
          turnover: [120, 150, 100, 180, 160],
          orders: [500, 800, 600, 1200, 1000]
        },
        stats: {
          totalOrders: 1667,
          validOrders: 1556,
          completionRate: '93%'
        },
        rank: [
          { name: '商品1', amount: 160 },
          { name: '商品2', amount: 120 }
        ]
      })
    }, 500)
  })
}

onMounted(() => {
  initCharts()
  fetchData()
})
</script>


<template>
  <div class="dashboard-container">
    <!-- 时间筛选和导出 -->
    <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        @change="fetchData"
      />
      <el-button type="primary" @click="exportExcel">导出Excel</el-button>
    </div>

    <!-- 统计数据 -->
    <div class="stats-group">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in quickStats" :key="index">
          <el-statistic :title="item.label" :value="item.value" />
        </el-col>
      </el-row>
    </div>

    <!-- 营业额图表 -->
    <div class="chart-container">
      <div ref="turnoverChart" style="height: 400px;"></div>
    </div>

    <!-- 订单图表 -->
    <div class="chart-container">
      <div ref="orderChart" style="height: 400px;"></div>
    </div>

    <!-- 销售排名 -->
    <div class="top10-container">
      <h3>销售排名TOP10</h3>
      <el-table :data="salesRank" style="width: 100%">
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="amount" label="销售额" />
      </el-table>
    </div>
  </div>
</template>


<style scoped>
.dashboard-container {
  padding: 20px;
}
.filter-container {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
}
.chart-container {
  margin: 20px 0;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.top10-container {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>
