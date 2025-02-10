<script setup lang="ts" name="employeeData">
import { onMounted, ref } from 'vue';
import {EmployeeStore} from "@/stores/admin/employeeStore"
import {employeeAddApi} from "@/api/admin/employeeApi"
import { ElMessage } from 'element-plus';
const showDialog = ref(false);

const form = ref({
  idNumber: '',
  name: '',
  phone: '',
  sex: '',
  username: ''
});
// 新增员工数据校验
const rules = ref({
  idNumber: [
    {
      required: true,
      message: '请输入身份证号',
      trigger: 'blur'
    },
    {
      pattern: /^[1-9]\d{16}[0-9Xx]$/,
      message: '身份证号格式不正确',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ]
});


const formRef = ref();

const handleInsert = () => {
  showDialog.value = true;
};
// 新增员工确定按钮
const handleConfirm = () => {
  formRef.value?.validate(async(valid:any) => {
    if (valid) {
      console.log('提交数据:', form.value);
      await employeeAddApi(form.value);
      await getEmployee();
      // 消息提示
        ElMessage.success('新增员工成功');
      showDialog.value = false;
    } else {
      console.log('表单校验失败');
    }
  });
};

const employList = ref({total:'',records: []});



// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);

const handleSizeChange=()=>{
    getEmployee();
}

const handleCurrentChange=()=>{
    getEmployee();
}

const total = ref(0);
// 获取员工信息函数
const getEmployee = async(name:any="") => {
    const employeeStore = EmployeeStore();
    let queryPage = currentPage.value;
    let queryPageSize = pageSize.value;
    await employeeStore.getEmployeeList({name:name,page:queryPage,pageSize:queryPageSize});
    employList.value = employeeStore.employeeList;
    
    total.value=Number(employList.value.total)
    console.log("获取员工信息成功:", employList.value);
    
};
defineExpose({getEmployee});
onMounted(() => {
    getEmployee();
});
</script>

<template>
  <div class="data">
    <div class="insertBtn">
    <h2>员工列表</h2>
      <el-button type="primary" size="small" @click="handleInsert">新增员工</el-button>
    </div>
    <!-- 新增员工表单 -->
    <el-dialog title="新增员工" v-model="showDialog">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 数据表格 -->
    <el-table :data="employList.records" style="width: 100%">
    <el-table-column type="selection"  width="55" />
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="username" label="用户名" width="120" />
    <el-table-column prop="name" label="姓名" width="150" />
    <el-table-column prop="phone" label="手机号" width="160" />
    <el-table-column prop="sex" label="性别" width="60" />
    <el-table-column prop="status" label="状态" width="60">
        <template #default="scope">
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-if="scope.row.status== 0" type="danger">停用</el-tag>
        </template>
    </el-table-column>

    <el-table-column prop="createTime" label="创建时间" width="120" />
    <el-table-column prop="updateTime" label="更新时间" width="120" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default>
        <el-button link type="primary" size="default" @click="">
          编辑
        </el-button>
        <el-button link type="warning" size="default">
            删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页工具 -->
  <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      layout="total,sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    />
  </div>
</template>

<style scoped>
.data {
  margin-top: 20px;
  background-color: #F5F5F5;
  padding: 10px;
  border-radius: 5px;
}

.insertBtn {
  display: flex;
  justify-content: space-between;
  text-align: right;
  margin: 20px;
}
.pagination {
  margin: 20px 0;
  display: flex;
justify-content: flex-end;
}
</style>
