<script setup>
import { ref } from "vue";
import { dataVideo } from "./index.js"
const activeTab = ref(0);
</script>
<template>
  <div class="movie-hall page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div class="van-nav-bar__title van-ellipsis">VIDEO</div>
      </div>
    </div>
    <van-tabs v-model:active="activeTab" sticky swipeable>
      <van-tab title="Việt Nam">
        <div class="hot-recommend-div">
          <div class="van-list">
            <div class="list-item">
              <a :href="`/PlayVideo/${video.id}`" class="movie-list-item"  v-for="video in dataVideo">
                <div class="cover_img van-image van-image--round">
                  <img
                    :src="video.vod_pic"
                    class="van-image__img"
                  />
                </div>
                <div class="movie-list-item-bottom">
                  <div class="movie-time-div">
                    <span>{{video.vod_name}} </span><span>{{video.vod_duration}}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
