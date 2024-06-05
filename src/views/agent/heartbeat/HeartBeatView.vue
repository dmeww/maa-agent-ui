<template>

  <v-card :loading="loading" class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">

      <v-data-table :items="tablist"></v-data-table>

    </div>
  </v-card>

</template>
<script setup lang="ts">

import {Ref, ref} from "vue";
import {usePocketBase} from "@/pocketbase";

const loading = ref(true)
const tablist: Ref<Hearbeat[]> = ref([])


const pocketbase = usePocketBase()

const calc = (last: string) => {
  const currentTime = new Date().getTime();
  const targetTime = new Date(last).getTime();
  const timeDiff = currentTime - targetTime;
  if (timeDiff > 86400000) { // 大于 1 天
    const days = Math.floor(timeDiff / 86400000) + 1
    return days === 1 ? '1 天前' : `${days} 天前`;
  } else if (timeDiff > 3600000) { // 大于 1 小时
    const hours = Math.floor(timeDiff / 3600000) + 1
    return hours === 1 ? '1 小时前' : `${hours} 小时前`;
  } else if (timeDiff > 60000) { // 大于 1 分钟
    const minutes = Math.floor(timeDiff / 60000) + 1
    return minutes === 1 ? '1 分钟前' : `${minutes} 分钟前`;
  } else { // 小于 1 分钟
    let seconds = Math.floor(timeDiff / 1000) + 1
    return seconds === 1 ? '1 秒前' : `${seconds} 秒前`;
  }
}


const load = async () => {
  loading.value = true
  await pocketbase?.collection('heartbeat')
      .getFullList()
      .then(list => {
        console.log(list)
        tablist.value = []
        list.forEach(item => tablist.value.push({
          id: item.id,
          name: item['agent'],
          active: `活跃于 ${calc(item.updated)}`
        } as Hearbeat))
      })
      .finally(() => {
        loading.value = false
      })
}
await load()
await pocketbase?.collection('heartbeat')
    .subscribe("*", () => {
      console.log('onUpdate')
      load()
    })
    .catch(err => {
      console.log(err)
    })

setTimeout(()=>{
  load()
},30000)

interface Hearbeat {
  name: string,
  id: string,
  active: string
}

</script>
<style scoped>

</style>