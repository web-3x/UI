<script setup>
import { ref } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
</script>
<template>
  <div class="home-container">
    <div class="header linear-bg" style="height: auto">
      <div style="flex: 1 1 0%"></div>
    </div>

    <div class="linear-bg"></div>
    <div class="home-scroll">
      <div class="banner">
        <swiper
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :modules="[EffectCoverflow]"
          effect="coverflow"
          class="banner_swiper swiper-container-3d"
        >
          <swiper-slide>
            <div class="banner_img van-image van-image--round">
              <img
                class="van-image__img"
                src="https://api.canalis.vip/lottery/banner/20231213/8ac60765e5cffad8f4cdf99880f31e0e.png"
              />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="banner_img van-image van-image--round">
              <img
                class="van-image__img"
                src="https://api.canalis.vip/lottery/banner/20231211/e2006090630c657813d904b6b8dc270b.jpg"
              />
            </div> </swiper-slide
          ><swiper-slide>
            <div class="banner_img van-image van-image--round">
              <img
                class="van-image__img"
                src="https://api.canalis.vip/lottery/banner/20231213/6131810d990e4d590d5643820ca885b1.png"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="notice-bar">
        <van-notice-bar
          color="rgb(119, 95, 217)"
          background="rgb(255, 255, 255)"
          text="Chúng tôi là CANALIS CLUB - Một quán Bar lớn . Phục vụ tận nơi tại
                63 tỉnh thành trên toàn quốc . Chúng tôi có những người mẫu cao
                cấp, tiếp viên hàng không, du học sinh.... Sẵn sàng phục vụ quý
                khách hàng !"
          left-icon="bullhorn-o"
          class="notice-swipe"
        />
        <div class="linear-gradient"></div>
      </div>

      <div class="hot-game">
        <router-link to="/Game" class="hot-title-div">
          <div>
            <span>TOP 10 BÉ HOT NHẤT</span>
          </div>
          <div>
            <span>Xem thêm</span
            ><i
              class="van-icon van-icon-arrow"
              style="color: rgb(194, 68, 145)"
            ></i>
          </div>
        </router-link>
        <div class="hot-items-div">
          <div class="van-grid">
            <router-link
              to="/Lottery"
              class="van-grid-item"
              style="flex-basis: 25%"
            >
              <div
                class="van-grid-item__content van-grid-item__content--center"
              >
                <div class="game_item_img van-image">
                  <img
                    class="van-image__img"
                    src="@/assets/images/common/bgGirl.png"
                  />
                </div>
                <span>BỎ PHIẾU 1</span>
              </div>
            </router-link>
            <div class="van-grid-item" style="flex-basis: 25%">
              <div
                class="van-grid-item__content van-grid-item__content--center"
              >
                <div class="game_item_img van-image">
                  <img
                    class="van-image__img"
                    src="@/assets/images/common/bgGirl.png"
                  />
                </div>
                <span>BỎ PHIẾU 2</span>
              </div>
            </div>
            <div class="van-grid-item" style="flex-basis: 25%">
              <div
                class="van-grid-item__content van-grid-item__content--center"
              >
                <div class="game_item_img van-image">
                  <img
                    class="van-image__img"
                    src="@/assets/images/common/bgGirl.png"
                  />
                </div>
                <span>BỎ PHIẾU 3</span>
              </div>
            </div>
            <div class="van-grid-item" style="flex-basis: 25%">
              <div
                class="van-grid-item__content van-grid-item__content--center"
              >
                <div class="game_item_img van-image">
                  <img
                    class="van-image__img"
                    src="@/assets/images/common/bgGirl.png"
                  />
                </div>
                <span>ĐẶC BIỆT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="van-pull-refresh">
        <div class="van-pull-refresh__track" style="transition-duration: 300ms">
          <div class="van-pull-refresh__head"></div>
          <div class="hot-title-div" style="margin-bottom: -20px">
            <div>
              <span>Phổ biến nhất</span>
            </div>
          </div>
          <div role="feed" class="van-list">
            <div class="movie_list_n">
              <router-link to="/HomeDetail" class="movie-list-n-item">
                <div class="movie-list-n-title">
                  Linh Anh ❤️ Siêu Dâm Ngoan - Nhiệt Tình Chiều Chuộng Hết Mình
                </div>
                <div class="movie-list-n-img">
                  <div class="movie-list-n-img van-image" lazy="loading">
                    <img
                      src="@/assets/images/common/bgGirl.png"
                      alt=""
                      class="van-image__img"
                      style="object-fit: cover"
                    />
                  </div>
                  <div class="movie-list-n-lab">
                    Chu Văn An, Bình Thạnh,Hồ Chí Minh, Vietnam
                  </div>
                </div>
                <div class="movie-list-n-item-bottomm">
                  <div class="movie-n-time-div">
                    <img
                      src="@/assets/images/icon/ico-love.png"
                      alt=""
                      class="movie-list-ico-loves"
                    /><img
                      src="@/assets/images/icon/ico-love.png"
                      alt=""
                      class="movie-list-ico-loves"
                    /><img
                      src="@/assets/images/icon/ico-love.png"
                      alt=""
                      class="movie-list-ico-loves"
                    /><img
                      src="@/assets/images/icon/ico-love.png"
                      alt=""
                      class="movie-list-ico-loves"
                    /><img
                      src="@/assets/images/icon/ico-love.png"
                      alt=""
                      class="movie-list-ico-loves"
                    /><img
                      src="@/assets/images/icon/ico-love.png"
                      alt=""
                      class="movie-list-ico-loves"
                    />
                    <div class="movie-list-notice">
                      <img
                        src="@/assets/images/icon/ico-notice.png"
                        alt=""
                        class="movie-list-ico-notice"
                      />
                      55
                    </div>
                    <div class="movie-list-addr">
                      <img
                        src="@/assets/images/icon/ico-addr.png"
                        alt=""
                        class="movie-list-ico-addr"
                      />
                      Bình Thạnh
                    </div>
                    <div class="movie-list-money">
                      <img
                        src="@/assets/images/icon/wallet.png"
                        alt=""
                        class="movie-list-ico-money"
                      />300
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="van-list__placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
