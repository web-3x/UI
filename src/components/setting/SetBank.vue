<script setup>
import { showFailToast } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format"
import { computed } from "vue";
// const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);


const setBankLink = computed(() => {
  return userInfo.value.isSetPayPass ? "/BindCard" : "/SetPayPassword";
});

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
      <router-link :to="setBankLink" class="add-card">
        <i class="van-icon van-icon-plus"></i
        ><span>Thêm tài khoản ngân hàng</span>
      </router-link>
      <div class="tips">
        Nhắc nhở: Vui lòng liên kết với ngân hàng. Nếu cần sửa đổi, vui lòng
        liên hệ bộ phận chăm sóc khách hàng trực tuyến
      </div>
    </div>
  </div>
</template>
