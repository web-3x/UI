<script setup>
import { reactive } from "vue";
import { showFailToast } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format";
import { useRouter } from "vue-router";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const formData = reactive({
  amount: "",
  password_withdraw: "",
});

const submit = () => {
  if (isNaN(formData.amount) || formData.amount <= 0) {
   return showFailToast("Vui lòng điền số điểm chính xác.");
  }
  if (!formData.password_withdraw) {
   return showFailToast("Vui lòng nhập mật khẩu rút");
  }
  handleRequest(axios.post(API.TRANSACTION_WITHDRAW, formData)).then((res) => {
    if (res.success) {
      showFailToast("Rút thành công.");
      router.push("/mine");
    } else {
      showFailToast(res.message ?? "Lỗi");
    }
  });
};
</script>

<template>
  <div class="container page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div class="van-nav-bar__left" @click="router.go(-1)">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          ></i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">Trung tâm rút tiền</div>
        <div class="van-nav-bar__right" @click="router.push('/WithdrawRecord')">
          <span class="nav-right">Hồ sơ rút điểm</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="withdrawMoney">
        <span>Số điểm rút (Đ)</span>
        <div class="money">
          <div class="moneyNumber">
            <div class="van-cell van-field">
              <div
                class="van-cell__value van-cell__value--alone van-field__value"
              >
                <div class="van-field__body">
                  <input
                    v-model.number="formData.amount"
                    type="text"
                    inputmode="decimal"
                    class="van-field__control"
                  />
                </div>
              </div>
            </div>
          </div>
          <span class="all">Tất cả</span>
        </div>
        <div class="money" style="width: 100%">
          <div class="moneyNumber" style="width: 100%">
            <div
              class="van-cell van-field"
              style="font-size: 16px; width: 100%"
            >
              <div
                class="van-cell__value van-cell__value--alone van-field__value"
              >
                <div class="van-field__body">
                  <input
                    v-model="formData.password_withdraw"
                    type="password"
                    placeholder="Vui lòng nhập lại mật khẩu rút tiền mới"
                    class="van-field__control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="information">
          <div class="description">
            <span class="van-popover__wrapper"
              ><i class="van-icon van-icon-info-o"></i>
              Mô tả hạn ngạch
            </span>
          </div>
          <div class="balance">
            <span>VND：</span><span class="number">1000Đ</span>
          </div>
        </div>
      </div>
      <button
        class="withdraw_btn van-button van-button--default van-button--normal"
        @click="submit"
      >
        <div class="van-button__content">
          <span class="van-button__text"> RÚT ĐIỂM ngay lập tức</span>
        </div>
      </button>
    </div>
  </div>
</template>