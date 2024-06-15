<script setup>
import { ref } from "vue";
const checked = ref("1");
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
      <van-radio-group v-model="checked">
        <van-radio name="1">Nam giới</van-radio>
        <van-radio name="2">Nữ giới</van-radio>
      </van-radio-group>
    </div>
  </div>
</template>
