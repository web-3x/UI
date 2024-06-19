<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";
import { showFailToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const checked = ref(userInfo.value?.gender ?? 0);

const onChangeGender = (e) => {
  handleRequest(axios.post(API.USER_SET_GENDER, { gender: e })).then((res) => {
    if (res.success) {
      showFailToast('Thành công.')
      router.push("/Infomation")
    } else {
      showFailToast(res.message ?? "Lỗi")
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
        <div class="van-nav-bar__title van-ellipsis">Sửa đổi giới tính</div>
      </div>
    </div>
    <div class="sex">
      <van-radio-group v-model="checked" @change="onChangeGender">
        <van-radio :name="1">Nam giới</van-radio>
        <van-radio :name="2">Nữ giới</van-radio>
      </van-radio-group>
    </div>
  </div>
</template>
