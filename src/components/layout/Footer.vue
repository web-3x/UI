<template>
  <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed">
    <router-link to="/" class="van-tabbar-item">
      <div class="van-tabbar-item__icon">
        <img src="@/assets/images/common/indexed.png" alt="Trang chủ" />
      </div>
      <div class="van-tabbar-item__text">
        <span class="foorterTxt foorterTxtF">Trang chủ</span>
      </div>
    </router-link>
    <router-link to="/Game" class="van-tabbar-item">
      <div class="van-tabbar-item__icon">
        <img src="@/assets/images/common/subscribe2.png" alt="XẾP HẠNG" />
      </div>
      <div class="van-tabbar-item__text">
        <span class="foorterTxt foorterTxtF">XẾP HẠNG</span>
      </div>
    </router-link>
    <router-link to="/Choose" class="van-tabbar-item">
      <div class="van-tabbar-item__icon">
        <img src="@/assets/images/common/beauty3.png" class="tui" />
      </div>
      <div class="van-tabbar-item__text"><span></span></div>
    </router-link>
    <router-link to="/Video" class="van-tabbar-item">
      <div class="van-tabbar-item__icon">
        <img src="@/assets/images/common/video.png" alt="VIDEO" />
      </div>
      <div class="van-tabbar-item__text">
        <span class="foorterTxt foorterTxtF">VIDEO</span>
      </div>
    </router-link>
    <router-link to="/mine" class="van-tabbar-item">
      <div class="van-tabbar-item__icon">
        <img src="@/assets/images/common/my.png" alt="Của tôi" />
      </div>
      <div class="van-tabbar-item__text">
        <span class="foorterTxt foorterTxtF">Của tôi</span>
      </div>
    </router-link>
  </div>
</template>
<style scoped>
a:active,
a.router-link-exact-active {
  color: rgb(126, 86, 120);
  transition: all 100ms ease-in;
}
</style>
