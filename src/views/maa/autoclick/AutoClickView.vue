<template>
  <v-card class="w-100 h-100 pa-3 border overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <v-sheet class="mb-2" >
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
              @update:checked="(checked:boolean) => checkTask(checked,index,task.key)"
              :value="task.key"/>

        </v-tabs-window>
      </div>


      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <teleport to="#app">
            <v-btn v-if="checkedTasks.length > 0"
                   v-bind="activatorProps" color="primary"
                   density="default"
                   icon="mdi-content-save-outline"
                   size="large"
                   rounded="xxl"
                   style="position:absolute; bottom: 24px;right: 24px">
            </v-btn>
          </teleport>
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


    </div>
  </v-card>
</template>
<script lang="ts" setup>

import {reactive, Ref, ref} from "vue";
import {Item, Task, TaskParam} from "@/utils/types.ts";
import {taskList} from "@/utils/tasks.ts";
import TaskDetail from "@/views/maa/autoclick/components/TaskDetail.vue";
import {usePocketBase} from "@/pocketbase";
import PocketBase from "pocketbase";
import {toast} from "@/toast";

const tab = ref('')
const loading = ref(false)
const pocketbase = usePocketBase() as PocketBase
const tasks: Item[] = reactive(taskList)
const checkedTasks: Ref<Item[]> = ref([])
const taskName = ref('')

const checkTask = (checked: boolean, index: number, key: string) => {
  if (checked) {
    checkedTasks.value.push(tasks[index])
  } else {
    checkedTasks.value = checkedTasks.value.filter(task => task.key !== key)
  }
}

const submitTask = async () => {
  loading.value = true
  await pocketbase.collection('task')
      .create({
        name: taskName.value,
        content: {
          tasks: checkedTasks.value.map(task => new class implements Task {
            type = task.key
            params = task.params.reduce((obj: TaskParam, param) => {
              if (param.value !== param.default)
                obj[param.key] = param.value;
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