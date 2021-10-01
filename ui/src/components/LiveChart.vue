<template> 
  <v-card class="card" width="500">
    <v-card-text class="pa-1" >
      <apexchart ref="chart" type="line" :options="chartOptions" :series="series"></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
import { GET_TEMP } from "@/store.js";
export default {
  name: "ChartLive",
  data() {
    return {
      chartOptions: {
        theme: { mode: "light" },
        tooltip: {
          theme: "dark"
        },
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 2000
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
          curve: "smooth"
        },
        title: {
          text: "Realtime Status",
          align: "left"
        },
        markers: {
          size: 0
        },xaxis:{
          labels: {
          show: false}
        },
        yaxis: {
          max: 100
        },
        legend: {
          show: true
        }
      },
      series: [
        {
          name: "Temperature",
          data: []
        },
        {
          name: "Humidity",
          data: []
        },
        {
          name: "Light",
          data: []
        },
        {
          name: "Moisture",
          data: []
        }
      ],
      liveSeries: [],
      updateTimer:'',
      cleanUpTimer:''
    };
  },
  computed: {
    temp() {
      return this.$store.state.stats.temp;
    }
  },
  watch: {
    temp() {
      var stats = this.$store.state.stats;
      this.liveSeries = [
        {
          name: "Temperature",
          data: stats.temp
        },
        {
          name: "Humidity",
          data: stats.humidity
        },
        {
          name: "Light",
          data: stats.lux
        },
        {
          name: "Moisture",
          data: stats.moisture
        }
      ];
      this.$refs.chart.updateSeries(this.liveSeries);
    }
  },
  methods: {
    updateChart(){
       this.$store.dispatch(GET_TEMP);
    }

  },
  created() {
    this.updateChart();
    this.updateTimer = setInterval(() => {
      this.updateChart()
    }, 2000);
    this.cleanUpTimer = setInterval(() => {
      this.$refs.chart.updateSeries(this.liveSeries, false, true);
    }, 60000);
  },
    beforeDestroy () {
      clearInterval(this.updateTimer)
      clearInterval(this.cleanUpTimer)
    }
};
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