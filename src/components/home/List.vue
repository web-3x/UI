<script setup>
import { listGirlByAddress, listAddress } from './address.js'
import { useRoute } from "vue-router";
const $route = useRoute();
const idUrl = $route.params.id
console.log(listGirlByAddress)

const currentAdd = listGirlByAddress.filter((add) => add.id === Number(idUrl))[0];
const name = listAddress.filter((add) => add.id === Number(idUrl))[0].name


</script>


<template>
  <div class="container page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content" >
        <div @click="$router.go(-1)" class="van-nav-bar__left">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          ></i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">{{name}}</div>
      </div>
    </div>
    <div class="right">
      <van-grid :column-num="2" style="padding-left: 10px">
        <van-grid-item
          :to="`/ProfileOnList/${idUrl}/${girl.id}`"
          style="flex-basis: 50%; padding-right: 10px"
           v-for="girl in currentAdd.data"
        >
          <van-image :src="girl.img_url[0]" />
          <span class="rig-name">A01</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<style>
.van-image__img {
  border-radius: 1.333vw;
  padding: 2vw;
}
</style>
