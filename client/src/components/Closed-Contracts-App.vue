<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="headline">Closed Contracts</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="contracts" hide-default-footer class="elevation-1">
          <template v-slot:item="{ item }">
            <v-chip small color="red lighten-3" v-if="item.contract === 'Closed'">{{ item.contract }}</v-chip>
            <v-chip small color="green lighten-3" v-else>{{ item.contract }}</v-chip>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ClosedContractsApp',
  props: {
    contracts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: true,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Product', value: 'product' },
        { text: 'Contract Status', value: 'contract', align: 'center' },
        { text: 'Date', value: 'date', align: 'center' },
      ]
    }
  }
}
</script>

<style scoped>
</style>