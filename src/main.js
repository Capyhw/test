import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI)
Vue.config.productionTip = false
//微信支付  element组件
import {Button, MessageBox} from 'element-ui';

Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//全局组件Typenav
import TypeNav from "@/components/TypeNav";

Vue.component(TypeNav.name, TypeNav)
//全局组件分页器Pagination
import Pagination from "@/components/Pagination";

Vue.component(Pagination.name, Pagination)
//引入mockjs
import '@/mock/mockServe'
//引入Swiper样式
import 'swiper/css/swiper.css'
//引入api文件夹的接口
import * as API from '@/api'
//引入表单验证插件
import "@/plugins/validate"
//图片懒加载
import VueLazyload from "vue-lazyload";

const pro = require('@/assets/prototype.jpg')
Vue.use(VueLazyload, {
    loading: pro
})


new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    router,
    store,
}).$mount('#app')
