<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      color="amber"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="text-md-h4 text-sm-body-3 mr-4 white--text font-weight-light">
            {{ tile1.title }}
          </h2>
          <v-icon
            dark
            size="42"
          >
            mdi-cube-outline
          </v-icon>
        </v-card-title>
        <v-container v-if="tile1.description">
          <v-row>
            <v-col>
              {{ tile1.description }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
      small
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon
            class="mr-4"
            dark
            size="42"
          >
            mdi-cube-outline
          </v-icon>
          <h2 class="text-md-h4 text-sm-body-3 white--text font-weight-light">
            {{ tile2.title }}
          </h2>
        </v-card-title>
        <v-container v-if="tile2.description">
          <v-row>
            <v-col>
              {{ tile2.description }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="text-md-h4 text-sm-body-3 mr-4 white--text font-weight-light">
            {{ tile3.title }}
          </h2>
          <v-icon
            dark
            size="42"
          >
            mdi-cube-outline
          </v-icon>
        </v-card-title>
        <v-container v-if="tile3.description">
          <v-row>
            <v-col>
              {{ tile3.description }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="green lighten-1"
      fill-dot
      right
      small
    >
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon
            class="mr-4"
            dark
            size="42"
          >
            mdi-cube-outline
          </v-icon>
          <h2 class="text-md-h4 text-sm-body-3 white--text font-weight-light">
            {{ tile4.title }}
          </h2>
        </v-card-title>
        <v-container v-if="tile4.description">
          <v-row>
            <v-col>
              {{ tile4.description }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ActiveTasks",
  methods: {
    ...mapActions(["fetchAssignedProjects"]),
    project(tile) {
      const proj = this.getAssignedProjects.find(x => x.plateNumber === tile)
      if (proj) return proj
      return {
        title: `Plate ${tile}`,
        description: "This plate is not assigned to project",
      }
    }
  },
  computed: {
    ...mapGetters(["getAssignedProjects"]),
    tile1() {
      return this.project(1)
    },
    tile2() {
      return this.project(2)
    },
    tile3() {
      return this.project(3)
    },
    tile4() {
      return this.project(4)
    }
  },
  async created() {
    await this.fetchAssignedProjects()
  }
};
</script>

<style scoped>

</style>
