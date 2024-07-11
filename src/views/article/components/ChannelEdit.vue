<script setup>
import { ref } from 'vue'
import { UpdateArticleChannel, AddArticleChannel } from '@/api/article'
import { ElMessage } from 'element-plus'
const formref = ref()
const fromModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是 1-15 位的字母或数字',
      trigger: 'blur'
    }
  ]
}
const dialogVisible = ref(false)
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  fromModel.value = { ...row }
}
defineExpose({
  open
})
const Emit = defineEmits(['success'])
const onSuccess = async () => {
  await formref.value.validate()
  const isEdit = fromModel.value.id
  if (isEdit) {
    await UpdateArticleChannel(fromModel.value)
    ElMessage({
      message: '编辑成功',
      type: 'success'
    })
  } else {
    await AddArticleChannel(fromModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  Emit('success')
}
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="fromModel.id ? '编辑分类' : '添加分类'" width="500">
    <el-form ref="formref" :model="fromModel" :rules="rules">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="fromModel.cate_name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="fromModel.cate_alias" placeholder="请输入别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSuccess"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
