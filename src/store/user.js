import API from "@/api";
import axios from "@/axios";
import { defineStore } from "pinia";
import router from "@/router";

const defaultState = () => {
  return {
    userInfo: null,
    isLogin: localStorage.hasOwnProperty("accessToken")
  }
}

export const useUserStore = defineStore("user", {
  state: () => defaultState(),

  getters: {},

  actions: {
    async getUserInfo() {
      try {
        const res = await axios.get(API.USER_INFO)
        if (res.success) {
          this.userInfo = res.data;
          return res.data
        }
      } catch (error) {
        console.log(error);
      }
    },

    updateUserInfo(payload) {
      Object.assign(this.userInfo, payload)
    },

    login(accessToken) {
      localStorage.setItem("accessToken", accessToken);
      this.isLogin = true;
    },

    logout() {
      localStorage.removeItem("accessToken");
      this.$reset();
      router.push("/")
    },

    $reset() {
      Object.assign(this, defaultState());
    },
  },
});
