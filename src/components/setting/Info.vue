<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format"

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
        <div class="van-nav-bar__title van-ellipsis">Thông tin cơ bản</div>
      </div>
    </div>
    <div class="main-content">
      <div class="item van-hairline--bottom">
        <div class="left">Hình đại diện</div>
        <div class="right">
          <img
            src="@/assets/images/common/bgGirl.png"
            style="border-radius: 50%; width: 43px; height: 43px"
          /><i class="van-icon van-icon-arrow"></i>
        </div>
      </div>

      <router-link to="/Setname" class="item van-hairline--bottom">
        <div class="left">Tên thật</div>
        <div class="right">
          <span class="desc">{{ userInfo?.fullname ?? "Không được thiết lập" }}</span
          ><i class="van-icon van-icon-arrow"></i>
        </div>
      </router-link>
      <router-link to="/Setsex" class="item van-hairline--bottom">
        <div class="left">Giới tính</div>
        <div class="right">
          <span class="desc">{{ userInfo.gender == 1 ? 'Nam giới' : userInfo.gender == 2 ? 'Nữ giới' : 'Không xác định'}}</span
          ><i class="van-icon van-icon-arrow"></i>
        </div>
      </router-link>
      <router-link to="/Setbank" class="item van-hairline--bottom">
        <div class="left">Liên kết thông tin thẻ ngân hàng</div>
        <div class="right">
          <span class="desc">{{ userInfo.isSetBank ? 'Ràng buộc': 'Không có' }}</span
          ><i class="van-icon van-icon-arrow"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
a {
  color: black;
}
</style>
