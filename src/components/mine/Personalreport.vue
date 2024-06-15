<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format"

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);

</script>

<template>
  <div class="container page">
    <div class="header">
      <div class="nav-bar van-nav-bar">
        <div class="van-nav-bar__content">
          <div @click="$router.go(-1)" class="van-nav-bar__left">
            <i
              class="van-icon van-icon-arrow-left"
              style="color: rgb(255, 255, 255)"
            ></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">Thông tin tài khoản</div>
        </div>
      </div>
      <div class="info">
        <p class="title">Số lượng nhiệm vụ(Đ)</p>
        <p class="value">{{ formatNumber(userInfo.money) }}Đ</p>
        <p class="tip">
          Công thức tính lợi nhuận: số tiền thắng - số tiền nhiệm vụ
        </p>
      </div>
      <div class="content">
        <div class="datalist">
          <div class="datalistitem">
            <div class="datalistitemValue">{{ formatNumber(userInfo?.money ?? 0) }}Đ</div>
            <div class="datalistitemKey">Số lượng nhiệm vụ</div>
            <div class="datalistitemRightLine"></div>
          </div>
          <div class="datalistitem">
            <div class="datalistitemValue">{{ formatNumber(userInfo?.moneyDeposit ?? 0) }}Đ</div>
            <div class="datalistitemKey">Số tiền nạp</div>
            <div class="datalistitemRightLine"></div>
          </div>
          <div class="datalistitem">
            <div class="datalistitemValue">{{ formatNumber(userInfo?.moneyWithdraw ?? 0) }}Đ</div>
            <div class="datalistitemKey">Số điểm rút</div>
            <div class="datalistitemRightLine"></div>
          </div>
          <div class="datalistitem">
            <div class="datalistitemValue">{{ formatNumber(userInfo?.moneyWin ?? 0) }}Đ</div>
            <div class="datalistitemKey">Số tiền chiến thắng</div>
            <div class="datalistitemRightLine"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
