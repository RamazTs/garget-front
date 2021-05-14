import Vue from "vue";
import Vuex from "vuex";

import AxiosRequests from "@/utils/axiosRequests";

Vue.use(Vuex);


export default {
  state: {
    auth: false,
    token: "",
    userId: "",
    profile: {},
    assignedProjects: [],
    otherProjects: [],
    overallAnalyticsReport: {},
    assignedProjectsAnalyticsReport: [],
    weeklyReport: [],
  },
  getters: {
    getAuthState: (state) => (state.token.length > 0 && state.userId.length > 0),
    getUserIdAndToken: (state) => ({ token: state.token, userId: state.userId }),
    getOverallAnalyticsReport: (state) => state.overallAnalyticsReport,
    getAssignedProjectsAnalyticsReport: (state) => state.assignedProjectsAnalyticsReport,
    getWeeklyReport: (state) => state.weeklyReport,
    getAssignedProjects: (state) => state.assignedProjects,
    getProfile: (state) => state.profile,
    getOtherProjects: (state) => state.otherProjects,
  },
  mutations: {
    setUserId: (state, userId) => (state.userId = userId),
    setToken: (state, token) => (state.token = token),
    setOverallReport: (state, overall) => (state.overallAnalyticsReport = overall),
    setAssignedProjectsReport: (state, assignedProjectsReport) => (state.assignedProjectsAnalyticsReport = assignedProjectsReport),
    setWeeklyReport: (state, weeklyReport) => (state.weeklyReport = weeklyReport),
    setAssignedProjects: (state, projects) => (state.assignedProjects = projects),
    setProfile: (state, profile) => (state.profile = profile),
    setOtherProjects: (state, project) => (state.otherProjects = project),
    logOut: (state) => {
      state.auth = false
      state.token = ""
      state.userId = ""
      state.profile = ""
      state.assignedProjects = []
      state.otherProjects = []
      state.overallAnalyticsReport = {}
      state.assignedProjectsAnalyticsReport = []
      state.weeklyReport = []
    }
  },
  actions: {
    fetchProfile: async (context, retry = 3) => {
      if (retry === 0) {
        console.log("Could not fetch profile");
        return;
      }
      const userId = context.state.userId;
      const token = context.state.token;
      try {
        const profile = await AxiosRequests.getProfile(token, userId);
        context.commit("setProfile", profile.data);
      } catch (error) {
        console.log(error);
        console.log("Retrying request to get overall analytics");
        await context.dispatch("fetchOverallTimeSpent", retry - 1);
      }
    },
    fetchOverallTimeSpent: async (context, retry = 3) => {
      if (retry === 0) {
        console.log("Could not fetchOverallTimeSpent");
        return;
      }
      const userId = context.state.userId;
      const token = context.state.token;
      try {
        const overall = await AxiosRequests.sendOverallAnalyticsRequest(token, userId);
        context.commit("setOverallReport", overall.data);
      } catch (error) {
        console.log(error);
        console.log("Retrying request to get overall analytics");
        await context.dispatch("fetchOverallTimeSpent", retry - 1);
      }
    },
    fetchAssignedProjectsAnalytics: async (context, retry = 3) => {
      if (retry === 0) {
        console.log("Could not fetchAssignedProjectsAnalytics");
        return;
      }
      const userId = context.state.userId;
      const token = context.state.token;
      try {
        const report = await AxiosRequests.sendAssignedProjectsAnalyticsRequest(token, userId);
        context.commit("setAssignedProjectsReport", report.data);
      } catch (error) {
        console.log(error);
        console.log("Retrying request to get Assigned Projects Analytics");
        await context.dispatch("fetchAssignedProjectsAnalytics", retry - 1);
      }
    },
    fetchWeeklyAnalytics: async (context, retry = 3) => {
      if (retry === 0) {
        console.log("Could not fetch Weekly Analytics");
        return;
      }
      const userId = context.state.userId;
      const token = context.state.token;
      try {
        const report = await AxiosRequests.sendWeeklyAnalyticsReport(token, userId);
        context.commit("setWeeklyReport", report.data);
      } catch (error) {
        console.log(error);
        console.log("Retrying request to get weekly report");
        await context.dispatch("fetchWeeklyAnalytics", retry - 1);
      }
    },
    fetchAllAnalytics: async (context) => {
      try {
        await context.dispatch("fetchWeeklyAnalytics");
        await context.dispatch("fetchAssignedProjectsAnalytics");
        await context.dispatch("fetchOverallTimeSpent");
      } catch (error) {
        console.log(error);
        console.log("Could not fetch all analytics");
      }
    },
    fetchAssignedProjects: async (context, retry = 3) => {
      if (retry === 0) {
        console.log("Could not fetch fetchAssignedProjects");
        return;
      }
      try {
        const assignedProjects = await AxiosRequests.getAssignedProjects(context.state.token, context.state.userId);
        context.commit("setAssignedProjects", assignedProjects.data.docs);
      } catch (error) {
        console.log(error);
        console.log("Retrying request to get assigned projects");
        await context.dispatch("fetchAssignedProjects", retry - 1);
      }
    },
    fetchOtherProjects: async (context, retry = 3) => {
      if (retry === 0) {
        console.log("Could not fetch other projects");
        return;
      }
      try {
        const otherProjects = await AxiosRequests.getOtherProjects(context.state.token, context.state.userId);
        context.commit("setOtherProjects", otherProjects.data.docs);
      } catch (error) {
        console.log(error);
        console.log("Retrying request to get other projects");
        await context.dispatch("fetchOtherProjects", retry - 1);
      }
    },
    assignProject: async (context, { id, plateNumber }) => {
      try {
        await AxiosRequests.sendAssignProjectRequest(context.state.token, context.state.userId, id, plateNumber);
        await context.dispatch("fetchOtherProjects")
        await context.dispatch("fetchAssignedProjects")
      } catch (error) {
        console.log(error);
      }
    },
    deleteProject: async (context, id ) => {
      try {
        await AxiosRequests.sendDeleteProjectRequest(context.state.token, context.state.userId, id);
        await context.dispatch("fetchOtherProjects")
      } catch (error) {
        console.log(error);
      }
    },
    addProject: async (ctx, {start, end, title, description, intervals}) => {
      try {
        await AxiosRequests.sendAddProjectRequest(ctx.state.token, ctx.state.userId, start, end, title, intervals, description);
        await ctx.dispatch("fetchOtherProjects")
      } catch (error) {
        console.log(error);
      }
    },
    editProject: async (ctx, {start, end, title, description, intervals, id}) => {
      try {
        await AxiosRequests.sendEditProjectRequest(ctx.state.token, ctx.state.userId, start, end, title, intervals, id, description);
        await ctx.dispatch("fetchOtherProjects")
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {}
};
