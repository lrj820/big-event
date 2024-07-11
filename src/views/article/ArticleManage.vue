<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { ref } from 'vue'
import { getArticleList } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

const available = ref()
const loading = ref(false)
const total = ref(0)
const getchannelList = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const getArticlelist = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  getchannelList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticlelist()

const OnEdit = (row) => {
  available.value.open(row)
  console.log(row)
}
const handleClick = (row) => {
  console.log(row)
}
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticlelist()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticlelist()
}
const onSearch = () => {
  params.value.pagenum = 1
  getArticlelist()
}
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticlelist()
}

const Addarticle = () => {
  available.value.open({})
}
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticlelist()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="Addarticle">添加文章</el-button>
    </template>

    <el-form inline>
      <el-form-item label="文章分类:">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state" style="width: 100px">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="getchannelList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle plain @click="OnEdit(row)"></el-button>
          <el-button type="danger" :icon="Delete" circle plain @click="handleClick(row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 3, 5, 7]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <ArticleEdit ref="available" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
