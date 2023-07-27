<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import axios from 'axios';
import Summary from 'ant-design-vue/lib/vc-table/Footer/Summary';

const id = ref('')
const token = ref('')
const router = useRouter()

const submit = (userId, token) => {
  localStorage.setItem('user_id', userId.value);
  localStorage.setItem('token', token.value);
}

const baseURL = 'https://chat.ghtk.vn/api/v3/channels';
const tag_id = '';
const group_id = 1;
const is_favorite = 0;
const limit = 40;
const after = '';

const firstChannelId = ref('');

const login = () => {
  submit(id, token);
  axios.get(baseURL, { params: {
                        tag_id: tag_id,
                        group_id: group_id,
                        is_favorite: is_favorite,
                        limit: limit,
                        after: after,
                        token: localStorage.getItem("token"),
                        access_token: localStorage.getItem("token")
                    }})
    .then((res) => {
      firstChannelId.value = res.data.data[0].channel_id;
      notification['success']({
        message: 'Bạn đã đăng nhập thành công',
        duration: 2,
        description:
          'Bạn đã đăng nhập thành công'
      })
      router.push({ name: 'chat', params: { channel_id: firstChannelId.value} });

    })
    .catch((error) => {
        notification['error']({
        message: 'Error',
        duration: 2,
        description: error.message
      })
      console.log(error)
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
              <input type="text" placeholder="Id" v-model="id" class="form-control"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="password" placeholder="token" v-model="token" class="form-control"/>
            </fieldset>
          </span>
          <div class="button-wrapper">
            <button @click="login" class="btn btn-success btn-block">Đăng Nhập</button>
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
