<template>
  <app-center>
    <template #page>
      <v-col class="text-h1">
        Admin only
      </v-col>
    </template>
  </app-center>
</template>

<script>
import AppCenter from '@/views/widget/AppCenter.vue';

export default {
  name: 'Admin',
  components: {
    AppCenter,
  },
};
</script>
