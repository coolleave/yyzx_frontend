import { defineStore } from "pinia";
import { ref } from "vue";
import { categoryPageApi } from "@/api/admin/categoryApi";
export const CategoryStore = defineStore('category', () => {

    // 分类列表
    const categoryList = ref<any>({});

    // 获取分类列表
    const getCategoryList = async () => {
        try {
            // 调用接口获取分类列表
            const res = await categoryPageApi();
            // 将分类列表保存到 categoryList 中
            categoryList.value = res.data;

        } catch (error) {
            console.error('获取分类列表失败:', error);
        }
    };

    return { categoryList, getCategoryList };
});