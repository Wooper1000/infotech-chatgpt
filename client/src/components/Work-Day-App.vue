<template>
  <div >
    <v-card class="mx-auto" max-width="500" outlined v-if="filteredOrders.length">
      <v-card-title
          class="text-center font-weight-bold "
          @click="isCollapsed = !isCollapsed"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="{ 'cursor-pointer': filteredOrders.length > 0 }"

      >
        {{ day.date }}
      </v-card-title>
    </v-card>
    <v-container  v-if="filteredOrders.length && !isCollapsed">
      <v-row align="stretch">
        <v-col
            v-for="order in filteredOrders"
            :key="order['Номер']"
            :cols="12"
        >
          <v-card max-width="1000" class="order-card mx-auto" >
            <OrderCardApp :order="order" @toggle="toggleOrderCard" :openedIndex="openedIndex" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import OrderCardApp from "@/components/Order-Card-App";

export default {
  name: "Work-Day-App",
  props: {
    day: Object,
    orders: Array,
  },
  components: {
    OrderCardApp,
  },
  data() {
    return {
      isCollapsed: false,
      hover: false,
      openedIndex: -1,
    };
  },
  methods:{
    toggleOrderCard(index) {
      this.openedIndex = this.openedIndex === index ? null : index;
    },

  },
  computed: {

    filteredOrders() {
      const activeFilter = this.$store.state.activeFilter;
      let orders = [];
      if (activeFilter === 'Активные') {
        orders = this.day.orders.filter(order =>
            [
              'Не хватает документов',
              'В работе',
              'Собрана',
              'На сборку',
              'В очереди'
            ].includes(order['ТекущийСтатус'])
        );
      } else if (activeFilter === 'Выполненные') {
        orders = this.day.orders.filter(order =>
            [
              'Работы выполнены',
              'Отрисовка Visio',
              'Отрисовка ГИС'
            ].includes(order['ТекущийСтатус'])
        );
      }

      // Сортировка
      orders.sort((orderA, orderB)=> {
        if (orderA['ПланВремяНачала'] < orderB['ПланВремяНачала']) {
          return -1;
        } else if (orderA['ПланВремяНачала'] > orderB['ПланВремяНачала']) {
          return 1;
        } else {
          return 0;
        }
      });

      return orders;
    },
  },
};
</script>
<style scoped>

.order-card {
  border: 2px solid black;
}
</style>