<script setup>
import { Avatar, message } from 'ant-design-vue'
import { defineProps } from 'vue'
import MessageTime from './MessageTime.vue';

const props = defineProps({
  message: {
    type: Object,
    default: ''
  },
  channelMember: {
        type: Object,
  }
})

const formatLongText = (text, mentions = []) => {

  // Thay thế <@all> thành <span class="extract-text__mention">Tất cả</span>
  text = text.replace(/<@all>/g, '<span class="extract-text__mention"> @ Tất cả</span>');

  // Thay thế các từ có định dạng @abc thành <span class="extract-text__mention">abc</span>
  text = text.replace(/<@(\d+)>/g, (match, id) => {
    const idToFind = id;
    const foundElement = mentions?.find(item => item.id === idToFind);
    return foundElement ? '<span class="extract-text__mention">@'+foundElement.fullname+'</span>': match;
  });

  // Thay thế các đoạn văn bản trong dấu **[ ]** thành <strong>[nội dung in đậm]</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Tiếp tục xử lý bẻ dòng như trước
  const maxLineLength = 190;
  const words = text.replace(/\n/g, '<br>').split(' ');
  let currentLine = '';
  let result = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const potentialLine = currentLine + (currentLine ? ' ' : '') + word;

    if (potentialLine.length <= maxLineLength) {
      // Nếu độ dài của dòng hiện tại vẫn chưa vượt quá giới hạn
      currentLine = potentialLine;
    } else {
      // Nếu độ dài của dòng hiện tại vượt quá giới hạn
      result += (result ? '<br>' : '') + currentLine;
      currentLine = word;
    }
  }

  // Thêm dòng cuối cùng (nếu cần)
  if (currentLine) {
    result += (result ? '<br>' : '') + currentLine;
  }

  return result;
};

</script>
<template>
  <div class="guest_chat" v-if="props.message.status == -1">
    <div class="guest_chat-container deleted-chat"  >
      <div class="guest_chat-img">
        <Avatar size="{64}" :src="props.message.sender.avatar" />
      </div>
      <div class="guest_chat-content ">
        <h1 class="guest_chat-name">
          {{ props.message.sender.fullname }}
        </h1>
          <div v-if="props.message.msg_type == 'text'||props.message.msg_type == 'quote_message'" class="guest_chat-text deleted-chat" v-html="formatLongText(props.message.text)">
      </div>
   </div>
   </div>
   </div>

   <div class="guest_chat" v-else>
 <div class="guest_chat-container" v-if="props.message.msg_type != 'text'&& props.message.msg_type != 'quote_message'&&props.message.msg_type != 'sticker'">
        <span class="change_member">{{props.message.text}}</span>
    </div>
    <div class="guest_chat-container" v-else>
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
          <div v-if="props.message.msg_type == 'text'||props.message.msg_type == 'quote_message'" class="guest_chat-text" v-html="formatLongText(props.message.text, props.message?.mentions)">
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
