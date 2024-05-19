<script setup lang="ts">

import {TaskParamKeyMap} from "@/utils/tasks.ts";
import {TaskParam} from "@/utils/types.ts";
import DialogTaskExec from "@/views/agent/tasks/components/DialogTaskExec.vue";
import DialogTaskDelete from "@/views/agent/tasks/components/DialogTaskDelete.vue";
import DialogTaskCron from "@/views/agent/tasks/components/DialogTaskCron.vue";

const task = defineModel({
  type: Object as () => TaskParam,
  required: true
})

const emits = defineEmits(['update'])

</script>

<template>
  <v-card :title="task['name']"
          subtitle="任务名"
          class="my-1"
          :style="{maxWidth:'900px',width:'calc(100% )'}"
          elevation="0"
          border>
    <v-card-text>

      <v-chip-group mandatory show-arrows variant="outlined" color="green">
        <v-chip v-for="sub in task['content']['tasks']" :key="sub['type']"
                color="green"
                rounded
                class="mx-1 my-1 cursor-pointer w-auto">
          {{ TaskParamKeyMap[sub['type']] }}
          <div>
            {{ sub['params'] }}
          </div>
        </v-chip>
      </v-chip-group>

    </v-card-text>
    <v-card-actions>
      <v-spacer/>

      <dialog-task-cron :task="task"/>

      <dialog-task-exec :task="task"/>

      <dialog-task-delete :task="task" @update="emits('update')"/>

    </v-card-actions>
  </v-card>

</template>

<style scoped>

</style>