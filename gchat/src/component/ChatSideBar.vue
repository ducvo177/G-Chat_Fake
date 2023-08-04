<script setup>
import { defineProps, ref } from 'vue'
import {
  MessageOutlined,
  UserOutlined,
  UserAddOutlined,
  TagOutlined,
  RightOutlined,
LeftOutlined
} from '@ant-design/icons-vue'
import{ Switch} from 'ant-design-vue';
const props = defineProps({
  channel: {
    type: Object
  }
})


const notification = ref(props.channel.is_notification == '1'?true : false);
const handleChange = (value) => {
    notification.value = value
}
const isInfor = ref(false);
const handleShowInfor = ()=>{
    isInfor.value = !isInfor.value;
}
</script>
<template>
  <div class="chatsidebar-container" v-if="!isInfor" >
    <div class="chatsidebar-header">
      <img v-if="channel.avatar" :src="channel.avatar" class="chatinfor-avt" placeholder="chatinfor-avt" />
      <div class="image-gallery" v-else>
      <img v-for="(image, index) in channel.group_images" :key="index" :src="image.avatar" class="chatinfor-avt-gr" :placeholder="'chatinfor-avt'" />
  </div>
      <h2 class="chatinfor-title">
        {{ channel.channel_name }}
      </h2>
      <div class="chatinfor-active" v-if="channel.access?.code == 'active'">
        <span class="active-member"> </span> Đang Hoạt Động
      </div>
      <div class="chatinfor-main">
        <div class="chatinfor-circle" v-if="channel?.channel_type == 'direct'" @click="handleShowInfor">
          <div
            style="
              width: 50px;
              height: 50px;
              background-color: #00904a;
              border-radius: 50%;
              margin-bottom: 5px;
              margin-left: 5px;
              color: #fff;
              font-size: 24px;
              line-height: 45px;
            "
          >
            <UserOutlined />
          </div>
          <p>Thông Tin</p>
        </div>
        <div class="chatinfor-circle" v-if="channel?.channel_type == 'group'">
          <div
            style="
              width: 50px;
              height: 50px;
              background-color: #00904a;
              border-radius: 50%;
              margin-bottom: 5px;
              margin-left: 5px;
              color: #fff;
              font-size: 24px;
              line-height: 45px;
            "
          >
            <UserAddOutlined />
          </div>
          <p>Thêm</p>
        </div>
        <div class="chatinfor-circle">
          <div
            style="
              width: 50px;
              height: 50px;
              background-color: #00904a;
              border-radius: 50%;
              margin-bottom: 5px;
              margin-left: 5px;
              color: #fff;
              font-size: 24px;
              line-height: 45px;
            "
          >
            <MessageOutlined />
          </div>
          <p>Chat</p>
        </div>
        <div class="chatinfor-circle">
          <div
            style="
              width: 50px;
              height: 50px;
              background-color: #00904a;
              border-radius: 50%;
              margin-bottom: 5px;
              margin-left: 5px;
              color: #fff;
              font-size: 24px;
              line-height: 45px;
            "
          >
            <TagOutlined />
          </div>
          <p>Gắn thẻ</p>
        </div>
      </div>
    </div>

    <div class="chatsidebar-content">
      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg width="16" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.8104 18.9119L14.6467 13.8308C15.9989 12.3616 16.8297 10.4187 16.8297 8.28068C16.8291 3.7071 13.0619 0 8.41459 0C3.76725 0 0.00012207 3.7071 0.00012207 8.28068C0.00012207 12.8543 3.76725 16.5614 8.41459 16.5614C10.4226 16.5614 12.2642 15.8668 13.7108 14.7122L18.8946 19.8134C19.1471 20.0622 19.5572 20.0622 19.8098 19.8134C20.0629 19.5646 20.0629 19.1607 19.8104 18.9119ZM8.41459 15.2873C4.48243 15.2873 1.29481 12.1504 1.29481 8.28068C1.29481 4.41101 4.48243 1.27403 8.41459 1.27403C12.3468 1.27403 15.5344 4.41101 15.5344 8.28068C15.5344 12.1504 12.3468 15.2873 8.41459 15.2873Z"
              fill="black"
            ></path>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
          <p class="chatinfor-text">Tìm tin nhắn</p>
          <div class="chatinfor-more">
          </div>
        </div>
      </div>

      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.25135 12.9278L7.9999 12.7815L7.74846 12.9278L3.38492 15.4666C3.28222 15.5017 3.18138 15.505 3.10117 15.4849C3.02565 15.466 2.9641 15.4266 2.91806 15.3576C2.91151 15.3435 2.90801 15.3343 2.90615 15.3289C2.90394 15.3226 2.90343 15.3198 2.9031 15.3178C2.9026 15.3148 2.9015 15.307 2.90078 15.2883C2.89997 15.2673 2.8999 15.2425 2.8999 15.2V2.4C2.8999 1.31614 3.71604 0.5 4.7999 0.5H11.1999C12.2838 0.5 13.0999 1.31614 13.0999 2.4V15.2C13.0999 15.3264 13.06 15.3928 13.0263 15.4264C12.9927 15.4601 12.9263 15.5 12.7999 15.5C12.7574 15.5 12.7326 15.4999 12.7116 15.4991C12.6929 15.4984 12.6851 15.4973 12.6821 15.4968C12.6801 15.4965 12.6773 15.496 12.671 15.4938C12.6648 15.4916 12.6538 15.4874 12.636 15.4789L8.25135 12.9278Z"
              stroke="black"
            ></path>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
          <p class="chatinfor-text">Chat đã lưu</p>
          <div class="chatinfor-more">
            <span>{{channel?.favorite.is_fav}}</span>
            <RightOutlined />
          </div>
        </div>
      </div>

      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg width="16" height="16" viewBox="0 0 21 20" fill="none">
            <path
              d="M5.17133 2.5C3.7907 2.5 2.67133 3.61938 2.67133 5C2.67133 6.38062 3.7907 7.5 5.17133 7.5C6.55195 7.5 7.67133 6.38062 7.67133 5C7.67133 3.61938 6.55195 2.5 5.17133 2.5ZM5.17133 6.25C4.4807 6.25 3.92133 5.69062 3.92133 5C3.92133 4.30938 4.4807 3.75 5.17133 3.75C5.86195 3.75 6.42133 4.31 6.42133 5C6.42133 5.69 5.86195 6.25 5.17133 6.25ZM17.6713 0H2.67133C1.2907 0 0.171326 1.11938 0.171326 2.5V17.5C0.171326 18.8806 1.2907 20 2.67133 20H17.6713C19.0519 20 20.1713 18.8806 20.1713 17.5V2.5C20.1713 1.11938 19.0519 0 17.6713 0ZM2.67133 18.75C1.9807 18.75 1.42133 18.19 1.42133 17.5V16.9125L6.38695 12.4656L12.672 18.75H2.67133ZM18.9213 17.5C18.9213 18.19 18.3619 18.75 17.6713 18.75H14.4413L9.83633 14.0843L15.1713 8.74938L18.9213 12.4994V17.5ZM18.9213 10.705L15.1713 6.875L8.95757 13.1944L6.42133 10.625L1.42133 15.21V2.5C1.42133 1.81 1.9807 1.25 2.67133 1.25H17.6713C18.3619 1.25 18.9213 1.81 18.9213 2.5V10.705Z"
              fill="black"
            ></path>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
        <p class="chatinfor-text">Ảnh, file, link chia sẻ</p>
        <div class="chatinfor-more">
            <span>{{channel?.total_media}}</span>
            <RightOutlined />
          </div>
        </div>
      </div>

      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="clock-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
            <path
              d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
            ></path>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
        <p class="chatinfor-text">Lịch hẹn</p>
        <div class="chatinfor-more">
            <span>2</span>
            <RightOutlined />
          </div>
        </div>
      </div>

      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg
            width="17"
            height="17"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M469.333,64H42.667C19.135,64,0,83.135,0,106.667v298.667C0,428.865,19.135,448,42.667,448h426.667 C492.865,448,512,428.865,512,405.333V106.667C512,83.135,492.865,64,469.333,64z M42.667,85.333h426.667 c1.572,0,2.957,0.573,4.432,0.897c-36.939,33.807-159.423,145.859-202.286,184.478c-3.354,3.021-8.76,6.625-15.479,6.625 s-12.125-3.604-15.49-6.635C197.652,232.085,75.161,120.027,38.228,86.232C39.706,85.908,41.094,85.333,42.667,85.333z  M21.333,405.333V106.667c0-2.09,0.63-3.986,1.194-5.896c28.272,25.876,113.736,104.06,169.152,154.453 C136.443,302.671,50.957,383.719,22.46,410.893C21.957,409.079,21.333,407.305,21.333,405.333z M469.333,426.667H42.667 c-1.704,0-3.219-0.594-4.81-0.974c29.447-28.072,115.477-109.586,169.742-156.009c7.074,6.417,13.536,12.268,18.63,16.858 c8.792,7.938,19.083,12.125,29.771,12.125s20.979-4.188,29.76-12.115c5.096-4.592,11.563-10.448,18.641-16.868 c54.268,46.418,140.286,127.926,169.742,156.009C472.552,426.073,471.039,426.667,469.333,426.667z M490.667,405.333 c0,1.971-0.624,3.746-1.126,5.56c-28.508-27.188-113.984-108.227-169.219-155.668c55.418-50.393,140.869-128.57,169.151-154.456 c0.564,1.91,1.194,3.807,1.194,5.897V405.333z"
                ></path>
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
        <p class="chatinfor-text">Mail chung</p>
        </div>
      </div>

      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg width="16" height="16" viewBox="0 0 18 16" fill="none">
            <path
              d="M12.7002 15V13.3333C12.7002 12.4493 12.3841 11.6014 11.8215 10.9763C11.2589 10.3512 10.4958 10 9.7002 10H3.7002C2.90455 10 2.14148 10.3512 1.57888 10.9763C1.01627 11.6014 0.700195 12.4493 0.700195 13.3333V15"
              stroke="black"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6.5 7C8.15685 7 9.5 5.65685 9.5 4C9.5 2.34315 8.15685 1 6.5 1C4.84315 1 3.5 2.34315 3.5 4C3.5 5.65685 4.84315 7 6.5 7Z"
              stroke="black"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M17 15V13.2964C16.9996 12.5415 16.8029 11.8082 16.4409 11.2115C16.0789 10.6149 15.5721 10.1887 15 10"
              stroke="black"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 1C12.5721 1.17056 13.0792 1.55796 13.4413 2.10114C13.8034 2.64432 14 3.31238 14 4C14 4.68762 13.8034 5.35567 13.4413 5.89886C13.0792 6.44204 12.5721 6.82944 12 7"
              stroke="black"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
        <p class="chatinfor-text">Nhóm chung</p>
        <div class="chatinfor-more">
            <span>{{channel?.gr}}</span>
            <RightOutlined />
          </div>
        </div>
      </div>

      <div class="chatinfor-feature">
        <div class="chatinfor-icon">
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
            <path
              d="M7.4995 18.1648C5.94851 18.1648 4.68701 16.9033 4.68701 15.3523C4.68701 15.0418 4.93901 14.7898 5.24951 14.7898C5.56001 14.7898 5.81201 15.0418 5.81201 15.3523C5.81201 16.2831 6.56883 17.0398 7.4995 17.0398C8.43032 17.0398 9.187 16.2831 9.187 15.3523C9.187 15.0418 9.439 14.7898 9.7495 14.7898C10.06 14.7898 10.312 15.0418 10.312 15.3523C10.312 16.9033 9.05049 18.1648 7.4995 18.1648Z"
              fill="black"
            ></path>
            <path
              d="M13.6874 15.9126H1.31245C0.588728 15.9126 0 15.3238 0 14.6001C0 14.216 0.167266 13.8524 0.458952 13.6026C1.59974 12.6388 2.24999 11.2379 2.24999 9.75364V7.66254C2.24999 4.76765 4.60504 2.4126 7.49993 2.4126C10.395 2.4126 12.75 4.76765 12.75 7.66254V9.75364C12.75 11.2379 13.4003 12.6388 14.5335 13.5973C14.8327 13.8524 15 14.216 15 14.6001C15 15.3238 14.4113 15.9126 13.6874 15.9126ZM7.49993 3.53759C5.22522 3.53759 3.37499 5.38782 3.37499 7.66254V9.75364C3.37499 11.5693 2.57931 13.2838 1.19256 14.456C1.1662 14.4786 1.125 14.5251 1.125 14.6001C1.125 14.702 1.21055 14.7876 1.31245 14.7876H13.6874C13.7894 14.7876 13.875 14.702 13.875 14.6001C13.875 14.5251 13.8337 14.4786 13.8089 14.4576C12.4207 13.2838 11.625 11.5693 11.625 9.75364V7.66254C11.625 5.38782 9.77478 3.53759 7.49993 3.53759Z"
              fill="black"
            ></path>
            <path
              d="M7.50049 3.53905C7.18999 3.53905 6.93799 3.28705 6.93799 2.97655V0.726561C6.93799 0.416061 7.18999 0.164062 7.50049 0.164062C7.81099 0.164062 8.06298 0.416061 8.06298 0.726561V2.97655C8.06298 3.28705 7.81099 3.53905 7.50049 3.53905Z"
              fill="black"
            ></path>
          </svg>
        </div>
        <div style="border-bottom: 1px solid #d6d6d6; display: flex; width: 100%">
        <p class="chatinfor-text">Thông báo</p>
        <div class="chatinfor-more" style="margin-bottom: 10px;">
            <Switch v-model:checked="notification" @change="handleChange"/>
          </div>
        </div>
      </div>
    </div>
    <div class="chatsidebar-footer">
      <div class="chatinfor-feature">
        <p class="chatinfor-text danger">Chặn người này</p>
      </div>

      <div class="chatinfor-feature">
        <p class="chatinfor-text danger">Xóa người này</p>
      </div>
    </div>
  </div>
  <div class="chatsidebar-container" style="height: 100vh;" v-else>
    <div class="chatsidebar-header-infor" >
        <div style="position: absolute; color:#00904a; font-size: 18px; cursor: pointer; padding:10px;" @click="handleShowInfor">
            <LeftOutlined />
        </div>
       
      <h2 class="chatinfor-title-infor">
       Thông tin
      </h2>
    </div>
    <div style="background-color: #fff; height:23.3vh; margin-top:10px;">
        <div style="margin:5px 15px; border-bottom: 1px solid #d6d6d6; height: 50px; line-height: 50px; width: 92%; display: flex;
  justify-content: space-between;">
            <span style="    font-size: 15px; font-weight: 400;">Username</span> 
            <span style="  font-size: 15px;  color: rgb(102, 102, 102);"> {{ channel.partner.username }}</span>
        </div>
        <div style="margin:5px 15px; border-bottom: 1px solid #d6d6d6; height: 50px; line-height: 50px; width: 92%; display: flex;
  justify-content: space-between;">
            <span style="    font-size: 15px; font-weight: 400;">Vị Trí</span> 
            <span style="  font-size: 15px;  color: rgb(102, 102, 102);"> {{ channel.partner.duty }}</span>
        </div>
        <div style="margin:5px 15px; border-bottom: 1px solid #d6d6d6; height: 50px; line-height: 50px; width: 92%; display: flex;
  justify-content: space-between;">
            <span style="    font-size: 15px; font-weight: 400;">Chức vụ</span> 
            <span style="  font-size: 15px;  color: rgb(102, 102, 102);"> {{ channel.partner.position_name }}</span>
        </div>
        <div style="margin:5px 15px; height: 50px; line-height: 50px; width: 92%; display: flex;
  justify-content: space-between;">
            <span style="    font-size: 15px; font-weight: 400;">Kho</span> 
            <span style="  font-size: 15px;  color: rgb(102, 102, 102);"> {{ channel.partner.station_name }}</span>
        </div>
    </div>
  </div>
</template>
<style>
.image-gallery {
  display: flex;
  align-items: center;
}

.chatinfor-avt-gr {
  width: 33% ; /* Độ rộng hình ảnh */ /* Chiều cao hình ảnh */
  height: 150px;
  object-fit: cover; /* Đảm bảo hình ảnh không bị biến dạng */
}
.chatinfor-title-infor{
    font-size: 18px;
    line-height: 50px;
    color: black;
}
.chatsidebar-header-infor{
    height: 60px;
    background-color: #fff;
  text-align: center;
}
.chatsidebar-container {
  border-left: 1px solid #d5d5d5;
}
.active-member::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #14a05b;
  margin-right: 5px;
}
.chatinfor-feature {
  display: flex;
  padding: 20px 10px 0 10px;
  cursor: pointer;
}
.chatinfor-icon {
  margin-right: 10px;
  cursor: pointer;
}
.chatinfor-text {
  font-size: 15px;
  width: 100%;
  padding-bottom: 10px;
  margin: 0;
}
.chatinfor-text.danger {
  color: rgb(235, 87, 87);
}
.chatinfor-avt {
  width: 100%;
  height: 20vh;
  object-fit: cover;
}
.chatinfor-main {
  display: flex;
}
.chatsidebar-header {
  height: 42vh;
  background-color: #fff;
  text-align: center;
}
.chatinfor-title {
  padding-top: 20px;
  font-weight: 700;
}
.chatinfor-circle{
    cursor: pointer;
}
.chatsidebar-content {
  margin-top: 15px;
  background-color: #fff;
}
.chatsidebar-footer {
  margin-top: 15px;
  background-color: #fff;
  padding-bottom: 20px;
}
.chatinfor-main {
  margin-top: 30px;
  margin: 30px 40px 0 40px;
  justify-content: space-between;
}
.ant-switch-checked{
    background-color: #14a05b;
}
</style>
