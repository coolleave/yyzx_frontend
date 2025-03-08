import { get } from "@/utils/Http";

// 根据分类id获取商品
export function getBycategory(id: string) {
    return get(
        `/user/goods/list?categoryId=${id}`
    );
}

// 商品条件分页查询
export function goodsPageApi(fromdata: { name: string, page: number, pageSize: number }) {
    return get(
        "/user/goods/page",
        fromdata
    );
}