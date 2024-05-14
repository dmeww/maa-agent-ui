<template>
  <v-card :loading="loading" class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <v-card v-for="cron in crons" :key="cron.id" :title="cron['name']" class="my-1" elevation="0" border>
        <v-card-text>
          <v-sheet >
            任务
            <v-chip label color="primary">
              {{cron['taskname']}}
            </v-chip>
            会在
            <v-chip label color="primary">
              {{cron['cron']}}
            </v-chip>
            执行
          </v-sheet>

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
              <v-card title="移除定时器">
                <v-card-text>
                  你确定要移除这个定时器吗?
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
                      @click="removeCron(cron.id).then(()=>{isActive.value = false})"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>

      <v-sheet v-if="crons.length ===0" style="font-size: 16px" class="d-flex align-center justify-center">
        <v-icon :size="32" class="pr-2">
          mdi-alert-circle-outline
        </v-icon>
        定时任务列表为空
      </v-sheet>

    </div>

  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {Ref, ref} from "vue";
import {RecordModel} from "pocketbase";
import {toast} from "@/toast";

const pocketbase = usePocketBase()
const loading = ref(true)
const crons: Ref<RecordModel[]> = ref([])

const loadData = async () => {
  loading.value = true
  pocketbase?.collection('cron')
      .getFullList()
      .then(list => {
        crons.value = list
      })
      .finally(() => {
        loading.value = false
      })
}

const removeCron = async (cronId: string) => {
  loading.value = true
  await pocketbase?.collection('cron')
      .delete(cronId)
      .then((result) => {
        if (result) {
          toast.success('删除成功')
        } else {
          toast.error('删除失败')
        }
      })
      .finally(()=>{
        loadData()
      })
  loading.value = false
}
loadData()
</script>
<style scoped>

</style>