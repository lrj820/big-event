<script setup>
import {
  CaretBottom,
  UserFilled,
  Mug,
  EditPen,
  SwitchButton,
  Management,
  Promotion,
  User,
  Crop
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { userUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = userUserStore()
onMounted(() => {
  userStore.getUser()
})
const handlecommand = (key) => {
  if (key === 'logout') {
    userStore.removeToken()
    userStore.setuser({})
    router.push('/login')
  } else {
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <el-container class="common-layout">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>

        <el-sub-menu index="/user">
          <!-- 多级菜单的标题 - 具名插槽 title -->
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>

          <!-- 展开的内容 - 默认插槽 -->
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div>
          程序员：<strong>{{ userStore.user.username }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handlecommand">
          <span class="el-dropdown-link">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile"
                ><el-icon><UserFilled /></el-icon>基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar"
                ><el-icon><Mug /></el-icon>更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password"
                ><el-icon><EditPen /></el-icon>重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout"
                ><el-icon><SwitchButton /></el-icon>退出登陆</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2024 Created by lrj</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }
      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
