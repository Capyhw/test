//api统一管理
import reqs from "./request";
import mockAjax from './mockAjax'
import request from "./request";


//三级联动接口
//http://39.98.123.211/api/product/getBaseCategoryList   get 无参数
export const reqCategoryList = () => {
    return reqs({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}


// 获取广告轮播列表
export const reqBanner = () => mockAjax.get('/banner')

// 获取首页楼层列表
export const reqFloors = () => mockAjax.get('/floors')

//获取搜索模块数据
export const reqSearchInfo = (params) => request({
    url: '/list',
    method: 'post',
    data: params
})

//获取商品详情数据
export const reqGoodsInfo = (skuId) => request({
    url: `/item/${skuId}`,
    method: "get"
})


//添加购物车或修改数量
export const reqAddOrUpdate = (skuId, skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

//获取购物车列表数据
export const reqCartList = () => request({
    url: '/cart/cartList',
    method: 'get'
})

//删除购物车商品
export const reqDeleteCart = (skuId) => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

//切换商品选中状态
export const reqUpdateChecked = (skuId, isChecked) => request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

//获取登录验证码
export const reqGetCode = (phone) => request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

//完成注册
export const reqRegister = (data) => request({
    url: '/user/passport/register',
    data,
    method: 'post'
})

//登录
export const reqLogin = (data) => request({
    url: '/user/passport/login',
    data,
    method: 'post'
})

//获取登录信息
export const reqGetUserInfo = () => request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

//退出登录
export const reqLogout = () => request({
    url: '/user/passport/logout',
    method: 'get'
})

//获取地址信息
export const reqAddressInfo = () => request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () => request({
    url: '/order/auth/trade',
    method: 'get'
});


//提交订单
export const reqSubmitOrder = (tradeNo, data) => request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})

//获取支付信息
export const reqPayInfo = (orderId) => request({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
});
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
});

//获取个人中心的数据
export const reqMyOrderList = (page, limit) => request({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
});

