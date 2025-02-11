<script setup lang="ts" name="categoryData">
import { onMounted, ref } from 'vue';
import {categoryAddApi,categoryPageApi} from "@/api/admin/categoryApi"
import { ElMessage } from 'element-plus';
import {CategoryStore} from "@/stores/admin/categoryStore"

// 用于控制对话框显示
const showDialog = ref(false);

// 新增分类表单数据
const formAdd = ref({
  name: '',
  sort: 0
});

// 点击新增分类按钮，显示对话框
const handleAddCategory = () => {
  showDialog.value = true;
};

// 提交新增分类数据
const handleSubmit = async() => {
  console.log("提交数据:", formAdd.value);
  try{
    await categoryAddApi(formAdd.value);
    ElMessage.success('新增分类成功');
  }catch(e){
    ElMessage.success('新增分类失败');
  } 
  showDialog.value = false; // 提交后关闭对话框
};
// 
const categoryStore = CategoryStore();



const getTableData = async(name:string="") => {
  const res = await categoryPageApi({name:name,page:1,pageSize:10});
  categoryStore.categoryList = res.data.records;
  categoryStore.categoryTotal = res.data.total;
  console.log("categoryList",categoryStore.categoryList);
  
};

defineExpose({getTableData});


onMounted(() => {
  getTableData();
});
</script>

<template>
  <div class="data">
    <h2>分类列表</h2>

    <!-- 新增分类按钮 -->
    <el-button class="addBtn" type="primary" @click="handleAddCategory">
      新增分类
    </el-button>

    <!-- 新增分类弹出框 -->
    <el-dialog
      title="新增分类"
      v-model="showDialog"
      width="400px"
    >
      <el-form :model="formAdd" label-width="80px">
        <el-form-item label="分类名称" prop="name" :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' }]">
          <el-input v-model="formAdd.name" placeholder="请输入分类名称" />
        </el-form-item>

        <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '请输入排序值', trigger: 'blur' }]">
          <el-input v-model="formAdd.sort" type="number" placeholder="请输入排序值" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
    <!-- 数据表格 -->

    <el-table :data="categoryStore.categoryList" style="width: 100%">
    <el-table-column type="index" label="序号" width="80" align="center" />
    <el-table-column prop="name" label="名称" width="130" align="center"></el-table-column>
    <el-table-column prop="sort" label="排序" width="80" align="center"></el-table-column>
    <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="scope" width="60" align="center">
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-if="scope.row.status == 0" type="danger">停用</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="200"  align="center"/>
    <el-table-column prop="updateTime" label="更新时间" width="200"  align="center"/>
    <el-table-column label="操作" align="center" width="200">
      <template #default="scope"    >
        <el-button size="small" @click="">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click=""
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<style scoped>
.data {
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
}

.addBtn {
  
  display: block;
  margin: 10px;
  margin-left: auto;
}
</style>
