<script setup>
import { Avatar } from 'ant-design-vue';
import { defineProps } from 'vue';

const props = defineProps({
  guestMessage: {
    type: Object,
    required: true
  },
  userId:{
    type:String,
  }
});

</script>
<template>
    <div class="guest_chat">
        <p class="guest_chat-time">Hôm nay,14:02</p>
        <div class="guest_chat-container">
            <div class="guest_chat-img">
                <Avatar size={64} src="https://cache.giaohangtietkiem.vn/d/b02b4c89125f45d59995a5b6721b5d35.jpg?width=88"/>
            </div> 
     
            <div class="guest_chat-content">
                <h1 class="guest_chat-name">
                    {{guestMessage.userName}}
                </h1>
                <div class="guest_chat-text">
                    {{ guestMessage.message }}
                </div>
                <div class="guest_chat-reaction">
                    <div v-if="guestMessage.liked?.includes(userId)" class="guest_chat-emoji">
                        <span class="fill-heart"></span>
                    </div>
                    <div v-else class="guest_chat-emoji">
                        <span class="notfill-heart"></span>
                    </div>
               
                </div>
            </div>
        </div>
    </div>
</template>