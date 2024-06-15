<script setup>
import { ref, reactive } from "vue";
import { PasswordInput, NumberKeyboard } from "vant";
import { showFailToast } from "vant";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const formData = reactive({
  password: "",
  confirmPassword: "",
});

const maxLength = 6;

const focusPassword = ref(true);
const focusConfirmPassword = ref(false);

const showKeyboard = ref(true);

const onFocusPassword = () => {
  focusPassword.value = true;
  focusConfirmPassword.value = false;
  showKeyboard.value = true;
};

const onFocusConfirmPassword = () => {
  focusPassword.value = false;
  focusConfirmPassword.value = true;
  showKeyboard.value = true;
};

const onKeyBoardInput = (value) => {
  if (focusPassword.value && formData.password.length < 6) {
    formData.password += String(value);
  } else if (focusConfirmPassword.value && formData.confirmPassword.length < 6) {
    formData.confirmPassword += String(value);
  }
};
const onKeyBoardDelete = () => {
  if (focusPassword.value) {
    formData.password = formData.password.slice(0, -1);
  } else if (focusConfirmPassword.value) {
    formData.confirmPassword = formData.confirmPassword.slice(0, -1);
  }
};

const submit = () => {
  if(formData.password.length < maxLength || formData.confirmPassword.length < maxLength) {
    showFailToast("Vui lòng nhập đẩy đủ thông tin")
  }
  if(formData.password !== formData.confirmPassword) {
    showFailToast("Mật khẩu không khớp")
  }

  const { password } = formData;
  
  handleRequest(axios.post(API.PASSWORD_WITHDRAW, { password })).then((res) => {
    if(res.success) {
      userStore.login(res.data)
      router.push("/mine")
    } else {
      showFailToast(res.message ?? "Lỗi đăng nhập")
    }
  });
};

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
        <div class="van-nav-bar__title van-ellipsis">MẬT KHẨU RÚT TIỀN</div>
      </div>
    </div>
    <div class="wrapper">
      <div class="item">
        <p class="title">Tạo Mật Khẩu Rút Tiền</p>
        <van-password-input
          :value="formData.password"
          :gutter="10"
          :focused="focusPassword"
          @focus="onFocusPassword"
        />
      </div>
      <div class="item">
        <p class="title">Vui lòng nhập lại mật khẩu rút tiền mới</p>
        <van-password-input
          :value="formData.confirmPassword"
          :gutter="10"
          :focused="focusConfirmPassword"
          @focus="onFocusConfirmPassword"
        />
      </div>
      <van-number-keyboard
        :show="showKeyboard"
        @blur="showKeyboard = false"
        @input="onKeyBoardInput"
        @delete="onKeyBoardDelete"
      />
      <button class="sub-btn van-button van-button--default van-button--normal" @click="submit">
        <div class="van-button__content">
          <span class="van-button__text">Xác nhận</span>
        </div>
      </button>
    </div>
  </div>
</template>
