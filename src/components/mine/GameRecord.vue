<script setup>
import { reactive, ref } from "vue";
import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";
import { formatNumber, formatDateTime } from "@/helpers/format";
import { showToast } from "vant";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const params = reactive({
  page: 1,
  size: 10,
});

const onLoad = async () => {
  const data = await getData();
  loading.value = false;
  if (refreshing.value) {
    list.value = data;
    refreshing.value = false;
    return showToast("Làm mới thành công.");
  }

  list.value.unshift(...data);
  if (data.length == 0) {
    finished.value = true;
  }
};

const onRefresh = () => {
  params.page = 1;
  finished.value = false;
  loading.value = true;
  onLoad();
};

const getData = async () => {
  const res = await handleRequest(axios.get(API.ORDER_HISTORY, { params }));
  if (res.success) {
    params.page += 1;
    return res.data;
  }
  return [];
};

onRefresh();
</script>

<template>
  <div class="container page">
    <div class="header">
      <div class="nav-bar van-nav-bar van-hairline--bottom">
        <div class="van-nav-bar__content">
          <div @click="$router.go(-1)" class="van-nav-bar__left">
            <i
              class="van-icon van-icon-arrow-left"
              style="color: rgb(255, 255, 255)"
            ></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">
            Lịch sử bỏ phiếu bầu
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        pulling-text="Kéo lên để làm mới..."
        loading-text="Đang tải..."
        loosing-text="Phát hiện có thể làm mới được"
        style="height: 100%; overflow: auto"
      >
        <van-empty description="Dữ liệu trống" v-if="!list.length" />
        <van-list
          v-else
          v-model:loading="loading"
          error-text="Lỗi"
          loading-text="Đang tải..."
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <div v-for="item in list" :key="item" class="item_list">
            <div class="lottery_info">
              <div class="cover van-image">
                <img
                  src="@/assets/images/common/bgGirl.png"
                  class="van-image__img"
                />
              </div>
              <span class="period-number">{{ item.session }}</span
              ><span class="period-number">{{ item.product?.name }}</span>
            </div>
            <div class="recent">
              <div class="kuaisan-ball left">
               <span class="res-des middle" style="font-size: 100%">{{ item.choiceText }}</span
                ><span class="res-des middle"></span>
              </div>
            </div>
            <div class="topInfo">
              <span style="color: rgb(7, 193, 96)"></span>
            </div>
            <div class="time topInfoSp">
              <span>Số điểm đặt cược：{{ formatNumber(item.amount )}} Đ</span>
            </div>
            <div class="time">
              <span>Thời gian phục vụ：{{ formatDateTime(item.createdAt) }}</span>
            </div>
            <div class="time">
              <span>Thời gian giải quyết：{{ formatDateTime(item.updatedAt) }}</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
