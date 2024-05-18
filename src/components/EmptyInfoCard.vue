<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<template>

  <v-alert
      :text="content"
      title="提示"
      type="info"
      variant="tonal"
  ></v-alert>

</template>

<style scoped>

</style>