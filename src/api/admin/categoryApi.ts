import { get, post, put, del } from "@/utils/Http";


// 新增分类
export function categoryAddApi({ name, sort }: { name: string, sort: number }) {
    return post(
        "/api/admin/category",
        { name, sort }
    );
}

// 根据id删除分类
export function categoryDelByIdApi(id: number) {
    return del(
        `/api/admin/category/${id}`
    );
}

// 修改分类
export function categoryEditApi({ id, name, sort }: { id: number, name: string, sort: number }) {
    return put(
        '/api/admin/category',
        { id, name, sort }
    );
}

// 启用、禁用分类
export function categoryBanByIdApi({ id, status }: { id: number, status: number }) {
    return post(
        `/api/admin/category/status/${status}?id=${id}`
    );
}

// 分页查询分类，可以添加name参数
export function categoryPageApi({ name = "", page = 1, pageSize = 10 }: { name: string; page: number; pageSize: number }) {
    const queryString = `?name=${encodeURIComponent(name)}&page=${page}&pageSize=${pageSize}`;
    return get(
        `/api/admin/category/page${queryString}`
    );
}
