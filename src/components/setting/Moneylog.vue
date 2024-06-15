<template>
  <div class="container page">
    <div class="header">
      <div class="nav-bar van-nav-bar van-hairline--bottom">
        <div class="van-nav-bar__content">
          <div @click="$router.go(-1)" class="van-nav-bar__left">
            <i
              class="van-icon van-icon-arrow-left"
              style="color: rgb(255, 255, 255)"
            ></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">Số dư biến động</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="van-pull-refresh">
        <div class="van-pull-refresh__track" style="transition-duration: 0ms">
          <div class="van-pull-refresh__head"></div>
        </div>
      </div>
    </div>
  </div>
</template>
