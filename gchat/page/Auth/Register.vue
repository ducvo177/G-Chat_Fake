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
  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  if(!strongRegex.test(password.value)){
    notification['error']({
      message: 'Error',
      duration: 2,
      description: 'Mật khẩu phải dài ít nhất 8 ký tự, có chứa chữ cái in hoa, in thường, chữ số và ký tự đặc biệt'
    })
    return;
  }

  if(password.value !== repeat_password.value){
    notification['error']({
      message: 'Error',
      duration: 2,
      description: 'Mật khẩu không khớp!'
    })
    return;    
  }

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
    <div class="auth-inner">
      <div class="card">
        <div class="card-content">
          <div class="card-header">
            <div class="image-wrapper">
                <img data-v-26b3ec93="" src="https://id.giaohangtietkiem.vn/img/logo.82d97e41.png" style="height: 60px;">
            </div>
            <h3 class="text-center text-dark font-weight-light">Đăng ký</h3>
            <h5 class="text-center text-dark font-weight-light">Đăng ký tài khoản mới</h5>
          </div>
          <span>
            <fieldset class="form-group">
              <input type="text" placeholder="Email" v-model="email" class="form-control"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="password" placeholder="Password" v-model="password" class="form-control"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="password" placeholder="Repeat Password" v-model="repeat_password" class="form-control"/>
            </fieldset>
          </span>
          <div class="button-wrapper">
            <button @click="register" class="btn btn-success btn-block">Đăng ký</button>
          </div>
          <div class="link-wrapper">
            <router-link to="/login">Đăng nhập</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
