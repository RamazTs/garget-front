<template>
  <v-main class="main-body">
    <v-card
      class="mt-6 mx-3 rounded-xl pt-0 px-0 statistics"
      elevation="10"
      style="background: rgba(255,255,255,0.2)"
      dark
    >
      <v-card
        class="pa-12 mb-6 child-bg"
        elevation="10"
        dark>
        <h1 class="text-center text-md-h4 text-sm-body-3 white--text">Overall Time Spent</h1>
        <div class="flex">
          <h2 class="text-md-h6 text-sm-body-2">Time Spent On Activities: {{ overallHours.totalTime / 60}} hrs</h2>
        </div>
        <div>
          <h2 class="text-md-h6 text-sm-body-2">Average time spent per day: {{ overallHours.avg / 60}} hrs</h2>
        </div>
      </v-card>

      <v-card
        class="pa-12 my-6 child-bg"
        elevation="10">
        <h1 class="text-center text-md-h4 text-sm-body-3 white--text">Hours Worked This Week</h1>
        <worked-this-week-chart :weekly-report="weeklyReport" />
      </v-card>

      <v-card
        class="pa-12 my-6 child-bg"
        elevation="10">
        <h1 class="text-center text-md-h4 text-sm-body-3 white--text">Total Time Spent On Projects</h1>
        <per-project-table :tiles="tiles" />
      </v-card>

    </v-card>
  </v-main>
</template>

<script>
import PerProjectTable from "@/components/chart/PerProjectTable";
import { mapActions, mapGetters } from "vuex";
import WorkedThisWeekChart from "@/components/chart/WorkedThisWeekChart";

export default {
  name: "Statistics",
  components: { WorkedThisWeekChart, PerProjectTable },
  methods: {
    ...mapActions(["fetchAllAnalytics", "fetchAssignedProjects"])
  },
  computed: {
    ...mapGetters(["getOverallAnalyticsReport", "getWeeklyReport", "getAssignedProjectsAnalyticsReport", "getAssignedProjects"]),

    overallHours() {
      const hours = this.getOverallAnalyticsReport;
      try {
        const avg = hours.avgDailyMinutes ?? 0;
        const totalTime = hours.totalTimeWorked ?? 0;
        return { avg, totalTime };
      } catch (error) {
        console.log(error);
        return { avg: 0, totalTime: 0 };
      }
    },

    weeklyReport() {
      const weekly = this.getWeeklyReport;
      try {
        if (weekly.length === 0) return [];
        const daysPresent = weekly.map(x => x._id);
        const difference = [1, 2, 3, 4, 5, 6, 7].filter(x => !daysPresent.includes(x));
        const weekdays = difference.map(x => ({ _id: x, minutes: 0 })).concat(weekly).sort((a, b) => a._id - b._id);
        const sun = weekdays.shift()
        return [...weekdays, sun]
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    tiles() {
      const tilesReport = this.getAssignedProjectsAnalyticsReport;
      const assigned = this.getAssignedProjects;
      try {
        if (tilesReport.length === 0 || assigned.length === 0) return [];
        const tilesWithPlates = tilesReport.map(x => {
            const proj = assigned.find(y => y._id === x._id);
            if (!proj) throw Error("Could not find Project " + x._id)

            return { tile: proj.plateNumber, title: proj.title, ...x };
          });

        const busyPlates = assigned.map(x => x.plateNumber)
        const difference = [1, 2, 3, 4].filter(x => !busyPlates.includes(x))

        return difference.map(x => ({tile: x, _id: '', totalWorked: 0, title:''})).concat(tilesWithPlates).sort((a, b) => a.tile - b.tile)
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  },
  async created() {
    await this.fetchAssignedProjects();
    await this.fetchAllAnalytics();
  }
};
</script>

<style scoped lang="scss">
.statistics {
  min-height: calc(100vh - 150px)
}

.child-1 {
  margin-top: 200px;
}

.child-bg {
  background: rgb(72, 177, 129);
  background: radial-gradient(circle, rgba(72, 177, 129, 0.6937149859943977) 0%, rgba(0, 212, 255, 0) 100%, rgba(9, 9, 121, 0) 100%);
}
</style>
