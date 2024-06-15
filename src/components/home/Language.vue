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
        <div class="van-nav-bar__title van-ellipsis">Ngôn ngữ</div>
      </div>
    </div>
    <router-link to="/" class="items">
      <div class="item van-hairline--bottom">
        <div class="flex_center">
          <div>
            <img src="@/assets/images/common/vn.png" />
          </div>
          <div class="info">Việt Nam</div>
        </div>
        <div>✓</div>
      </div>
    </router-link>
  </div>
</template>
