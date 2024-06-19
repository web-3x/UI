<script setup>
import { reactive, ref } from "vue";
import { showFailToast } from "vant";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/helpers/format";
import { useRouter, useRoute } from "vue-router";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const type = ref("");

const amount = Number(route.query.money);

const bankInfo = reactive({
  bankName: "",
  accountNumber: "",
  holder: ""
})

if (isNaN(amount) || amount <= 0) {
  router.push("/Recharge");
}

const submit = () => {
  handleRequest(axios.post(API.TRANSACTION_DEPOSIT, { amount, note: "ok" })).then(res => {
    if(res.success) {
      type.value = 'bank';
      console.log(res.data.bank)
      Object.assign(bankInfo, res.data.bank)
    } else {
      showFailToast(res.message ?? "Lỗi nạp tiền")
    }
  })
  // if (amount.value > 0) {
  //   router.push({ name: "Channel", query: { money: amount.value } });
  // } else {
  //   showFailToast("Số tiền sai");
  // }
};

const copy = (filed) => {
  navigator.clipboard.writeText(bankInfo[filed]);
  showFailToast("Thành công");
};

</script>

<template>
  <div class="container page">
    <div class="header">
      <div class="nav-bar van-nav-bar">
        <div class="van-nav-bar__content">
          <div @click="type === '' ? $router.go(-1): $router.push('/mine')" class="van-nav-bar__left">
            <i
              class="van-icon van-icon-arrow-left"
              style="color: rgb(255, 255, 255)"
            ></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">NẠP ĐIỂM</div>
        </div>
      </div>
      <div class="content recharge">
        <div v-if="!type">
          <div style="width: 100%"><div class="payBtn" @click="submit">Bank</div></div>
        </div>

        <div class="bank" style="display: block" v-else-if="type =='bank'">
          <div class="text-container" style="margin-top: 0.25rem">
            <span class="bank-title input-text">Tên ngân hàng:</span>
            <div class="bank-content">
              <span class="text" id="seno">{{ bankInfo.bankName }}</span>
              <span class="btn" @click="copy('bankName')">Nhấn để sao chép</span>
            </div>
          </div>

          <div class="text-container bank-username bank-info-main">
            <span class="bank-title bank-info-username">số thẻ ngân hàng:</span>
            <div class="bank-content">
              <span class="text" id="copy1">{{ bankInfo.accountNumber }}</span>
              <span class="btn" @click="copy('accountNumber')">Nhấn để sao chép</span>
            </div>
          </div>
          <div class="text-container bank-account bank-info-main">
            <span class="bank-title bank-info-account">Họ Tên:</span>
            <div class="bank-content">
              <span class="text" id="copy2">{{ bankInfo.holder }}</span>
              <span class="btn" @click="copy('holder')">Nhấn để sao chép</span>
            </div>
          </div>

          <!-- <div
            class="text-container bank-name bank-info-main"
            style="display: none"
          >
            <span class="bank-title bank-info-name">số seri:</span>
            <div class="bank-content">
              <span class="text" id="copy3">6014</span>
              <span class="btn" onclick="copy1('copy3')">Nhấn để sao chép</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  width: 118px;
  // height: 34px;
  padding: 15px 0;
  margin-right: 10px;
  background: #4964f3;
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px 0px rgba(0, 34, 215, 0.5);
  border-radius: 12px;
  /*line-height: 34px;*/
  text-align: center;
  font-family: DINAlternate-Bold;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 700;
}

.bank {
  background: #ffffff;
  padding: 10px 2px;
  border-radius: 12px;
}

.bank > p {
  font-family: DINAlternate-Bold;
  font-size: 14px;
  color: #acacb5;
  text-align: center;
}

.bank .text-container {
  text-align: left;
  padding: 10px 0;
}

.bank .text-container .bank-title {
  font-family: DINAlternate-Bold;
  font-size: 14px;
  color: #acacb5;
  letter-spacing: 0;
  font-weight: 700;
  padding-left: 10px;
}

.bank .text-container .bank-content {
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  color: #000000;
}

.bank-content .text {
  width: 50%;
  height: 34px;
  line-height: 34px;
  background: #f3f4fd;
  border-radius: 12px;
  padding: 0 10px;
  font-family: DINAlternate-Bold;
  font-size: 16px;
  color: #1b1c21;
  letter-spacing: 1.2px;
  font-weight: 700;
}
</style>
