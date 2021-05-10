<template>
  <v-main class="main-body">
    <v-row justify-md="space-around">
      <v-card
        class="mt-12 mr-md-8 mx-sm-4 rounded-xl col-md-5 pt-0 px-0"
        elevation="10"
        height="445"
        style="background: rgba(255,255,255,0.2)"
        dark
      >
        <v-card-title class="deep-orange white--text">
          <v-icon class="mr-2" large dark>mdi-account-box-outline</v-icon>
          Profile
        </v-card-title>
        <v-list class="pa-2" style="background: transparent">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account-check-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Name: {{ getProfile.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account-check-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Lastname: {{ getProfile.lastname }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account-check-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Email: {{ getProfile.email }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account-check-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Registered At: {{ new Date(getProfile.registered_at) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card
        class="mt-12 rounded-xl col-md-5 ml-md-8 mx-sm-2 pt-0 px-0"
        elevation="10"
        style="background: rgba(255,255,255,0.2)"
      >
        <v-card-title class="teal white--text">
          <v-icon class="mr-2" large dark>mdi-chart-areaspline-variant</v-icon>
          Statistics
        </v-card-title>
        <div>
          <WorkedThisWeekChart :weekly-report="weeklyReport" />
        </div>
      </v-card>
    </v-row>

    <v-card
      class="mt-12 mb-4 mx-auto rounded-xl pa-5"
      elevation="10"
      style="background:  rgba(255,255,255,0.2); max-width: 1950px"
    >
      <active-tasks />
    </v-card>
  </v-main>
</template>

<script>
import ActiveTasks from "@/components/tasks/ActiveTasks";
import { mapActions, mapGetters } from "vuex";
import WorkedThisWeekChart from "@/components/chart/WorkedThisWeekChart";

export default {
  name: "MainPage",
  components: { WorkedThisWeekChart, ActiveTasks },
  data: () => ({}),
  methods: {
    ...mapActions(["fetchWeeklyAnalytics", "fetchProfile"]),
  },
  computed: {
    ...mapGetters(["getWeeklyReport", "getProfile"]),
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
  },
  async created() {
    await this.fetchWeeklyAnalytics()
    await this.fetchProfile()
  }
};
</script>

<style scoped></style>
