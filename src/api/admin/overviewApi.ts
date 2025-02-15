import { get, post } from "@/utils/Http"


// 运营总数据
export function getBuinessData() {
    return get(
        "/api/admin/workspace/businessData"
    )
}
// 订单总览
export function getOrderData() {
    return get(
        "/api/admin/workspace/overviewOrders"
    )
}

// 商品总览
export function getGoodsData() {
    return get(
        "/api/admin/workspace/overviewGoods"
    )
}

// 营业额统计
export function getTurnoverStatistics({ begin, end }: { begin: any, end: any }) {
    return get(
        `/api/admin/report/turnoverStatistics?begin=${begin}&end=${end}`
    )
}

// 订单统计信息
export function getOrderStatistics({ begin, end }: { begin: any, end: any }) {
    return get(
        `/api/admin/report/ordersStatistics?begin=${begin}&end=${end}`
    )
}

// 用户统计接口
export function getUserStatistics({ begin, end }: { begin: any, end: any }) {
    return get(
        `/api/admin/report/userStatistics?begin=${begin}&end=${end}`
    )
}


// 查询销量排行top10
export function getTOP10({ begin, end }: { begin: any, end: any }) {
    return get(
        `/api/admin/report/top10?begin=${begin}&end=${end}`
    )
}


// 导出excel数据
export function exportExcel() {
    return get(
        "/api/admin/report/export"
    )
}


