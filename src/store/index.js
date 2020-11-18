import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import specs from "./modules/specs"
import cate from "./modules/cate"
import vip from "./modules/vip"
import seckill from "./modules/seckill"
import banner from "./modules/banner"
import goods from "./modules/goods"
import actions from "./actions"
import {state,mutations,getters} from "./mutations"
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        specs,
        cate,
        vip,
        goods,
        banner,
        seckill
    }
})