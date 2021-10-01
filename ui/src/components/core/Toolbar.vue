<template>
  <v-app-bar app color="green accent-4" dark>
    <v-toolbar-title>
      <v-app-bar-nav-icon @click="toggleNavigationBar"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <v-toolbar-title>BonsaiPi</v-toolbar-title>

  </v-app-bar>
</template>
<script>

export default {
  computed: {
    rackTitle (){
      return this.$store.state.api.selectedRack.name
    }
  },
  data() {
    return {
    }
  },
watch: { },
  methods: {
    toggleNavigationBar() {
      this.$emit('toggleNavigationBar');
    },
  }
};
</script>
