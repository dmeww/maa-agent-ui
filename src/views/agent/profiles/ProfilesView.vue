<template>
  <v-card :loading="loading" class="w-100 h-100 pa-3 border  overflow-y-auto" elevation="0">
    <div class=" pb-5"
         :style="{width: $vuetify.display.mobile?`${$vuetify.display.width>900?844:($vuetify.display.width -56)}px`:'100%',maxWidth:'900px'}">


      <profile-card
          v-for="profile in profiles"
          :key="profile.id"
          :profile="profile"
          @update="loadProfiles"/>


      <v-sheet v-if="profiles.length ===0" style="font-size: 16px" class="d-flex align-center justify-center">
        <v-icon :size="32" class="pr-2">
          mdi-alert-circle-outline
        </v-icon>
        MAA预设为空
      </v-sheet>

      <dialog-create-profile @update="loadProfiles" />

    </div>
  </v-card>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/pocketbase";
import {ref, Ref} from "vue";
import {RecordModel} from "pocketbase";

import ProfileCard from "@/views/agent/profiles/components/ProfileCard.vue";
import DialogCreateProfile from "@/views/agent/profiles/components/DialogCreateProfile.vue";

const pocketbase = usePocketBase()

const profiles: Ref<RecordModel[]> = ref([])
const loading = ref(false)


const loadProfiles = async () => {
  loading.value = true
  await pocketbase?.collection('profile')
      .getFullList()
      .then(list => {
        console.log('getFullProfiles', list)
        profiles.value = list
      })
  loading.value = false
}


loadProfiles()
</script>
<style scoped>

</style>