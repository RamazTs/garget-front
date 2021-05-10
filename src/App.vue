<template>
  <div>
    <v-app class="app" style="position: relative">
      <base-layout>
        <v-dialog-transition :hide-on-leave="true">
          <router-view />
        </v-dialog-transition>
      </base-layout>
    </v-app>
    <div id="particles-js"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { particlesjs } from "@/particlesjs";
import BaseLayout from "@/layout/BaseLayout";

export default {
  name: "App",
  components: { BaseLayout },
  mixins: [particlesjs],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getAuthState"])
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.getAuthState || this.$route.name === "sign-in" || this.$route.name === "sign-up") return
          this.$router.push({ name: "sign-in" });
      }
    }
  }
};
</script>

<style type="scss">
.theme--light.v-application {
  background: transparent !important;
}
* {
  z-index: 2;
  box-sizing: border-box;
}
.particle, .particle > canvas, #particles-js { z-index: -1 !important; }
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgb(3,57,88);
  background: -moz-linear-gradient(142deg, rgba(3,57,88,1) 0%, rgba(21,105,175,1) 27%, rgba(75,180,236,1) 63%, rgba(18,130,190,1) 93%);
  background: -webkit-linear-gradient(142deg, rgba(3,57,88,1) 0%, rgba(21,105,175,1) 27%, rgba(75,180,236,1) 63%, rgba(18,130,190,1) 93%);
  background: linear-gradient(142deg, rgba(3,57,88,1) 0%, rgba(21,105,175,1) 27%, rgba(75,180,236,1) 63%, rgba(18,130,190,1) 93%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#033958",endColorstr="#1282be",GradientType=1);
  background-blend-mode: color-dodge, normal;
}
.main-body {
  margin: 56px 0;
}
@import "styles/styles.scss";
</style>
