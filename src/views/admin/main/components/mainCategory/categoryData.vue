<script setup lang="ts" name="categoryData">
import { onMounted, ref } from 'vue';
import {categoryAddApi,categoryPageApi,categoryBanByIdApi,categoryDelByIdApi,categoryEditApi} from "@/api/admin/categoryApi"
import { ElMessage, ElMessageBox} from 'element-plus';
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
  try{
    await categoryAddApi(formAdd.value);
    ElMessage.success('新增分类成功');
    getTableData();
  }catch(e){
    ElMessage.success('新增分类失败');
  } 
  showDialog.value = false; // 提交后关闭对话框
};
// 获取分类数据
const categoryStore = CategoryStore();
const getTableData = async(name:string="") => {
  const res = await categoryPageApi({name:name,page:1,pageSize:10});
  categoryStore.categoryList = res.data.records;
  categoryStore.categoryTotal = res.data.total;
  
};
defineExpose({getTableData});

// // 启用/禁用分类
const showBanDialog = ref(false);
const handleBan = async({id,status}:{id:number,status:number}) => {
  showBanDialog.value = true;
  await categoryBanByIdApi({id:id,status:status});
  ElMessage.success('操作成功');
    await getTableData();

};

// 删除分类操作
const handleDelete = async(id: string) => {
  // 这里可以调用接口进行删除操作
  await categoryDelByIdApi(id);
  getTableData();
  ElMessage.success('删除成功');
};

// 删除按钮点击时触发弹出框
const handleConfirmDelete = (id: string) => {
  ElMessageBox.confirm(
    '您确定要删除这个分类吗?', // 提示信息
    '删除确认', // 标题
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning', // 设置为警告类型
    }
  )
    .then(() => {
      // 用户点击 "确定" 后执行删除操作
      handleDelete(id);
    })
    .catch(() => {
      // 用户点击 "取消" 时的操作
      console.log('删除操作已取消');
    });
};

// 编辑的表单数据
const editForm = ref({
  id: 0,
  name: '',
  sort: 1
});

// 控制编辑对话框的显示与隐藏
const showEditDialog = ref(false);

// 点击编辑按钮时，填充数据并打开对话框
const handleEdit = (row:any) => {
    showEditDialog.value = true; // 打开对话框
  editForm.value = { ...row }; // 复制当前行数据
  
};

// 提交编辑数据
const handleSave = async() => {
  await categoryEditApi(editForm.value)
  showEditDialog.value = false; // 关闭对话框
  getTableData()
};

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
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button link type="warning" size="default" @click="handleBan({id:scope.row.id,status:0})" v-if="scope.row.status == 1">
            禁用
        </el-button>
        <el-button link type="success" size="default" @click="handleBan({id:scope.row.id,status:1})" v-if="scope.row.status == 0">
            启用
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleConfirmDelete(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

   <!-- 编辑对话框 -->
   <el-dialog
    title="编辑分类"
    v-model="showEditDialog"
    width="500px"
  >
    <el-form :model="editForm" ref="editFormRef">
      <el-form-item label="名称" prop="name">
        <el-input v-model="editForm.name" placeholder="请输入分类名称" />
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="editForm.sort"
          type="number"
          placeholder="请输入排序"
          min="1"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="showEditDialog = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
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
