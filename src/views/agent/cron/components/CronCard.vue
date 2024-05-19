<script setup lang="ts">

import {TaskParam} from "@/utils/types.ts";
import {toast} from "@/toast";
import {ref} from "vue";
import {usePocketBase} from "@/pocketbase";

const emits = defineEmits(['update'])
const cron = defineModel<TaskParam>({
  required: true
})
const loading = ref(false)
const pocketbase = usePocketBase()
const removeCron = async (cronId: string) => {
  loading.value = true
  await pocketbase?.collection('cron')
      .delete(cronId)
      .then((result) => {
        if (result) {
          toast.success('删除成功')
        } else {
          toast.error('删除失败')
        }
      })
      .finally(()=>{
        emits('update')
      })
  loading.value = false
}

</script>

<template>
  <v-card :key="cron.id" :title="cron['name']" class="my-1" elevation="0" border>
    <v-card-text>
      <v-sheet>
        任务
        <v-chip label color="primary">
          {{ cron['taskname'] }}
        </v-chip>
        会在
        <v-chip label color="primary">
          {{ cron['cron'] }}
        </v-chip>
        执行
      </v-sheet>

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
          <v-card title="移除定时器">
            <v-card-text>
              你确定要移除这个定时器吗?
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
                  @click="removeCron(cron.id).then(()=>{isActive.value = false})"
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