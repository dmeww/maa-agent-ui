<template>
  <v-navigation-drawer
      v-model="drawer"
      border
      temporary>
    <v-list border>
      <v-list-subheader color="primary">MAA</v-list-subheader>
      <v-list-item rounded="xl" title="任务配置" @click="go('/')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-apps
          </v-icon>
        </template>
      </v-list-item>
      <v-list-subheader color="primary">Agent</v-list-subheader>
      <v-list-item rounded="xl" title="活跃状态" @click="go('/heartbeat')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-atom
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item rounded="xl" title="任务仓库" @click="go('/tasks')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-piggy-bank
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item rounded="xl" title="执行队列"
                   @click="go('/queue')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-view-list-outline
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item rounded="xl" title="任务日志" @click="go('/logs')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-math-log
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item rounded="xl" title="定时任务"
                   @click="go('/cron')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-timer-cog-outline
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item rounded="xl" prepend-icon="" title="MAA配置"
                   @click="go('/profiles')">
        <template v-slot:prepend>
          <v-icon color="primary">
            mdi-database-settings-outline
          </v-icon>
        </template>
      </v-list-item>

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
