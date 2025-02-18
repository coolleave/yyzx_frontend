uploadApi<script setup lang="ts" name="goodsData">
import { onMounted, ref, nextTick  } from "vue";
import { uploadApi } from "@/api/admin/uploadApi";  
import {categoryPageApi} from "@/api/admin/categoryApi"
import {goodsPageApi,goodsAddApi,goodsEditApi,goodsStatusApi,goodsDelApi} from "@/api/admin/goodsApi"
import { ElMessage,ElMessageBox } from "element-plus";

// 分类列表
const categoryList = ref()
const getCategoryList = async () =>{
    // 分类列表
    const res = await categoryPageApi({ name: "", page: 1, pageSize: 1000 })
    categoryList.value = res.data.records
}

// 新增商品数据表单
const form = ref({
    // 取第一个categoryList元素
  id:null,
  categoryId: null,
  description: "",
  image: "",
  name: "",
  price: null,
  status: 1
});

// 新增商品对话框显示状态
const showDialog = ref(false);

// 新增商品
const handleInsert = () => {
  // 弹出新增商品的对话框
  showDialog.value = true;
  form.value = { // 重置表单数据
    id: null,
    categoryId: null,
    description: "",
    image: "",
    name: "",
    price: null,
    status: 1
  };
  showDialog.value = true;
  // 清空上传组件状态
  nextTick(() => {
    uploadRef.value?.clearFiles();
  });
};

const insertProduct = (form:any)=>{
// 在这里处理新增商品的逻辑
const newItem = { ...form.value }; // 获取表单的数据
    // 调用新增商品接口
    goodsAddApi(newItem).then((res) => {
        getGoodsList()
        ElMessage.success("新增商品成功");
    }).catch((error) => {
        console.error("新增商品失败", error);
        ElMessage.error("新增商品失败");
    });
  // 关闭对话框
  showDialog.value = false;
}

// 编辑商品
const updateProduct = async (updatedProduct: any) => {
  await goodsEditApi(updatedProduct)  // 假设 goodsUpdateApi 是用于更新商品的 API
    .then((res) => {
      ElMessage.success("商品更新成功");
      getGoodsList();  // 更新商品列表
      showDialog.value = false;  // 关闭对话框
      
    })
    .catch((error:any) => {
      ElMessage.error("商品更新失败");
      console.error(error);
    });
};
// 确认新增逻辑
const handleConfirm = () => {
  if (form.value.id) {
    // 如果表单中有 id，说明是更新操作
    updateProduct(form.value);
  } else {
    // 否则是新增商品
    insertProduct(form.value);
  }
  

};

// 自定义图片上传接口函数
const customUpload = async (option: any) => {
  const formData = new FormData();
  formData.append("file", option.file)

  try {
    // 调用接口上传文件
    const response = await uploadApi(formData);
    // 接口返回的图片链接在response中
    handlePictureUploadSuccess(response);
     // 通知上传完成，清除上传状态
     option.onSuccess(response.data, option.file);
  } catch (error) {
    console.error('上传图片失败', error);
  }
};
// 处理图片上传，上传成功后更新表单中的图片链接
const handlePictureUploadSuccess = async (response: any) => {
  try {
    // 假设接口返回图片的URL
    const { data } = response; // 从接口返回的响应中获取图片的URL
    form.value.image = data; // 更新表单中的图片URL
    ElMessage.success('图片上传成功:');
  } catch (error) {
    ElMessage.error('上传图片失败');
  }
};

// 商品分页查询
// 商品表
const goodsList = ref();
const goodsTotla = ref(0)
const getGoodsList = async () => {
  const res = await goodsPageApi({page: searchForm.value.page, pageSize: searchForm.value.pageSize });
  goodsList.value = res.data.records;
  goodsTotla.value = res.data.total;
};

// 根据 categoryId 获取分类名称
const getCategoryName = (categoryId: number) => {
  const category = categoryList.value?.find((c:any) => c.id === categoryId);
  return category ? category.name : '未知分类'; // 如果找不到对应的分类，返回 '未知分类'
};

// 查询表单
const searchForm = ref({
  page: 1,
  pageSize:10,
  name: "",
  categoryId: "",
  status: ""
});
const queryGoods = async()=>{
    const res = await goodsPageApi(searchForm.value)
    goodsList.value = res.data.records
}
defineExpose({
    queryGoods,searchForm
})
// 页码变换时处理
const handlePageChange = (currentPage: number, pageSize: number)=>{
    searchForm.value.page = currentPage
    searchForm.value.pageSize = pageSize
    queryGoods()
}

// 新增上传组件ref
const uploadRef = ref();
// 编辑商品
const handleEdit = (product: any) => {
  // 打开对话框
  showDialog.value = true;
  form.value = { ...product };
  // 清空上传组件状态（编辑时保留原有图片）
  nextTick(() => {
    uploadRef.value?.clearFiles();
  });
};

// 上架，下架逻辑
const handBan = async (id:string,status:number)=>{
  await goodsStatusApi(id,status)
  getGoodsList()

}
// 删除商品
// 删除单个商品
const handleDelete = async (id: string) => {
  // 弹出确认框
  ElMessageBox.confirm("你确定要删除此商品吗?", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await goodsDelApi(id); 
        if(res.code===1){
          ElMessage.success("商品删除成功");
        }else{
          ElMessage.warning(res.msg);
        }
        getGoodsList(); // 删除成功后更新商品列表
      } catch (error) {
        console.error("删除商品失败", error);
        ElMessage.error("删除商品失败");
      }
    })
    .catch(() => {
      console.log("取消删除");
    });
};

const selectedIds = ref();
// 批量删除
const handleSelectionChange = (goods:any)=>{
  // 遍历goods，取出id
  // 通过 map 遍历选中的商品，获取它们的 id
  selectedIds.value = goods.map((item: any) => item.id);
  }
  
const handleBatchDelete = async () => {
  
  if (Object.values(selectedIds.value).length === 0) {
    ElMessage.warning("请至少选择一个商品");
    return;
  }

  // 弹出批量删除确认框
  ElMessageBox.confirm(
    `你确定要删除这 ${Object.values(selectedIds.value).length} 个商品吗?`,
    "确认删除",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async () => {
      try {

        const res= await goodsDelApi(Object.values(selectedIds.value).join(",")); // 传入 ID 列表，假设 API 接受用逗号分隔的 ID 字符串
        if(res.code===1){
        ElMessage.success("批量删除成功");
        }else{
          ElMessage.warning(res.msg);
        }
        getGoodsList(); // 删除成功后更新商品列表
      } catch (error) {
        console.error("批量删除商品失败", error);
        ElMessage.error("批量删除商品失败");
      }
    })
    .catch(() => {
      console.log("取消批量删除");
    });
};

onMounted( () => {
    getCategoryList()
    getGoodsList()
})

</script>

<template>
  <div class="data">
    <!-- 新增商品工具 -->
    <h2>商品列表</h2>
    <div class="insertBtn">
      <!-- 批量删除按钮 放在 新增按钮右边 -->
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      <!-- 新增商品按钮 -->
      <el-button type="primary" @click="handleInsert">新增商品</el-button>
    </div>

    <!-- 新增商品表单 -->
    <el-dialog title="商品操作" v-model="showDialog">
      <el-form ref="formRef" v-model="form" label-width="80px">
        <!-- 商品类别 -->
        <el-form-item label="商品类别">
            <el-select v-model="form.categoryId" placeholder="请选择商品类别">
    <!-- 使用 v-for 遍历 categoryList 渲染每个商品类别 -->
        <el-option
        v-for="category in categoryList"
        :key="category.id"
        :label="category.name"
        :value="category.id"
        ></el-option>
  </el-select>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input v-model="form.description" placeholder="请输入商品描述"></el-input>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片">
            <el-upload
                ref="uploadRef"
                :show-file-list="false"
                :limit="1"
                :auto-upload="true"
                :http-request="customUpload"
                
            >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div v-if="form.image">
                <h4>预览:</h4>
                <img :src="form.image" alt="商品图片" width="200" />
            </div>
            </el-form-item>


        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" placeholder="请输入商品价格(元)"></el-input-number>
        </el-form-item>

        <!-- 商品状态 -->
        <el-form-item label="商品状态">
          <el-select v-model="form.status" placeholder="请选择商品状态">
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 商品列表表格 -->
    <el-table :data="goodsList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column label="商品名称" prop="name"  align="center" />
      <el-table-column label="商品分类">
      <template #default="{ row }">
        <!-- 根据 categoryId 查找分类名称 -->
        <span>{{ getCategoryName(row.categoryId) }}</span>
      </template>
    </el-table-column>
      <el-table-column label="商品描述" prop="description" align="center"/>
      <el-table-column label="商品价格(元)" prop="price" align="center"/>
      <el-table-column label="商品状态" prop="status">
        <template #default="{ row }">
          <span>{{ row.status === 1 ? '上架' : '下架' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" prop="image">
        <template #default="{ row }">
          <img :src="row.image" alt="商品图片" width="50" />
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center"/>
      <el-table-column label="操作" align="center" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">
  编辑
</el-button>

        <el-button link type="warning" size="default" @click="handBan(scope.row.id,0)" v-if="scope.row.status == 1">
            下架
        </el-button>
        <el-button link type="success" size="default" @click="handBan(scope.row.id,1)" v-if="scope.row.status == 0">
            上架
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
     
    <el-pagination 
    :page-sizes="[5,10, 20, 30,40]"
    layout="sizes,prev, pager, next,total"
    :total="goodsTotla"
    class="pagination"
    @change="handlePageChange"
  />
  </div>
</template>

<style scoped>
.data {
  margin-top: 20px;
  background-color: #F5F5F5;
  padding: 20px;
  border-radius: 5px;
}

.insertBtn {
  display: flex;
  justify-content: flex-end;  /* Align buttons to the right */
  text-align: right;
  margin: 10px;
  gap: 10px;  /* Add space between buttons */
}

.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
