export default {
        ordersGroupedByDays(state) {
            if (!state.orders) return [];
            const groupedOrders = state.orders.reduce((acc, order) => {
                const date = new Date(order["ПланДатаНачала"]);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                if (!acc[formattedDate]) {
                    acc[formattedDate] = { date: formattedDate, orders: [] };
                }
                acc[formattedDate].orders.push(order);
                return acc;
            }, {});
            const sortedOrders = Object.values(groupedOrders).sort((a, b) => {
                const dateA = new Date(a.date.split(".").reverse().join("-"));
                const dateB = new Date(b.date.split(".").reverse().join("-"));
                return dateA - dateB;
            });
            return sortedOrders;
        }
}