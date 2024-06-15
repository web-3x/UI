<template>
  <div class="page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div @click="$router.go(-1)" class="van-nav-bar__left">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          ></i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">CHỌN TỈNH</div>
      </div>
    </div>
    <div class="box">
      <p class="name">A01</p>
      <p class="title"></p>
      <van-image
        width="98%"
        height="100%"
        fit="contain"
        src="src/assets/images/common/bgGirl.png"
      />

      <button
        class="button van-button van-button--default van-button--normal van-button--round"
        style="
          color: white;
          background: linear-gradient(
            to right,
            rgb(127, 87, 120),
            rgb(229, 194, 160)
          );
          border: 0px;
        "
      >
        <div class="van-button__content">
          <span class="van-button__text">Liên lạc với tô</span>
        </div>
      </button>
    </div>
  </div>
</template>
