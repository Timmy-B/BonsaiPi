<template>
  <app-center>
    <template #page>
      <v-col class="text-h1">
        Editor
      </v-col>
    </template>
  </app-center>
</template>

<script>
import AppCenter from '@/views/widget/AppCenter.vue';

export default {
  name: 'Editor',
  components: {
    AppCenter,
  },
};
</script>

<style scoped>

</style>
