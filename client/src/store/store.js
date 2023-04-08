import { createStore } from 'vuex'
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default createStore({
    state() {
        return {
            orders: null,
            globalLoading: false,
            localeLoading:false,
            activeFilter:'Активные'
        }
    },
    mutations,
    actions,
    getters,
})