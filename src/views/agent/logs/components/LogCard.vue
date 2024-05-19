<script setup lang="ts">

import {toast} from "@/toast";
import {ref} from "vue";
import {usePocketBase} from "@/pocketbase";
import {TaskParam} from "@/utils/types.ts";

const emits = defineEmits(['update'])
const history = defineModel({
  type: Object as () => TaskParam,
  required: true
})
const loading = ref(false)
const pocketbase = usePocketBase()
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
        emits('update')
        loading.value = false
      })
}


const formatDate = (dateInt: string) => {
  const date = new Date(dateInt)
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}:${(date.getSeconds() + '').padStart(2, '0')}`
}

</script>

<template>
  <v-card :title="history['taskname']"
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
</template>

<style scoped>

</style>