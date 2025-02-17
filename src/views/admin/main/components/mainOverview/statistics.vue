
<script setup name="statistics">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import {getTurnoverStatistics,getOrderStatistics,getUserStatistics,exportExcel} from "@/api/admin/overviewApi"
// 图表实例
const turnoverChart = ref(null)
const orderChart = ref(null)
const userChart = ref(null)
let turnoverChartInstance = null
let orderChartInstance = null
let userChartInstance = null
// 数据
const dateRange = ref([])
const chartData = ref({
  dates: [],
  turnover: [],
  orders: [],
  users: []
})

// 初始化图表
const initCharts = () => {
  turnoverChartInstance = echarts.init(turnoverChart.value)  // 营业额折线图
  orderChartInstance = echarts.init(orderChart.value)  // 订单折线图
  userChartInstance = echarts.init(userChart.value)  // 用户折线图

  // 通用配置
  const commonOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  }

  // 设置图表配置
  turnoverChartInstance.setOption({
    ...commonOption,
    xAxis: { type: 'category', data: chartData.value.dates },
    yAxis: { type: 'value' },
    series: [{ data: chartData.value.turnover, type: 'line' }]
  })

  orderChartInstance.setOption({
    ...commonOption,
    xAxis: { type: 'category', data: chartData.value.dates },
    yAxis: { type: 'value' },
    series: [{ data: chartData.value.orders, type: 'line' }]
  })

  userChartInstance.setOption({
    ...commonOption,
    xAxis: { type: 'category', data: chartData.value.dates },
    yAxis: { type: 'value' },
    series: [{ data: chartData.value.users, type: 'line' }]
  })
}

// 获取数据
const fetchData = async () => {
    if(!dateRange.value || dateRange.value.length === 0){
    //   ElMessage.error('请选择日期范围')
      return
    }
    const beginTime = dateRange.value[0]
    const endTime = dateRange.value[1]
    const resTurnover = await getTurnoverStatistics({begin:beginTime,end:endTime})
    const resOrder = await getOrderStatistics({begin:beginTime,end:endTime})
    const resUser = await getUserStatistics({begin:beginTime,end:endTime})
    // 处理 dateList 字符串
    const dateList = resTurnover.data.dateList ? resTurnover.data.dateList.split(',') : []
    chartData.value.dates = dateList.map(date => {
      const [year, month, day] = date.split('-') // 假设日期格式为 'yyyy-mm-dd'
      return `${month}-${day}` // 返回 'mm-dd' 格式
    })
    // 营业额数据
    chartData.value.turnover = resTurnover.data.turnoverList ? resTurnover.data.turnoverList.split(',').map(item => item === "" ? 0 : parseFloat(item)) : []
    // 订单数据
    chartData.value.orders = resOrder.data.orderCountList ? resOrder.data.orderCountList.split(',') : []
    // 用户数据
    chartData.value.users = resUser.data.totalUserList ? resUser.data.totalUserList.split(',') : []
    
    nextTick(() => {
      turnoverChartInstance.setOption({
        xAxis: { data: chartData.value.dates },
        series: [{ data: chartData.value.turnover }]
      })
      orderChartInstance.setOption({
        xAxis: { data: chartData.value.dates },
        series: [{ data: chartData.value.orders }]
      })
      userChartInstance.setOption({
        xAxis: { data: chartData.value.dates },
        series: [{ data: chartData.value.users }]
      })
    })
 ElMessage.success("获取数据成功")
}

// 导出Excel
const handleExportExcel = async() => {
    const res = await exportExcel()
    console.log(typeof res);
    const blob = new Blob([res.data]);
    // 创建下载链接
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob); // 创建一个指向 Blob 的 URL

    // 设置链接的下载属性
    link.href = url;
    // 获取今天的日期
    const today = new Date();

    // 获取昨天的日期
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);   

  // 获取30天前的日期
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // 格式化日期为 YYYY-MM-DD 格式
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // 获取30天前到昨天的日期范围
    const startDate = formatDate(thirtyDaysAgo);
    const endDate = formatDate(yesterday);

    const name = `宇优在线${startDate}至${endDate}营业数据.xlsx`;

    link.download = name; // 设置文件下载时的文件名

    // 触发点击事件，开始下载
    link.click();

    // 释放创建的 URL
    URL.revokeObjectURL(url);
};

  


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
      <el-button type="primary" @click="handleExportExcel">导出近30日Excel</el-button>
    </div>

    <!-- 统计数据 -->
    <div class="chartTitle">
      <h2>营业额统计</h2>
    </div>

    <!-- 营业额图表 -->
    <div class="chart-container">
      <div ref="turnoverChart" style="height: 400px;"></div>
    </div>

    <!-- 订单图表 -->
    <div class="chartTitle">
      <h2>订单统计</h2>
    </div>
    <div class="chart-container">
      <div ref="orderChart" style="height: 400px;"></div>
    </div>

    <!-- 用户统计折线图 -->
     <div class="chartTitle">
      <h2>用户统计</h2>
    </div>
    <div class="chart-container">
      <div ref="userChart" style="height: 400px;"></div>
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
