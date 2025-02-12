import { post, get, put } from "@/utils/Http"

// 定义 fromData 的类型
interface AdminLoginParams {
    username: string;
    password: string;
}

// 员工登录
export function adminLoginApi(fromData: AdminLoginParams) {
    return post(
        "/api/admin/employee/login",
        fromData,  // 这里的 fromData 会根据 AdminLoginParams 类型进行严格检查
    );
}

// 员工登出
export function adminLogoutApi() {
    return post(
        "/api/admin/employee/logout",
    );
}

// 分页条件查询员工列表
export function employeePageApi({ name, page, pageSize }: { name: string; page: number; pageSize: number }) {
    // encodeURIComponent(name) 主要作用是将特殊字符（如 &, =, ?, /, 空格等）转义为 URL 安全格式，从而避免参数解析错误。
    const queryString = `?name=${encodeURIComponent(name)}&page=${page}&pageSize=${pageSize}`;
    return get(
        `/api/admin/employee/page${queryString}`
    );
}

// 新增员工
export function employeeAddApi(fromData: any) {
    return post(
        "/api/admin/employee",
        fromData
    );
}

// 删除员工
export function employeeBanByIdApi({ id, status }: { id: number, status: number }) {
    return post(
        `/api/admin/employee/status/${status}?id=${id}`
    );
}

// 修改员工
export function employeeEditApi(fromData: any) {
    return put(
        '/api/admin/employee',
        fromData
    );
}