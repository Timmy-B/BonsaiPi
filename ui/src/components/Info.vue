
<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{this.config.species}}</div>
        <v-list-item-title class="headline mb-1">{{this.config.name}}</v-list-item-title>
        <v-list-item-subtitle>{{this.daysOld}} days old</v-list-item-subtitle>
      </v-list-item-content>

      <v-icon
        tile
        size="64"
        color="red"
      >mdi-heart</v-icon>
    </v-list-item>
  </v-card>
</template>

<script>
import { GET_CONFIG } from "@/store";
export default {
  name: "Info",
  computed:{
    config() {
      return this.$store.state.config.general;
    },
    daysOld() {
      var given = this.$moment(this.config.dateAquired, "YYYY-MM-DD").add(this.config.age, 'Y');
      var current = this.$moment().startOf('day');
      return given.diff(current,'days');
    }
  },
  created(){
    this.$store.dispatch(GET_CONFIG);
  }
  }
</script>