<template>
  <div>
    <div class="order-card-header" ref="orderCardHeader">
      <div class="order-card-header-left">
        <div class="order-card-header-date order-card-header-item">
          <b>{{ formatDate(order.ПланДатаНачала) }}</b> <br>{{ formatTime(order.ПланВремяНачала) }} - {{ formatTime(order.ПланВремяОкончания) }}
        </div>
      </div>
      <div class="order-card-header-center">
        <span class="order-card-header-status order-card-header-item" :style="order.ТекущийСтатус === 'Не хватает документов'?{color:'red'}:{color:'black'}">{{ order.ТекущийСтатус }}</span>
      </div>
      <div class="order-card-header-right">
        <div class="order-card-header-number order-card-header-item" @click="openBarcodeModal">
          {{ +order.Номер }}
        </div>
        <div class="order-card-header-contract-number order-card-header-item">
          {{ order.НомерДоговора }}
        </div>
      </div>
    </div>
    <hr>
    <div class="order-card-content">
      <div class="order-card-address" >
        {{ order.Адрес }}
      </div>
      <div class="order-card-content-icon" >
        <v-icon v-if="order.АдресБылПодключенРанее" color="green">mdi-check-circle</v-icon>
        <v-icon v-else color="red">mdi-close-circle</v-icon>
      </div>
    </div>
    <AdditionalOrderInfoApp :order="order" v-if="+order.Номер === openedIndex"/>

    <div class="order-card-more-info text-center">
      <v-btn color="primary" @click="toggleAdditionalInfo(+order.Номер)">Подробнее</v-btn>
    </div>
    <v-dialog v-model="showBarcodeModal" max-width="400">
      <v-card>
        <v-card-title>Заявка № {{ order.Номер }}</v-card-title>
        <v-card-text>
          <v-img :src="'data:image/svg+xml;charset=UTF-8,' + barcodeData" width="100%" contain></v-img>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeBarcodeModal">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script>
import AdditionalOrderInfoApp from "@/components/Additional-Order-Info-App";
import JsBarcode from 'jsbarcode'
export default {
  name: "OrderCard",
  components: {
    AdditionalOrderInfoApp,

  },
  props: {
    order: Object,
    openedIndex: Number
  },
  data(){
    return{
      showAdditionalInfo: false,
      showBarcodeModal: false,
      barcodeData: null,
      ambientLightLevel: null,
      sensor: null,
    }
  },
  computed: {
  },
  methods: {
    toggleAdditionalInfo(index) {
      this.$emit('toggle', index);
        this.$refs.orderCardHeader.scrollIntoView({
          behavior: "smooth",
        }
      )},
    formatDate(date) {
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear().toString().substr(-2);
      return `${day}.${month}.${year}`;
    },
    formatTime(time) {
      const d = new Date(time);
      const minutes = d.getMinutes().toString().padStart(2, "0");
      const hours = d.getHours().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    openBarcodeModal() {
      const svg = document.createElement('svg');
      JsBarcode(svg, `${this.order.Номер}`, {
        format: "CODE128",
        displayValue: false,
        height: 50,
        margin: 0,
        fontSize: 0
      });
      const barcodeData = encodeURIComponent(svg.outerHTML);
      this.barcodeData = barcodeData;
      this.showBarcodeModal = true;
    },
    closeBarcodeModal() {
      this.showBarcodeModal = false;
    },
  },
}
</script>
<style scoped>
.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.order-card-header-left {
  display: flex;
}
.order-card-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.order-card-header-status {
  font-weight: bold;
  margin-left: 20px;
}
.order-card-header-item {
}
.order-card-content{
  display: flex;
  align-items: center;
  margin:10px;
}
.order-card-address{
  display: flex;
  align-items: center;
}
.order-card-content-icon{
  margin-left: auto;
}
.order-card-more-info {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>