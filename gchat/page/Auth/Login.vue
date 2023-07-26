<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      notification['success']({
        message: 'Bạn đã đăng nhập thành công',
        duration: 2,
        description:
          'Bạn đã đăng nhập thành công'
      })
      router.push({ name: 'chat', params: { channel_id: 4333222501709897463} });
    })
    .catch((error) => {
        notification['error']({
        message: 'Error',
        duration: 2,
        description: error.message
      })
    })
}
</script>
<template>
  <div class="auth-container">
    <h1>Đăng nhập</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Đăng Nhập</button></p>
    <router-link to="/register">Đăng ký</router-link>
  </div>
</template>
<style></style>
