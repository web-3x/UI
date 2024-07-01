<script setup>
import { ref, reactive, computed, watch, onUnmounted } from "vue";
import socket from "@/socket";
import { useRoute, useRouter } from "vue-router";
import CountDown from "@/helpers/CountDown";
import { formatNumber } from "@/helpers/format";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { showFailToast } from "vant";

import axios from "@/axios";
import API from "@/api";
import { handleRequest } from "@/helpers/request";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const id = route.query.id;

if (!id) {
  router.push("/Game");
}

const amount = ref("");
const isShowOrder = ref(false);
const isShowConfirmOrder = ref(false);

const showResult = ref(false);
const gameHistory = ref([]);

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
  // { id: "1", name: "IDOL 1", active: false },
  // { id: "2", name: "IDOL 2", active: false },
  // { id: "3", name: "IDOL 3", active: false },
  // { id: "4", name: "IDOL 4", active: false },
]);

const choicesSelected = computed(() => {
  return choices.value.filter((e) => e.active);
});
const hhmmss = computed(() => {
  return `${String(countDown.hh).padStart(2, "0")}:${String(
    countDown.mm
  ).padStart(2, "0")}:${String(countDown.ss).padStart(2, "0")}`;
});

const countDownTime = new CountDown(0, (hh, mm, ss, t) => {
  Object.assign(countDown, { hh, mm, ss, t });
});

const io = socket();

io.emit("join", id, (data) => {
  if (data.success == 0) {
    router.push("/Game");
  }
});

io.on("game-info", (data) => {
  const { name, session, countdown } = data;
  const end = Date.now() + countdown * 1000
  Object.assign(gameInfo, { session, end });
  countDownTime.restart(end);
  getGameHistory();
});

onUnmounted(() => {
  io.disconnect();
});

const toggleChoice = (id) => {
  const idx = choices.value.findIndex((e) => e.id === id);
  if (idx === -1) return;
  choices.value[idx].active = !choices.value[idx].active;
  if (!choices.value[idx].active) {
    choices.value[idx].amount = 0;
  }
};

const getGameHistory = () => {
  const params = { page: 1, size: 20 };
  handleRequest(axios.get(API.GAME_HISTORY + "/" + id, { params })).then(
    (res) => {
      if (res.success) {
        gameHistory.value = res.data;
      }
    }
  );
};

const GameInfo = () => {
  handleRequest(axios.get(API.GAME_INFO + "/" + id)).then(
    (res) => {
      if (res.success) {
        choices.value = res.data.info?.betOptions ?? []
        gameInfo.name = res.data.info.name
        console.log(res.data.info)
      }
    }
  )
};

const confirmOrder = () => {
  if (choicesSelected.value.length === 0) {
    return showFailToast("Hãy chọn 1 con số");
  }

  if (!amount.value) {
    return showFailToast("Vui lòng nhập số điểm.");
  }

  isShowConfirmOrder.value = true;
};

const cancelOrder = () => {
  choices.value.forEach((c) => {
    c.active = false;
  });
  amount.value = "";
};

const submit = () => {
  const data = {
    id,
    choices: choicesSelected.value.map((e) => {
      return {
        id: e.id,
        amount: Number(amount.value),
      };
    }),
  };
  handleRequest(axios.post(API.ORDER, data)).then((res) => {
    if (res.success) {
      showFailToast("Thành công");
      amount.value = 0;
      choices.value.forEach((e) => (e.active = 0));
      isShowConfirmOrder.value = false;
      userStore.updateUserInfo({ money: res.balance });
    } else {
      showFailToast(res.message ?? "Lỗi bình chọn");
    }
  });
};
const countChoices = computed(() => {
  return choicesSelected.value.length;
});

const totalAmount = computed(() => {
  return choicesSelected.value.reduce((prev, curr) => {
    return prev + amount.value;
  }, 0);
});

const choicesText = computed(() => {
  if (choicesSelected.value.length) {
    return choicesSelected.value.map((e) => e.name).join(",");
  }
  return "Không được chọn";
});

watch(amount, (value) => {
  choices.value.forEach((c) => {
    c.amount = value;
  });
});

watch(countChoices, (newVal, oldVal) => {
  if (newVal > 0 && oldVal == 0) {
    isShowOrder.value = true;
  } else if (newVal == 0 && oldVal > 0) {
    isShowOrder.value = false;
    isShowConfirmOrder.value = false;
  }
});

const formatResultText1 = (r) => {
  const s = r.split(",").reduce((prev, curr) => {
    return prev + (curr >> 0);
  }, 0);

  return s > 10 ? "IDOL 1" : "IDOL 2";
};
const formatResultText2 = (r) => {
  const s = r.split(",").reduce((prev, curr) => {
    return prev + (curr >> 0);
  }, 0);
  return s % 2 ? "IDOL 3" : "IDOL 4";
};

GameInfo();

</script>
<template>
  <div class="container page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div @click="$router.push('/')" class="van-nav-bar__left">
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
        <div class="kuaisan-ball left" v-if="gameHistory[0]">
         
          <span class="res-des middle" v-for="r, i in gameHistory[0].resultText ?? []" :key="i">{{
            r
          }}</span
          >
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
              @click="toggleChoice(c.id)"
            >
              <div class="wrapper">
                <div class="content">
                  <p class="name-text large" style="color: #c24491;">{{ c.name }}</p>
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
              <span class="text num">{{ formatNumber(userInfo.money) }}</span
              ><span class="text">Đ</span>
            </div>
          </div>
          <div class="right" @click="confirmOrder">Xác nhận</div>
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
                      placeholder="Vui lòng nhập số điểm"
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
              <div
                class="item"
                v-for="(item, index) in gameHistory"
                :key="index"
              >
                <div class="left font-weight">{{ item.session }}</div>
                <div class="right font-weight">
                  <div
                    class="kuaisan-ball left"
                    style="
                      justify-content: center;
                      width: 100%;
                      margin-left: 40%;
                    "
                  >
                    <span class="res-des middle" v-for="r, i in item.resultText ?? []" :key="i"
                      >{{ r }} </span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
  <van-popup v-model:show="isShowConfirmOrder">
    <div class="confirm-order-modal">
      <div class="head van-hairline--bottom">
        <p class="text" style="margin: 1em">Bình chọn</p>
      </div>
      <ul class="list">
        <li
          class="lise-item van-hairline--bottom"
          v-for="(item, index) in choicesSelected"
          :key="index"
        >
          <div class="main">
            <p class="bet-name">{{ item.name }}</p>
            <p class="detail-text">
              1ĐặtX{{ item.amount }}Đ={{ item.amount }}Đ
            </p>
          </div>
          <van-icon name="close" @click="toggleChoice(item.id)" />
        </li>
      </ul>
      <div class="sub-bar">
        <van-button
          type="default"
          class="item cancel-btn"
          color="#979799"
          plain
          @click="cancelOrder"
          >Hủy bình chọn</van-button
        >
        <van-button
          type="default"
          class="item"
          color="linear-gradient(270deg, #c24491, #775fd9)"
          @click="submit"
          >Xác nhận</van-button
        >
      </div>
    </div>
  </van-popup>
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
.wrapper .item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.333vw 0;
}
.wrapper .item .kuaisan-ball .res-des.middle {
  width: auto;
}

.rectangle.active .content {
  background: transparent;
}

.lise-item .main p {
  margin: 1em 0;
}

.cancel-btn :deep(.van-button__text) {
  color: currentColor !important;
}

</style>
