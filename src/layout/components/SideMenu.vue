<template>
  <v-navigation-drawer
      v-model="drawer"
      color="grey-lighten-4"
      border
      temporary >
    <v-list >
      <v-list-subheader>MAA</v-list-subheader>
      <v-list-item rounded="xl" prepend-icon="mdi-google-assistant" title="任务配置" @click="go('/')"></v-list-item>
<!--      <v-list-item rounded="xl" prepend-icon="mdi-motion-play-outline" title="自动抄作业" @click="go('/copilot')"></v-list-item>-->
      <v-list-subheader>Agent</v-list-subheader>
      <v-list-item rounded="xl" prepend-icon="mdi-piggy-bank" title="任务仓库" @click="go('/tasks')"></v-list-item>
      <v-list-item rounded="xl" prepend-icon="mdi-view-list-outline" title="执行队列" @click="go('/queue')"></v-list-item>
      <v-list-item rounded="xl" prepend-icon="mdi-math-log" title="任务日志" @click="go('/logs')"></v-list-item>
      <v-list-item rounded="xl" prepend-icon="mdi-timer-cog-outline" title="定时任务" @click="go('/cron')"></v-list-item>
      <v-list-item rounded="xl" prepend-icon="mdi-database-settings-outline" title="MAA配置" @click="go('/profiles')"></v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()
const drawer = defineModel<boolean>({required: true})

const go = (url: string) => {
  router.push({path: url})
}


</script>
