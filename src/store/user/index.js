import {reqGetCode, reqRegister, reqLogin, reqGetUserInfo, reqLogout} from "@/api";
import {getToken, removeToken, setToken} from "@/utils/token";


const state = {
    code: '',
    userInfo: {},
    token: getToken()
};
const actions = {
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('getCode', result.data)
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    // eslint-disable-next-line no-unused-vars
    async userRegister({commit}, userdata) {
        let result = await reqRegister(userdata)
        if (result.code === 200) {
            return "ok";
        }
        else {
            return Promise.reject(new Error("fail"));
        }
    },
    async userLogin({commit}, data) {
        let result = await reqLogin(data)
        if (result.code === 200) {
            commit('userLogin', result.data)
            setToken(result.data.token)
        }
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}) {
        let result = await reqGetUserInfo()
        if (result.code === 200) {
            commit('getUserInfo', result.data)
        }

    },
    // eslint-disable-next-line no-unused-vars
    async userLogout({commit}, userdata) {
        let result = await reqLogout(userdata)
        if (result.code === 200) {
            commit('userLogout')
            return "ok";
        }
        else {
            return Promise.reject(new Error("fail"));
        }
    },
};
const mutations = {
    getCode(state, payload) {
        state.code = payload
    },
    userLogin(state, payload) {
        state.token = payload.token
    },
    getUserInfo(state, payload) {
        state.userInfo = payload
    },
    userLogout(state) {
        state.token = '';
        state.userInfo = {};
        removeToken()
    }

};
const getters = {};


export default {
    state,
    actions,
    mutations,
    getters

}