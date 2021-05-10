<template>
  <div>
    <v-app-bar
      :color="color"
      hide-on-scroll
      absolute
      dark
      v-if="getAuthState"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h2 class="ml-2">{{ title }}</h2>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
      :color="color"
      v-if="getAuthState"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item>
            <v-list-item-title>Profile Page</v-list-item-title>
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Accumulated Statistics</v-list-item-title>
            <v-list-item-avatar>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Setup Gadget</v-list-item-title>
            <v-list-item-avatar>
              <v-icon>mdi-cube-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Log out</v-list-item-title>
            <v-list-item-avatar>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <slot />


    <v-bottom-navigation
      class="hidden-md-and-up"
      v-model="value"
      :background-color="color"
      shift
      dark
      fixed
      v-if="getAuthState"
    >
      <v-btn @click="$router.push({name:'main-page'})">
        <span>Profile</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <v-btn @click="$router.push({name:'statistics-page'})">
        <span>Statistics</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>

      <v-btn @click="$router.push({name: 'cube-settings-page'})">
        <span>Cube</span>
        <v-icon>mdi-cube-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "BaseLayout",
  data: () => ({
    value: 1,
    drawer: false,
    group: null,
    routeNames: ["main-page", "statistics-page", "cube-settings-page", "sign-in"]
  }),
  methods: {
    ...mapMutations(["logOut"]),
  },
  computed: {
    ...mapGetters(["getAuthState"]),
    color() {
      switch (this.value) {
        case 0:
          return "blue";
        case 1:
          return "teal";
        case 2:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
    title() {
      switch (this.value) {
        case 0:
          return "Home";
        case 1:
          return "Statistics";
        case 2:
          return "Gadget Settings";
        default:
          return "Main Page"
      }
    }
  },
  watch: {
    group(newValue) {
      if (newValue == null)
        return this.drawer = false;
      if (newValue === 3) {
        this.logOut()
      }
      this.value = newValue;
      this.$router.push({ name: this.routeNames[newValue] });
      this.drawer = false;
    },
    $route: {
      immediate: true,
      handler(newRoute) {
        switch (newRoute.name) {
          case "main-page":
            return this.value = 0;
          case "statistics-page":
            return this.value = 1;
          case "cube-settings-page":
            return this.value = 2;
          default:
            return this.value = 0
        }
      }
    }
  },
  mounted() {

  }
};
</script>

<style scoped>

</style>
