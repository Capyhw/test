import {reqSearchInfo} from "@/api";


const state = {
    searchInfo: {},
};
const actions = {
    async getSearchInfo({commit}, params = {}) {
        let result = await reqSearchInfo(params)
        if (result.code === 200) {
            commit('getSearchInfo', result.data)
        }
    }
};
const mutations = {
    getSearchInfo(state, payload) {
        state.searchInfo = payload
    },
};
const getters = {
    attrsList(state) {
        return state.searchInfo.attrsList || [];
    },
    goodsList(state) {
        return state.searchInfo.goodsList || [];
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || [];
    },
};


export default {
    state,
    actions,
    mutations,
    getters

}