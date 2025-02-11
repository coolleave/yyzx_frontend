import { post } from "@/utils/Http";

export function uploadApi(formData: ImageBitmap) {
    return post(
        "/api/admin/upload",
        formData
    );
}