<script setup>
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { Avatar } from 'ant-design-vue';
</script>

<template>
<div class="chatbox-container">
    <div class="chatbox-header">
        <h1 class="chatbox-title">
            GHTK IAM
        </h1>
        <div class="ellipsis">
            <EllipsisOutlined />            
        </div>
    </div>
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
            </div>
        </div>
    </div>
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
            </div>
        </div>
    </div>
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
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.chatbox-container{
    width: 77vw;
    background-color: white;
    height: 100vh;
    border-left: 2px solid rgba(226,224,224,.66);
}
.chatbox-header{
    display: flex;
    padding:20px 0;
    border-bottom: 1px solid #ccc;
}
.guest_chat{
    width: 100%;
    margin-top: 20px;
}
.guest_chat-time{
    font-size: 12px;
    color: hsla(0,0%,55.7%,.8);
    text-align: center;
}
.guest_chat-content{
    margin-left: 20px;
}
.guest_chat-name{
    font-size: 12px;
    margin-top: 5px;
    margin-right: 10px;
    color: #676767;
    display: -webkit-flex;
    display: flex;
}
.guest_chat-text{
    background: #f3f2f8;
    color: #000;
    border-radius: 10px;
    padding: 6px 12px;
    margin: 2px 0 0;
    word-break: break-word;
    width: 60%;

}
.ellipsis{
    font-size: 20px !important;
}
.guest_chat-container{
    display: flex;
}
  
.chatbox-title{
    width: 95%;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
