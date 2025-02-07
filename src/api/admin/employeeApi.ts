import { post } from "@/utils/Http"

// 定义 fromData 的类型
interface AdminLoginParams {
    username: string;
    password: string;
}

// 员工登录
export function adminLoginApi(fromData: AdminLoginParams) {
    return post(
        "/api/admin/employee/login",
        fromData  // 这里的 fromData 会根据 AdminLoginParams 类型进行严格检查
    );
}
