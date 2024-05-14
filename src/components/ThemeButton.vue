<script setup lang="ts">
import {useTheme} from "vuetify";

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

<template>
  <v-btn rounded="xl"
         :icon="theme.global.current.value.dark?'mdi-brightness-4':'mdi-brightness-6'"
         @click="toggleTheme"
         variant="text"
  ></v-btn>
</template>

<style scoped>

</style>