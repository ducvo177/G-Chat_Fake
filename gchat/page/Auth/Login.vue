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
    <div class="auth-inner">
      <div class="card">
        <div class="card-content">
          <div class="card-header">
            <div class="image-wrapper">
              <img data-v-26b3ec93="" src="https://id.giaohangtietkiem.vn/img/logo.82d97e41.png" style="height: 60px;">
            </div>
            <h3 class="text-center text-dark font-weight-light">Đăng nhập</h3>
            <h5 class="text-center text-dark font-weight-light">Sử dụng Tài khoản của bạn</h5>
          </div>
          <span>
            <fieldset class="form-group">
              <input type="text" placeholder="Email" v-model="email" class="form-control"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="password" placeholder="Password" v-model="password" class="form-control"/>
            </fieldset>
          </span>
          <div class="button-wrapper">
            <button @click="register" class="btn btn-success btn-block">Đăng Nhập</button>
          </div>
          <div class="link-wrapper">
            <router-link to="/register">Đăng ký</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
