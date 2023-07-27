<script setup>

import { defineProps } from 'vue'
const props = defineProps({
    message: {
        type: Object,
        default: '',
    },
    channel: {
        type: Object,
  }
})
const formatLongText = (text) => {

// Thay thế <@all> thành <span class="extract-text__mention">Tất cả</span>
text = text.replace(/<@all>/g, '<span class="extract-text__mention user"> @ Tất cả</span>');

// Thay thế các từ có định dạng @abc thành <span class="extract-text__mention">abc</span>
text = text.replace(/<@(\d+)>/g, (match, id) => {
  const idToFind = id;
  console.log(idToFind);
  const foundElement = props.channel.group_images?.find(item => item.id === idToFind);
  return foundElement ? '<span class="extract-text__mention user">@'+foundElement.fullname+'</span>': match;
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

    <div class="user_chat attachment" v-if="props.message.attachments">
        <div class="user_chat-content">
            <div v-for="attachment in props.message.attachments">
                <img class="image_attachment" :src="attachment.url" alt="User Attachment" />  
            </div>
        </div>
    </div>

    <div class="user_chat" v-else>
        <div class="user_chat-content deleted-chat" v-if="props.message.status == -1" >
            {{ props.message.text }}
        </div>

        <div class="user_chat-content" v-else>
              <div v-if="props.message.msg_type == 'text'" class="user_chat-text" v-html="formatLongText(props.message.text)">
              </div>
              <div v-if="props.message.msg_type == 'sticker'" class="user_chat-text">
                {{ props.message.text }}
              </div>
        </div>
    </div>
</template>
