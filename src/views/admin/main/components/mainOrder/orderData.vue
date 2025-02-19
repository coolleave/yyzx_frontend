<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getOrderList, confirmOrder, rejectOrder, deliveryOrder, cancelOrder, completeOrder, getOrderDetail } from '@/api/admin/orderApi';
import { ElMessage } from 'element-plus';

const orderData = ref();
const goodsTotla = ref(0);

// 分页
const pageDataform = ref({
    beginTime: "",
    endTime: "",
    status: "",
    page: 1,
    pageSize: 10,
    phone: "",
    number: ""
})

const handlePageChange = (currentPage: number, pageSize: number) => {
    pageDataform.value.page = currentPage;
    pageDataform.value.pageSize = pageSize;
    getOrderData();
}

const getOrderData = async () => {
    const res = await getOrderList(pageDataform.value);
    if (res.data === null) {
        ElMessage.warning("暂无数据");
        return;
    }
    orderData.value = res.data.records;
    goodsTotla.value = res.data.total;
}

// 接单
const handleConfirm = async (id: number) => {
    const res = await confirmOrder({ id });
    if (res.code === 1) {
        ElMessage.success("接单成功");
        getOrderData();
    } else {
        ElMessage.error("接单失败");
    }
}

// 拒单和取消的状态
const rejectDialogVisible = ref(false);  // 拒单弹窗显示
const cancelDialogVisible = ref(false);  // 取消弹窗显示

// 拒单和取消原因的变量
const rejectReason = ref('');
const cancelReason = ref('');
// 当前订单的ID
const currentOrderId = ref();

// 拒单方法
const handleRejection = (id: number) => {
    currentOrderId.value = id;
    rejectDialogVisible.value = true;  // 打开拒单弹窗
}

// 取消方法
const handleCancle = (id: number) => {
    currentOrderId.value = id;
    cancelDialogVisible.value = true;  // 打开取消弹窗
}

// 提交拒单
const submitRejectOrder = async () => {
    if (!rejectReason.value) {
        ElMessage.warning('请填写拒单原因');
        return;
    }
    const res = await rejectOrder({ id: currentOrderId.value, rejectReason: rejectReason.value });
    if (res.code === 1) {
        ElMessage.success("拒单成功");
        rejectDialogVisible.value = false;  // 关闭弹窗
        getOrderData();
    } else {
        ElMessage.error("拒单失败");
    }
}

// 提交取消订单
const submitCancelOrder = async () => {
    if (!cancelReason.value) {
        ElMessage.warning('请填写取消原因');
        return;
    }
    const res = await cancelOrder({ id: currentOrderId.value, cancelReason: cancelReason.value });
    if (res.code === 1) {
        ElMessage.success("取消成功");
        cancelDialogVisible.value = false;  // 关闭弹窗
        getOrderData();
    } else {
        ElMessage.error("取消失败");
    }
}

// 派送
const handleDelivery = async (id: number) => {
    const res = await deliveryOrder(id);
    if (res.code === 1) {
        ElMessage.success("派送成功");
        getOrderData();
    } else {
        ElMessage.error("派送失败");
    }
}

// 完成
const handleComplete = async (id: number) => {
    const res = await completeOrder(id);
    if (res.code === 1) {
        ElMessage.success("完成成功");
        getOrderData();
    } else {
        ElMessage.error("完成失败");
    }
}

// 订单详情
const orderDetailVisible = ref(false);
const orderDetail = ref({
  number: '20210505123012311',
  orderTime: '2022年4月19日16:16:30',
  status: 1,
  amount: 91.5,
  consignee: '张先生',
  phone: '135****1234',
  address: '金燕龙办公楼（建材城西路9号）四层（一一宾馆北侧办公楼',
  remark: '不要葱花青菜、少盐少辣椒',
  orderDetailList:[{
    name: '烤鸭',
    amount: 68,
    image: 'src',
    number: 1
  },]
})

const handleDetail = async(id:number)=>{
  const res = await getOrderDetail(id);
  orderDetail.value = res.data;
  orderDetailVisible.value = true;
  console.log(orderDetail.value.orderDetailList);
  
}
// 返回列表
const goBack = () => {
  orderDetailVisible.value = false;
}


// 初始化数据
defineExpose({ getOrderData, pageDataform })
onMounted(() => {
    getOrderData();
})
</script>

<template>
    <div class="data">
        <h2 class="title">订单数据</h2>
        <el-table :data="orderData" style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="number" label="订单号" width="140" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" width="80" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" width="100" align="center">
                <template #default="scope" width="60" align="center">
                    <el-tag v-if="scope.row.status == 1" type="info">待付款</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="warning">待接单</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="primary">已接单</el-tag>
                    <el-tag v-if="scope.row.status == 4" type="primary">派送中</el-tag>
                    <el-tag v-if="scope.row.status == 5" type="success">已完成</el-tag>
                    <el-tag v-if="scope.row.status == 6" type="danger">已取消</el-tag>
                    <el-tag v-if="scope.row.status == 7" type="primary">已退款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderTime" label="下单时间" width="200" align="center"/>
            <el-table-column prop="amount" label="金额" width="200" align="center"/>
            <el-table-column label="操作" align="center" width="200">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleConfirm(scope.row.id)" v-if="scope.row.status == 2">
                        接单
                    </el-button>
                    <el-button link type="warning" size="default" @click="handleRejection(scope.row.id)" v-if="scope.row.status == 2">
                        拒单
                    </el-button>
                    <el-button link type="success" size="default" @click="handleCancle(scope.row.id)" v-if="scope.row.status == 1">
                        取消
                    </el-button>
                    <el-button size="small" @click="handleDelivery(scope.row.id)" v-if="scope.row.status == 3">
                        派送
                    </el-button>
                    <el-button size="small" @click="handleComplete(scope.row.id)" v-if="scope.row.status == 4">
                        完成
                    </el-button>
                    <el-button size="small" @click="handleDetail(scope.row.id)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 拒单弹出框 -->
        <el-dialog title="拒单原因" v-model="rejectDialogVisible">
            <el-input v-model="rejectReason" type="textarea" placeholder="请输入拒单原因" />
            <template #footer>
                <el-button @click="rejectDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitRejectOrder">确认</el-button>
            </template>
        </el-dialog>

        <!-- 取消订单弹出框 -->
        <el-dialog title="取消订单原因" v-model="cancelDialogVisible">
            <el-input v-model="cancelReason" type="textarea" placeholder="请输入取消原因" />
            <template #footer>
                <el-button @click="cancelDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitCancelOrder">确认</el-button>
            </template>
        </el-dialog>

        

        <el-pagination
            :page-sizes="[5, 10, 20, 30, 40]"
            layout="sizes, prev, pager, next, total"
            :total="goodsTotla"
            class="pagination"
            @change="handlePageChange"
        />

  <div class="order-detail" v-if="orderDetailVisible">
    <div class="header">
      <h2>订单信息</h2>
      <div class="order-number">订单号：{{ orderDetail.number }}</div>
    </div>

    <el-descriptions :column="2" border class="info-block">
      <el-descriptions-item label="下单时间">{{ orderDetail.orderTime }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">
        <el-tag v-if="orderDetail.status == 1" type="info">待付款</el-tag>
        <el-tag v-if="orderDetail.status == 2" type="warning">待接单</el-tag>
        <el-tag v-if="orderDetail.status == 3" type="primary">已接单</el-tag>
        <el-tag v-if="orderDetail.status == 4" type="primary">派送中</el-tag>
        <el-tag v-if="orderDetail.status == 5" type="success">已完成</el-tag>
        <el-tag v-if="orderDetail.status == 6" type="danger">已取消</el-tag>
        <el-tag v-if="orderDetail.status == 7" type="primary">已退款</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="订单金额">￥{{ orderDetail.amount }}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{ orderDetail.consignee }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ orderDetail.phone }}</el-descriptions-item>
      <el-descriptions-item label="地址" :span="2">{{ orderDetail.address }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ orderDetail.remark }}</el-descriptions-item>
    </el-descriptions>

    <div class="goods-list">
      <h3>商品列表</h3>
      <div v-for="item in orderDetail.orderDetailList" class="goods-item">
        <span class="name">{{ item.name }}</span>
        <span class="price">￥{{ item.amount.toFixed(2) }}</span>
        <span>X{{ item.number }}</span>
        <img :src="item.image" class="image">
      </div>
      <div class="total">
        <span>合计：</span>
        <span class="amount">￥{{ orderDetail.amount.toFixed(2) }}</span>
      </div>
    </div>

    <div class="footer">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
    </div>
</template>

<style scoped>
.data {
    margin-top: 20px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
}

.pagination {
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
}

.title {
    margin-bottom: 20px;
}
.order-detail {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
  
  /* 设置元素为固定定位 */
  position: fixed;
  top: 50%; /* 距离顶部50% */
  left: 50%; /* 距离左侧50% */
  transform: translate(-50%, -50%); /* 使用 transform 来居中 */
  
  /* 设置最大宽度 */
  max-width: 80%; /* 你可以根据需要调整宽度 */
  width: 600px; /* 设置宽度 */
  
  /* 设置层级 */
  z-index: 9999; /* 确保它在最上面 */
}


.header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.order-number {
  font-size: 16px;
  color: #606266;
  margin-top: 10px;
}

.info-block {
  margin-bottom: 20px;
}

.goods-list {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.goods-list h3 {
  margin: 0 0 15px 0;
  color: #303133;
}

.goods-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f5f7fa;
}

.goods-item:last-child {
  border-bottom: none;
}

.price {
  color: #f56c6c;
  font-weight: 500;
}

.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
  text-align: right;
  font-size: 16px;
}

.amount {
  color: #f56c6c;
  font-weight: bold;
  margin-left: 10px;
}

.footer {
  margin-top: 20px;
  text-align: center;
}
.image{
  width: 50px;
  height: 50px;
  margin: 10px;
  margin-bottom: 20px;
}
</style>
