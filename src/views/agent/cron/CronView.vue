<template>
  <v-card :loading="loading" class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <cron-card v-for="cron in crons" :key="cron.id" :model-value="cron" @update="loadData" />

      <empty-info-card v-if="crons.length ===0" content="定时任务列表为空" />

    </div>

  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {Ref, ref} from "vue";
import {RecordModel} from "pocketbase";

import EmptyInfoCard from "@/components/EmptyInfoCard.vue";
import CronCard from "@/views/agent/cron/components/CronCard.vue";

const pocketbase = usePocketBase()
const loading = ref(true)
const crons: Ref<RecordModel[]> = ref([])

const loadData = async () => {
  loading.value = true
  pocketbase?.collection('cron')
      .getFullList()
      .then(list => {
        crons.value = list
      })
      .finally(() => {
        loading.value = false
      })
}


loadData()
</script>
<style scoped>

</style>