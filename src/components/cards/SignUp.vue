<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :class="`elevation-${hover ? 24 : 6}`"
        class="sign-up col-6 mx-auto grey pa-2 pb-4 lighten-3 transition-swing rounded-xl"
        max-width="500px"
        min-width="300px"
        outlined
        v-if="!registrationFinished"
      >
        <v-card-title class="justify-center pa-1"
        >Sign Up!
        </v-card-title
        >
        <v-subheader class="justify-center pa-1"
        >All fields are required to register!
        </v-subheader
        >
        <v-text-field
          label="Name"
          class="ma-2 pl-2"
          :value="name"
          :error-messages="nameErrors"
          @input="setName($event)"
          @blur="$v.name.$touch();"
        ></v-text-field>
        <v-text-field
          label="Lastname"
          :value="lastname"
          class="ma-2 pl-2"
          :error-messages="lastnameErrors"
          @input="setLastName($event)"
          @blur="$v.lastname.$touch();"
        ></v-text-field>
        <v-text-field
          label="Email"
          class="ma-2 pl-2"
          v-model="email"
          :error-messages="emailErrors"
          @input="setEmail($event)"
          @blur="$v.email.$touch();"
        ></v-text-field>
        <v-text-field
          label="Password"
          :error-messages="passwordErrors"
          :value="password"
          type="password"
          class="ma-2 pl-2"
          @input="setPassword($event)"
          @blur="$v.password.$touch();"
        ></v-text-field>
        <v-text-field
          label="Re-enter Password"
          :value="password2"
          :error-messages="password2Errors"
          type="password"
          class="ma-2 pl-2"
          @input="setPassword2($event)"
          @blur="$v.password2.$touch();"
        ></v-text-field>
        <v-row class="pa-5 justify-space-between align-center">
          <router-link :to="{name: 'sign-in'}">
            <v-btn class="d-inline-flex" color="grey" elevation="4" width="120px" medium
            >
              back
            </v-btn
            >
          </router-link>
          <v-btn class="d-inline-flex" color="primary" elevation="4" width="120px" medium
                 @click="register"
          >Register
          </v-btn>
        </v-row>
      </v-card>
      <v-card
        :class="`elevation-${hover ? 24 : 6}`"
        class="sign-up col-6 mx-auto grey pa-2 pb-4 lighten-3 transition-swing rounded-xl"
        min-height="200px"
        max-width="500px"
        min-width="300px"
        outlined
        v-else
      >
        <v-card-title class="justify-center pa-1 text-capitalize ">
          Registration Success!
          <v-icon
            light
            right
            color="success"
          >
            mdi-checkbox-marked-circle
          </v-icon>
        </v-card-title>
        <v-card-text class="text-center pt-2">
          You have been successfully registered on our website!
          You can now login to your account and setup activities!
        </v-card-text>
        <v-card-actions>
          <router-link :to="{name: 'sign-in'}" class="mx-auto">
            <v-btn
              class="mt-2"
              color="success darken-1"
              dark
              :loading="loading"
            >
              <v-icon
                dark
                left
              >
                mdi-arrow-left
              </v-icon>
              Go back and Login
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import {
  nameRegex,
  emailRegex,
  atLeastOneDigitValidation,
  atLeastOneLowerCaseValidation,
  atLeastOneUpperCaseValidation,
  passwordLengthValidation
} from "@/utils/validations";
import axiosRequests from "@/utils/axiosRequests";
import ERRORS from "@/utils/errors";

export default {
  name: "SignUp",
  data: () => ({
    name: null,
    lastname: null,
    email: null,
    password: null,
    password2: null,
    emailAlreadyInUse: false,
    registrationFinished: false,
    loading: false,
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      !this.$v.name.nameRegex && errors.push("Name is invalid.");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.required && errors.push("Lastname is required.");
      !this.$v.lastname.nameRegex && errors.push("Lastname is invalid.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required.");
      !this.$v.email.emailRegex && errors.push("Email is invalid.");
      this.emailAlreadyInUse && errors.push("Email already in use.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      !this.$v.password.passwordLengthValidation && errors.push("Password needs to be from 8 to 20 characters long.");
      !this.$v.password.atLeastOneUpperCaseValidation && errors.push("Password must contain at least one upper case letter.");
      !this.$v.password.atLeastOneLowerCaseValidation && errors.push("Password must contain at least one lower case letter.");
      !this.$v.password.atLeastOneDigitValidation && errors.push("Password must contain at least one digit.");
      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      !this.$v.password2.required && errors.push("Please re-enter your password.");
      !this.$v.password2.sameAsPassword && errors.push("Password does not match.");
      return errors;
    }
  },
  methods: {
    setName(name) {
      console.log(name);
      this.name = name;
      this.$v.name.$touch();
    },
    setLastName(surname) {
      this.lastname = surname;
      this.$v.lastname.$touch();
    },
    setEmail(email) {
      this.emailAlreadyInUse = false
      this.email = email;
      this.$v.email.$touch();
    },
    setPassword(password) {
      this.password = password;
      this.$v.password.$touch();
    },
    setPassword2(password) {
      this.password2 = password;
      this.$v.password2.$touch();
    },
    async register() {
      if (this.loading) return
      this.$v.$touch();
      if (
        this.$v.name.$error ||
        this.$v.lastname.$error ||
        this.$v.email.$error ||
        this.$v.password.$error ||
        this.$v.password2.$error
      )
        return;
      const requestBody = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      };
      this.loading = true;
      const resp = await axiosRequests.sendRegistrationRequest(requestBody);
      this.loading = false;
      if (resp.status === 200) return this.registrationFinished = true;
      if (!resp?.data?.error) return;
      switch (resp.data.error) {
        case ERRORS.ERROR_EMAIL_ALREADY_IN_USE:
          this.emailAlreadyInUse = true;
          break;
        default: return;
      }
    }
  },
  validations: {
    name: {
      required,
      nameRegex
    },
    lastname: {
      required,
      nameRegex
    },
    email: {
      required,
      emailRegex
    },
    password: {
      required,
      atLeastOneDigitValidation,
      atLeastOneLowerCaseValidation,
      atLeastOneUpperCaseValidation,
      passwordLengthValidation
    },
    password2: {
      required,
      sameAsPassword: sameAs("password")
    }
  }
};
</script>

<style scoped>
.sign-up {
  margin-top: 20vh
}
</style>
