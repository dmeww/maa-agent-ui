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
  <v-select v-model="param.value"
            :label="param.label"
            :items="param.select || []"
            item-title="label"
            item-value="value"
            variant="outlined"
            rounded="lg"
            color="primary"
            density="compact"></v-select>
</template>

<style scoped>

</style>