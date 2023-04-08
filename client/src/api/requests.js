import makeRequest from '@/api/makeRequest';

export async function fetchAllOrders() {
    return await makeRequest({
        url: '/orders/all',
        method: 'get',
    });


}
export async function fetchOrdersConfig(orders) {
   return await makeRequest({
        url: '/orders/config',
        method: 'post',
    },orders);

}
export async function fetchCall(number) {
   return await makeRequest({
        url: `/call?number=${number}`,
        method: 'get',
    });

}
