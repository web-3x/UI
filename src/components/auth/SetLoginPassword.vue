<script setup>
import { ref, reactive, watch } from "vue";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";
import { showFailToast } from "vant";

import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const formData = reactive({
  password: "",
  newPassword: "",
  confirmPassword: "",
});

function submit() {
  const { password, newPassword ,confirmPassword } = formData
  if(newPassword !== confirmPassword) {
    return showFailToast("Mật khẩu mới không khớp");
  }
  handleRequest(axios.post(API.CHANGE_PASSWORD, { password, newPassword})).then((res) => {
    if (res.success) {
      router.go(-1);
    } else {
      showFailToast(res.message ?? "Lỗi");
    }
  });
}
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
        <div class="van-nav-bar__title van-ellipsis">
          Thay đổi mật khẩu đăng nhập
        </div>
      </div>
    </div>
    <div class="van-cell-group van-hairline--top-bottom">
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>Mật khẩu cũ</span>
        </div>
        <div class="van-cell__value van-field__value">
          <div class="van-field__body">
            <input
              v-model="formData.password"
              type="text"
              placeholder="Vui lòng nhập mật khẩu cũ của bạn"
              class="van-field__control"
              style="color: #323233"
            />
          </div>
        </div>
      </div>
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>Mật khẩu mới</span>
        </div>
        <div class="van-cell__value van-field__value">
          <div class="van-field__body">
            <input
              v-model="formData.newPassword"
              type="text"
              placeholder="Vui lòng nhập mật khẩu mới của bạn"
              class="van-field__control"
              style="color: #323233"
            />
          </div>
        </div>
      </div>
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>Mật khẩu mới</span>
        </div>
        <div class="van-cell__value van-field__value">
          <div class="van-field__body">
            <input
              v-model="formData.confirmPassword"
              type="text"
              placeholder="Vui lòng nhập lại mật khẩu mới của bạn"
              class="van-field__control"
              style="color: #323233"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="sub-btn van-button van-button--default van-button--normal"
      @click="submit"
    >
      <div class="van-button__content">
        <span class="van-button__text">Hoàn Thành</span>
      </div>
    </button>
  </div>
</template>
