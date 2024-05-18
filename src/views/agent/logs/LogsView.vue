<template>
  <v-card class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <v-card v-for="history in histories" :key="history.id"
              :title="history['taskname']"
              subtitle="任务名"
              class="my-1"
              :style="{maxWidth:'900px',width:'calc(100% )'}"
              elevation="0"
              border>
        <v-card-text>

          <v-list>

            <v-list-group value="详情">
              <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-details"
                    :title="`详情 - 完成于${formatDate(history.created)}`"
                ></v-list-item>
              </template>
              <v-textarea :model-value="history['summary']" variant="outlined" auto-grow readonly/>
            </v-list-group>

          </v-list>

        </v-card-text>
        <v-card-actions>
          <v-spacer/>

          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" variant="flat" rounded="md" color="red">
                移除
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="移除日志" :loading="loading">
                <v-card-text>
                  你确定要移除这个日志吗?
                </v-card-text>

                <v-card-actions class="pr-2">
                  <v-spacer></v-spacer>
                  <v-btn
                      text="取消"
                      @click="isActive.value = false"
                  ></v-btn>
                  <v-btn
                      text="确定"
                      color="primary"
                      variant="flat"
                      @click="()=>{removeHistory(history.id).then(()=>isActive.value = false)}"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>

    <empty-info-card v-if="histories.length ===0" content="任务日志记录为空" />

    </div>

  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {Ref, ref} from "vue";
import {RecordModel} from "pocketbase";
import {toast} from "@/toast";
import EmptyInfoCard from "@/components/EmptyInfoCard.vue";


const pocketbase = usePocketBase()
const loading = ref(false)
const histories: Ref<RecordModel[]> = ref([])


const loadTasks = async () => {
  await pocketbase?.collection('history')
      .getFullList()
      .then(list => {
        histories.value = list
      })
}

const removeHistory = async (historyId: string) => {
  loading.value = true
  await pocketbase?.collection('history')
      .delete(historyId)
      .then(result => {
        if (result) {
          toast.success('移除成功')
        } else {
          toast.error('移除失败')
        }
      })
      .finally(() => {
        loading.value = false
        loadTasks()
      })
}


const formatDate = (dateInt: string) => {
  const date = new Date(dateInt)
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}:${(date.getSeconds() + '').padStart(2, '0')}`
}


await loadTasks()

</script>
<style scoped>

</style>