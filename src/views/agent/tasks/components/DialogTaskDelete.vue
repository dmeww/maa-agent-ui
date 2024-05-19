

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" variant="flat" rounded="md" color="red">
        移除
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="移除任务" :loading="loading">
        <v-card-text>
          你确定要移除这个任务吗?
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
              @click="()=>{removeTask(task.id).then(()=>isActive.value = false)}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import {toast} from "@/toast";
import {ref} from "vue";
import {usePocketBase} from "@/pocketbase";
import {TaskParam} from "@/utils/types.ts";

const emits = defineEmits(['update'])
defineProps({
  task: {
    type: Object as () => TaskParam,
    required: true
  }
})

const loading = ref(false)
const pocketbase = usePocketBase()

const removeTask = async (taskId: string) => {
  loading.value = true
  await pocketbase?.collection('task')
      .delete(taskId)
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

</script>
<style scoped>

</style>