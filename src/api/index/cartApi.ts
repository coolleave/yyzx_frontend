import { get, del, post } from "@/utils/Http";

// 获取购物车列表
export function getCartList() {
    return get(
        "/user/shoppingCart/list"
    );
}

// 添加商品到购物车
export function addGoodsToCart(goodsId: Number) {
    return post(
        "/user/shoppingCart/add",
        { goodsId }
    );
}

// 清空购物车
export function clearCart() {
    return del(
        "/user/shoppingCart/clean"
    );
}
// 删除购物车商品
export function delCartGoods(goodsId: Number) {
    return del(
        `/user/shoppingCart/sub`,
        { goodsId }
    );
}