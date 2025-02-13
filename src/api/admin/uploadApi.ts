import { post } from "@/utils/Http";

export function uploadApi(formData: FormData) {
    return post(
        "/api/admin/common/upload",
        formData,
        true, // 是否为多媒体文件
    );
}