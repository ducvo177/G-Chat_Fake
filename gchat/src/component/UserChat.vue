<script setup>

import { defineProps } from 'vue'
const props = defineProps({
    message: {
        type: Object,
        default: '',
    }
})
console.log(props.message);
</script>

<template>
    <div class="user_chat">
        <div class="user_chat-content">
            <div v-if="props.message.attachments" >
                <div v-for="attachment in props.message.attachments">
                    <img class="image_attachment" :src="attachment.url" alt="User Attachment" />  
                </div>
               
            </div>
            <div v-else>
              <div v-if="props.message.msg_type == 'text'" class="user_chat-text">
                {{ props.message.text }}
              </div>
              <div v-if="props.message.msg_type == 'sticker'" class="user_chat-text">
                {{ props.message.text }}
              </div>
            </div>
        </div>
    </div>
</template>
