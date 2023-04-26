<template>
  <v-app-bar app color="grey lighten-2" fixed absolute>
    <v-container class="d-flex justify-center">
      <v-row align="center" class="w-100">
        <v-col class="text-center">
        </v-col>
        <v-col class="text-center">
          <v-toolbar-title class="subtitle-1 font-weight-bold orange--text">
            Инфотех
          </v-toolbar-title>
        </v-col>
        <v-col class="text-right">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon color="primary" dark v-bind="props">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(item,index) in items"
                  :key="index"
                  @click="setActiveFilter(item.title)"
                  v-bind:class="{ 'selected': item.title === activeFilter }"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
              <hr>
              <v-list-item class="text-red-accent-2" @click="logout">
                <v-list-item-title >Выход</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Активные' },
        { title: 'Выполненные' },
      ],
    }
  },
  computed: {
    activeFilter() {
      return this.$store.state.activeFilter;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    setActiveFilter(filter) {
      this.$store.commit('SET_ACTIVE_FILTER', filter);
    },
  },
};
</script>

<style scoped>

.orange--text {
  color: orange;
}
.selected {
  background-color: #eee;
}
v-app-bar{
  max-width: 1000px !important;
}
</style>