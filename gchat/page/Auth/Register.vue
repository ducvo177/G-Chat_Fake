<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
const email = ref('')
const password = ref('')
const repeat_password = ref('');
const router = useRouter()
const register = () => {
    //validate ở đây
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      notification['success']({
        message: 'Bạn đã đăng nhập thành công',
        description:
          'Tài khoản của bạn đã được đăng ký thành công',
          duration: 2,
      })
      router.push('/chat')
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
    <h1>Đăng ký</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><input type="password" placeholder="Repeat Password" v-model="repeat_password" /></p>
    <p><button @click="register">Đăng ký</button></p>
    <nav>
        <router-link to="/login">Đăng nhập</router-link>
    </nav>
  </div>
</template>
<style></style>
