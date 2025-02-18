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
    console.log(pageDataform.value);
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
                    <el-button size="small" @click="">
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
</style>
