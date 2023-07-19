<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="user_chat">
    <div class="user_chat-content">
      <div class="user_chat-text">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>