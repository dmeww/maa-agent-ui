<template>


  <v-sheet :height="40"
           rounded="lg"
           border
           class="d-flex align-center justify-space-between item"
  >
    <div class="label" v-tooltip="param.label">
      {{ param.label.substring(0, 10) }}
    </div>
    <v-switch v-model="param.value" inset hide-details color="primary" base-color="secondary"
              style="margin-right: 8px"></v-switch>
  </v-sheet>

</template>
<script setup lang="ts">

import {Param} from "@/utils/types.ts";

defineProps({
  param: {
    type: Object as () => Param,
    required: true
  }
})

</script>
<style scoped>
/*noinspection CssUnresolvedCustomProperty,CssInvalidFunction*/
.item {
  margin-bottom: 22px;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
}
/*noinspection CssUnresolvedCustomProperty,CssInvalidFunction*/
.label {
  font-size: 16px;
  padding-left: 16px;
  font-weight: 400;
  color: inherit;
  opacity: var(--v-medium-emphasis-opacity);
}
</style>