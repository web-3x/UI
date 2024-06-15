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
  fullname: userInfo.value?.fullname,
});

const showPassword = ref(false);

function submit() {
  handleRequest(axios.post(API.USER_SET_FULLNAME, formData)).then((res) => {
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
        <div class="van-nav-bar__title van-ellipsis">Sửa tên thật </div>
        <div class="van-nav-bar__right" @click="submit">
          <span class="nav-right">Xác nhận</span>
        </div>
      </div>
    </div>
    <div class="van-cell-group van-hairline--top-bottom">
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label"><span>Tên</span></div>
        <div class="van-cell__value van-field__value">
          <div class="van-field__body">
            <input
              v-model="formData.fullname"
              type="text"
              placeholder="Vui lòng nhập tên thật của bạn"
              class="van-field__control"
              style="color: #323233"
            />
          </div>
        </div>
      </div>
    </div>
    <p>
      Để đảm bảo an toàn cho tài khoản của bạn, tên thật cần phải nhất quán với
      tên trên thẻ ngân hàng bị ràng buộc
    </p>
  </div>
</template>
