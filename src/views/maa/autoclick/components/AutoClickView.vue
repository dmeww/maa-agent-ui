<template>

  <v-sheet class="mb-2">
    已选任务
    <v-chip-group>
      <v-chip
          class="ma-2"
          color="primary"
          variant="flat"
          v-for="task in checkedTasks"
          :key="task.key"
          label>
        {{ task.label }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
  <div :style="{display: $vuetify.display.mobile?undefined:'flex'}">
    <v-tabs
        v-model="tab"
        color="primary"
        class="border"
        :show-arrows="$vuetify.display.mobile"
        :direction="$vuetify.display.mobile?'horizontal': 'vertical'">
      <v-tab prepend-icon="mdi-adjust"
             v-for="task in tasks"
             :text="task.label"
             :key="task.key"
             :class="task.checked?'selected':''"
             :value="task.key"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" :class="`w-100 ${$vuetify.display.mobile?'':'ml-1'}`">

      <task-detail
          v-for="(task,index) in tasks"
          :key="task.key"
          v-model="tasks[index]"
          :value="task.key"/>

    </v-tabs-window>
  </div>

  <v-dialog max-width="500" key="1">
    <template v-slot:activator="{ props: dialogProps }">
      <v-speed-dial
          location="top center"
          transition="fade-transition">
        <template v-slot:activator="{ props: activatorProps }">
          <v-fab
              v-bind="activatorProps"
              rounded="pill"
              icon="mdi-check-circle"
              :style="{position:'absolute',bottom: '32px',right: '64px'}"
          ></v-fab>
        </template>

        <v-btn
            v-bind="dialogProps"
            key="1"
            color="primary"
            icon="mdi-content-save-outline">
        </v-btn>


        <v-btn
            key="2"
            color="success"
            icon="mdi-refresh"
            @click="()=>{emits('update')}">
        </v-btn>
      </v-speed-dial>

    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="保存任务" :loading="loading">
        <v-card-text>

          <v-text-field v-model="taskName"
                        label="任务名"
                        variant="outlined"
                        rounded="lg"
                        color="primary"
                        density="compact"
                        hide-details></v-text-field>

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
              @click="()=>{submitTask().finally(()=>isActive.value = false)}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>


</template>
<script lang="ts" setup>

import {computed, ComputedRef, reactive, ref} from "vue";
import {TaskItem, Task, TaskParam} from "@/utils/types.ts";
import {SampleTaskList} from "@/utils/tasks.ts";
import TaskDetail from "@/views/maa/autoclick/components/TaskDetail.vue";
import {usePocketBase} from "@/pocketbase";
import PocketBase from "pocketbase";
import {toast} from "@/toast";

const emits = defineEmits(['update'])

const tab = ref('')
const loading = ref(false)
const pocketbase = usePocketBase() as PocketBase
const tasks: TaskItem[] = reactive(JSON.parse(JSON.stringify(SampleTaskList)))
const taskName = ref('')

const checkedTasks: ComputedRef<TaskItem[]> = computed(() => {
  return tasks.filter(task => task.checked)
})


const submitTask = async () => {
  loading.value = true
  await pocketbase.collection('task')
      .create({
        name: taskName.value,
        content: {
          tasks: checkedTasks.value.map(task => new class implements Task {
            type = task.key
            params = task.params.reduce((obj: TaskParam, param) => {
              // 类型不能错，否则任务会按默认值走
              if (param.value !== param.default) {
                if (param.type === 'number') {
                  obj[param.key] = Number(param.value)
                } else if (param.type === "boolean") {
                  obj[param.key] = Boolean(param.value)
                } else {
                  obj[param.key] = param.value;
                }
              }
              return obj;
            }, {})
          })
        }
      })
      .then((record) => {
        toast.success('保存成功')
        console.log(record)
      })
      .finally(() => {
        loading.value = false
      })
}


</script>
<style scoped>

/*noinspection ALL*/
.selected {
  background-color: rgb(var(--v-theme-primary));
  color: white !important;
}

.relative {
  position: relative;
}

</style>