import { get } from "@/utils/Http";

export function categoryPageApi() {
    return get(
        "/user/category/list"
    );
}
