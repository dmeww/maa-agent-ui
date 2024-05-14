<template>
  <v-card :title="profile['name']"
          subtitle="配置名"
          class="my-1"
          elevation="0" border>
    <v-card-text>
      <v-list>

        <v-list-group value="1">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="连接配置"
                subtitle="connection"
            ></v-list-item>
          </template>
          <v-list-item
              v-for="subKey in Object.keys(profile['content']['connection'])"
              :key="subKey"
              :title="profileParamsKeyMap[subKey]"
              :subtitle="`${subKey} - ${profile['content']['connection'][subKey]}`"
              :value="subKey"
          ></v-list-item>

        </v-list-group>

        <v-list-group value="2">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="实例配置"
                subtitle="instance_options"
            ></v-list-item>
          </template>


          <v-list-item
              v-for="subKey in Object.keys(profile['content']['instance_options'])"
              :key="subKey"
              :title="profileParamsKeyMap[subKey]"
              :subtitle="`${subKey} - ${profile['content']['instance_options'][subKey]}`"
              :value="subKey"
          ></v-list-item>

        </v-list-group>

      </v-list>

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
          <v-card title="移除任务">
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
                  @click="()=>removeProfile(profile.id).then(()=>isActive.value = false)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">

import {profileParamsKeyMap} from "@/utils/tasks.ts";
import {RecordModel} from "pocketbase";
import {toast} from "@/toast";
import {ref} from "vue";
import {usePocketBase} from "@/pocketbase";

const emits = defineEmits(['update'])
defineProps({
  profile: {
    type: Object as () => RecordModel,
    required: true
  }
})
const loading = ref(false)
const pocketbase = usePocketBase()

const removeProfile = async (profileId: string) => {
  loading.value = true
  await pocketbase?.collection('profile')
      .delete(profileId)
      .then((result) => {
        if (result) {
          toast.success('删除成功')
        } else {
          toast.error('删除失败')
        }
      })
      .catch(err => {
        toast.error('删除失败' + err)
      })
  loading.value = false
  emits('update')
}


</script>
<style scoped>

</style>