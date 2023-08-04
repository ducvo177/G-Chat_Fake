<script setup>
import { onMounted, ref, onUpdated } from 'vue';
import ChannelItem from '../component/ChannelItem.vue';
import ChatInforHeader from '../component/ChatInforHeader.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue'
import { LeftOutlined,SearchOutlined} from '@ant-design/icons-vue';
import { Avatar } from 'ant-design-vue';

const props = defineProps({
    channelMember: {
        type: Object,
  }
})
const sort =ref( 930203)
const status=ref(930205)
const isFilter=ref(false);
const router = useRouter();

const group_id = 1;
const token = localStorage.getItem("token");

let noMoreData = false;
const isLoading = ref(false);
const after = ref(null);
const channels = ref([])
const isNewChat = ref(false);
const isBackFromNewChat = ref(false);
const searchUser = ref('');
const searchUserList = ref([]);
const loading = ref(false);
const chatLoading = ref(true);
const selectedUsers = ref([]);

const fetchData = async () => {
    await axios.get(`https://chat.ghtk.vn/api/v3/channels?group_id=${group_id}&limit=10&access_token=${token}`)
                .then(res => {
                    res.data.data.forEach((channel) => {
                        channels.value.push(channel)
                    });
                    noMoreData = (res.data.data.length < 10);
                    chatLoading.value = false
                })
                .catch(err => {
                    console.log(err);
                    router.push({ name: 'login' });
                });
}

const fetchMoreData = async () => {
    await axios.get(`https://chat.ghtk.vn/api/v3/channels?group_id=${group_id}&limit=10&access_token=${token}&after=${after.value}`)
                .then(res => {
                    
                    res.data.data.forEach((channel) => {
                        channels.value.push(channel)
                    });
                    noMoreData = (res.data.data.length < 10);
                    
                })
                .catch(err => {
                    console.log(err);
                    router.push({ name: 'login' });
                });
}

const fetchFilterChannel = async() =>{
    chatLoading.value = true;
    await axios.get(`https://chat.ghtk.vn/api/v3/channels?group_id=${group_id}&limit=10&access_token=${token}&after=${after.value}&tag_id=${sort.value},${status.value}`)
                .then(res => {
                    channels.value= [];
                    res.data.data.forEach((channel) => {
                        channels.value.push(channel)
                    });
                    noMoreData = (res.data.data.length < 10);
                    chatLoading.value=false;
                })
                .catch(err => {
                    console.log(err);
                    router.push({ name: 'login' });
                }); 
}

const clearNewUser = () => {
 isNewChat.value = false
 isBackFromNewChat.value = true
searchUser.value = ''
 searchUserList.value = []
 selectedUsers.value=[];
}

const createNewChatGroup = async () => {
  if(selectedUsers.value.length == 1){
    clearNewUser();
  }
  try {
    const payload = {
      channel_mode: 'internal', 
      channel_type: 'group', 
      members: selectedUsers.value.join(','),
    };

    const response = await axios.post(`https://chat.ghtk.vn/api/v3/channels`, payload,{
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response:', response.data);
    clearNewUser();
  
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchSuggestUser = async (search = null) => {
    searchUserList.value=[];
    loading.value=true;
    let url = `https://chat.ghtk.vn/api/v3/search?limit=40&type=user&skip=0&group_id=1&access_token=${token}`;
    if(search){
        url = `https://chat.ghtk.vn/api/v3/search?limit=40&type=user&skip=0&group_id=1&keyword=${search}&access_token=${token}`;
    }
 
    await axios.get(url)
                .then(res => {
                  searchUserList.value= res.data.data.users
                  loading.value=false;
                })
                .catch(err => {
                    console.log(err);
                    router.push({ name: 'login' });
                });
}
fetchSuggestUser ();


function setUpLoadMore() {
    let options = {
        root: document.getElementById("channels"),
        rootMargin: "0px",
        threshold: 1.0
    }

    let target = document.getElementById(channels.value[channels.value.length - 1].channel_id);

    const callback = (entries, observer) => {
        entries.forEach( async (entry) => {
            if(entry.isIntersecting && !noMoreData){
                after.value = channels.value[channels.value.length - 1].score;
                isLoading.value = true;
                await fetchMoreData();
                isLoading.value = false;
                target = document.getElementById(channels.value[channels.value.length - 1].channel_id);
                observer.observe(target);
            }
        })
    }

    let observer = new IntersectionObserver(callback, options);

    observer.observe(target);
}


const handleClearSearchUser = () => {
    searchUser.value='';
}

const handleSearchUser = () =>{
    fetchSuggestUser(searchUser.value);
}

const handleRadioChange = (userId)=> {
      if (!selectedUsers.value.includes(userId)) {
        selectedUsers.value.push(userId);
      } else {
        selectedUsers.value = selectedUsers.value.filter((id) => id !== userId);
      }
      
};

const isChecked = (userId) => {
      return selectedUsers.value.includes(userId);
};
const handleCreateChat = ()=>{
    isNewChat.value=true;
    fetchSuggestUser();
}

const updateSort= (sortVal)=>{
    sort.value = sortVal;
    fetchFilterChannel();
}
const updateStatus = (statusVal) => {
    status.value = statusVal;
    fetchFilterChannel();
}
const toggleFilter = () => {
    isFilter.value =!isFilter.value;
}
onMounted(async () => {
        await fetchData();
        setUpLoadMore();
    }
);

onUpdated(() => {
    if(!isNewChat.value && isBackFromNewChat.value){
        setUpLoadMore();
        isBackFromNewChat.value = false;
    }
})
</script>

<template>
<div class="chatinfor-container" v-if="!isNewChat" >
    <ChatInforHeader @createchat="handleCreateChat"/>

    <div class="input-search-wrapper">
        <input type="text" autocomplete="off" class="input-search" placeholder="Tìm kiếm" id="input_layout_search_all">
        <span class="icon-search"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 7.76719C1 4.03612 4.03612 1 7.76719 1C11.4983 1 14.5344 4.03616 14.5344 7.76723C14.5344 9.37685 13.9677 10.8547 13.0257 12.0183L12.9272 12.1399L16.7773 16.0506L16.7783 16.0516C16.9956 16.2689 16.9956 16.6199 16.7783 16.8372C16.6699 16.9456 16.5279 17 16.3855 17C16.2433 17 16.101 16.9453 15.9927 16.8372L12.1418 12.9256L12.0183 13.0257C10.8547 13.9677 9.37685 14.5344 7.76723 14.5344C4.03616 14.5344 1 11.4983 1 7.76719ZM7.76723 2.11117C4.64796 2.11117 2.1112 4.64793 2.1112 7.76719C2.1112 10.8865 4.64796 13.4232 7.76723 13.4232C10.8865 13.4232 13.4233 10.8865 13.4233 7.76719C13.4233 4.64793 10.8865 2.11117 7.76723 2.11117Z" fill="#929292" stroke="#929292" stroke-width="0.4"></path></svg></span>
      <div style="cursor: pointer;" @click="toggleFilter">
        <span class="btn-filter"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 4.3335C8 3.22893 7.1046 2.3335 6 2.3335C4.89543 2.3335 4 3.22893 4 4.3335C4 5.43806 4.89543 6.3335 6 6.3335C7.1046 6.3335 8 5.43806 8 4.3335Z" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 11.6665C8 12.7711 8.8954 13.6665 10 13.6665C11.1046 13.6665 12 12.7711 12 11.6665C12 10.5619 11.1046 9.6665 10 9.6665C8.8954 9.6665 8 10.5619 8 11.6665Z" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 4.3335H14.6667" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.00001 11.6665H1.33334" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.33334 4.3335H4.00001" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 11.6665H12" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </div>  
    </div>
    <div :class="[{ filteron: isFilter},{ filteroff: !isFilter}]">
        <div class="filter-sort" style="display: flex; margin:15px; overflow: hidden;">
            <span style="font-size: 15px; font-weight: 700; margin-right: 10px;">Sắp xếp: </span> <span :class="['filter-channel-button', { active: sort === 930203 }]" @click="updateSort(930203)">Mới nhất</span> <span :class="['filter-channel-button', { active: sort === 930204 }]" @click="updateSort(930204)">Cũ Nhất</span>
            </div>
            <div class="filter-sort" style="display: flex; margin:15px;">
            <span style="font-size: 15px; font-weight: 700; margin-right: 10px;">Trạng thái: </span> <span :class="['filter-channel-button', { active: status === 930205 }]" @click="updateStatus(930205)">Tất cả</span> <span :class="['filter-channel-button', { active: status === 930206 }]" @click="updateStatus(930206)">Chưa đọc</span><span :class="['filter-channel-button', { active: status == 930438 }]" @click="updateStatus(930438)">Chưa trả lời</span> <span :class="['filter-channel-button', { active: status === 930207 }]" @click="updateStatus(930207)">Đã đọc</span>
            </div>
    </div>

    <div class="list-channel" id="channels">
        <div class="search-user-results" >
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

        <ChannelItem v-for="{ channel_id, channel_name, channel_type, last_message, count_message_unread, avatar, group_images } in channels" :channel-id="channel_id" 
        :channel-name="channel_name" :channel-type="channel_type" :last-message="last_message" :count-message-unread="count_message_unread" :avatar="avatar" :group-images="group_images"
        :id="channel_id"/>
        <div class="chat-view-loading" v-if="isLoading">
            <div class="chat-view__loadmore chat-view__loadmore--top">
                <div class="compBaseSpinnerContainer">
                    <a-spin/>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="chatinfor-container" v-else>
    <div class="chatinfor-header">
        <div style="position: absolute; color:#00904a; font-size: 18px; cursor: pointer; padding:10px;" @click="clearNewUser()">
            <LeftOutlined />
        </div>
       
      <h2 class="chatinfor-title-newchat">
       Tạo Chat
      </h2>
    </div>
    <div>
        <a-input
        v-model:value="searchUser"
        @pressEnter="handleSearchUser"
        placeholder="Tìm Kiếm"
        allow-clear
        
      >
        <template v-slot:clearIcon>
          <a-icon @click="handleClearSearchUser" type="close-circle" />
        </template>
      </a-input>
    </div>
    <span class="search-user-suggest">Gợi ý</span>
    <div class="search-user-container">
        <div class="search-user-results" >
            <a-skeleton :loading="loading" :active="true" :avatar="true" :paragraph="2">
              <div class="search-user-result"></div>
            </a-skeleton>
            <a-skeleton :loading="loading" :active="true" :avatar="true" :paragraph="2">
                <div class="search-user-result"></div>
              </a-skeleton>
              <a-skeleton :loading="loading" :active="true" :avatar="true" :paragraph="2">
                <div class="search-user-result"></div>
              </a-skeleton>
              <a-skeleton :loading="loading" :active="true" :avatar="true" :paragraph="2">
                <div class="search-user-result"></div>
              </a-skeleton>
          </div>
        <div class="search-user-results" v-for="user in searchUserList">
            <div class="search-user-result">
                <Avatar :size="50" :src="user.avatar" class="search-user-image" />
                <div class="search-user-infor">
                    <h4 class="search-user-name">
                        {{ user.fullname }}
                    </h4>
                    <span>{{user.position_name}}</span>
                </div>
                <div class="search-user-radio">
                    <a-radio
                      :checked="isChecked(user.id)"
                      :value="user.id"
                      :size="large"
                      @click="handleRadioChange(user.id)"
                    ></a-radio>
            </div>
            </div>
        </div>
        <div class="create-channel-button" v-if="selectedUsers.length!=0" @click="createNewChatGroup">Thêm chat mới</div>
    
    </div>
  
</div>
</template>
<style scoped>
.search-user-container{
    height: 85vh;
    align-items: flex-end;
}
.filteron {
  height: auto; /* Đặt chiều cao tự động khi isFilter = true */
  overflow: hidden;
  transition: height 2s ease-in-out, opacity 1s;/* Thêm hiệu ứng transition */
  opacity: 1;
}
.filteroff {
  height: 0; /* Đặt chiều cao tự động khi isFilter = true */
  overflow: hidden;
  transition: height 2s ease-in-out, opacity 1s; /* Thêm hiệu ứng transition */
  opacity: 0;
}
.filter-channel-button{
    display: inline-block;
    margin-right: 5px;
    padding: 1px 6px;
    border-radius: 50px;
    border: 1px solid;
    cursor: pointer;
    max-width: 300px;
    text-overflow:inherit;
    overflow: hidden;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border-color: rgba(20, 160, 91, 0.91);
}
.filter-channel-button.active{
    background: rgb(20, 160, 91);
    color: rgb(255, 255, 255);
    border-color: rgba(20, 160, 91, 0.91);  
}
.create-channel-button{
    cursor: pointer;
    margin: 10px 8px;
    font-size: 16px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    height: 32px;
    font-weight: 500;
    border-radius: 8px;
    background-color: #00904a;
    color: #fff;
}
.chatinfor-container{
    width: 23vw;
    background-color: white;
    height: 100vh;
}
.search-user-result{
    display: flex;
}

.search-user-suggest{
    font-weight: 600;
    padding: 20px 8px 8px;
    color: #9a9a9a;
    font-size: 16px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
}
.search-user-image{
    margin:10px;
}
.search-user-radio{
    float: right;
}
.search-user-radio{
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-user-infor{
    width: 70%;
    padding: 15px 10px;
}
.ant-input-affix-wrapper{
    margin:0 8px;
    height: 40px;
    width: 95%;
    border: 1px solid #7a7a7a;
    border-radius: 10px;
}
.ant-input{
    margin-left:10px;
}

.input-search-wrapper {
    position: relative;
    width: 100%;
    height: 40px;
    justify-content: center;
    display: flex;
}

.input-search {
    background: #f4f4f4;
    padding-top: 7px!important;
    border-radius: 8px;
    border: none;
    width: 100%;
    margin: 0 8px;
    padding: 4px 0 4px 40px;
    font-size: 14px!important;
}

.chatinfor-title-newchat{
    text-align: left;
    padding:12px 0;
    margin-left: 35px;
    
}
.icon-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
    color: #929292;
    display: flex;
    align-items: center;
}

.input-search-wrapper .btn-filter {
    padding: 6px;
}
.btn-filter {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
    cursor: pointer;
    color: #959595;
}
</style>

