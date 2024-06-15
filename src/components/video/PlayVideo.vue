<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { dataVideo } from "./index.js"

import { VideoPlayer } from 'vue-hls-video-player';

function processPause(progress) {
  console.log(progress)
}


export default {
  setup() {
    const show = ref(true);
    const $route = useRoute();
    const idUrl = $route.params.id
    const currentVideo = dataVideo.filter((vid) => Number(idUrl) === vid.id)[0]
    const showPopup = () => {
      show.value = true;
    };
    const closePopup = () => {
      show.value = false;
    }

    return {
      showPopup,
      currentVideo,
      closePopup,
      show,
      dataVideo
    };
  },
  components: { VideoPlayer }
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
          {{currentVideo.vod_name}}
        </div>
      </div>
    </div>
    <div class="movie-video" >
      <div
        class="video-js noVip my-video-dimensions vjs-controls-enabled vjs-touch-enabled vjs-v7 vjs-has-started vjs-user-active vjs-paused"
        id="my-video"
      >

        <VideoPlayer
            type="default"
            @pause="processPause"
            :previewImageLink="currentVideo.vod_pic"
            :link="currentVideo.vod_play_url"
            :progress="30"
            :isMuted="false"
            :isControls="true"
            class="vjs-tech"
            id="my-video_html5_api"
        />

      </div>
    </div>
    <div class="movie-content">
      <div class="movie-descript">
        <p>{{currentVideo.vod_name}}</p>
        <span>{{currentVideo.count}} Lượt xem</span>
      </div>
      <div class="movie-body">
        <div class="movie-title">
          <div><span>Xem thêm</span></div>
        </div>
        <div class="movie-list">
          <div class="movie-play-item" v-for="vd in dataVideo" :key="vd.id">
            <div>
              <img :src="vd.vod_pic" />
              <div>
                <div class="van-count-down">{{vd.vod_duration}}</div>
              </div>
            </div>
            <div>
              <p>{{vd.vod_name}}</p>
              <span>{{vd.vod_score_num}} Lượt xem</span>
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
      <i class="close van-icon van-icon-cross" @click="closePopup"></i>
    </div>
    <div class="content">
      Những người chưa hoàn thành bình chọn chỉ cung cấp bản dùng thử 15 giây,
      hãy liên hệ với chuyên viên hướng dẫn bình chọn để trở thành thành viên
      của trang này, thưởng thức tất cả các video trên trang này và mở khóa dịch
      vụ tận nhà của những người đẹp nóng bỏng trong cùng một thành phố!
    </div>
  </van-popup>
</template>
