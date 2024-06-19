<script setup>
import { ref } from "vue";
import { showFailToast } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const amount = ref("");

const submit = () => {
  if (amount.value > 0) {
    router.push({ name: "Channel", query: { money: amount.value } });
  } else {
    showFailToast("Số điểm sai");
  }
};
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
          <div class="van-nav-bar__title van-ellipsis">NẠP ĐIỂM</div>
          <router-link to="/RechargeRecord" class="van-nav-bar__right">
            <span class="nav-right">Lịch sử quy đổi điểm</span>
          </router-link>
        </div>
      </div>
      <div class="info">
        <p class="title">Số dư hiện tại(Đ)</p>
        <p class="value">{{ formatNumber(userInfo?.money) }}Đ</p>
      </div>
      <div class="content recharge">
        <form class="van-form" @submit.prevent="submit">
          <div class="form-item">
            <div class="form-item-title">Vui lòng nhập số điểm nạp</div>
            <div>
              <div
                class="van-cell van-field"
                style="font-size: 15px; padding: 1.333vw 2.133vw"
              >
                <div
                  class="van-cell__value van-cell__value--alone van-field__value"
                >
                  <div class="van-field__body">
                    <input
                      v-model.number="amount"
                      type="text"
                      name="money"
                      placeholder="Vui lòng nhập số điểm nạp"
                      class="van-field__control"
                      style="color: #323233"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div style="margin: 16px">
              <button
                type="submit"
                class="subBtn van-button van-button--normal van-button--block van-button--round"
                style="border: none"
              >
                <div class="van-button__content">
                  <span class="van-button__text">Kế tiếp</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
