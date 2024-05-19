<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <teleport to="#app">
        <v-btn v-bind="activatorProps" color="primary"
               density="default"
               icon="mdi-plus"
               rounded="xxl"
               style="position:absolute; bottom: 24px;right: 24px">
        </v-btn>
      </teleport>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="新建配置(Profile)" :loading="loading">
        <v-card-text class="overflow-y-auto">

          <v-text-field v-model="profileName" label="预设名(不建议重名)"
                        variant="outlined"
                        rounded="lg"
                        color="primary"
                        density="compact"></v-text-field>
          <v-sheet>
            <div class="pb-2">连接配置</div>
            <param-detail v-for="param in newProfiles.connection.params" :param="param"/>
          </v-sheet>

          <v-sheet>
            <div class="pb-2">实例配置</div>
            <param-detail v-for="param in newProfiles.instance_options.params" :param="param"/>
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
              @click="()=>{submitProfile().finally(()=>isActive.value = false)}"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>
<script setup lang="ts">

import ParamDetail from "@/views/maa/autoclick/components/ParamDetail.vue";
import {usePocketBase} from "@/pocketbase";
import {ref} from "vue";
import {Profiles, TaskParam} from "@/utils/types.ts";
import {toast} from "@/toast";

const pocketbase = usePocketBase()
const loading = ref(false)
const newProfiles = ref(new Profiles())
const profileName = ref('')

const emits = defineEmits(['update'])

const submitProfile = async () => {
  loading.value = true
  let profile = {
    connection: newProfiles.value.connection.params.reduce((obj: TaskParam, param) => {
      if (param.value !== param.default) {
        obj[param.key] = param.value
      }
      return obj
    }, {}),
    instance_options: newProfiles.value.instance_options.params.reduce((obj: TaskParam, param) => {
      if (param.value !== param.default) {
        obj[param.key] = param.value
      }
      return obj
    }, {})
  }
  await pocketbase?.collection('profile')
      .create({
        name: profileName.value,
        content: profile
      })
      .then(() => {
        toast.success('添加成功')
      })
      .catch(err => {
        toast.error('添加失败' + err)
      })
  emits('update')
}


</script>
<style scoped>

</style>