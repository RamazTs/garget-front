import axios from "axios";

const defaultApiBaseUrl = "http://localhost:3000/api";
const baseUrl = process.env.API_BASE_URL || defaultApiBaseUrl;
axios.defaults.baseURL = baseUrl;

export default {
  sendRegistrationRequest: async (request) => {
    try {
      return await axios.post("/public/register", request);
    } catch (error) {
      return error.response;
    }
  },
  sendLoginRequest: async (request) => {
    try {
      return await axios.post("/public/login", request);
    } catch (error) {
      return error.response;
    }
  },
  sendOverallAnalyticsRequest: async (token, userId) => {
    try {
      return await axios.get(`/analytics/overall-report/${userId}`, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  sendAssignedProjectsAnalyticsRequest: async (token, userId) => {
    try {
      return await axios.get(`/analytics/assigned-projects-report/${userId}`, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  sendWeeklyAnalyticsReport: async (token, userId) => {
    try {
      return await axios.get(`/analytics/weekly-report/${userId}`, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  getAssignedProjects: async (token, userId) => {
    try {
      return await axios.get(`/projects/${userId}`, {
        params: {
          status: "ASSIGNED"
        },
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  getOtherProjects: async (token, userId) => {
    try {
      return await axios.get(`/projects/${userId}`, {
        params: {
          status: "IDLE"
        },
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  getProfile: async (token, userId) => {
    try {
      return await axios.get(`/${userId}`, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  sendAssignProjectRequest: async (token, userId, _id, plateNumber) => {
    try {
      return await axios.put(`/projects/${userId}`, {
        _id,
        plateNumber
      }, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  sendDeleteProjectRequest: async (token, userId, _id) => {
    try {
      return await axios.delete(`/projects/${userId}`, {
        headers: {
          Authorization: token
        },
        data: {
          _id
        }
      });
    } catch (error) {
      throw error.response;
    }
  },
  sendAddProjectRequest: async (token, userId, start, end, title, intervals, description = null) => {
    try {
      return await axios.post(`/projects/${userId}`, {
          "title":  title,
          "description": description,
          "activeIntervals": intervals,
          "startDate": start,
          "endDate": end
        },
        {
          headers: {
            Authorization: token
          }
        });
    } catch (error) {
      throw error.response;
    }
  },
  sendEditProjectRequest: async (token, userId, start, end, title, intervals, description = null) => {
    try {
      return await axios.patch(`/projects/${userId}`, {
          "title":  title,
          "description": description,
          "activeIntervals": intervals,
          "startDate": start,
          "endDate": end
        },
        {
          headers: {
            Authorization: token
          }
        });
    } catch (error) {
      throw error.response;
    }
  }
};
