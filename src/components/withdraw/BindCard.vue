<script setup>
import { reactive, ref } from "vue";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";
import { showFailToast, showToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const showBankSelect = ref(false);
const formData = reactive({
  bankName: "",
  accountNumber: "",
  holder: "",
});

const columns = [
  {
    text: "Techcombank",
    value: "Techcombank",
  },
  {
    text: "Sacombank",
    value: "Sacombank",
  },
  {
    text: "Vietcombank",
    value: "Vietcombank",
  },
  {
    text: "Asia Commercial Bank ACB",
    value: "Asia Commercial Bank ACB",
  },
  {
    text: "DongA Bank",
    value: "DongA Bank",
  },
  {
    text: "Vietin Bank",
    value: "Vietin Bank",
  },
  {
    text: "BIDV",
    value: "BIDV",
  },
  {
    text: "Eximbank Vietnam",
    value: "Eximbank Vietnam",
  },
  {
    text: "Bank Central Asia",
    value: "Bank Central Asia",
  },
  {
    text: "Bank Negara Indonesia",
    value: "Bank Negara Indonesia",
  },
  {
    text: "Bank Rakyat Indonesia",
    value: "Bank Rakyat Indonesia",
  },
  {
    text: "Mandiri Bank",
    value: "Mandiri Bank",
  },
  {
    text: "CIMB Niaga",
    value: "CIMB Niaga",
  },
  {
    text: "VP",
    value: "VP",
  },
  {
    text: "MB",
    value: "MB",
  },
  {
    text: "Tien Phong Commercial",
    value: "Tien Phong Commercial",
  },
  {
    text: "AGRI BANK",
    value: "AGRI BANK",
  },
  {
    text: "LienVietPostBank",
    value: "LienVietPostBank",
  },
  {
    text: "SHB",
    value: "SHB",
  },
  {
    text: "PVcombank",
    value: "PVcombank",
  },
  {
    text: "SAIGON BANK",
    value: "SAIGON BANK",
  },
  {
    text: "SeABank",
    value: "SeABank",
  },
  {
    text: "ABBank",
    value: "ABBank",
  },
  {
    text: "Bac A Bank",
    value: "Bac A Bank",
  },
  {
    text: "Viet Capital Bank",
    value: "Viet Capital Bank",
  },
  {
    text: "MSB",
    value: "MSB",
  },
  {
    text: "KienLongBank",
    value: "KienLongBank",
  },
  {
    text: "NAMABANK",
    value: "NAMABANK",
  },
  {
    text: "NCB",
    value: "NCB",
  },
  {
    text: "HD Bank",
    value: "HD Bank",
  },
  {
    text: "OCB",
    value: "OCB",
  },
  {
    text: "VIB",
    value: "VIB",
  },
  {
    text: "SCB",
    value: "SCB",
  },
  {
    text: "SGB",
    value: "SGB",
  },
  {
    text: "VietABank",
    value: "VietABank",
  },
  {
    text: "BAOVIET Bank",
    value: "BAOVIET Bank",
  },
  {
    text: "VietBank",
    value: "VietBank",
  },
  {
    text: "PGBank",
    value: "PGBank",
  },
  {
    text: "SHBVN",
    value: "SHBVN",
  },
  {
    text: "WOO",
    value: "WOO",
  },
  {
    text: "UOB",
    value: "UOB",
  },
  {
    text: "SCVN",
    value: "SCVN",
  },
  {
    text: "VID",
    value: "VID",
  },
  {
    text: "HSBC",
    value: "HSBC",
  },
  {
    text: "HLB",
    value: "HLB",
  },
  {
    text: "CIMB",
    value: "CIMB",
  },
  {
    text: "MB BAN",
    value: "MB BAN",
  },
];

const onConfirm = ({ selectedOptions }) => {
  formData.bankName = selectedOptions[0].value;
  showBankSelect.value = false;
};

const submit = () => {
  if(!formData.bankName) {
    return showFailToast("Vui lòng chọn một ngân hàng.")
  }
  if(!formData.accountNumber) {
    return showFailToast("Vui lòng nhập số tài khoản.")
  }
  if(!formData.holder) {
    return showFailToast("Vui lòng nhập tên thật của bạn.")
  }

  // const { password } = formData;
  
  handleRequest(axios.post(API.BANK_LINK, formData)).then((res) => {
    if(res.success) {
      showToast("Thành công")
      router.push("/mine")
    } else {
      showFailToast(res.message ?? "Lỗi")
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
        <div class="van-nav-bar__title van-ellipsis">
          Liên kết số tài khoản ngân hàng
        </div>
      </div>
    </div>
    <div class="main-box">
      <div class="label">Vui lòng điền số tài khoản của bạn để rút tiền</div>
      <div class="van-cell-group van-hairline--top-bottom">
        <div class="van-cell van-field" @click="showBankSelect = true">
          <div class="van-cell__title van-field__label">
            <span>Tên ngân hàng</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                :value="formData.bankName"
                readonly="readonly"
                placeholder="Vui lòng chọn một ngân hàng"
                class="van-field__control"
              />
            </div>
          </div>
        </div>
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>Số tài khoản</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                v-model="formData.accountNumber"
                type="tel"
                inputmode="numeric"
                placeholder="Vui lòng nhập số tài khoản ngân hàng"
                class="van-field__control"
              />
            </div>
          </div>
        </div>
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label"><span>Tên</span></div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                v-model="formData.holder"
                type="text"
                placeholder="Vui lòng nhập tên thật của bạn"
                class="van-field__control"
              />
            </div>
          </div>
        </div>
      </div>
      <p>
        Khách hàng thân ái,để bảo vệ sự an toàn cho tài sản của bạn,Vui lòng
        liên kết tên thật và cài đặt mật khẩu rút tiền,Nếu tên không khớp với
        tên tài khoản,sẽ không thể rút tiền.
      </p>
    </div>
    <button class="bindCard van-button van-button--default van-button--normal" @click="submit">
      <div class="van-button__content">
        <span class="van-button__text">Xác nhận liên kết tài số tài khoản</span>
      </div>
    </button>
  </div>
  <van-popup
    v-model:show="showBankSelect"
    confirm="Xác nhận"
    position="bottom"
    :style="{ height: '35%' }"
  >
    <van-picker
      title=""
      confirm-button-text="Xác nhận"
      cancel-button-text="Hủy"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="showBankSelect = false"
    />
  </van-popup>
</template>
