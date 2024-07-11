<script setup>
import { GetArticleChannel } from '@/api/article'
import { ref } from 'vue'
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getchannelList = async () => {
  const res = await GetArticleChannel()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getchannelList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
    style="width: 100px"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
