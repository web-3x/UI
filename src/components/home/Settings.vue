<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

</script>

<template>
  <div class="container page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div @click="$router.go(-1)" class="van-nav-bar__left">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          ></i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">Cài đặt</div>
      </div>
    </div>
    <div class="items">
      <router-link to="/Infomation" class="item van-hairline--bottom">
        <div class="left">Thông tin cơ bản</div>
        <i class="van-icon van-icon-arrow"></i>
      </router-link>
      <router-link to="/SetLoginPassword" class="item van-hairline--bottom">
        <div class="left">Mật khẩu đăng nhập</div>
        <i class="van-icon van-icon-arrow"></i>
      </router-link>
      <router-link to="/EditPayPassword" class="item van-hairline--bottom">
        <div class="left">Mật khẩu rút tiền</div>
        <div class="right">
          <span class="desc">{{ userInfo.isSetPayPass ? "Đã được chuẩn bị": "Không được thiết lập"}}</span
          ><i class="van-icon van-icon-arrow"></i>
        </div>
      </router-link>
      <router-link to="/Language" class="item van-hairline--bottom">
        <div class="left">Ngôn ngữ</div>
        <div class="right">
          <i class="van-icon van-icon-arrow"></i>
        </div>
      </router-link>
    </div>
    <button class="sign-out van-button van-button--normal" @click="userStore.logout">
      <div class="van-button__content">
        <span class="van-button__text">Đăng xuất</span>
      </div>
    </button>
  </div>
</template>
<style scoped>
a {
  color: black;
}
</style>
