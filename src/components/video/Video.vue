<script setup>
import { ref } from "vue";

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
              <a href="/PlayVideo" class="movie-list-item">
                <div class="cover_img van-image van-image--round">
                  <img
                    src="@/assets/images/common/bgGirl.png"
                    class="van-image__img"
                  />
                </div>
                <div class="movie-list-item-bottom">
                  <div class="movie-time-div">
                    <span>Gieo màu xanh xuống biển! </span><span>Chơi:242</span>
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
