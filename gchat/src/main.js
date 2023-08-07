import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database";
import EmojiPicker from 'vue-emoji-picker'


const firebaseConfig = {
  apiKey: "AIzaSyAeCcNAtQ6Yd_VhRCQl5nwGQ2m6b7B8oHE",
  authDomain: "chat-fake-95985.firebaseapp.com",
  projectId: "chat-fake-95985",
  storageBucket: "chat-fake-95985.appspot.com",
  messagingSenderId: "597048785934",
  appId: "1:597048785934:web:d43c03c5adbcb799e0905f",
  measurementId: "G-GGDCSBX7HM"
};

// Initialize Firebase
const app = createApp(App)
const appchat = initializeApp(firebaseConfig);
const database = getDatabase(appchat);

app.use(createPinia())
app.use(Antd);
app.use(EmojiPicker);
app.use(router);
app.mount('#app')

export{database,ref,push, onValue};