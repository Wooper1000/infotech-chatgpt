import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store/store";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
})


const token = localStorage.getItem('authToken')

// если токена нет, перенаправляем на страницу логина
if (!token) {
    router.push('/login')
}

createApp(App).use(vuetify).use(router).use(store).mount('#app')