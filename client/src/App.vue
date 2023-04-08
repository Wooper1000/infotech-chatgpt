<template>
  <v-app>
    <HeaderApp :first-number="79078" :second-number="288827" app/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderApp from "@/components/Header-App";

export default {
  name: "App",
  components: {
    HeaderApp,
  },
};
</script>

<style>
#app {
}
</style>
