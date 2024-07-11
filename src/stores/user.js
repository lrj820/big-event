import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserInfoService } from '@/api/user'
export const userUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await UserInfoService()
      user.value = res.data.data
    }
    const setuser = (obj) => {
      user.value = obj
    }

    return {
      setuser,
      getUser,
      token,
      setToken,
      removeToken,
      user
    }
  },
  {
    persist: true
  }
)
