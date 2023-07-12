<script setup>
import { Avatar } from 'ant-design-vue';
</script>
<template>
    <div class="guest_chat">
        <p class="guest_chat-time">Hôm nay,14:02</p>
        <div class="guest_chat-container">
            <div class="guest_chat-img">
                <Avatar size={64} src="https://cache.giaohangtietkiem.vn/d/b02b4c89125f45d59995a5b6721b5d35.jpg?width=88"/>
            </div> 
     
            <div class="guest_chat-content">
                <h1 class="guest_chat-name">
                    GHTK IAM
                </h1>
                <div class="guest_chat-text">
                    Chúng tôi phát hiện thấy có một phiên đăng nhập mới vào tài khoản GHTK của bạn trên thiết bị iPhone 11 Pro Max, ứng dụng GChats, gần Hanoi, Vietnam vào lúc 2023-07-06 14:02:21
                      Nếu đây không phải là bạn, vui lòng truy cập https://myid.giaohangtietkiem.vn/security/sessions/A54ubWaYP53OOGNXj5qOsi0zLY35DH3B để quản lý các phiên đăng nhập của mình.
                </div>
                <div class="guest_chat-reaction">
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