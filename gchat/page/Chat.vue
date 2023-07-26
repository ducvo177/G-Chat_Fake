<script setup>
import ChatBox from '../src/component/ChatBox.vue';
import ChatInfor from '../src/component/ChatInfor.vue';
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  userId:{
    type:String,
    required: true
  }
});

</script>
<template>
    <ChatInfor></ChatInfor>
    <ChatBox :userId="userId"></ChatBox>
</template>