import {reqCartList, reqDeleteCart, reqUpdateChecked} from "@/api";

const state = {
    cartList: [],
}
const actions = {
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('getCartList', result.data)
        }
    },
    //删除单个商品
    // eslint-disable-next-line no-unused-vars
    async deleteCart({commit}, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            //返回的是成功的标记
            return "ok";
        }
        else {
            //返回的是失败的标记
            return Promise.reject(new Error("faile"));
        }
    },
    //勾选单个商品
    // eslint-disable-next-line no-unused-vars
    async updateChecked({commit}, {skuId, isChecked}) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code === 200) {
            //返回的是成功的标记
            return "ok";
        }
        else {
            //返回的是失败的标记
            return Promise.reject(new Error("faile"));
        }
    },
    //全选
    updateAllChecked({dispatch, state}, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch("updateChecked", {
                skuId: item.skuId, isChecked,
            });
            promiseAll.push(promise);
        });
        //最终返回结果
        return Promise.all(promiseAll);
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked === 1 ? dispatch("deleteCart", item.skuId) : "";
            //将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll);
    },

}

const mutations = {
    getCartList(state, payload) {
        state.cartList = payload
    },


}

const getters = {
    cartList() {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters

}