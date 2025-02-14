<script setup lang="ts" name="mainSystem">
const systemInfo = [
  { label1: '系统名称', value1: '宇优在线后台管理系统', label2: '版本信息', value2: '1.0.0', label3: '操作系统', value3: 'Linux' },
  { label1: '系统平台', value1: 'centos7', label2: 'CPU核数', value2: '2', label3: '处理器', value3: 'Intel' },
  { label1: 'CPU负载', value1: '1%', label2: '系统内存', value2: '2G', label3: '内存使用', value3: '87.3%' },
  { label1: 'java版本', value1: 'Java22', label2: '系统语言', value2: '[“zh_CN”]', label3: 'MySQL版本', value3: '5.7.37' },
  { label1: 'Nginx版本', value1: '1.20.1', label2: '系统时区', value2: '中国标准时间', label3: '', value3: '' },
]
</script>

<template>
  <div class="system-info">
    <h2 class="title">系统信息</h2>
    <div class="info-table">
      <div 
        v-for="(row, index) in systemInfo" 
        :key="index" 
        class="table-row"
      >
        <div class="table-cell">
          <span class="label">{{ row.label1 }}</span>
          <span class="value">{{ row.value1 }}</span>
        </div>
        <div class="table-cell">
          <span class="label">{{ row.label2 }}</span>
          <span class="value">{{ row.value2 }}</span>
        </div>
        <div class="table-cell">
          <span class="label">{{ row.label3 }}</span>
          <span class="value">{{ row.value3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-info {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
}

.title {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.info-table {
  border: 1px solid #ebeef5;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid #ebeef5;
  background: #fff;
  align-items: center;  /* 垂直居中 */
}

.table-row:nth-child(odd) {
  background-color: #fafafa;
}

.table-cell {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;  /* 垂直居中 */
  padding: 20px 15px;  /* 增加padding，增加单元格高度 */
  border-right: 1px solid #ebeef5;
  height: 80px;  /* 设置固定高度 */
}

.table-cell:last-child {
  border-right: none;
}

.label {
  flex: 0 0 100px;
  color: #909399;
  text-align: right;
  padding-right: 10px;
}

.value {
  flex: 1;
  color: #606266;
  font-weight: 500;
}
</style>
