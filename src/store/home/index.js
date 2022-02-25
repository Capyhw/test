import {reqCategoryList, reqBanner, reqFloors} from "@/api";

const state = {
    categoryList: [],
    bannerList: [],
    floorList:[],
};
const actions = {
        async getCategoryList({commit}) {
            let result = await reqCategoryList()
            if (result.code == 200) {
                commit('getCategoryList', result.data)
            }
        },
        // 轮播图
        async getBannerList({commit}) {
            let result = await reqBanner()
            if (result.code == 200) {
                commit('getBannerList', result.data)
            }
        },
        //floors
        async getFloorsList({commit}) {
            let result = await reqFloors()
            if (result.code == 200) {
                commit('getFloorsList', result.data)
            }
        },
    }

;
const mutations = {
    getCategoryList(state, payload) {
        state.categoryList = payload
    },
    getBannerList(state, payload) {
        state.bannerList = payload
    },
    getFloorsList(state, payload) {
        state.floorList = payload
    },
};
const getters = {};


export default {
    state,
    actions,
    mutations,
    getters

}