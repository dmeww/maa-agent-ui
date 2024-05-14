<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <teleport to="#app">
        <v-btn v-if="show"
               v-bind="activatorProps" color="red"
               density="default"
               icon="mdi-close"
               size="large"
               rounded="xxl"
               style="position:absolute; bottom: 24px;right: 24px">
        </v-btn>
      </teleport>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="停止当前任务" :loading="loading">
        <v-card-text>
          <v-sheet>
            你确定要停止吗
          </v-sheet>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="取消"
              @click="isActive.value = false"
          ></v-btn>
          <v-btn
              color="primary"
              variant="flat"
              text="确定"
              @click="()=>{stopCurrentTask().finally(()=>isActive.value = false)}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">

import {ref} from "vue";
import {usePocketBase} from "@/pocketbase";
import {toast} from "@/toast";

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  execId: {
    type: String,
    required: true
  }
})

const loading = ref(false)
const pocketbase = usePocketBase()

const stopCurrentTask = async () => {
  loading.value = true
  pocketbase?.collection('exec')
      .delete(props.execId)
      .then(result => {
        if (result) {
          toast.success('停止任务成功')
        } else {
          toast.error('停止任务失败')
        }
      })
      .catch(err => {
        toast.error('停止任务失败' + err)
      })
      .finally(() => {
        loading.value = false
      })

}

</script>
<style scoped>

</style>