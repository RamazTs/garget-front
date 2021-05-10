<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: "PerProjectTable",
  data: () => ({
    chart: {
      background: "#5b0606"
    },
  }),
  props: {
    tiles: {
      required: true
    }
  },
  computed: {
    chartOptions() {
      let titles = ["Tile 1", "Tile 2", "Tile 3", "Tile 4"]
      if (this.tiles.length > 0)
         titles = this.tiles.map(x => x.title + ` (Tile ${x.tile})`)

      const options = {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: titles
        },
        yaxis: {
          title: {
            text: "Worked (hours)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            fontFamily: undefined
          },
          y: {
            formatter: function(val) {
              return val + " (hours)";
            }
          }
        }
      };
      return options
    },
    series() {
      let tiles = [0, 0, 0, 0];
      if (this.tiles.length > 0)
        tiles = this.tiles.map(x => (x.totalWorked / 60).toFixed(1));
      return [{
        name: "Hours Worked",
        data: tiles
      }];
    }
  }
};
</script>

<style scoped>

</style>
