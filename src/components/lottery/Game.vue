<script setup>
import { ref } from "vue";
import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const games = ref([]);
const getGameList = () => {
  handleRequest(axios.get(API.PRODUCT_LIST)).then((res) => {
    if (res.success) {
      games.value = res.data;
    }
  });
};

getGameList();

</script>

<template>
  <div class="convention-hall page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div class="van-nav-bar__title van-ellipsis">XẾP HẠNG</div>
      </div>
    </div>
    <div class="convention-item">
      <div class="left">
        <div class="van-sidebar">
          <a class="van-sidebar-item van-sidebar-item--select"
            ><div class="van-sidebar-item__text">Tất cả</div></a
          >
        </div>
      </div>
      <div class="right">
        <div class="list-wrapper van-pull-refresh">
          <div class="van-pull-refresh__track" style="transition-duration: 0ms">
            <div class="van-pull-refresh__head"></div>
            <div class="van-grid van-hairline--top">
              <router-link
                v-for="(g, idx) in games"
                :key="idx"
                :to="{ name: 'Lottery', query: { id: g.id } }"
                class="van-grid-item"
                style="flex-basis: 50%"
              >
                <div
                  class="van-grid-item__content van-grid-item__content--center van-hairline"
                >
                  <div class="game_item_img van-image">
                    <img
                      class="van-image__img"
                      src="@/assets/images/common/bgGirl.png"
                    />
                  </div>
                  <span>{{ g.name }}</span
                  ><span></span>
                </div>
              </router-link>
              <!-- <div class="van-grid-item" style="flex-basis: 50%">
                <div
                  class="van-grid-item__content van-grid-item__content--center van-hairline"
                >
                  <div class="game_item_img van-image">
                    <img
                      class="van-image__img"
                      src="@/assets/images/common/bgGirl.png"
                    />
                  </div>
                  <span>BỎ PHIẾU 2</span><span></span>
                </div>
              </div>
              <div class="van-grid-item" style="flex-basis: 50%">
                <div
                  class="van-grid-item__content van-grid-item__content--center van-hairline"
                >
                  <div class="game_item_img van-image">
                    <img
                      class="van-image__img"
                      src="@/assets/images/common/bgGirl.png"
                    />
                  </div>
                  <span>BỎ PHIẾU 3</span><span></span>
                </div>
              </div>
              <div class="van-grid-item" style="flex-basis: 50%">
                <div
                  class="van-grid-item__content van-grid-item__content--center van-hairline"
                >
                  <div class="game_item_img van-image">
                    <img
                      class="van-image__img"
                      src="@/assets/images/common/bgGirl.png"
                    />
                  </div>
                  <span>ĐẶC BIỆT</span><span></span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.van-image__img {
  border-radius: 5.333vw;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 2.133vw 1.067vw;
  background-color: #fff;
}
</style>
