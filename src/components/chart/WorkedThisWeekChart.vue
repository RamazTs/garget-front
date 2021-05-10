<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: "WorkedThisWeekChart",
  data: () => ({
    chart: {
      background: "#5b0606"
    }
  }),
  props: {
    weeklyReport: {
      required: true,
    }
  },
  computed: {
    chartOptions() {
      return {
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
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
    },
    series() {
      let weekly = [0, 0, 0, 0, 0, 0, 0];
      if (this.weeklyReport.length > 0)
        weekly = this.weeklyReport.map(x => x.minutes / 60);
      return [{
        name: "Hours Worked",
        data: weekly
      }];
    }
  }
};
</script>

<style scoped>

</style>
