<template>
  <v-card class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <v-card v-for="task in tasks" :key="task.id"
              :title="task['name']"
              subtitle="任务名"
              class="my-1"
              :style="{maxWidth:'900px',width:'calc(100% )'}"
              elevation="0"
              border>
        <v-card-text>

          <v-chip-group  mandatory show-arrows variant="outlined" color="green" >

            <v-chip v-for="sub in task['content']['tasks']" :key="sub['type']"
                    color="green"
                    rounded
                    class="mx-1 my-1 cursor-pointer w-auto">
              {{ TaskParamKeyMap[sub['type']] }}
              <div>
                {{ sub['params'] }}
              </div>
            </v-chip>
          </v-chip-group>


        </v-card-text>
        <v-card-actions>
          <v-spacer/>

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
        </v-card-actions>
      </v-card>

      <empty-info-card v-if="tasks.length ===0" content="任务仓库为空"/>

    </div>

  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {Ref, ref} from "vue";
import {RecordModel} from "pocketbase";
import {TaskParamKeyMap} from '@/utils/tasks'
import {toast} from "@/toast";
import {VTimePicker} from "vuetify/labs/components";
import EmptyInfoCard from "@/components/EmptyInfoCard.vue";


const pocketbase = usePocketBase()
const loading = ref(false)
const tasks: Ref<RecordModel[]> = ref([])
const profiles: Ref<RecordModel[]> = ref([])
const selectedProfileId = ref()

const cron = ref('* * * * *')
const cronName = ref('')

const update = (time: string) => {
  let [hour, minute] = time.split(':')
  cron.value = `${minute} ${hour} * * *`
}

const loadTasks = async () => {
  await pocketbase?.collection('task')
      .getFullList()
      .then(list => {
        tasks.value = list
      })
}

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
        loading.value = false
        loadTasks()
      })
}

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


await loadTasks()

</script>
<style scoped>

</style>