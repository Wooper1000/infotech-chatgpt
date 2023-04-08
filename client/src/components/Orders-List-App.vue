<template>
  <div v-if="!loading">
    <WorkDayApp v-for="day in ordersGroupedByDays" :key="day.date" :day="day"/>
  </div>
  <PreloaderApp v-if="loading"/>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex'
import PreloaderApp from "@/components/Preloader-App";
import WorkDayApp from "@/components/Work-Day-App";

export default {
  components: {
    PreloaderApp,
    WorkDayApp,
  },
  computed: {
    ...mapGetters(['ordersGroupedByDays']),
    loading() {
      return this.$store.state.globalLoading;
    },
  },
   async created() {
    await this.getAllOrders();
    await this.getOrdersConfig(this.$store.state.orders)
  },
  methods: {
    ...mapActions(['getAllOrders','getOrdersConfig']),
  },
};
</script>

<style>

</style>