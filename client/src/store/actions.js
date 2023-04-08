import {fetchAllOrders, fetchOrdersConfig} from '@/api/requests';

export default {
    async getAllOrders({ commit }) {
        commit('SET_LOADING', true);
        try {
            const orders = await fetchAllOrders();

            commit('SET_ORDERS', orders);
        } catch (error) {
            console.error(error);
        }
        commit('SET_LOADING', false);
    },
    async getOrdersConfig({commit}, orders) {
        commit('SET_LOCALE_LOADING', true);
        try {
            const ordersWithConfigs = await fetchOrdersConfig(orders);
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                const orderWithConfig = ordersWithConfigs.find(o => o['Номер'] === order['Номер']);
                if (orderWithConfig) {
                    orders.splice(i, 1, orderWithConfig);
                }
            }
            commit('SET_ORDERS', orders);
            commit('SET_LOCALE_LOADING', false);
        } catch (error) {
            console.log(error);
            commit('SET_LOCALE_LOADING', false);
        }
    },
};