import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8Z4eI_98zMOtOYjJ_6ZEATAR6fJZWemk",
  authDomain: "chat-app-b38d3.firebaseapp.com",
  databaseURL: "https://chat-app-b38d3-default-rtdb.firebaseio.com",
  projectId: "chat-app-b38d3",
  storageBucket: "chat-app-b38d3.appspot.com",
  messagingSenderId: "9500383516",
  appId: "1:9500383516:web:3fa0df39409fc2a00a02d9",
  measurementId: "G-970VNTNKFW"
};

// Initialize Firebase
const app = createApp(App)
initializeApp(firebaseConfig);


app.use(createPinia())
app.use(Antd);
app.use(router);
app.mount('#app')

export{ref,push};