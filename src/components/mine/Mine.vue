<script setup>
import { computed } from "vue"
import { showFailToast } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format"
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const withdrawLink = computed(() => {
  return userInfo.value.isSetBank ? "/withdraw" : "/Setbank";
});

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
                src="@/assets/images/common/vip1.png"
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
            </div>
          </div>
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
            <p class="balance van-ellipsis" style="font-size: 24px">{{ formatNumber(userInfo?.money ?? 0) }} Đ</p>
            <span class="font-28 font-gray" style="font-size: 14px"
              >(100 Đ=100,000 VND)</span
            >
            <div class="refresh-btn">
              <i class="van-icon van-icon-replay"></i>
            </div>
          </div>
          <div class="part-2">
            <p class="balance van-ellipsis" style="font-size: 24px">100/100</p>
            <span class="font-28 font-gray" style="font-size: 14px">
              Điểm tín nhiệm</span
            >
            <div class="refresh-btn">
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
  </div>
</template>
<style scoped>
a {
  color: black;
}
</style>
