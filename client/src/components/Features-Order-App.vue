<template>
  <div>
    <v-row justify="center" class="mb-4">
      <v-col>
        <v-btn icon class="mx-2" v-if="order.configurations" @click="toggleIpConfigurationsApp">
          <v-icon size="48">mdi-ip</v-icon>
        </v-btn>
        <v-btn icon class="mx-2" v-if="loading">
          <PreloaderApp style="height: 30px;width: 30px"/>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn icon class="mx-2" @click="openDocumentsApp()">
          <v-icon size="48">mdi-file-document</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn icon class="mx-2" @click="openPhotoApp()">
          <v-icon size="48">mdi-camera</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <IpConfigurationsApp v-if="ipConfigurationsAppVisible" :configurations="order['configurations']"/>
  </div>
</template>

<script>
import IpConfigurationsApp from "@/components/Ip-Configurations-App";
import PreloaderApp from "@/components/Preloader-App";
// import ClosedContractsApp from "@/components/Closed-Contracts-App";

export default {
  name: 'FeaturesOrderApp',
  components: {
    PreloaderApp,
    IpConfigurationsApp,
    // ClosedContractsApp,
  },
  props:{
    order:Object
  },
  data() {
    return {
      ipConfigurationsAppVisible: false,
      documentsAppVisible: false,
    }
  },
  computed:{
    loading(){
      return this.$store.state.localeLoading
    }
  },
  methods: {
    toggleIpConfigurationsApp() {
      this.ipConfigurationsAppVisible = !this.ipConfigurationsAppVisible
    },
    openDocumentsApp() {
      this.documentsAppVisible = true
    },
    openPhotoApp() {
      // логика для открытия компонента PhotoApp
    }
  }
}
</script>

<style scoped></style>