<template>
  <v-card :loading="loading" class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <log-card v-for="history in histories" :key="history.id" :model-value="history" />

    <empty-info-card v-if="histories.length ===0" content="任务日志记录为空" />

    </div>

  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {Ref, ref} from "vue";
import {RecordModel} from "pocketbase";

import EmptyInfoCard from "@/components/EmptyInfoCard.vue";
import LogCard from "@/views/agent/logs/components/LogCard.vue";


const pocketbase = usePocketBase()
const loading = ref(false)
const histories: Ref<RecordModel[]> = ref([])


const loadTasks = async () => {
  loading.value = true
  await pocketbase?.collection('history')
      .getFullList()
      .then(list => {
        histories.value = list
      })
  loading.value = false
}




await loadTasks()

</script>
<style scoped>

</style>