<template>
  <v-card class="card">
    <v-card-text class="pa-1">
      <apexchart width="500" ref="chart" type="line" :options="options" :series="series"></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
import {GET_TEMP} from '../store.js'
export default {
    name: 'HelloWorld',
  data() {
    return {
      options: {
   chartOptions: {
            chart: {
              id: 'realtime',
              height: 350,
              type: 'line',
              animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                  speed: 1000
                }
              },
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Dynamic Updating Chart',
              align: 'left'
            },
            markers: {
              size: 0
            },
            yaxis: {
              max: 100
            },
            legend: {
              show: false
            },
          },
          
      },
      series: [{
        name: 'series-1',
        data: [5]
      }]
    }
  },
  computed: {
    temps(){
      return this.$store.state.temps
    }
  },
  watch: {
    temps(data){
     this.$refs.chart.updateSeries([{
              data: data
            }])
    }
  },
  mounted(){
    this.$store.dispatch(GET_TEMP)
  }
}
</script>

<style>
  .card {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>