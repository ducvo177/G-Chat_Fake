<script setup>
import { CameraOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

useRouter()

const props = defineProps({
  channelId: String,
  channelName: String,
  channelType: String,
  lastMessage: Object,
  countMessageUnread: Number,
  avatar: String,
  groupImages: Object,
})  
const router = useRouter()
const changeChannel = () => {
  router.push({ name: 'chat', params: { channel_id: props.channelId } })
}

const displayTime = (timestamp) => {
  const now = new Date()
  const then = new Date(timestamp)
  const timeDiff = now - then
  return now.getDate() == then.getDate() && timeDiff < 86400000
    ? then.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : then.toLocaleString('vi-VN', { month: '2-digit', day: '2-digit' }).replace('-', '\/')
}

const formatLongText = (text, mentions = []) => {
  if (typeof text !== 'string') {
    text = text.toString()
  }
  text = text.replace(/<@all>/g, '<span class="extract-text__mention"> @ Tất cả</span>')

  text = text.replace(/<@(\d+)>/g, (match, id) => {
    const idToFind = id
    const foundElement = mentions?.find((item) => item.id === idToFind)
    return foundElement
      ? '<span class="extract-text__mention">@' + foundElement.fullname + '</span>'
      : match
  })

  return text
}
</script>

<template>
  <div class="channel-item" @click="changeChannel">
    <div class="channel-avatar">
      <div class="avatar-wrapper">
        <div
          v-if="avatar"
          class="ant-avatar ant-avatar-circle ant-avatar-image avatar-channel"
          style="width: 48px; height: 48px; line-height: 48px; font-size: 19.2px"
        >
          <img :src="avatar" alt="avatar-channel" />
        </div>
        <div
          v-else-if="channelType === 'group' && !avatar"
          class="avatar-multiple-wrapper"
          style="transform: rotate(-45deg)"
        >
          <div class="ant-avatar-group">
            <span
              class="ant-avatar ant-avatar-circle ant-avatar-image avatar-channel"
              style="
                width: 38px;
                height: 38px;
                line-height: 38px;
                font-size: 15.2px;
                transform: rotate(45deg);
                z-index: 2;
                background-color: rgb(6, 146, 85);
              "
            >
              <img :src="`${groupImages[0].avatar}`" alt="avatar-channel" />
            </span>
            <span
              class="ant-avatar ant-avatar-circle ant-avatar-image avatar-channel"
              style="
                width: 38px;
                height: 38px;
                line-height: 38px;
                font-size: 15.2px;
                transform: rotate(45deg);
                z-index: 1;
                background-color: rgb(6, 146, 85);
              "
            >
              <img :src="`${groupImages[1].avatar}`" alt="avatar-channel" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="channel-content">
      <div class="channel-title">
        <div class="channel-name">
          {{ channelName }}
        </div>
        <div class="channel-time">
          {{ displayTime(lastMessage.created_at) }}
        </div>
      </div>
      <div class="channel-message">
        <div class="channel-message-left">
          <div class="channel-message-text">
            <span v-if="channelType === 'group'"
              >{{ lastMessage.sender.fullname.split(' ').pop() }}:&nbsp;</span
            >
            <span
              class="last-message"
              v-if="!lastMessage.attachments"
              v-html="formatLongText(lastMessage.text, lastMessage?.mentions)"
            >
            </span>
            <div v-else style="display: flex">
              <div style="margin-top: 1px">
                <CameraOutlined />
              </div>
              <span style="margin-left: 5px; font-size: 13px">ảnh</span>
            </div>
          </div>
        </div>
        <div class="channel-message-more">
          <div class="channel-notify" v-if="countMessageUnread > 0">
            <span class="ant-badge ant-badge-not-a-wrapper">
              <sup
                data-show="true"
                class="ant-scroll-number ant-badge-count ant-badge-multiple-words"
              >
                <span class="ant-scroll-number-only" style="transition: none 0s ease 0s">
                  <span class="ant-scroll-number-only-unit current">{{ countMessageUnread }}</span>
                </span>
              </sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
