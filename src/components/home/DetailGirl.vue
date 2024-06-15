<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import IconNoiti from "@/assets/images/icon/ico-notice.png";
import IcNoitiActive from "@/assets/images/icon/ico-notice-active.png";
import IconImage from "@/assets/images/icon/ico-img.png";
import IcImageActive from "@/assets/images/icon/ico-img-active.png";
import IconInfo from "@/assets/images/icon/ico-infoPp.png";
import IcInfoActive from "@/assets/images/icon/ico-notice-active.png";
import {detailGirls} from './index.js'

const isActivetab = ref("info");
const $route = useRoute();
function onActivetab(index) {
  isActivetab.value = index;
}
const idUrl = $route.params.id
const girls = detailGirls.filter((girl) => Number(idUrl) === girl.id) ?? []
const detailGirl = girls.length > 0 ? girls[0] : {}

</script>
<template>
  <div class="nHome-detail">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div @click="$router.go(-1)" class="van-nav-bar__left">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          ></i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">NẠP ĐIỂM</div>
      </div>
    </div>
    <div class="detail-title">
      {{ detailGirl.name }}
    </div>
    <div style="display: flex">
      <div
        @click="onActivetab('info')"
        class="detail-tabs"
        :class="isActivetab === 'info' ? 'active' : ''"
      >
        <img
          :src="isActivetab === 'info' ? IconInfo : IcInfoActive"
          alt=""
          class="detail-tabs-ico"
        />
        info
      </div>
      <div
        @click="onActivetab('image')"
        class="detail-tabs"
        :class="isActivetab === 'image' ? 'active' : ''"
      >
        <img
          :src="isActivetab === 'image' ? IconImage : IcImageActive"
          alt=""
          class="detail-tabs-ico"
        />
        images ({{detailGirl.images.length }})
      </div>
      <div
        @click="onActivetab('reprot')"
        class="detail-tabs"
        :class="isActivetab === 'reprot' ? 'active' : ''"
      >
        <img
          :src="isActivetab === 'reprot' ? IconNoiti : IcNoitiActive"
          alt=""
          class="detail-tabs-ico"
        />
        reprot ({{detailGirl.comments.length }})
      </div>
    </div>
    <div class="detail-content" v-if="isActivetab === 'info'">
      <div class="movie-list-n-img">
        <div
          class="movie-list-n-img van-image"
          src="@/assets/images/common/bgGirl.png"
          lazy="loaded"
        >
          <img
            :src="detailGirl.img"
            alt=""
            class="van-image__img"
            style="object-fit: cover"
          />
        </div>
        <div class="movie-list-n-lab">
          {{detailGirl.address}}
        </div>
      </div>
      <div class="movie-list-n-item-bottom">
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
          <div class="movie-list-money">
            <img
              src="@/assets/images/icon/wallet.png"
              alt=""
              class="movie-list-ico-money"
              style="width: 20px"
            />{{detailGirl.price}}
          </div>
          <div class="movie-list-addr">
            <img
              src="@/assets/images/icon/ico-addr.png"
              alt=""
              class="movie-list-ico-addr"
            />
            {{detailGirl.city_name}}
          </div>
          <div class="movie-list-notice">
            <img
              src="@/assets/images/icon/ico-time.png"
              alt=""
              class="movie-list-ico-notice"
            />
            {{detailGirl.birthday}}
          </div>
        </div>
      </div>
      <div class="table-title">Thông số</div>
      <div class="table">
        <div class="table-list">
          <div class="name">Pass</div>
          <div class="content"></div>
        </div>
        <div class="table-list">
          <div class="name">Năm sinh</div>
          <div class="content">{{detailGirl.attributes[42]}}</div>
        </div>
        <div class="table-list">
          <div class="name">Cao (cm)</div>
          <div class="content">{{detailGirl.attributes[46]}}</div>
        </div>
        <div class="table-list">
          <div class="name">Nặng (kg)</div>
          <div class="content">{{detailGirl.attributes[48]}}</div>
        </div>
        <div class="table-list">
          <div class="name">Vòng 1 (cm)</div>
          <div class="content">{{detailGirl.attributes[49]}}</div>
        </div>
        <div class="table-list">
          <div class="name">Vòng 2 (cm)</div>
          <div class="content">{{detailGirl.attributes[50]}}</div>
        </div>
        <div class="table-list">
          <div class="name">Vòng 3 (cm)</div>
          <div class="content">{{detailGirl.attributes[51]}}</div>
        </div>
        <div class="table-list">
          <div class="name">Từ chối</div>
          <div class="content">{{detailGirl.attributes[58]}}</div>
        </div>
      </div>
    </div>
    <div class="detail-content" v-if="isActivetab === 'image'">
      <div class="tabs1">
        <div
          class="tabs1-img van-image"
          lazy="loaded"
          v-for="img in detailGirl.images"
        >
          <img
            :src="img"
            alt=""
            class="van-image__img"
            style="object-fit: cover"
          />
        </div>
      </div>
    </div>
    <div class="detail-content" v-if="isActivetab === 'reprot'">
      <div class="table-title">Bình luận</div>
      <div class="comment">
        <div class="commentList">
          <div class="commentList-content"  v-for="cmt in detailGirl.comments">
             <img alt="" class="commentList-content-avatar" lazy="error" :src="cmt.avatar"/>
            <div style="width: 100%">
              <div>
                <div class="commentList-content-name">{{ cmt.nickname }}</div>
                <div class="commentList-content-txt">
                  {{ cmt.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.movie-list-n-img {
  width: 100vw;
  height: 100vw;
  position: relative;
}
</style>
