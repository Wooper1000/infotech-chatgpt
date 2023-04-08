<template>
  <v-container>
    <v-row>
      <v-col v-for="config in configurations" :key="config.id" cols="12" sm="6" md="4" lg="3">
        <div>
          <v-col cols="12"><b>{{config.ServiceName}}</b></v-col>
          <br>
          <div v-if="config.ip">
            <v-row>
              <v-col cols="12" class="py-1" v-for="(ip, index) in config.ip" :key="index">
                <div class="clickable" @click="copyToClipboard(ip.ip)">{{ ip.ip }}</div>
                <div class="clickable" @click="copyToClipboard(ip.gw)">{{ ip.gw }}</div>
                <div class="clickable" @click="copyToClipboard(ip.mask)">{{ ip.mask }}</div>
              </v-col>
            </v-row>
          </div>
          <div v-if="config.smartLogin">
            <v-row>
              <v-col cols="12" class="py-1 clickable" @click="copyToClipboard(config.smartLogin)">{{ config.smartLogin }}</v-col>
              <v-col cols="12" class="py-1 clickable" @click="copyToClipboard(config.smartPassword)">{{ config.smartPassword }}</v-col>
            </v-row>
          </div>
          <div v-if="config.tvip">
            <v-row>
              <v-col cols="12" class="py-1" v-for="(tvip, index) in config.tvip" :key="index">
                <div class="clickable" @click="copyToClipboard(tvip.ip)">{{ tvip.ip }}</div>
                <div class="clickable" @click="copyToClipboard(tvip.gw)">{{ tvip.gw }}</div>
                <div class="clickable" @click="copyToClipboard(tvip.mask)">{{ tvip.mask }}</div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-snackbar
        v-model="copied"
        :timeout="2500"
        :color="'success'"
    >
      {{ copiedValue }} скопировано в буфер обмена
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Ip-Configurations-App",
  props: {
    configurations: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      copied: false,
      copiedValue: ""
    }
  },
  methods: {
    copyToClipboard(text) {
      const dummy = document.createElement("textarea");
      dummy.textContent = text;
      document.body.appendChild(dummy);

      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);

      this.copiedValue = text;
      this.copied = true;

      setTimeout(() => {
        this.copied = false;
        this.copiedValue = "";
      }, 2000);
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.clickable:hover {
  background-color: rgba(0,0,0,0.1);
}
</style>