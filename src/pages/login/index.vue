<template>
    <div class="back">
        <div class="login">
            <div style="text-align: center;line-height: 200px;font-size: 30px">登录</div>
            <div class="input">
                <div><span style="margin-right:60px;">账户</span>
                    <el-input style="width: 260px;margin: 0 auto" v-model="login.userName" @input="showInfo()"></el-input>
                </div>
                <div><span style="margin-right:60px;">密码</span>
                    <el-input style="width: 260px;margin: 0 auto" v-model="login.passWord"></el-input>
                </div>
            </div>
            <el-button style="background-color: azure;margin: 0 auto;width: 100px;display: block" @click="loginInfo">点击登录
            </el-button>
        </div>
    </div>
</template>

<script>
    import {login} from '../../api/login'
    import {Message} from 'element-ui'
    export default {
        name: "index",
        data() {
            return {
                login: {
                    userName: "",
                    passWord: "",
                }
            }
        },
        methods: {
            loginInfo(){
                login(this.login).then(resp=>{
                    if(resp.data.token){
                        localStorage.setItem("token",resp.data.token)
                        sessionStorage.setItem("name",resp.data.name)
                        console.log(resp.data.token)
                        this.$router.push({
                            path:"/message"
                        })
                    }else{
                      alert("当前没有登录的")
                    }
                })

            },
            showInfo(){
                console.log(this.login.userName);
            }
        }
    }

</script>

<style scoped>
    .login {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: azure;
        width: 600px;
        height: 400px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
    }

    .input {
        display: flex;
        flex-direction: column;
        margin: 0px 10px 30px 100px;
    }

    .input * {
        margin-top: 20px;
    }

    .back {
        position: absolute;
        z-index: 99999999999;
        background-image: url("../../assets/865098.jpg") ;
        background-size: cover;
        width: 100%;
        height: 100%;
        background-attachment: fixed;
        background-repeat: repeat;
    }
    .global-messageZindex {
         z-index:99999999999999999999999999999 !important;
    }
</style>
