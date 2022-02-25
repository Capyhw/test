import {reqGoodsInfo, reqAddOrUpdate} from "@/api";
import {getUUID} from "@/utils/uuid_token";


const state = {
    goodsInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const actions = {
    async getGoodsInfo({commit}, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('getGoodsInfo', result.data)
        }
    },
    // eslint-disable-next-line no-unused-vars
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        let result = await reqAddOrUpdate(skuId, skuNum)
        if (result.code === 200) {
            //返回的是成功的标记
            return "ok";
        }
        else {
            //返回的是失败的标记
            return Promise.reject(new Error("faile"));
        }
    }
}

const mutations = {
    getGoodsInfo(state, payload) {
        state.goodsInfo = payload
    },

}

const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters

}