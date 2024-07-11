import request from '@/utils/request'
export const GetArticleChannel = () => request.get('/my/cate/list')
export const AddArticleChannel = (data) => request.post('/my/cate/add', data)
export const UpdateArticleChannel = (data) => request.put('/my/cate/info', data)
export const DelArticleChannel = (id) =>
  request.delete('my/cate/del', {
    params: { id }
  })
export const getArticleList = (params) =>
  request.get('my/article/list', {
    params
  })
export const artPublishService = (data) => request.post('/my/article/add', data)
export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: { id }
  })
export const artEditService = (data) => request.put('/my/article/info', data)
