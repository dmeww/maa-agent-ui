

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" @click="showProfiles" variant="flat" rounded="md" color="primary">
        执行
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="执行任务" subtitle="选择任务的连接配置" :loading="loading">
        <v-card-text>

          <v-select v-model="selectedProfileId"
                    :items="profiles"
                    variant="outlined"
                    item-title="name"
                    item-value="id"
                    label="连接配置"></v-select>

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
              @click="()=>{execTask(task.id,task['name']).then(()=>isActive.value = false)}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">

import {toast} from "@/toast";
import {Ref, ref, UnwrapRef} from "vue";
import {usePocketBase} from "@/pocketbase";
import {TaskParam} from "@/utils/types.ts";

defineProps({
  task: {
    type: Object as () => TaskParam,
    required: true
  }
})

const loading = ref(false)
const pocketbase = usePocketBase()
const profiles: Ref<UnwrapRef<any[]>> = ref([])
const selectedProfileId = ref('')

const showProfiles = async () => {
  loading.value = true
  await pocketbase?.collection('profile')
      .getFullList()
      .then(list => {
        profiles.value = list
      })
      .catch(err => {
        toast.error('获取Profiles错误' + err)
      })
      .finally(() => {
        loading.value = false
      })
}


const execTask = async (taskId: string, taskName: string) => {
  loading.value = true
  await pocketbase?.collection('exec')
      .create({
        taskid: taskId,
        taskname: taskName,
        profileid: selectedProfileId.value
      })
      .then(() => {
        toast.success('提交成功，请查看执行队列')
      })
      .catch(err => {
        toast.error('提交失败' + err)
      })
  loading.value = false
}


</script>
<style scoped>

</style>