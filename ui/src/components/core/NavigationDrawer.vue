<template>
  <v-navigation-drawer v-model="drawerState" fixed app>
    <v-toolbar color="green accent-4" dark class="toolbar">
      <router-link :to="{ name: 'Home' }">
        <img src="icon.png" width="36px">
      </router-link>
      <router-link :to="{ name: 'Home' }" class="text">Menu</router-link>
    </v-toolbar>

<v-list>
      <v-list-item @click="changeRoute('Home', 1)">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-title :class="[{'active': selectedIndex === 1}, 'item-title' ]">Home</v-list-item-title>
      </v-list-item>
      <v-list-item @click="changeRoute('Settings', 2)">
        <v-list-item-action>
          <v-icon>settings</v-icon>
        </v-list-item-action>
        <v-list-item-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Settings</v-list-item-title>
      </v-list-item>
</v-list>



  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['drawer'],
  data() {
    return {
      selectedIndex: 1,
      drawerState: this.drawer,
    };
  },
watch: {
      drawer (value) {
          this.drawerState = value;
      },
      drawerState(value){
        this.$emit('update:drawer', value)
      }
},
methods:{   
   changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    }
  }

};
</script>

<style>
.toolbar {
  font-weight: bold;
  font-size: 18px;
}

.toolbar .text {
  padding-left: 15px;
  color: white;
  text-decoration: none;
}

.item-title {
  font-size: 17px;
  font-weight: 500;
}
.item-sub-title {
  font-size: 15px;
  font-weight: 500;
}

.active {
  font-size: 18px;
  font-weight: bold;
}
</style>