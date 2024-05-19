<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()


</script>

<template>
  <v-empty-state
      headline="404"
      text="点击返回上一页"
      image="/logo.svg">
    <v-btn icon="mdi-chevron-left" @click="()=>router.back()">
    </v-btn>
  </v-empty-state>
</template>

<style scoped>

</style>