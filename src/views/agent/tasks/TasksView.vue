<template>
  <v-card :loading="loading" class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <task-card v-for="task in tasks" :key="task.id" :model-value="task" @update="loadTasks" />

      <empty-info-card v-if="tasks.length ===0" content="任务仓库为空"/>

    </div>

  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {Ref, ref} from "vue";
import {RecordModel} from "pocketbase";

import EmptyInfoCard from "@/components/EmptyInfoCard.vue";
import TaskCard from "@/views/agent/tasks/components/TaskCard.vue";


const pocketbase = usePocketBase()
const loading = ref(false)
const tasks: Ref<RecordModel[]> = ref([])


const loadTasks = async () => {
  loading.value = true
  await pocketbase?.collection('task')
      .getFullList()
      .then(list => {
        tasks.value = list
      })
  loading.value = false
}


await loadTasks()

</script>
<style scoped>

</style>