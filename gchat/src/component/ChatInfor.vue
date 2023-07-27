<script setup>
import { onMounted, reactive } from 'vue';
import ChannelItem from '../component/ChannelItem.vue';
import ChatInforHeader from '../component/ChatInforHeader.vue';
import axios from 'axios';

const baseURL = 'https://chat.ghtk.vn/api/v3/channels';
const tag_id = '';
const group_id = 1;
const is_favorite = 0;
const limit = 40;
const after = '';
const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjAxRUtWUjM5WktERzVTWjNGU1JGQTE4QUVGXzE2MDE4ODAzMDMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoIiwiZXhwIjoxNjkwMzkzMDc2LCJqdGkiOiIwMUg2OU01TTVLV1FLS0gwM0JFMkc5MjZFSiIsImlhdCI6MTY5MDM2NTYxOSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdpYW9oYW5ndGlldGtpZW0udm4iLCJzdWIiOiIwMUg0MlpSNUtaMVhOV1FEVkFHUlpYRDlXUCIsInNjcCI6WyJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzaWQiOiJ4S0RuUHkyUWtDQmtBS1JLTHpzaVJtMnR1NUgwY0JBUyIsImNsaWVudF9pZCI6IjAxRUtWUjM5WktERzVTWjNGU1JGQTE4QUVGIiwidHlwZSI6Im9hdXRoIn0.ImQ6gM-mRzkImapjLrVswodXlLfzEbDUxFtyZjXjrgrOAJgBKQsyvcR02dzwb2Hrnz-AoElPa3Wgpfx8aY7drQ';

const channels = reactive([])

const fetchData = async () => {
    await axios.get(baseURL, { params: {
                        tag_id: tag_id,
                        group_id: group_id,
                        is_favorite: is_favorite,
                        limit: limit,
                        after: after,
                        token: token,
                        access_token: token
                    }})
                .then(res => {
                    console.log(res.data.message);
                    res.data.data.forEach((channel) => {
                        channels.push(channel)
                    });
                })
                .catch(err => console.log(err));
}

onMounted(() => {
        fetchData();
    }
);
</script>

<template>
<div class="chatinfor-container">
    <ChatInforHeader/>

    <div class="input-search-wrapper">
        <input type="text" autocomplete="off" class="input-search" placeholder="Tìm kiếm" id="input_layout_search_all">
        <span class="icon-search"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 7.76719C1 4.03612 4.03612 1 7.76719 1C11.4983 1 14.5344 4.03616 14.5344 7.76723C14.5344 9.37685 13.9677 10.8547 13.0257 12.0183L12.9272 12.1399L16.7773 16.0506L16.7783 16.0516C16.9956 16.2689 16.9956 16.6199 16.7783 16.8372C16.6699 16.9456 16.5279 17 16.3855 17C16.2433 17 16.101 16.9453 15.9927 16.8372L12.1418 12.9256L12.0183 13.0257C10.8547 13.9677 9.37685 14.5344 7.76723 14.5344C4.03616 14.5344 1 11.4983 1 7.76719ZM7.76723 2.11117C4.64796 2.11117 2.1112 4.64793 2.1112 7.76719C2.1112 10.8865 4.64796 13.4232 7.76723 13.4232C10.8865 13.4232 13.4233 10.8865 13.4233 7.76719C13.4233 4.64793 10.8865 2.11117 7.76723 2.11117Z" fill="#929292" stroke="#929292" stroke-width="0.4"></path></svg></span>
        <span class="btn-filter"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 4.3335C8 3.22893 7.1046 2.3335 6 2.3335C4.89543 2.3335 4 3.22893 4 4.3335C4 5.43806 4.89543 6.3335 6 6.3335C7.1046 6.3335 8 5.43806 8 4.3335Z" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 11.6665C8 12.7711 8.8954 13.6665 10 13.6665C11.1046 13.6665 12 12.7711 12 11.6665C12 10.5619 11.1046 9.6665 10 9.6665C8.8954 9.6665 8 10.5619 8 11.6665Z" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 4.3335H14.6667" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.00001 11.6665H1.33334" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.33334 4.3335H4.00001" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 11.6665H12" stroke="#929292" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
    </div>

    <div class="list-channel">
        <ChannelItem v-for="{ channel_id, channel_name, channel_type, last_message, count_message_unread, avatar, group_images } in channels" :channel-id="channel_id" 
        :channel-name="channel_name" :channel-type="channel_type" :last-message="last_message" :count-message-unread="count_message_unread" :avatar="avatar" :group-images="group_images"/>
    </div>
</div>

</template>
<style scoped>
.chatinfor-container{
    width: 23vw;
    background-color: white;
    height: 100vh;
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

