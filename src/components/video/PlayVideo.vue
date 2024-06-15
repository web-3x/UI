<script setup>
import { ref } from "vue";

const show = ref(true);
const showPopup = () => {
  show.value = true;
};

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
        <div class="van-nav-bar__title van-ellipsis">
          Gieo màu xanh xuống biển!
        </div>
      </div>
    </div>
    <div class="movie-video">
      <div
        class="video-js noVip vjs-paused my-video-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-user-inactive"
        id="my-video"
      >
        <!-- <video
          id="my-video_html5_api"
          class="vjs-tech"
          src="blob:https://canalis.vip/d222f00d-594f-48eb-84ee-fe3ae706b29c"
        ></video> -->
      </div>
    </div>
    <div class="movie-content">
      <div class="movie-descript">
        <p>Gieo màu xanh xuống biển!</p>
        <span>242Lượt xem</span>
      </div>
      <div class="movie-body">
        <div class="movie-title">
          <div><span>Xem thêm</span></div>
        </div>
        <div class="movie-list">
          <div class="movie-play-item">
            <div>
              <img src="@/assets/images/common/bgGirl.png" />
              <div>
                <div class="van-count-down">00:07:18</div>
              </div>
            </div>
            <div>
              <p>Gieo màu xanh xuống biển!</p>
              <span>242Lượt xem</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-cell title="Xem video" is-link @click="showPopup" />
  <van-popup class="errorMoney van-popup van-popup--center" v-model:show="show"
    ><div class="header">
      Xem video
      <i class="close van-icon van-icon-cross"></i>
    </div>
    <div class="content">
      Những người chưa hoàn thành bình chọn chỉ cung cấp bản dùng thử 15 giây,
      hãy liên hệ với chuyên viên hướng dẫn bình chọn để trở thành thành viên
      của trang này, thưởng thức tất cả các video trên trang này và mở khóa dịch
      vụ tận nhà của những người đẹp nóng bỏng trong cùng một thành phố!
    </div>
  </van-popup>
</template>
