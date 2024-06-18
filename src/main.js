import '@vant/touch-emulator';

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vant, { Icon } from "vant";

import { createPinia } from 'pinia'

import "vant/lib/index.css";
import "@/assets/css/chunkVendor.css";
import "@/assets/css/main.css";

const app = createApp(App);
app.use(router);
app.use(createPinia())
app.use(Vant);
app.use(Icon);
app.mount("#app");
