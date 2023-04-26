<template>
  <v-container>
    <v-row>
      <v-col cols="12"><b>{{ order.Контрагент }}</b></v-col>
      </v-row>
    <v-row>
      <v-col cols="12" >
      <v-row class="pa-0" v-for="(phone,index) in filteredPhones" :key="index">
        <v-col class="pa-0" cols="5">{{phone.Контакт}} </v-col>
        <v-col  class="pa-0" cols="5"><a :href="'tel:'+phone?.['Телефон']">{{phone?.['Телефон']}}</a></v-col>
        <v-col class="pa-0" cols="2">
            <v-icon class="v-icon" @click="()=>{
              dialog.show=true;
              dialog.numberToCall=phone.Телефон;
              dialog.number=(+order.Номер).toString().slice(1)+`0${phone.НомерСтроки}`
            }" color="green">mdi-phone</v-icon>
        </v-col>
      </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7"><b>Создал: </b>{{ order.Ответственный.Name }}</v-col>
      <v-col cols="5"><b>Тип работ: </b>{{ order.ТипРабот }}</v-col>
    </v-row>
    <v-row>
      <v-col class="text-center"><b>{{ 'Описание работ' }}</b></v-col>
    </v-row>
    <v-row>
      <v-col><pre style="white-space: pre-wrap;">{{ order.ДополнительнаяИнформация }}</pre></v-col>
    </v-row>
    <FeaturesOrderApp :order="order" />
    <v-snackbar :color="snackbar.color" :timeout="2000" v-model="snackbar.show">{{ snackbar.text }}</v-snackbar>
  </v-container>
  <v-dialog v-model="dialog.show">
    <v-card>
      <v-card-title>Позвонить {{dialog.numberToCall}}?</v-card-title>
      <v-card-actions>
        <v-btn text @click="dialog.show = false">Отмена</v-btn>
        <v-btn color="primary" @click="callPhone(dialog.number); dialog.show = false">Позвонить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FeaturesOrderApp from "@/components/Features-Order-App";
import { fetchCall } from "@/api/requests";
export default {
  name: "Additional-Order-Info-App",
  components: {
    FeaturesOrderApp,
  },
  props: {
    order: Object,
  },
  data() {
    return {
      dialog: {show:false,numberToCall:null,number:null},
      snackbar: {
        show: false,
        text: "",
        color: "",
      },
    };
  },
  computed: {

    filteredPhones() {
      let filteredPhones = this.order.КонтактныеДанные.filter(
          (contact) => {
            return contact.Ключ === "PRIMARY" && contact.Телефон && contact.Телефон !== ""
          }
      );

      return filteredPhones;
    },
  },
  methods: {
    async callPhone(number) {
      try {
        let promise = await fetchCall(number);
        console.log(number)
        this.snackbar.show = true;
        this.snackbar.text = `Результат: ${promise.message}`;
        this.snackbar.color = "success";
      } catch (err) {
        this.snackbar.show = true;
        this.snackbar.text = `Ошибка: ${err.message}`;
        this.snackbar.color = "error";
      }
    },
  },
};
</script>
<style scoped>
.v-icon:hover {
  background-color: #f5f5f5;
}
</style>