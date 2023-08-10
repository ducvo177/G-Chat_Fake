<script setup>
import { EllipsisOutlined } from '@ant-design/icons-vue'
import GuestChat from './GuestChat.vue'
import UserChat from './UserChat.vue'
import ChatSideBar from './ChatSideBar.vue'
import { ref, onMounted, watch, nextTick } from 'vue'
import EmojiPicker from './EmojiPicker.vue'
import { defineProps } from 'vue'
import { routerKey, useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Avatar, message } from 'ant-design-vue'

const props = defineProps({
  channel_id: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const router = useRouter()
const channelId = ref(route.params.channel_id)
const currentUserId = ref(localStorage.getItem('user_id'))
const listMessage = ref([])
const access_token = ref(localStorage.getItem('token'))
const chatboxRef = ref()
const showMenu = ref(false)
const channel = ref([])
const messageInputRef = ref('')
const selectFiles = ref()
const channelMember = ref([])
const before = ref(null)
const chatLoading = ref(true)
let noMoreData = false
const isLoading = ref(false)
const imagePreviewContainer = ref(null)
const showEmojiPicker = ref(false)
const pickerContainerRef = ref()
const isTyping = ref(false)
const typingData = ref(null)

const ws = new WebSocket(
  `wss://ws.ghtk.vn/ws/chat?Authorization=${access_token.value}&appType=gchat&appVersion=2023-08-04,08:50:05&device=web&deviceId=tvUGqRHOuTxKgO7WmMq9&source=chats`
)

ws.onopen = function () {
  ws.send(`${access_token.value}|sub|chats_user_${currentUserId.value}`)
}

const onMessage = () => {
  ws.onmessage = function (event) {
  let message = JSON.parse(event.data)
  if (message.event === 'message') {
    isTyping.value = false
    typingData.value = null
    loadData()
  }

  if (message.event === 'typing' && channelId.value == message.data.channel_id) {
    if (message.data.type == 1) {
      isTyping.value = true
      typingData.value = message.data

      scrollToBottom()
    } else {
      isTyping.value = false
      typingData.data = null
      scrollToBottom()
    }
  }
}
}
onMessage();

const handleEmojiClick = (emoji) => {
  const messageInput = messageInputRef
  messageInput.value.value += emoji
}

async function fetchProfile() {
  const apiUrl = `https://chat.ghtk.vn/api/v31/users?user_id=${currentUserId.value}&limit=40&access_token=${access_token.value}`
  try {
    const response = await axios.get(apiUrl)
    channelMember.value.push({
      id: response.data.data[0].id,
      fullname: response.data.data[0].fullname
    })
  } catch (error) {}
}

async function fetchGroup() {
  const apiUrl = `https://chat.ghtk.vn/api/v3/channel/members?channel_id=${channelId.value}&limit=40&access_token=${access_token.value}`
  try {
    const response = await axios.get(apiUrl)
    response.data.data.forEach((data) => channelMember.value.push(data))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Hàm để gọi API và lưu kết quả vào listMessage
async function fetchData() {
  chatLoading.value = true
  const apiUrl = `https://chat.ghtk.vn/api/v3/messages?channel_id=${channelId.value}&limit=40&access_token=${access_token.value}`
  try {
    const response = await axios.get(apiUrl)
    listMessage.value = response.data.data.reverse()
    noMoreData = response.data.data.length < 40
    chatLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function fetchInfo() {
  chatLoading.value = true
  const apiUrl = `https://chat.ghtk.vn/api/v3/channels/info?channel_id=${channelId.value}&access_token=${access_token.value}`
  try {
    const response = await axios.get(apiUrl)
    channel.value = response.data.data
    chatLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    router.push({ name: 'login' })
  }
}

function sendMess(messageText, image = null, formData) {
  if (image) {
    formData.append('file_id', image.id)
  }
  formData.append('channel_id', channelId.value)
  formData.append('msg_type', 'text')
  formData.append('ref_id', '1Pq2InaSrMP696rGQza5')
  formData.append('text', messageText)
  axios.post('https://chat.ghtk.vn/api/v3/messages', formData, {
    headers: {
      Authorization: `Bearer ${access_token.value}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  messageInputRef.value.style.borderTopLeftRadius = '30px'
  messageInputRef.value.style.borderTopRightRadius = '30px'
  imagePreviewContainer.value.style.display = 'none'
  messageInputRef.value.value = ''
  selectFiles.value = ''

  loadData()
}

async function sendMessage(messageInput) {
  let formData = new FormData()
  if (selectFiles.value) {
    formData.append('attachment', selectFiles.value, selectFiles.value.name)

    const response = await axios.post('https://chat.ghtk.vn/api/v3/public/upload', formData, {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    sendMess(messageInput, response.data.data, formData)
    loadData()
  } else {
    sendMess(messageInput, null, formData)
    loadData()
  }
}

const scrollToBottom = () => {
  // Hàm để cuộn xuống đáy của div
  const chatbox = document.getElementById('messages')
  chatbox.scrollTop = chatbox.scrollHeight
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value // Đảo ngược trạng thái của menu
}

const toogleEmoji = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

// Load more messages
async function fetchMoreData() {
  const apiUrl = `https://chat.ghtk.vn/api/v3/messages?channel_id=${channelId.value}&limit=40&access_token=${access_token.value}&before=${before.value}`
  try {
    const response = await axios.get(apiUrl)
    response.data.data.forEach((data) => listMessage.value.splice(0, 0, data))
    noMoreData = response.data.data.length < 40
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function setUpLoadMore() {
  let options = {
    root: document.getElementById('messages'),
    rootMargin: '0px',
    threshold: 1.0
  }

  let target = document.getElementById(listMessage.value[0].id)

  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !noMoreData) {
        before.value = listMessage.value[0].id
        isLoading.value = true
        await fetchMoreData()
        isLoading.value = false
        console.log(isLoading)
        target = document.getElementById(listMessage.value[0].id)
        observer.observe(target)
        console.log('Called! Now scroll to: ' + before.value)
        let chatContainer = document.getElementById('messages')
        document.getElementById(before.value).scrollIntoView({
          behavior: 'instant',
          block: 'start'
        })
      }
    })
  }

  let observer = new IntersectionObserver(callback, options)

  observer.observe(target)
}
const handleFocusInput = () => {
  showEmojiPicker.value = false
  // ws.send(
  //   JSON.stringify({
  //     channel: `chats_user_${currentUserId.value}`,
  //     event: 'type',
  //     data: {
  //       sender: {
  //         user_type:channel.value.partner.user_type,
  //         id:channel.value.partner.id,
  //         fullname:channel.value.partner.fullname,
  //         avatar:channel.value.partner.avatar,
  //         userId:channel.value.partner.id,
  //       },
  //       type: 1,
  //       channel_id: channelId.value
  //     }
  //   })
  // )
  // onMessage();
}
const loadData = async () => {
  chatLoading.value = true
  await fetchProfile()
  await fetchInfo()
  await fetchGroup()
  await fetchData()
  // load more...
  setUpLoadMore()
  nextTick(() => {
    scrollToBottom()
  })
  chatLoading.value = false
}

onMounted(() => {
  //Input tin nhắn
  const messageInputz = document.querySelector('.chatbox-footer-input')
  const sendmessageButton = document.querySelector('.sendmessage-button')
  const selecteFilesIcon = document.querySelector('.chatbox-footer-image')
  const inputElement = document.querySelector('.chatbox-footer-input-img')
  const imagePreview = document.querySelector('.image-preview')
  const imageContain = document.querySelector('.image_preview_container')
  messageInputz.addEventListener('focus', function () {
    sendmessageButton.style.display = 'block'
    selecteFilesIcon.style.display = 'none'
  })

  inputElement.addEventListener('change', function (event) {
    const selectedFiles = event.target.files
    if (selectedFiles.length > 0) {
      messageInputz.style.borderTopLeftRadius = '0px'
      messageInputz.style.borderTopRightRadius = '0px'

      selecteFilesIcon.style.display = 'none'
      imageContain.style.display = 'block'
      sendmessageButton.style.display = 'block'
      const reader = new FileReader()

      reader.onload = function () {
        imagePreview.src = reader.result
        imagePreview.style.display = 'block'
      }

      reader.readAsDataURL(selectedFiles[0])

      selectFiles.value = selectedFiles[0]
      inputElement.value = null
    } else {
      selecteFilesIcon.style.display = 'block'
      sendmessageButton.style.display = 'none'
    }
  })

  messageInputz.addEventListener('blur', function () {
    if (!messageInputz.value.trim()) {
      sendmessageButton.style.display = 'none'
      selecteFilesIcon.style.display = 'block'
    }
  })

  channelId.value = route.params.channel_id
  loadData()
})

watch(
  () => route.params.channel_id,
  (newId) => {
    channelId.value = newId
    loadData()
  }
)
</script>

<template>
  <div :class="{ 'chatbox-container': true, show: showMenu }" ref="chatboxRef">
    <!-- Chatbox header  -->
    <div class="chatbox-header">
      <div class="chatbox-header-content">
        <h1 class="chatbox-title">
          {{ channel.channel_name }}
        </h1>
        <span v-if="channel.channel_type == 'group'" style="font-size: 14px; color: #828282"
          >{{ channel.count_member }} thành viên</span
        >
        <span v-if="channel.channel_type == 'direct'" style="font-size: 14px; color: #828282">{{
          channel.partner.position_name
        }}</span>
      </div>

      <div
        class="ellipsis"
        @click="toggleMenu"
        style="cursor: pointer; right: 0; position: absolute"
      >
        <EllipsisOutlined />
      </div>
    </div>
    <!-- Chatbox content -->
    <div id="messages">
      <div class="chat-view-loading" v-if="isLoading">
        <div class="chat-view__loadmore chat-view__loadmore--top">
          <div class="compBaseSpinnerContainer">
            <a-spin />
          </div>
        </div>
      </div>
      <div>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
        <a-skeleton :loading="chatLoading" :active="true" :avatar="true" :paragraph="2">
          <div class="search-user-result"></div>
        </a-skeleton>
      </div>
      <div
        v-for="(message, index) in listMessage"
        :class="{ 'chatbox-content': true, show: showMenu }"
        :id="message.id"
      >
        <GuestChat
          v-if="message.sender.id != currentUserId && channelMember"
          :message="message"
          :channelMember="channelMember"
        ></GuestChat>
        <UserChat
          v-if="message.sender.id == currentUserId && channelMember"
          :message="message"
          :channelMember="channelMember"
        ></UserChat>
      </div>
      <div class="guest_chat" v-if="isTyping && typingData.channel_id== channelId">
        <div class="guest_chat-container">
          <div class="guest_chat-img">
            <Avatar size="{64}" :src="typingData.sender.avatar" />
          </div>

          <div class="guest_chat-content">
            <h1 class="guest_chat-name">
              {{ typingData.sender.fullname }}
            </h1>
            <div class="guest_chat-text">
              <img src="https://ghtk.me/images/dots.gif" style="height: 30px" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chatbox footer -->
    <div class="chatbox-footer">
      <div class="chatbox-footer_content">
        <div
          class="image_preview_container"
          style="
            height: 170px;
            background-color: #f5f4f4;
            display: none;
            width: 70vw;
            position: absolute;
            bottom: 70px;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            margin-left: 10px;
          "
          ref="imagePreviewContainer"
        >
          <img
            src=""
            alt="Xem trước ảnh"
            class="image-preview"
            style="
              display: none;
              width: 130px;
              height: 130px;
              margin-top: 10px;
              margin-left: 20px;
              object-fit: cover;
              border-radius: 10px;
              border: 1px solid #ccc;
            "
          />
        </div>
        <input
          type="text"
          class="chatbox-footer-input"
          placeholder="Nhập tin nhắn"
          ref="messageInputRef"
          @keyup.enter="sendMessage(messageInputRef.value)"
          style="margin-left: 10px"
          @focus="handleFocusInput"
        />
        <EmojiPicker
          v-if="showEmojiPicker"
          ref="pickerContainerRef"
          @emoji_click="handleEmojiClick"
          style="position: absolute; bottom: 100px; right: 23%"
        />
        <div class="chatbox-footer-attachment">
          <svg
            width="28"
            class="text-icon chatbox-footer-icon"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <g id="font_download_24px">
              <path
                id="icon/content/font_download_24px"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.3333 2.33334H4.66667C3.38333 2.33334 2.33333 3.38334 2.33333 4.66668V23.3333C2.33333 24.6167 3.38333 25.6667 4.66667 25.6667H23.3333C24.6167 25.6667 25.6667 24.6167 25.6667 23.3333V4.66668C25.6667 3.38334 24.6167 2.33334 23.3333 2.33334ZM16.415 15.75L14 9.31001L11.585 15.75H16.415ZM17.2783 18.0833L18.3283 20.86C18.5033 21.2917 18.9233 21.5833 19.39 21.5833C20.1833 21.5833 20.7317 20.7783 20.44 20.0433L15.4817 7.43168C15.2367 6.81334 14.6533 6.41668 14 6.41668C13.3467 6.41668 12.7633 6.81334 12.5067 7.43168L7.54833 20.0433C7.25667 20.7783 7.805 21.5833 8.59833 21.5833C9.07667 21.5833 9.49667 21.2917 9.66 20.8483L10.6983 18.0833H17.2783Z"
                fill="#00904A"
              ></path>
            </g>
          </svg>
          <svg
            width="24"
            class="sticker-icon chatbox-footer-icon"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_3473_58240)">
              <path
                d="M5.14286 0C3.77889 0 2.47078 0.541835 1.50631 1.50631C0.541835 2.47078 0 3.77889 0 5.14286V18.8571C0 20.2211 0.541835 21.5292 1.50631 22.4937C2.47078 23.4582 3.77889 24 5.14286 24H13.7143V18.7149C13.1491 18.811 12.5767 18.8586 12.0034 18.8571C10.14 18.8571 8.72229 18.3909 7.76057 17.9091C7.37564 17.7195 7.00846 17.4957 6.66343 17.2406C6.53451 17.1432 6.41037 17.0396 6.29143 16.9303L6.26571 16.9063L6.25714 16.8977L6.25371 16.8943L6.25029 16.8926C6.08888 16.7323 5.99776 16.5145 5.99695 16.287C5.99615 16.0596 6.08573 15.8411 6.246 15.6797C6.40627 15.5183 6.62409 15.4272 6.85154 15.4264C7.079 15.4256 7.29745 15.5152 7.45886 15.6754L7.464 15.6789L7.50171 15.7131C7.53943 15.7474 7.60457 15.8006 7.692 15.8674C7.87029 16.0011 8.148 16.188 8.52686 16.3766C9.27943 16.7537 10.4349 17.1429 12.0034 17.1429C12.744 17.1429 13.392 17.0554 13.9629 16.9114C14.2801 15.9789 14.8814 15.1691 15.6823 14.5957C16.4832 14.0223 17.4436 13.7141 18.4286 13.7143H24V5.14286C24 3.77889 23.4582 2.47078 22.4937 1.50631C21.5292 0.541835 20.2211 0 18.8571 0H5.14286ZM7.71429 10.2857C7.25963 10.2857 6.82359 10.1051 6.5021 9.78361C6.18061 9.46212 6 9.02609 6 8.57143C6 8.11677 6.18061 7.68074 6.5021 7.35925C6.82359 7.03776 7.25963 6.85714 7.71429 6.85714C8.16894 6.85714 8.60498 7.03776 8.92647 7.35925C9.24796 7.68074 9.42857 8.11677 9.42857 8.57143C9.42857 9.02609 9.24796 9.46212 8.92647 9.78361C8.60498 10.1051 8.16894 10.2857 7.71429 10.2857ZM18 8.57143C18 9.02609 17.8194 9.46212 17.4979 9.78361C17.1764 10.1051 16.7404 10.2857 16.2857 10.2857C15.8311 10.2857 15.395 10.1051 15.0735 9.78361C14.752 9.46212 14.5714 9.02609 14.5714 8.57143C14.5714 8.11677 14.752 7.68074 15.0735 7.35925C15.395 7.03776 15.8311 6.85714 16.2857 6.85714C16.7404 6.85714 17.1764 7.03776 17.4979 7.35925C17.8194 7.68074 18 8.11677 18 8.57143ZM16.788 22.9954C16.404 23.3811 15.936 23.664 15.4286 23.8303V18.4286C15.4286 16.7726 16.7726 15.4286 18.4286 15.4286H23.8303C23.6628 15.9411 23.3768 16.4068 22.9954 16.788L16.788 22.9954Z"
                fill="#00904A"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3473_58240">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>

          <svg
            width="24"
            class="emoji-icon chatbox-footer-icon"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            @click="toogleEmoji"
          >
            <path
              d="M12 0C5.37257 0 0 5.37257 0 12C0 18.6274 5.37257 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37257 18.6274 0 12 0ZM16.0095 7.72673C17.0291 7.72673 17.8557 8.55328 17.8557 9.57289C17.8557 10.5925 17.0291 11.419 16.0095 11.419C14.9899 11.419 14.1634 10.5925 14.1634 9.57289C14.1634 8.55328 14.9899 7.72673 16.0095 7.72673ZM7.99047 7.72673C9.01007 7.72673 9.83662 8.55328 9.83662 9.57289C9.83662 10.5925 9.01007 11.419 7.99047 11.419C6.97087 11.419 6.14432 10.5925 6.14432 9.57289C6.14432 8.55328 6.97087 7.72673 7.99047 7.72673ZM12 19.5165C8.86576 19.5165 6.03054 17.5383 4.94495 14.5938L6.42968 14.0464C7.28703 16.3717 9.52557 17.9341 12 17.9341C14.4744 17.9341 16.713 16.3717 17.5703 14.0464L19.0551 14.5938C17.9695 17.5383 15.1342 19.5165 12 19.5165Z"
              fill="#00904A"
            ></path>
          </svg>
        </div>
        <div class="chatbox-footer-image">
          <svg width="24" class="image-icon" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.99994 8.00006C6.99994 9.10455 6.10455 9.99994 5.00006 9.99994C3.89539 9.99994 3 9.10455 3 8.00006C3 6.89539 3.89539 6 5.00006 6C6.10455 6 6.99994 6.89539 6.99994 8.00006Z"
              fill="#00904A"
            ></path>
            <path
              d="M21 2.00015H3C1.34601 2.00015 0 3.49572 0 5.33349V18.6668C0 18.7291 0.013916 18.7879 0.0170288 18.8501C0.00292969 18.9834 0.00897216 19.1179 0.0529175 19.2446C0.299927 20.8069 1.52399 22.0002 3 22.0002H21C22.654 22.0002 24 20.5046 24 18.6668V5.33349C24 3.49572 22.654 2.00015 21 2.00015ZM3 4.22244H21C21.551 4.22244 21.9999 4.7213 21.9999 5.33349V14.1547L16.7401 8.31017C16.056 7.55008 14.9431 7.55008 14.2601 8.31017L9.50006 13.5991L8.23993 12.1991C7.55603 11.439 6.44293 11.439 5.75995 12.1991L2.00006 16.3768V5.33349C2.00006 4.7213 2.44904 4.22244 3 4.22244Z"
              fill="#00904A"
            ></path>
          </svg>
          <input
            type="file"
            class="chatbox-footer-input-img"
            ref="imageRef"
            style="position: absolute; right: 24%; opacity: 0; cursor: pointer; width:100px;"
            multiple
          />
        </div>
        <div>
          <button
            @click="sendMessage(messageInputRef.value)"
            class="sendmessage-button"
            style="border: none; background-color: #fff; margin-left: 8px; margin-top: 4px"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="14" fill="#00904A"></rect>
              <g clip-path="url(#clip0_9236_112452)">
                <path
                  d="M13.0721 20.5416C13.0721 20.7957 13.1737 21.0395 13.3546 21.2192C13.5355 21.3989 13.7809 21.4999 14.0367 21.4999C14.2907 21.4913 14.5329 21.3914 14.7182 21.2187C14.8064 21.1293 14.8759 21.0234 14.9227 20.9072C14.9695 20.791 14.9926 20.6667 14.9908 20.5416V9.76033L15.536 10.2916L18.8808 13.6145C19.0574 13.7772 19.29 13.8666 19.5309 13.8645C19.6557 13.8659 19.7795 13.8426 19.8952 13.7961C20.0109 13.7496 20.1162 13.6808 20.2049 13.5936C20.2936 13.5064 20.3641 13.4026 20.4122 13.2882C20.4602 13.1738 20.485 13.051 20.485 12.927C20.4926 12.6805 20.4022 12.441 20.2333 12.2603L14.7077 6.78116C14.6191 6.69266 14.5137 6.62243 14.3976 6.57451C14.2816 6.52659 14.1571 6.50192 14.0314 6.50192C13.9058 6.50192 13.7813 6.52659 13.6653 6.57451C13.5492 6.62243 13.4438 6.69266 13.3552 6.78116L7.82954 12.2707C7.73135 12.3576 7.65274 12.4641 7.59887 12.5832C7.54626 12.7015 7.51775 12.829 7.51499 12.9582C7.51387 13.0869 7.53884 13.2144 7.58838 13.3332C7.63167 13.4528 7.70365 13.5601 7.79809 13.6457C7.88849 13.7373 7.99513 13.8114 8.11264 13.8645C8.23023 13.9069 8.35451 13.9281 8.47961 13.927C8.61352 13.9278 8.74597 13.8994 8.86756 13.8437C8.98507 13.7906 9.09171 13.7164 9.18211 13.6249L12.5373 10.2916L13.0721 9.76033V20.5416Z"
                  fill="white"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_9236_112452">
                  <rect
                    width="12.97"
                    height="15"
                    fill="white"
                    transform="translate(7.51501 6.5)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div :class="{ menu: true, show: showMenu }">
    <ChatSideBar v-if="channel.channel_id" :channel="channel"> </ChatSideBar>
  </div>
</template>
