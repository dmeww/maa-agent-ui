<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn @click="showProfiles" v-bind="activatorProps" variant="flat" rounded="md" color="green">
        定时执行
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="定时任务(cron)" subtitle="设置时间" :loading="loading">
        <v-card-text class="d-flex flex-column align-center justify-center">

          <v-text-field v-model="cronName" label="定时器名字" variant="outlined" density="compact" width="200">
          </v-text-field>

          <v-select v-model="selectedProfileId"
                    :items="profiles"
                    variant="outlined"
                    item-title="name"
                    item-value="id"
                    density="compact" width="200"
                    label="选择配置"></v-select>

          <v-time-picker
              @update:modelValue="update"
              hide-header
              format="24hr"
              color="green-lighten-1"
          ></v-time-picker>

          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-sheet v-bind="activatorProps" class="d-flex justify-center align-center cursor-pointer">
                <v-sheet class="pa-3 ma-3" rounded="xl" border>{{ cron }}</v-sheet>
              </v-sheet>
            </template>

            <v-card title="手动设置:cron">
              <v-card-text>
                <v-text-field v-model="cron" variant="outlined" density="compact">
                </v-text-field>
              </v-card-text>
            </v-card>

          </v-dialog>


        </v-card-text>

        <v-card-actions class="pr-2">
          <v-spacer></v-spacer>
          <v-btn
              text="取消"
              @click="isActive.value = false"></v-btn>
          <v-btn
              text="确定"
              color="primary"
              variant="flat"
              @click="addCron(task.id,task['name']).then(()=>{isActive.value = false})"
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
import {VTimePicker} from "vuetify/labs/components";
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

const cronName = ref('')
const selectedProfileId = ref('')
const cron = ref('* * * * *')

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

const addCron = async (taskId: string, taskname: string) => {
  loading.value = true
  await pocketbase?.collection('cron')
      .create({
        name: cronName.value,
        profileid: selectedProfileId.value,
        taskid: taskId,
        cron: cron.value,
        taskname: taskname
      })
      .then(() => {
        toast.success('添加定时器成功')
      })
      .finally(() => {
        loading.value = false
      })

}

const update = (time: string) => {
  let [hour, minute] = time.split(':')
  cron.value = `${minute} ${hour} * * *`
}

</script>

<style scoped>

</style>