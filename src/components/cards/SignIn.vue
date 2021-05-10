<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :class="`elevation-${hover ? 24 : 6}`"
        class="login-card col-6 mx-auto grey pa-2 pb-4 lighten-3 transition-swing rounded-xl"
        max-width="500px"
        min-width="300px"
        outlined
      >
        <div>

        </div>
        <v-card-title class="justify-center pa-1"
        >Please Sign-in or Register
        </v-card-title
        >
        <v-subheader class="justify-center pa-1"
        >You can also find our app for your Mobile and Desktop!
        </v-subheader
        >
        <v-text-field
          label="Email"
          :error-messages="emailErrors"
          class="ma-2 pl-2"
          v-model="email"
          @input="resetErrors"
        ></v-text-field>
        <v-text-field
          label="Password"
          :error-messages="passwordErrors"
          v-model="password"
          type="password"
          class="ma-2 pl-2"
          @input="resetErrors"
        ></v-text-field>
        <v-row class="pt-3 pb-2 px-5 justify-center">
          <v-col
            cols="12"
            md="4"
            sm="12"
            align="center"
          >
            <v-btn class="d-inline-flex" :loading="loading" color="success" elevation="4" width="120px" medium @click="login"
            >Login
            </v-btn
            >
          </v-col>
          <v-col
            cols="12"
            md="8"
            sm="12"
            align="center"
          >
              <h5 class="d-inline-flex text--secondary text--lighten-1 pr-2">Don't have and account?</h5>
            <router-link :to="{name: 'sign-up'}">
                <v-btn class="d-inline-flex" color="primary" elevation="4" width="120px" medium
                >Register
                </v-btn
                >
            </router-link>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import ERRORS from "@/utils/errors";
import axiosRequests from "@/utils/axiosRequests";
import {mapMutations} from "vuex";

export default {
  name: "SignIn",
  data: () => ({
    email: "",
    password: "",
    loading: false,
    emailErrors: [],
    passwordErrors: [],
  }),
  methods: {
    ...mapMutations(["setToken", "setUserId"]),
    resetErrors() {
      this.emailErrors = []
      this.passwordErrors = []
    },
    async login() {
      if (this.loading) return

      if (this.email.length === 0 && this.password.length === 0) {
        this.emailErrors.push("Please enter email.")
        this.passwordErrors.push("Please enter password.")
        return
      }
      if (this.email.length === 0) {
        this.emailErrors.push("Please enter email.")
        return
      }
      if (this.password.length === 0) {
        this.passwordErrors.push("Please enter password.")
      }
      this.resetErrors()

      const request = {
        password: this.password,
        email: this.email
      }
      this.loading = true;
      const resp = await axiosRequests.sendLoginRequest(request)
      this.loading = false
      if (resp.status === 200) {
        console.log("SUCCESS", resp);
        this.setToken(resp.data.jwt)
        this.setUserId(resp.data.userId)
        this.loading = false;
        await this.$router.push({name: "main-page"})
      }

      const error = resp?.data?.error;
      if (!error) return this.emailErrors.push("Problems with our server we are sorry for the inconvenience")

      switch (error) {
        case ERRORS.ERROR_INVALID_EMAIL_OR_PASSWORD:
          this.emailErrors.push("Invalid email or password")
          this.passwordErrors.push("invalid email or password")
          break;
        case ERRORS.ERROR_FIELDS_EMAIL_MALFORMED_OR_MISSING:
          this.emailErrors.push("Invalid email, please try again")
          return console.log("malformed email");
        case ERRORS.ERROR_FIELDS_PASSWORD_MALFORMED_OR_MISSING:
          this.passwordErrors.push("Invalid password, please try again")
          return console.log("malformed password");
        default:
          this.emailErrors.push("Problems with our server we are sorry for the inconvenience")
          this.passwordErrors.push("Problems with our server we are sorry for the inconvenience")
          return console.log("problems with our server, please try later");
      }
    },
  }
};
</script>

<style scoped>
.login-card {
  margin-top: 20vh;
}
</style>
