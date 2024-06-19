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
  if (data.length < params.size) {
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
  const res = await handleRequest(axios.get(API.USER_MONEY_LOGS, { params }));
  if (res.success) {
    params.page += 1;
    return res.data;
  }
  return [];
};

const colorStyle = (amount) => {
  return amount > 0 ? {
    color: "#07c160"
  } : {}
}
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
          <div class="van-nav-bar__title van-ellipsis">Số dư biến động</div>
        </div>
      </div>
    </div>
    <div class="content">
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
          <div v-for="item in list" :key="item" class="listItem">
            <div>
              <div class="listTitle">{{ item.note }}</div>
              <div class="listTime">
                <div class="listTimeText">{{ formatDateTime(item.createAt) }}</div>
              </div>
            </div>
            <div style="flex: 1 1 0%"></div>
            <div class="listMoney" :style="colorStyle(item.amount > 0)">{{ formatNumber(item.amount) }}Đ</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<style scoped>
.listItem {
  margin-bottom: 2.667vw;
  padding: 2.667vw;
  position: relative;
  color: #000;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
