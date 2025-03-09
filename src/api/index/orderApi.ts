import { get, post, put, del } from "@/utils/Http";

// 查询订单详情
export function getOrderDetailApi(id: string) {
    return get(
        `/user/order/${id}`
    );
}

// 订单支付
export function orderPayApi(orderNumber: string) {
    return post(
        `/user/order/pay/`,
        { orderNumber }
    );
}

// 历史订单查询
export function getHistoryOrderApi() {
    return get(
        `/user/order/historyOrders`
    );
}

// 取消订单
export function cancelOrderApi(id: string) {
    return put(
        `/user/order/cancel/${id}`,
    );
}

// 用户下单
export function createOrderApi(data: any) {
    return post(
        `/user/order/submit`,
        data
    );
}

// 再来一单
export function orderAgainApi(orderNumber: string) {
    return post(
        `/user/order/repetition/${orderNumber}`,
    );
}