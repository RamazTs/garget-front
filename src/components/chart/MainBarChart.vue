<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</template>
<script>

export default {
  data: () => ({
    chart: {
      background: "#5b0606"
    },
    series: [{
      name: "Hours Worked",
      data: [2, 4, 8, 6, 7, 1, 5]
    }],
    chartOptions: {
      chart: {
        type: "bar",
        height: 400
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
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      yaxis: {
        title: {
          text: "Worked (hours)",
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        y: {
          formatter: function(val) {
            return val + " (hours)";
          }
        }
      }
    }
  }),
};

</script>

<style scoped>

</style>
