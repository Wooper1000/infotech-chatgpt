<template>
  <div class="loader-container">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "PreloaderApp"
}
</script>

<style scoped>
.loader-container {
  height: 100vh; /* высота контейнера на весь экран */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>