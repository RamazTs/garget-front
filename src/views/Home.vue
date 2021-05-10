<template>
  <v-main>
    <v-dialog-transition :hide-on-leave="true">
      <router-view />
    </v-dialog-transition>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  computed: {}
};
</script>
