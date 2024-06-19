<script setup>
import { ref } from "vue";
import { showFailToast } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format";
import { computed } from "vue";
// const router = useRouter();

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const banks = ref([]);

const setBankLink = computed(() => {
  return userInfo.value.isSetPayPass ? "/BindCard" : "/SetPayPassword";
});

const getBankList = () => {
  handleRequest(axios.get(API.BANK_LIST)).then(res => {
    if(res.success) {
      banks.value = res.data;
    }
  });
};

getBankList();

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
        <div class="van-nav-bar__title van-ellipsis">Tài khoản ngân hàng</div>
      </div>
    </div>
    <div class="wrapper" style="background-color: #f2f2f5">
      <router-link
        :to="setBankLink"
        class="add-card"
        v-if="!userInfo.isSetBank"
      >
        <i class="van-icon van-icon-plus"></i
        ><span>Thêm tài khoản ngân hàng</span>
      </router-link>
      <div class="bank" v-else>
        <div class="info" v-for="item, index in banks" :key="index">
          <div class="row-content">{{ item.bankName }}</div>
          <div class="row-content">{{ item.holder }}</div>
          <div class="row-content"></div>
        </div>
      </div>
      <div class="tips">
        Nhắc nhở: Vui lòng liên kết với ngân hàng. Nếu cần sửa đổi, vui lòng
        liên hệ bộ phận chăm sóc khách hàng trực tuyến
      </div>
    </div>
  </div>
</template>
