<script setup lang="ts">

import {onMounted, ref} from "vue";
import {toast} from "@/toast";

const theme = ref('')
const primaryColor = ref('')

const themes = [
  {
    label: 'Material 1',
    value: 'md1'
  },
  {
    label: 'Material 2',
    value: 'md2'
  },
  {
    label: 'Material 3',
    value: 'md3'
  },
]

function toggleTheme() {
  localStorage.setItem('theme', theme.value)
  localStorage.setItem('pk_color',primaryColor.value)
  toast.success('修改成功')
  location.reload()
}

onMounted(() => {
  let local = localStorage.getItem('theme')
  theme.value = local || 'md1'
})


</script>

<template>

  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn rounded="xl"
             icon="mdi-palette"
             v-bind="activatorProps"
             variant="text"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="主题" rounded>
        <v-card-text>

          <v-select v-model="theme" variant="outlined" :items="themes" item-title="label" item-value="value"
                    class="mx-auto">
          </v-select>

          <v-color-picker v-model="primaryColor" class="mx-auto" hide-canvas hide-inputs show-swatches></v-color-picker>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="取消"
              rounded
              @click="isActive.value = false"
          ></v-btn>

          <v-btn
              text="确定"
              rounded
              color="primary"
              variant="tonal"
              @click="()=>{toggleTheme();isActive.value = false;}"
          ></v-btn>

        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>