import { get, post, put, del } from '@/utils/Http'


// 接单
export function confirmOrder(form: { id: number }) {
    return put('/api/admin/order/confirm',
        form
    )
}

// 拒单
export function rejectOrder(form: { id: number, rejectReason: string }) {
    return put('/api/admin/order/rejection',
        form
    )
}

// 派送订单
export function deliveryOrder(id: number) {
    return put(`/api/admin/order/delivery/${id}`
    )
}

// 取消订单
export function cancelOrder(form: { id: number, cancelReason: string }) {
    return put('/api/admin/order/cancel',
        form
    )
}

// 完成订单
export function completeOrder(id: number) {
    return put(`/api/admin/order/complete/${id}`
    )
}

// 查询订单详情
export function getOrderDetail(id: number) {
    return get(`/api/admin/order/${id}`
    )
}

// 分页查询
export function getOrderList(params: {
    beginTime: string,
    endTime: string,
    status: string,
    page: number,
    pageSize: number,
    phone: string,
    number: string
} = { beginTime: '', endTime: '', status: "", page: 1, pageSize: 10, phone: '', number: '' }) {
    return get(`/api/admin/order/conditionSearch?bgingTime=${params.beginTime}&endTime=${params.endTime}&status=${params.status}&page=${params.page}&pageSize=${params.pageSize}&phone=${params.phone}&number=${params.number}`
    )
}