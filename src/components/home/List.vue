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
        <div class="van-nav-bar__title van-ellipsis">AN GIANG</div>
      </div>
    </div>
    <div class="right">
      <van-grid :column-num="2" style="padding-left: 10px">
        <van-grid-item
          to="/ProfileOnList"
          style="flex-basis: 50%; padding-right: 10px"
        >
          <van-image src="src/assets/images/common/bgGirl.png" />
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
