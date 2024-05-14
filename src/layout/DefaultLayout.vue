<template>

  <v-card class="h-100">
    <v-layout class="h-100">
      <v-app-bar
          color="primary">

        <v-app-bar-nav-icon rounded="xl" variant="text" @click.stop="drawer = !drawer">
          <v-icon icon="mdi-hexagon-slice-6"></v-icon>

        </v-app-bar-nav-icon>

        <v-toolbar-title>{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <theme-button />

        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn rounded="lg"
                   icon="mdi-dots-vertical"
                   variant="text"
                   v-bind="props"
            ></v-btn>
          </template>

          <v-list rounded="lg">
            <v-list-item rounded="lg"
                         append-icon="mdi-location-exit"
                         title="退出登录" @click="logout"></v-list-item>
          </v-list>

        </v-menu>

      </v-app-bar>

      <side-menu v-model="drawer"/>

      <v-main class="h-100" style="max-width: 900px;margin: 0 auto;">
        <v-card-text class="h-100">
          <router-view/>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>

</template>
<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import SideMenu from "@/layout/components/SideMenu.vue";
import {logout, usePocketBase} from "@/pocketbase";
import {useRoute} from "vue-router";
import ThemeButton from "@/components/ThemeButton.vue";

const title = ref('MAA Agent')
const drawer = ref(false)
let pocketBase = usePocketBase()
console.log('loginValid', pocketBase?.authStore.isValid);

const route = useRoute()

watch(route,()=>{
  if (route.meta.title){
    title.value = route.meta.title as string
  }
})

onMounted(()=>{
  if (route.meta.title){
    title.value = route.meta.title as string
  }
})

</script>
<style scoped>

</style>