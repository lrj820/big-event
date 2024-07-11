<script setup>
import { GetArticleChannel, DelArticleChannel } from '../../api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'
const dialog = ref()
const loading = ref(false)
const channelList = ref([])
const getchannleList = async () => {
  loading.value = true
  const res = await GetArticleChannel()
  channelList.value = res.data.data
  loading.value = false
  console.log(channelList.value)
}
getchannleList()
const OnEdit = ($index, row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getchannleList()
}
const handleClick = async (row) => {
  ElMessageBox.confirm('确定要删除吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await DelArticleChannel(row.id)
  getchannleList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ $index, row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="OnEdit($index, row)"
          ></el-button>
          <el-button type="danger" :icon="Delete" circle plain @click="handleClick(row)">
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="description" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>
