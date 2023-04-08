<template>
  <v-dialog v-model="dialog" max-width="500px" @click:outside="closeDialog">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CustomModal',
  props: {
    title: {
      type: String,
      default: 'Modal Title'
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>