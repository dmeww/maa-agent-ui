<template>

  <v-tabs-window-item :value="value">

    <v-sheet class="d-flex flex-column justify-center pa-3" border>

      <v-sheet class="pb-3">
        {{ task.label }}
      </v-sheet>

      <v-sheet class="pb-1">
        <v-switch v-model="task.checked" inset hide-details color="primary" base-color="secondary"
                  :label="task.checked?'启用':'未启用'"></v-switch>
      </v-sheet>


      <v-sheet v-for="param in task.params" :key="param.key">
        <param-detail :param="param"/>
      </v-sheet>


    </v-sheet>
  </v-tabs-window-item>
</template>
<script setup lang="ts">

import {TaskItem} from "@/utils/types.ts";
import ParamDetail from "@/views/maa/autoclick/components/ParamDetail.vue";



defineProps({
  value: {
    type: String,
    required: true
  }
})


const task = defineModel<TaskItem>({required: true})



</script>
<style scoped>

</style>