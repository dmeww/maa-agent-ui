<template>
  <v-card class="w-100 h-100 pa-3 border overflow-y-auto"
          :loading="execList.length > 0 || loading"
          elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <v-card-text class="overflow-x-auto mb-2">
        <v-chip
            variant="flat"
            class="ma-1 pa-3"
            rounded
            :color="index===0?'green':'primary'"
            v-for="(exec,index) in execList"
            :key="exec.id">
          {{ exec['taskname'] || exec['taskid'] }}
        </v-chip>
      </v-card-text>

      <v-card v-if="execList.length > 0" title="运行日志" variant="outlined">
        <v-card-text >
          <v-divider class="mt-3 pb-3"/>

          <v-textarea :model-value="logString" class="px-2" variant="outlined" color="primary" auto-grow readonly/>

        </v-card-text>
      </v-card>

      <stop-task-button v-if="execList.length > 0" :show="execList.length > 0" :exec-id="execList[0].id"/>
      <empty-info-card v-else content="当前没有正在运行的任务"/>

    </div>
  </v-card>
</template>
<script setup lang="ts">

import {usePocketBase} from "@/pocketbase";
import {computed, onMounted, onUnmounted, Ref, ref} from "vue";
import {RecordModel} from "pocketbase";
import StopTaskButton from "@/views/agent/queue/components/StopTaskButton.vue";
import EmptyInfoCard from "@/components/EmptyInfoCard.vue";

const pocketbase = usePocketBase()
const execList: Ref<RecordModel[]> = ref([])
const logs: Ref<RecordModel[]> = ref([])
const logString = computed(() => {
  return logs.value.map(log => log['content']).join('')
})
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await pocketbase?.collection('exec')
      .getFullList()
      .then(list => {
        execList.value = list
      })
  await pocketbase?.collection('exec')
      .subscribe('*', () => {
        pocketbase?.collection('exec')
            .getFullList()
            .then(list => {
              execList.value = list
            })
            .then(() => {
              // TODO 新任务开始，清空旧任务日志
              logs.value = logs.value.filter(() => false)
            })
      })
  if (execList.value.length > 0) {
    await pocketbase?.collection('log')
        .getList(1, 9999, {
          filter: `execid='${execList.value[0].id}'`
        })
        .then(list => {
          logs.value = list.items
        })
  }

  await pocketbase?.collection('log')
      .subscribe("*", (e) => {
        if (execList.value.length && execList.value[0].id === e.record['execid']) {
          logs.value.push(e.record)
        }
      })
  loading.value = false
})

onUnmounted(() => {
  try {
    pocketbase?.collection('log').unsubscribe('*').catch(() => {
      console.log('not subscribing log')
    })
    pocketbase?.collection('exec').unsubscribe('*').catch(() => {
      console.log('not subscribing exec')
    })
  } catch (e) {
    console.log(JSON.stringify(e), e)
  }
})




</script>
<style scoped>

</style>