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

const formData = reactive({
  username: "",
  password: "",
  code: ""
});

const showPassword = ref(false);

function submitForm() {
  handleRequest(axios.post(API.REGISTER, formData)).then((res) => {
    if (res.success) {
      userStore.login(res.data);
      showFailToast("Đăng ký tài khoản thành công.")
      router.push("/mine");
    } else {
      showFailToast(res.message ?? "Lỗi đăng nhập");
    }
  });
}
</script>


<template>
  <div class="bg-container page">
    <img src="@/assets/images/common/bgGirl.png" class="bg-img" />
    <div class="bg-wrapper">
      <div class="register">
        <div class="nav-bar van-nav-bar van-hairline--bottom">
          <div class="van-nav-bar__content">
            <div @click="$router.go(-1)" class="van-nav-bar__left">
              <i
                class="van-icon van-icon-arrow-left"
                style="color: rgb(255, 255, 255)"
              ></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis"></div>
          </div>
        </div>
        <div class="wrapper">
          <div class="logo-container">
            <div class="logo-wrapper">
              <img src="@/assets/images/common/logo.png" class="logo-img" />
            </div>
          </div>
          <div class="title">Đăng ký</div>
          <div class="loginForm">
            <div class="input van-cell van-field">
              <div
                class="van-cell__value van-cell__value--alone van-field__value"
              >
                <div class="van-field__body">
                  <input
                    v-model="formData.username"
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
                    v-model="formData.password"
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
            <div class="input van-cell van-field">
              <div
                class="van-cell__value van-cell__value--alone van-field__value"
              >
                <div class="van-field__body">
                  <input
                    v-model="formData.code"
                    type="text"
                    placeholder="Nhập mã giới thiệu"
                    class="van-field__control van-field__control--center"
                  />
                </div>
              </div>
            </div>
            <div class="agreement">
              <div
                role="checkbox"
                tabindex="0"
                aria-checked="true"
                class="van-checkbox"
              >
                <div
                  class="van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked"
                >
                  <i class="van-icon van-icon-success"></i>
                </div>
              </div>
              <span class="agreement-text"
                >Tôi đã biết và đồng ý Thỏa thuận mở tài khoản Hiệp ước</span
              >
            </div>
            <button class="login-btn van-button van-button--normal" @click="submitForm">
              <div class="van-button__content">
                <span class="van-button__text">Đăng ký</span>
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
