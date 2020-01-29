import  Vue from  'vue'
import Vuex from  'vuex'
import state from  './state'
import mutations from  './mutations'
import * as getters from "./getters";
import * as actions from "./actions";
import createLogger from    'vuex/dist/logger' // 这是一个uvex的小插件，可以提示state的值变化
Vue.use(Vuex)
const debug = process.env.NODE_ENV!== "production" //开启调试工具，在非生成的时候就启用了
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict:debug, // 开启debug选项
    plugins: debug?[createLogger()]:[]
})
export default store
