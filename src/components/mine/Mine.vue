<script setup>
import { ref, computed } from "vue";
import { showFailToast, ImagePreview } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format";
import { useRouter } from "vue-router";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

import VipTableImage from "@/assets/images/common/vip-table.jpg";

const router = useRouter();
const userStore = useUserStore();
const { userInfo, isLogin } = storeToRefs(userStore);

const loadingMoney = ref(false);
const loadingScore = ref(false);
const showVipTable = ref(false);
const countNotify = ref(0);

const withdrawLink = computed(() => {
  return userInfo?.value?.isSetBank ? "/withdraw" : "/Setbank";
});

const vipImgeSrc = computed(() => {
  return `/vip/vip${userInfo?.value?.vip ?? 1}.png`;
});

const loadMoney = () => {
  loadingMoney.value = true;
  handleRequest(axios.get(API.USER_INFO + "/" + "money"))
    .then((res) => {
      userStore.updateUserInfo({ money: res.data })
    })
    .finally(() => {
      setTimeout(() => {
        loadingMoney.value = false;
      }, 500);
    });
};

const loadScore = () => {
  loadingScore.value = true;
  handleRequest(axios.get(API.USER_INFO + "/" + "score"))
    .then((res) => {
       userStore.updateUserInfo({ score: res.data })
    })
    .finally(() => {
      setTimeout(() => {
        loadingScore.value = false;
      }, 500);
    });
};

const getUnreadNotifications = () => {
  handleRequest(axios.get(API.NOTIFICATION_UNREAD))
    .then((res) => {
      if(res.success) {
        countNotify.value = res.data;
      }
    })
};

getUnreadNotifications();

</script>
<template>
  <div class="mine page">
    <div
      class="bg-container page-bg"
      style="background-image: url('src/assets/images/common/bgMine.png')"
    >
      <div class="bg-wrapper"></div>
    </div>
    <div class="wrapper">
      <div class="header" style="background: none">
        <div
          class="nav-bar van-nav-bar van-hairline--bottom"
          style="background: none"
        >
          <div class="van-nav-bar__content">
            <div class="van-nav-bar__title van-ellipsis"></div>
            <router-link to="/Setting" class="van-nav-bar__right">
              <i
                class="van-icon van-icon-setting-o"
                style="color: rgb(255, 255, 255)"
              ></i>
            </router-link>
          </div>
        </div>
        <div class="user-wrapper">
          <template v-if="isLogin">
            <div class="user_img van-image van-image--round">
              <img
                class="van-image__img"
                src="@/assets/images/common/bgGirl.png"
              />
            </div>
            <div class="login-content">
              <p class="login-btn" style="margin: 19.1833px 0">
                {{ userInfo?.username }}
                <img
                  @click="showVipTable = true"
                  :src="vipImgeSrc"
                  alt=""
                  class="login-vip"
                />
              </p>
              <div class="login-label" style="margin: 13.4333px 0">
                <div class="van-progress" style="height: 8px">
                  <span
                    class="van-progress__portion"
                    style="
                      background: linear-gradient(
                        270deg,
                        rgb(194, 68, 145),
                        rgb(119, 95, 217)
                      );
                      width: 14.7px;
                    "
                  ></span>
                </div>
                <div style="color: white; margin-top: 10px; text-wrap: nowrap;">
                  Mã thành viên: {{ userInfo.memberCode ?? "********"}}
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="user-wrapper">
              <div class="user_img van-image van-image--round">
                <img
                  src="@/assets/images/common/avatar.png"
                  class="van-image__img"
                />
              </div>
              <div class="login-content" @click="$router.push('/Login')">
                <p class="login-btn">Đăng nhập Đăng ký</p>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="content">
        <div class="finance">
          <router-link to="/Recharge" class="finance-item">
            <i class="icon van-icon van-icon-peer-pay"></i
            ><span class="text">NẠP ĐIỂM</span>
          </router-link>
          <div class="line"></div>
          <router-link :to="withdrawLink" class="finance-item">
            <i class="icon van-icon van-icon-idcard"></i
            ><span class="text">RÚT ĐIỂM</span>
          </router-link>
        </div>
        <div class="wallet">
          <router-link to="Moneylog" class="part-1 van-hairline--bottom">
            <p class="flex-1 font-28 font-primary-color">Ví của tôi</p>
            <span class="font-28 font-gray">Chi tiết</span
            ><i class="font-gray van-icon van-icon-arrow" style=""></i>
          </router-link>
          <div class="part-2">
            <p class="balance van-ellipsis" style="font-size: 24px">
              {{ formatNumber(userInfo?.money ?? 0) }} Đ
            </p>
            <span class="font-28 font-gray" style="font-size: 14px"
              >(100 Đ=100,000 VND)</span
            >
            <div
              class="refresh-btn"
              :class="[
                loadingMoney
                  ? 'van-loading__spinner van-loading__spinner--circular'
                  : '',
              ]"
              @click="loadMoney"
            >
              <i class="van-icon van-icon-replay"></i>
            </div>
          </div>
          <div class="part-2">
            <p class="balance van-ellipsis" style="font-size: 24px"> {{ userInfo?.score }}/100</p>
            <span class="font-28 font-gray" style="font-size: 14px">
              Điểm tín nhiệm</span
            >
            <div class="refresh-btn" :class="[
                loadingScore
                  ? 'van-loading__spinner van-loading__spinner--circular'
                  : '',
              ]" @click="loadScore">
              <i class="van-icon van-icon-replay"></i>
            </div>
          </div>
        </div>
        <div class="menu" style="margin-top: 15px">
          <router-link to="/Personalreport" class="menu-item">
            <div class="menu-item-icon van-image">
              <img
                src="@/assets/images/icon/baobiao.svg"
                class="van-image__img"
              />
            </div>
            <span class="menu-item-label"> Thông tin tài khoản</span>
          </router-link>
          <router-link to="Infomation" class="menu-item">
            <div class="menu-item-icon van-image">
              <img src="@/assets/images/icon/user.svg" class="van-image__img" />
            </div>
            <span class="menu-item-label">Thông tin cá nhân</span>
          </router-link>
          <router-link to="/RechargeRecord" class="menu-item">
            <div class="menu-item-icon van-image">
              <img
                src="@/assets/images/icon/mingxi.svg"
                class="van-image__img"
              />
            </div>
            <span class="menu-item-label">Lịch sử quy đổi điểm</span>
          </router-link>
          <router-link to="/GameRecord" class="menu-item">
            <div class="menu-item-icon van-image">
              <img
                src="@/assets/images/icon/youxi.svg"
                class="van-image__img"
              />
            </div>
            <span class="menu-item-label">Lịch sử bỏ phiếu bầu</span>
          </router-link>
          <router-link to="/Notice" class="menu-item">
            <div class="menu-item-icon van-image">
              <img
                src="@/assets/images/icon/gonggao.svg"
                class="van-image__img"
              />
            </div>
            <span class="menu-item-label">Thông báo</span>
            <van-tag :show="countNotify" size="large" type="danger" style="font-size: 14px; padding: 5px;" round>
              {{ countNotify }}
            </van-tag>
          </router-link>
          <div
            class="menu-item"
            @click="showFailToast('Tính năng bị vô hiệu hóa')"
          >
            <div class="menu-item-icon van-image">
              <img
                src="@/assets/images/icon/kefu_1.svg"
                class="van-image__img"
              />
            </div>
            <span class="menu-item-label">Phim của tôi</span>
          </div>
        </div>
      </div>
    </div>
    <van-image-preview v-model:show="showVipTable" :images="[VipTableImage]">
    </van-image-preview>
  </div>
</template>
<style scoped>
a {
  color: black;
}

:deep(.van-image-preview) {
  top: 50%;
  left: 50%;
  background: transparent;
}

:deep(.van-image-preview__overlay) {
  background: rgba(0, 0, 0, 0.9);
}
</style>
