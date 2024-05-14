<template>

  <string-param-detail v-if="param.type === 'string'" :param="param"/>
  <boolean-param-detail v-else-if="param.type === 'boolean'" :param="param"/>
  <number-param-detail v-else-if="param.type==='number'" :param="param"/>
  <select-param-detail v-else-if="param.type === 'select'" :param="param"/>

</template>
<script setup lang="ts">
import BooleanParamDetail from "@/views/maa/autoclick/components/params/BooleanParamDetail.vue";
import StringParamDetail from "@/views/maa/autoclick/components/params/StringParamDetail.vue";
import NumberParamDetail from "@/views/maa/autoclick/components/params/NumberParamDetail.vue";
import {TaskItemParam} from "@/utils/types.ts";
import SelectParamDetail from "@/views/maa/autoclick/components/params/SelectParamDetail.vue";

defineProps({
  param: {
    type: Object as () => TaskItemParam,
    required: true
  }
})
</script>
<style scoped>

</style>