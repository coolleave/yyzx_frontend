import { defineStore } from "pinia";
import { ref } from "vue";
import { employeePageApi } from "@/api/admin/employeeApi";

export const EmployeeStore = defineStore(
    "admin",
    () => {
        // 员工信息列表
        const employeeList = ref<any>({});

        // 获取员工信息方法，默认参数为 name 为空，page 为 1，pageSize 为 10
        const getEmployeeList = async ({
            name = "",
            page = 1,
            pageSize = 10
        }: { name?: string; page?: number; pageSize?: number } = {}) => {  // 设置参数默认值为空对象
            try {
                // 调用接口获取员工信息
                const res = await employeePageApi({ name, page, pageSize });

                // 将员工信息保存到 employeeList 中
                employeeList.value = res.data;

            } catch (error) {
                console.error("获取员工信息失败:", error);
                // 可以在这里设置一个错误状态或返回默认值等
            }
        };

        return { employeeList, getEmployeeList };
    },
);
