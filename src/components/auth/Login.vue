<script setup>
import { ref, reactive } from "vue";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";
import { showFailToast } from "vant";

import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
 
const router = useRouter();
const userStore = useUserStore();

const loginData = reactive({
  username: "",
  password: "",
});

const showPassword = ref(false);

function submitLogin() {
  handleRequest(axios.post(API.LOGIN, loginData)).then((res) => {
    if(res.success) {
      userStore.login(res.data)
      router.push("/mine")
    } else {
      showFailToast(res.message ?? "Lỗi đăng nhập")
    }
  });
}
</script>


<template>
  <div class="bg-container page">
    <img src="@/assets/images/common/bgGirl.png" class="bg-img" />
    <div class="bg-wrapper">
      <div class="login">
        <div class="nav-bar van-nav-bar van-hairline--bottom">
          <div class="van-nav-bar__content">
            <div @click="$router.go(-1)" class="van-nav-bar__left">
              <i
                class="van-icon van-icon-arrow-left"
                style="color: rgb(255, 255, 255)"
              ></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis"></div>
            <div class="van-nav-bar__right">
              <div class="language">
                <img src="@/assets/images/common/vn.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="logo-container">
            <div class="logo-wrapper">
              <img src="@/assets/images/common/logo.png" class="logo-img" />
            </div>
          </div>
          <div class="title">Đăng Nhập</div>
          <div class="loginForm">
            <div class="input van-cell van-field">
              <div
                class="van-cell__value van-cell__value--alone van-field__value"
              >
                <div class="van-field__body">
                  <input
                    v-model="loginData.username"
                    type="text"
                    placeholder="Vui lòng nhập tên đăng nhập"
                    class="van-field__control van-field__control--center"
                  />
                </div>
              </div>
            </div>
            <div class="input van-cell van-field">
              <div
                class="van-cell__value van-cell__value--alone van-field__value"
              >
                <div class="van-field__body">
                  <input
                    v-model="loginData.password"
                    :type="!showPassword ? 'password': 'text'"
                    placeholder="Vui lòng nhập mật khẩu đăng nhập"
                    class="van-field__control van-field__control--center"
                  />
                  <div class="van-field__right-icon">
                    <van-icon name="closed-eye" v-if="!showPassword" @click="showPassword = !showPassword"/>
                    <van-icon name="eye-o" v-else @click="showPassword = !showPassword"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="reset-text">
              <span>Quên mật khẩu?</span>
            </div>
            <router-link to="/register" class="register-text">
              <span> Không có tài khoản？Đăng ký ngay</span>
            </router-link>
            <button
              class="login-btn van-button van-button--normal"
              @click="submitLogin"
            >
              <div class="van-button__content">
                <span class="van-button__text">Đăng nhập</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.van-field__control {
  color: #323233;
}
</style>
