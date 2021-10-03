<template>
  <v-container class="container--fluid">
    <app-widget title="Basic Usage">
      <div slot="widget-content">
        <div class="component-example">
          <div class="component-example__container">
            <dl class="headings">
              <v-col>
                <div class="text-h1 grey--text text--darken-1">
                  Light 112sp
                </div>
                <strong>.display-4</strong>
                <span>font-weight 300</span>
              </v-col>
              <dd>
                <div class="text-h2 grey--text text--darken-1">
                  Regular 56sp
                </div>
                <strong>.display-3</strong>
                <span>font-weight 400</span>
              </dd>
              <dd>
                <div class="text-h3 grey--text text--darken-1">
                  Regular 45sp
                </div>
                <strong>.display-2</strong>
                <span>font-weight 400</span>
              </dd>
              <dd>
                <div class="text-h4 grey--text text--darken-1">
                  Regular 34sp
                </div>
                <strong>.display-1</strong>
                <span>font-weight 400</span>
              </dd>
              <dd>
                <div class="text-h5 grey--text text--darken-1">
                  Regular 24sp
                </div>
                <strong>.headline</strong><span>font-weight 400</span>
              </dd>
              <dd>
                <div class="text-h6 grey--text text--darken-1">
                  Medium 20sp
                </div>
                <strong>.title</strong><span>font-weight 500</span>
              </dd>
              <dd>
                <div class="subheading grey--text text--darken-1">
                  Regular 16sp
                </div>
                <strong>.subheading</strong><span>font-weight 400</span>
              </dd>
              <dd>
                <div class="text-body-2 grey--text text--darken-1">
                  Medium 14sp
                </div>
                <strong>.body-2</strong><span>font-weight 500</span>
              </dd>
              <dd>
                <div class="text-body-1 grey--text text--darken-1">
                  Regular 14sp
                </div>
                <strong>.body-1</strong><span>font-weight 400</span>
              </dd>
              <dd>
                <div class="text-caption grey--text text--darken-1">
                  Regular 12sp
                </div>
                <strong>.caption</strong><span>font-weight 400</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </app-widget>
  </v-container>
</template>

<script>
import AppWidget from '@/views/widget/AppWidget.vue';

export default {
  name: 'Typography',
  components: {
    AppWidget,
  },
  data: () => ({}),
};
</script>
