<template>
  <v-main class="main-body">
    <v-card
      class="mt-6 mx-md-3 mx-sm-1 rounded-xl pt-0 px-0 settings"
      elevation="10"
      style="background: rgba(255,255,255,0.2)"
    >
      <v-card
        class="pa-12 mb-6 child-bg"
        elevation="10">
        <active-tasks />
      </v-card>

      <v-card
        class="pa-12 my-6 child-bg"
        elevation="10">
        <h1 class="text-center text-md-h4 text-sm-body-3 white--text">Projects</h1>

        <div class="text-center my-2">
          <v-btn class="align-center" color="success" @click="resetAddProject(); dialog2 = true">
            <v-icon
              class="py-1 px-2"
            >
              mdi-plus-circle
            </v-icon>
            Add A New Project
          </v-btn>
        </div>

        <v-list
          subheader
          flat
          two-line
          style="background: rgba(255, 255, 255, 0.2); overflow: auto"
          height="400px"
          class="rounded-xl mt-2"
          dark>
          <v-list-item
            v-for="project in getOtherProjects"
            :key="project._id"
          >
            <v-list-item-avatar>
              <v-icon
                class="indigo lighten-1"
                dark
              >
                mdi-calendar-check
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ project.title }}</v-list-item-title>
              <v-list-item-subtitle> {{ project.description }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon x-large @click.stop="selectedProject = project; dialog = true">
                <v-icon color="indigo lighten-1" x-large>mdi-plus-circle</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon x-large @click.stop="readyforEdit(project); dialog3 = true">
                <v-icon color="indigo lighten-1" x-large>mdi-file-document-edit</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon x-large @click.stop="selectedProject = project; startDeletingProject()">
                <v-icon color="indigo lighten-1" x-large>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>


    <!--    ASSIGN    -->

    <v-dialog
      v-model="dialog"
      max-width="1200px"
      dark
    >
      <v-card style="background: rgba(255, 255, 255, 0.3)" elevation="20">
        <v-card-title class="indigo lighten-1">
          <span class="headline">Assign Project To A Tile</span>
        </v-card-title>
        <v-card-text>
          <v-item-group mandatory>
            <v-container>
              <v-row>
                <v-col
                  v-for="n in 4"
                  :key="n"
                  cols="12"
                  md="3"
                >
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? 'success' : 'indigo lighten-1'"
                      class="d-flex align-center rounded-xl"
                      dark
                      height="200"
                      @click="toggle(); selectedTile = n"
                    >
                      <v-scroll-y-transition hide-on-leave>
                        <div
                          v-if="active"
                          class="display-3 flex-grow-1 text-center"
                        >
                          Selected
                        </div>
                        <div
                          class="display-3 flex-grow-1 text-center"
                          v-else
                        >
                          Tile {{ n }}
                        </div>
                      </v-scroll-y-transition>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="success darken-1"
            @click="startAssigningProject(); dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--    ADD   -->

    <v-dialog
      v-model="dialog2"
      max-width="1200px"
    >
      <v-card elevation="20">
        <v-card-title class="indigo lighten-1">
          <span class="headline white--text">Add a New Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Title*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description"
                  outlined
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="startDate"
                  label="Start Date*"
                  placeholder="DD/MM/YYYY"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="endDate"
                  label="End Date*"
                  placeholder="DD/MM/YYYY"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex">
                <h3 class="text-capitalize">Active Intervals</h3>
                <v-spacer />
                <v-btn color="indigo lighten-1" dark @click="addAnotherInterval">
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>
                </v-btn>
              </v-col>
              <v-row v-for="(i, index) in activeIntervals" :key="index">
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    v-model="i.weekday"
                    :items="['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN']"
                    label="Day of the Week*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    v-model="i.start"
                    :items="['1 AM', '2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 AM', '1 PM', '2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 PM']"
                    label="Start*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    v-model="i.end"
                    :items="['1 AM', '2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 AM', '1 PM', '2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 PM']"
                    label="End*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            @click="dialog2 = false"
          >
            Close
          </v-btn>
          <v-btn
            color="success darken-1"
            @click="startAddingNewProject(); dialog2 = false"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!--    EDIT   -->

    <v-dialog
      v-model="dialog3"
      max-width="1200px"
    >
      <v-card elevation="20">
        <v-card-title class="indigo lighten-1">
          <span class="headline white--text">Edit Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedProject.title"
                  label="Title*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="selectedProject.description"
                  label="Description"
                  outlined
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="selectedProject.startDate"
                  label="Start Date*"
                  placeholder="DD/MM/YYYY"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="selectedProject.endDate"
                  label="End Date*"
                  placeholder="DD/MM/YYYY"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex">
                <h3 class="text-capitalize">Active Intervals</h3>
                <v-spacer />
                <v-btn color="indigo lighten-1" dark @click="addAnotherInterval">
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>
                </v-btn>
              </v-col>
              <v-row v-for="(i, index) in selectedProject.activeIntervals" :key="index">
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    v-model="i.weekday"
                    :items="['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN']"
                    label="Day of the Week*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    v-model="i.start"
                    :items="['1 AM', '2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 AM', '1 PM', '2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 PM']"
                    label="Start*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    v-model="i.end"
                    :items="['1 AM', '2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 AM', '1 PM', '2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 PM']"
                    label="End*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            @click="dialog3 = false"
          >
            Close
          </v-btn>
          <v-btn
            color="success darken-1"
            @click="startEditingAProject(); dialog3 = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-main>
</template>

<script>
import ActiveTasks from "@/components/tasks/ActiveTasks";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CubeSettings",
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    selectedTile: 1,
    selectedProject: {},
    title: "",
    description: "",
    activeIntervals: [{
      weekday: "",
      start: "",
      end: ""
    }],
    startDate: "",
    endDate: "",
    etitle: "",
    edescription: "",
    eactiveIntervals: [{
      weekday: "",
      start: "",
      end: ""
    }],
    estartDate: "",
    eendDate: ""
  }),
  components: { ActiveTasks },
  methods: {
    ...mapActions(["fetchOtherProjects", "assignProject", "deleteProject", "addProject", "editProject"]),
    async startAssigningProject() {
      await this.assignProject({ id: this.selectedProject._id, plateNumber: this.selectedTile });
    },
    async startDeletingProject() {
      await this.deleteProject(this.selectedProject._id);
    },
    resetAddProject() {
      this.title = null;
      this.description = null;
      this.activeIntervals = [{
        weekday: null,
        start: null,
        end: null
      }];
      this.startDate = null;
      this.endDate = null;
    },
    addAnotherInterval() {
      this.activeIntervals.push({
        weekday: "",
        start: "",
        end: ""
      });
    },
    async startAddingNewProject() {
      if (!this.title || !this.startDate || !this.endDate) return;
      let flag = false;
      this.activeIntervals.forEach(x => {
        if (!x.weekday || !x.end || !x.start)
          flag = true;
      });
      if (flag) return;

      await this.addProject({
        start: this.startDate,
        end: this.endDate,
        title: this.title,
        description: this.description ?? null,
        intervals: this.activeIntervals
      });
    },
    async startEditingAProject() {
      if (!this.selectedProject.title || !this.selectedProject.startDate || !this.selectedProject.endDate) return;
      let flag = false;
      this.selectedProject.activeIntervals.forEach(x => {
        if (!x.weekday || !x.end || !x.start)
          flag = true;
      });
      if (flag) return;

      await this.editProject({
        start: this.selectedProject.startDate,
        end: this.selectedProject.endDate,
        title: this.selectedProject.title,
        description: this.selectedProject.description ?? null,
        intervals: this.selectedProject.activeIntervals,
        id: this.selectedProject._id
      });
    },
    readyforEdit(project) {
      const proj = this.projectStartEndFormat(project)
      this.selectedProject = proj
    },
    projectStartEndFormat(project) {
      const sdate = new Date(project.startDate);
      const edate = new Date(project.endDate);
      project.startDate = sdate.getDay() + "/" + sdate.getMonth() + "/" + sdate.getFullYear();
      project.endDate = edate.getDay() + "/" + edate.getMonth() + "/" + edate.getFullYear();
      return project;
    }
  },
  computed: {
    ...mapGetters(["getOtherProjects"])
  },
  async created() {
    await this.fetchOtherProjects();
  }
};
</script>

<style scoped>
.child-bg {
  background: rgb(85, 61, 187);
  background: radial-gradient(circle, rgba(85, 61, 187, 0.28755252100840334) 0%, rgba(0, 251, 255, 0) 100%, rgba(9, 9, 121, 0) 100%);
}

.settings {
  min-height: calc(100vh - 150px)
}
</style>
