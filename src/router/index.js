import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/layout/MainLayout.vue";
import { useUserStore } from "@/store/user";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("@/components/home/HomePage.vue"),
      },
      {
        path: "/Game",
        name: "Game",
        component: () => import("@/components/lottery/Game.vue"),
      },
      {
        path: "/Choose",
        name: "Choose",
        component: () => import("@/components/home/Choose.vue"),
      },
      {
        path: "/Video",
        name: "Video",
        component: () => import("@/components/video/Video.vue"),
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import("@/components/mine/Mine.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    meta: { redirectIfLoggedIn: true },
    component: () => import("@/components/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { redirectIfLoggedIn: true },
    component: () => import("@/components/auth/Login.vue"),
  },
  {
    path: "/HomeDetail/:id",
    name: "DetailGirl/:id",
    component: () => import("@/components/home/DetailGirl.vue"),
  },
  {
    path: "/Lottery",
    name: "Lottery",
    meta: { auth: true },
    component: () => import("@/components/lottery/LotteryGame.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/components/home/List.vue"),
  },
  {
    path: "/ProfileOnList",
    name: "ProfileOnList",
    component: () => import("@/components/home/ProfileOnList.vue"),
  },
  {
    path: "/PlayVideo/:id",
    name: "PlayVideo/:id",
    component: () => import("@/components/video/PlayVideo.vue"),
  },
  {
    path: "/Setting",
    name: "Setting",
    meta: { auth: true },
    component: () => import("@/components/home/Settings.vue"),
  },
  {
    path: "/Infomation",
    name: "Infomation",
    meta: { auth: true },
    component: () => import("@/components/setting/Info.vue"),
  },
  {
    path: "/Language",
    name: "Language",
    component: () => import("@/components/home/Language.vue"),
  },
  {
    path: "/EditPayPassword",
    name: "EditPayPassword",
    meta: { auth: true },
    component: () => import("@/components/withdraw/EditPayPassword.vue"),
  },
  {
    path: "/SetLoginPassword",
    name: "SetLoginPassword",
    meta: { auth: true },
    component: () => import("@/components/auth/SetLoginPassword.vue"),
  },
  {
    path: "/Setname",
    name: "Setname",
    meta: { auth: true },
    component: () => import("@/components/setting/SetName.vue"),
  },
  {
    path: "/Setsex",
    name: "Setsex",
    meta: { auth: true },
    component: () => import("@/components/setting/Setsex.vue"),
  },
  {
    path: "/Setbank",
    name: "Setbank",
    meta: { auth: true },
    component: () => import("@/components/setting/SetBank.vue"),
  },
  {
    path: "/Personalreport",
    name: "Personalreport",
    meta: { auth: true },
    component: () => import("@/components/mine/Personalreport.vue"),
  },
  // {
  //   path: "/RechargeRecord",
  //   name: "RechargeRecord",
  //   meta: { auth: true },
  //   component: () => import("@/components/mine/RechargeRecord.vue"),
  // },
  {
    path: "/GameRecord",
    name: "GameRecord",
    meta: { auth: true },
    component: () => import("@/components/mine/GameRecord.vue"),
  },
  {
    path: "/Notice",
    name: "Notice",
    meta: { auth: true },
    component: () => import("@/components/mine/Noitice.vue"),
  },
  {
    path: "/Moneylog",
    name: "Moneylog",
    meta: { auth: true },
    component: () => import("@/components/setting/Moneylog.vue"),
  },
  {
    path: "/Recharge",
    name: "Recharge",
    meta: { auth: true },
    component: () => import("@/components/deposit/Recharge.vue"),
  },
  {
    path: "/Channel",
    name: "Channel",
    meta: { auth: true },
    component: () => import("@/components/deposit/Channel.vue"),
  },
  {
    path: "/RechargeRecord",
    name: "RechargeRecord",
    meta: { auth: true },
    component: () => import("@/components/deposit/RechargeRecord.vue"),
  },
  {
    path: "/SetPayPassword",
    name: "SetPayPassword",
    meta: { auth: true },
    component: () => import("@/components/withdraw/SetPayPassword.vue"),
  },

  {
    path: "/BindCard",
    name: "BindCard",
    meta: { auth: true },
    component: () => import("@/components/withdraw/BindCard.vue"),
  },

  {
    path: "/withdraw",
    name: "withdraw",
    meta: { auth: true },
    component: () => import("@/components/withdraw/Withdraw.vue"),
  },

  {
    path: "/WithdrawRecord",
    name: "WithdrawRecord",
    meta: { auth: true },
    component: () => import("@/components/withdraw/WithdrawRecord.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, _, next) => {
  const isLoggedIn = localStorage.getItem("accessToken");

  if (to.meta.auth && !isLoggedIn) {
    return next({ name: "Login" });
  }

  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    return next({ name: "index" });
  }

  if (isLoggedIn) {
    const userStore = useUserStore();
    try {
      userStore.getUserInfo();
    } catch (error) {
      return next();
    }
  }
  return next();
});


export default router;
