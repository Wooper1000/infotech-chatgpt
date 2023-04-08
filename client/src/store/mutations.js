export default {
    SET_ORDERS(state, orders) {
        state.orders = orders;
    },
    SET_LOADING(state, loading) {
        state.globalLoading = loading;
    },
    SET_LOCALE_LOADING(state, loading) {
        state.localeLoading = loading;
    },
    SET_ACTIVE_FILTER(state, filter) {
        state.activeFilter = filter;
    },
}