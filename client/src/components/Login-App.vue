<template>
  <div class="login-page">
  <div class="login-form">
    <v-card  max-width="500" v-if="!codeEntered">
      <v-card-title class="headline">Авторизация</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="sendPhone">
          <v-text-field
              v-model="phone"
              label="Телефон"
              :rules="phoneRules"
              @input="formatPhone"
              required
          />
          <v-btn :disabled="isLoading" color="primary" type="submit">
            Вход
          </v-btn>
          <v-progress-circular
              v-if="isLoading"
              indeterminate
              size="64"
              color="primary"
          ></v-progress-circular>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto" max-width="500" v-if="codeEntered">
      <v-card-title class="headline">Авторизация</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="sendCode">
          <v-text-field
              v-model="code"
              :disabled="isLoading"
              label="Код подтверждения"
              required
          />
          <v-btn :disabled="isLoading" color="primary" type="submit">
            Вход
          </v-btn>
          <v-progress-circular
              v-if="isLoading"
              indeterminate
              size="64"
              color="primary"
          ></v-progress-circular>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :color="snackbarColor"
        top
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
  </div>
</template>

<script>
import config from '../config.json'
export default {
  data() {
    return {
      phone: '',
      code: '',
      phoneRules: [
        v => !!v || "Телефон обязателен для заполнения",
        v => (v && v.length === 10 && !/^(\+7|7)/.test(v) ? (this.phone = "+7" + v) : true) || "Телефон должен содержать 10 цифр"
      ],
      isLoading: false,
      codeEntered: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor:''
    };
  },
  methods: {
    async sendPhone() {
      this.isLoading = true;
      try {
        const res = await fetch(config.serverUrl+`/login/step1?tel=${this.phone.replace(/\D/g,'')}`);
        const data = await res.json();
        this.isLoading = false;
        if (data.success) {
          this.codeEntered = true;
          localStorage.setItem('ibsession',data.ibsession)
          localStorage.setItem('login',data.login)
          this.snackbar = true;
          this.snackbarColor = 'success';
          this.snackbarText = data.message
        } else {
          this.snackbar = true;
          this.snackbarText = data.message;
        }
      } catch (error) {
        this.isLoading = false;
        this.snackbar = true;
        this.snackbarColor = 'error';
        this.snackbarText = 'Ошибка сервера';
      }
    },
    async sendCode() {
      this.isLoading = true;
      try {
        const res = await fetch(config.serverUrl+`/login/step2?tel=${this.phone.replace(/\D/g,'')}&code=${this.code}&ibsession=${localStorage.getItem('ibsession')}`);
        const data = await res.json();
        this.isLoading = false;

        if (data.success) {
          localStorage.setItem('password', data.password);
          this.snackbar = true;
          this.snackbarColor = 'success';
          this.snackbarText = 'Вход выполнен';
          setTimeout(()=>this.$router.push('/orders-list'),1000);
        } else if(!data.success) {
          this.snackbar = true;
          this.snackbarColor = 'error';
          this.snackbarText = data.message;
          this.code = ''
        }
      } catch (error) {
        this.isLoading = false;
        this.snackbar = true;
        this.snackbarColor = 'error';
        this.snackbarText = 'Ошибка сервера';
        localStorage.clear()
      }
    },
    formatPhone() {
      if (this.phone.length === 10 && !/^(\+7|7)/.test(this.phone)) {
        this.phone = "+7" + this.phone;
      }
      let phoneValue = this.phone;
      phoneValue = phoneValue.replace(/\D/g, "").substring(0, 11);
      const match = phoneValue.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
      if (match) {
        phoneValue = `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
      }
      this.phone = phoneValue;
    }
  },
};
</script>
<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 250px);
}
.login-form {
  width: 100%;
  max-width: 300px;
}
</style>