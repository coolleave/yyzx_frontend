import { get, post, put, del } from "@/utils/Http";

// 获取地址列表
export function getAddressListApi() {
    return get(
        `/user/addressBook/list`
    );
}

// 查询默认地址
export function getDefaultAddressApi() {
    return get(
        `/user/addressBook/default`
    );
}

// 根据id查询地址
export function getAddressByIdApi(id: string) {
    return get(
        `/user/addressBook/${id}`
    );
}

// 根据id删除地址
export function deleteAddressApi(id: string) {
    return del(
        `/user/addressBook?id=${id}`
    );
}

// 根据id修改地址
export function updateAddressApi(data: any) {
    return put(
        `/user/addressBook`,
        data
    );
}

// 设置默认地址
export function setDefaultAddressApi(id: string) {
    return put(
        `/user/addressBook/default`,
        { id }
    );
}

// 新增地址
export function addAddressApi(data: any) {
    return post(
        `/user/addressBook`,
        data
    );
}