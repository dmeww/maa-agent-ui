<script setup lang="ts">
import {TaskItemParam} from "@/utils/types.ts";

defineProps({
  param: {
    type: Object as () => TaskItemParam,
    required: true
  }
})


</script>

<template>
  <v-text-field v-model="param.value" :label="param.label"
                variant="outlined"
                rounded="lg"
                color="primary"
                density="compact"></v-text-field>
</template>

<style scoped>

</style>