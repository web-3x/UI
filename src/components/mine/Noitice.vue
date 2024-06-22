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
  if (data.length < params.size) {
    finished.value = true;
  }
  if (refreshing.value) {
    list.value = data;
    refreshing.value = false;
    return showToast("Làm mới thành công.");
  }
  list.value.unshift(...data);
};

const onRefresh = () => {
  params.page = 1;
  list.value = [];
  finished.value = false;
  loading.value = true;
  onLoad();
};

const getData = async () => {
  const res = await handleRequest(axios.get(API.NOTIFICATION_LIST, { params }));
  if (res.success) {
    params.page += 1;
    return res.data.data;
  }
  return [];
};

const read = async (idx) => {
  const id = list.value[idx]?._id;
  if (!id) return;
  const res = await handleRequest(axios.get(API.NOTIFICATION_READ + "/" + id));
  if (res.success) {
    list.value[idx].read = 1;
  }
};

onRefresh();
</script>

<template>
  <div class="container page">
    <div class="header">
      <div class="nav-bar van-nav-bar">
        <div class="van-nav-bar__content">
          <div @click="$router.push('/mine')" class="van-nav-bar__left">
            <i
              class="van-icon van-icon-arrow-left"
              style="color: rgb(255, 255, 255)"
            ></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">Thông báo hệ thống</div>
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
          <div v-for="(item, index) in list" :key="index" class="listItem">
            <div class="listTitle">{{ item.title }}</div>
            <div class="listContent html">
              <p v-html="item.content"></p>
              <div style="text-align: right" v-if="!item.read">
                <van-tag
                  :show="countNotify"
                  round
                  size="large"
                  type="warning"
                  style="
                    font-size: 14px;
                    padding: 5px;
                    margin: 8px 0;
                    cursor: pointer;
                  "
                  @click="read(index)"
                >
                  Đánh dấu đã đọc
                </van-tag>
              </div>
            </div>
            <div class="listTime">
              <div class="listTimeText">
                {{ formatDateTime(item.createdAt) }}
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<style scoped>
.container p {
  color: #000;
  padding-left: 0;
  padding-right: 0;
}
</style>
