<script setup lang="ts">

import AutoClickView from "@/views/maa/autoclick/components/AutoClickView.vue";
import {ref} from "vue";

const key = ref(1)

</script>

<template>

  <v-card class="w-100 h-100 pa-3 border overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <auto-click-view :key="key+''" @update="()=>key++"/>

    </div>
  </v-card>

</template>

<style scoped>

</style>