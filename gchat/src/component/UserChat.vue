<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    message: {
        type: Object,
        default: '',
    }
})
</script>
<template>
    <div class="user_chat">
        <div class="user_chat-content">
            <div class="user_chat-text">
                {{ props.message.text }}
            </div>
        </div>
    </div>
</template>