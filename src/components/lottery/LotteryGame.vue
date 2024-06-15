<script setup>
import { ref, reactive, computed, watch } from "vue";
import socket from "@/socket";
import { useRoute } from "vue-router";
import CountDown from "@/helpers/CountDown";
import { formatNumber } from "@/helpers/format";

import { showFailToast } from "vant";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const route = useRoute();

const id = route.query.id;

const amount = ref("");
const isShowOrder = ref(false);
const showResult = ref(false);
const showPopupRs = () => {
  showResult.value = !showResult.value;
};

const countDown = reactive({
  hh: 0,
  mm: 0,
  ss: 0,
  t: 0,
});

const gameInfo = reactive({
  name: "",
  session: "",
  end: 0,
});

const choices = ref([
  { id: "1", name: "IDOL 1", active: false },
  { id: "2", name: "IDOL 2", active: false },
  { id: "3", name: "IDOL 3", active: false },
  { id: "4", name: "IDOL 4", active: false },
]);

const hhmmss = computed(() => {
  return `${String(countDown.hh).padStart(2, "0")}:${String(
    countDown.mm
  ).padStart(2, "0")}:${String(countDown.ss).padStart(2, "0")}`;
});

const countDownTime = new CountDown(0, (hh, mm, ss, t) => {
  Object.assign(countDown, { hh, mm, ss, t });
});

const io = socket();

io.emit("join", id);

io.on("game-info", (data) => {
  const { name, session, end } = data;
  Object.assign(gameInfo, { name, session, end });
  countDownTime.restart(end);
});

const toggleChoice = (idx) => {
  choices.value[idx].active = !choices.value[idx].active;
  if(!choices.value[idx].active) {
    choices.value[idx].amount = 0;
  }
};


const submit = () => {
  const cs = choices.value.filter(e => e.active)
  if(cs.length === 0) return;
  const data = {
    id,
    choices: cs.map(e => {
      return {
        id: e.id,
        amount: Number(amount.value)
      }
    })
  }
  handleRequest(axios.post(API.ORDER, data)).then(res => {
    if(res.success) {
      showFailToast("Bình chọn thành công.")
      amount.value = 0;
      choices.value.forEach((e) => e.active = 0); 
    } else {
      showFailToast(res.message ?? "Lỗi bình chọn")
    }
  })
}
const countChoices = computed(() => {
  return choices.value.filter((e) => e.active).length;
});

const totalAmount = computed(() => {
  return choices.value.reduce((prev, curr) => {
    return prev + (curr.active ? amount.value : 0)
  }, 0);
});

const choicesText = computed(() => {
  const cs = choices.value.filter((e) => e.active);
  if(cs.length) {
    return cs.map(e => e.name).join(",")
  }
  return "Không được chọn"
});

watch(amount, (value) => {
  choices.value.forEach(c => {
    c.amount = value;
  });
});

</script>
<template>
  <div class="container page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div @click="$router.go(-1)" class="van-nav-bar__left">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          >
          </i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">{{ gameInfo.name }}</div>
      </div>
    </div>
    <div class="record">
      <div class="period">
        <div class="cover van-image">
          <img class="van-image__img" src="@/assets/images/common/bgGirl.png" />
        </div>
        <span class="period-number">{{ gameInfo.session }}</span>
        <div class="next-number">
          <div class="van-count-down">{{ hhmmss }}</div>
        </div>
      </div>
      <div
        class="linear-gradient"
        style="
          background: linear-gradient(
            to right,
            rgba(126, 86, 120, 0),
            rgb(230, 195, 161),
            rgba(126, 86, 120, 0)
          );
        "
      ></div>
      <div class="recent" @click="showPopupRs">
        <div class="kuaisan-ball left">
          <span class="res-des middle">IDOL 2</span
          ><span class="res-des middle">IDOL 4</span>
        </div>
        <i
          class="van-icon van-icon-arrow-down down"
          :class="showResult ? 'up' : ''"
        ></i>
      </div>
    </div>
    <div class="history_popup"></div>

    <div class="wrapper">
      <div class="options-bar">
        <div class="game">
          <div
            class="linear-gradient"
            style="
              background: linear-gradient(
                to right,
                rgba(126, 86, 120, 0),
                rgb(230, 195, 161),
                rgba(126, 86, 120, 0)
              );
            "
          ></div>
          <div class="sumValueTwoSides">
            <div
              class="rectangle large"
              :class="{ active: c.active }"
              v-for="(c, idx) in choices"
              :key="idx"
              @click="toggleChoice(idx)"
            >
              <div class="wrapper">
                <div class="content">
                  <p class="name-text large">{{ c.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="bar">
          <div class="left" @click="isShowOrder = !isShowOrder">
            <div class="item">
              <i class="jixuanico van-icon van-icon-cart-o"> </i
              ><span class="text">Bình chọn</span>
            </div>
            <div class="line"></div>
          </div>
          <div class="mid">
            <div>
              <span class="text">Số dư khả dụng</span>
            </div>
            <div>
              <span class="text num">0</span><span class="text">Đ</span>
            </div>
          </div>
          <div class="right" @click="submit">Xác nhận</div>
        </div>
        <div class="wrapper" :class="isShowOrder === true ? 'active' : ''">
          <div class="item">
            <span class="label">Hiện tại số đã chọn：</span>
            <div class="bet-number">{{ choicesText }}</div>
            <i
              class="van-icon van-icon-arrow-down down"
              :class="isShowOrder ? '' : 'up'"
              @click="isShowOrder = !isShowOrder"
            >
            </i>
          </div>
          <div class="item">
            <span class="label">Điểm xếp hạng</span>
            <div class="amount-wrapper">
              <div class="van-cell van-field">
                <div
                  class="van-cell__value van-cell__value--alone van-field__value"
                >
                  <div class="van-field__body">
                    <input
                      v-model.number="amount"
                      type="number"
                      inputmode="numeric"
                      placeholder="Vui lòng nhập số tiền"
                      class="van-field__control"
                    />
                  </div>
                </div>
              </div>
              <span class="label">Đ</span>
            </div>
          </div>
          <div class="item">
            <div class="part">
              <span> Tổng cộng</span
              ><span class="number">{{ countChoices }}</span
              ><span>Đặt</span>
            </div>
            <div class="part">
              <span> Tổng cộng</span
              ><span class="number">{{ totalAmount }} </span><span>Đ</span>
            </div>
          </div>
        </div>
      </div>

      <van-popup
        v-model:show="showResult"
        position="top"
        :style="{ height: '70%' }"
      >
        <div class="van-pull-refresh">
          <div class="van-pull-refresh__track" style="transition-duration: 0ms">
            <div class="van-pull-refresh__head"></div>
            <div class="wrapper">
              <div class="item">
                <div class="left font-weight">Mã xếp hạng</div>
                <div class="right font-weight">Kết quả xếp hạng</div>
              </div>
              <div class="item">
                <div class="left font-weight">202406103303</div>
                <div class="right font-weight">
                  <div
                    class="kuaisan-ball left"
                    style="
                      justify-content: center;
                      width: 100%;
                      margin-left: 40%;
                    "
                  >
                    <span class="res-des middle">IDOL 2</span
                    ><span class="res-des middle">IDOL 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<style scoped>
.van-cell {
  font-size: 4vw !important;
  line-height: 6.667vw !important;
}
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 1.333vw 2.133vw;
  overflow: hidden;
  color: #323233;
  font-size: 1.867vw;
  line-height: 3.2vw;
  background-color: #fff;
}
.wrapper .item .kuaisan-ball .res-des.middle {
  width: auto;
}

.rectangle.active .content {
  background: transparent;
}
</style>