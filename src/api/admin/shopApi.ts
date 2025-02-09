import { get, put } from "@/utils/Http"



// 管理端获取店铺状态
export function adminGetStatusApi() {
    return get(
        "/api/admin/shop/status",
    );
}
// 管理端设置店铺状态
export function adminSetStatusApi(status: number) {
    return put(
        `/api/admin/shop/${status}`,
    );
}