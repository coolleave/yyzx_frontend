import { defineStore } from "pinia";
import { ref } from "vue";
interface Category {
    id: number;
    name: string;
    sort: number;
    status: number;
    createTime: string;
    updateTime: string;
}

export const CategoryStore = defineStore('CategoryStore',
    () => {
        // 分页数据
        const categoryList = ref<[Category]>();
        // 分页数量
        const categoryTotal = ref<number>(0);
        return { categoryList, categoryTotal }
    }
)