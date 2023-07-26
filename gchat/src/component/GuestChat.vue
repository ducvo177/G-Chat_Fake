<script setup>
import { Avatar, message } from 'ant-design-vue'
import { defineProps } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: ''
  }
})
console.log(props.message)
</script>
<template>
  <div class="guest_chat">
    <p class="guest_chat-time">Hôm nay,14:02</p>
    <div class="guest_chat-container">
      <div class="guest_chat-img">
        <Avatar size="{64}" :src="props.message.sender.avatar" />
      </div>

      <div class="guest_chat-content">
        <h1 class="guest_chat-name">
          {{ props.message.sender.fullname }}
        </h1>
        <div v-if="props.message.attachments" >
            <div v-for="attachment in props.message.attachments">
                <img class="image_attachment" :src="attachment.url" alt="Guest Attachment" />  
            </div>
           
        </div>
        <div v-else>
          <div v-if="props.message.msg_type == 'text'" class="guest_chat-text">
            {{ props.message.text }}
          </div>
          <div v-if="props.message.msg_type == 'sticker'" class="guest_chat-text">
            {{ props.message.text }}
          </div>
        </div>

        <div class="guest_chat-reaction" style="visibility: hidden">
          <div class="guest_chat-emoji">
            <span class="fill-heart"></span>
          </div>
          <div class="guest_chat-emoji">
            <span class="notfill-heart"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
