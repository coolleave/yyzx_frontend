import { get, post, put, del } from '@/utils/Http'


// 接单
export function confirmOrder(form: { id: number }) {
    return put('/admin/order/confirm/',
        form
    )
}

// 拒单
export function rejectOrder(form: { id: number, rejectReason: string }) {
    return put('/admin/order/rejection',
        form
    )
}

// 派送订单
export function deliveryOrder(id: number) {
    return put(`/admin/order/delivery/${id}`
    )
}

// 取消订单
export function cancelOrder(form: { id: number, cancelReason: string }) {
    return put('/admin/order/cancel/',
        form
    )
}

// 完成订单
export function completeOrder(id: number) {
    return put(`/admin/order/complete/${id}`
    )
}

// 查询订单详情
export function getOrderDetail(id: number) {
    return get(`/admin/order/${id}`
    )
}

// 分页查询
export function getOrderList(params: { beginTime: string, endTime: string, status: number, page: number, pageSize: number, phone: string }) {
    return get(`/admin/order?bgingTime=${params.beginTime}&endTime=${params.endTime}&status=${params.status}&page=${params.page}&pageSize=${params.pageSize}&phone=${params.phone}`
    )
}