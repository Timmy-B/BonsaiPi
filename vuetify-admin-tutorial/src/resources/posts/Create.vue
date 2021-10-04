<template>
  <va-create-layout :title="title">
    <va-form :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-number-input source="userId"></va-number-input>
              <va-text-input source="title"></va-text-input>
              <va-text-input source="body"></va-text-input>
              <va-save-button></va-save-button>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
