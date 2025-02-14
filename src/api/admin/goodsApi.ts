import { get, post, put, del } from "@/utils/Http";


// 新增商品
interface GoodsAddfrom {
    categoryId: number;
    description: string;
    image: string;
    name: string;
    price: number;
    status: number;
}
// {
//     "categoryId": 10,
//     "description": "红牛保健品",
//     "id": 669,
//     "image": "http://dummyimage.com/720x300",
//     "name": "红牛",
//     "price": 6,
//     "status": 1
// }
export function goodsAddApi(fromData: GoodsAddfrom) {
    return post(
        "/api/admin/goods",
        fromData
    );
}

// 批量删除商品
export function goodsDelApi(ids: string) {
    return del(
        `/api/admin/goods?ids=${ids}`
    );
}

// 修改商品
// {
//     "categoryId": 10,
//     "description": "红牛罐装",
//     "image": "http://dummyimage.com/720x300",
//     "name": "红牛",
//     "price": 6,
//     "status": 1,
//     "id": 86
// }
export function goodsEditApi(fromData: any) {
    return put(
        "/api/admin/goods",
        fromData
    );
}

// 修改商品状态
export function goodsStatusApi(id: string, status: number) {
    return post(
        `/api/admin/goods/status/${status}?id=${id}`
    );
}

// 商品分页查询
export function goodsPageApi({ page, pageSize, name, categoryId, status }: { page: number, pageSize: number, name?: string, categoryId?: string, status?: string }) {
    if (name === undefined) {
        name = "";
    }
    if (categoryId === undefined) {
        categoryId = "";
    }
    if (status === undefined) {
        status = "";
    }
    return get(
        `/api/admin/goods/page?page=${page}&pageSize=${pageSize}&name=${name}&categoryId=${categoryId}&status=${status}`,
    );
}

// 根据id查询商品
export function goodsByIdApi(id: string) {
    return get(
        `/api/admin/goods/${id}`
    );
}

// 根据分类id查询商品
export function goodsByCategoryIdApi(categoryId: string) {
    return get(
        `/api/admin/goods/category/list?categoryId=${categoryId}`
    );
}
