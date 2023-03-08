
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
 
export default new vuex.Store({
    state:{
        themecolor:'000'//默认为20a0ff
    },
    modules: {
 
    },
    mutations: {
        setThemeColor(state, curcolor){
            this.state.themecolor = curcolor
        }
    }
})