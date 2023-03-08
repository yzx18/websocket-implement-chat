<template>
    <div style="width: 800px;height: 600px;position: absolute;left: 0;right: 0;bottom:0;top:0;margin: auto;">
        <div style="display: flex;flex-direction: column;width: 100%;height: 100%">
            <div style="background-color: black;width: 100%;height: 20%">
                <div style="display: flex;flex-direction: row;text-align: center;margin:20px;">
                    <div style="font-size: 15px;color: white">用户: {{name}}</div>
                    <div style="margin-left: auto;font-size: 20px;color: green">在线</div>
                </div>
                <div v-if="isFlag" style="width: 100%;text-align: center;color: skyblue;line-height: 30px">正在
                    和{{messageName}}聊天
                </div>
            </div>
            <div style="display: flex;flex-direction: row;width: 100%;height: 80%;background-color: white">
                <div style="width: 70%;height: 100%" v-show="isFlag">
                    <div style="width: 100%;height:70%;border: 1px solid #bfc6b0;overflow: auto">
                        <div v-for="(itemc,indexc) in allMessage" :key="indexc">
                            <!-- 对方 -->
                            <div class="word" v-if="itemc.toName!=name&&itemc.toName">
                                <!--                                <img :src="itemc.headUrl">-->
                                <div class="info">
                                    <p class="time">{{name}} </p>
                                    <div class="info-content">{{itemc.message}}</div>
                                </div>
                            </div>
                            <!-- 我的 -->
                            <div class="word-my" v-else>
                                <div class="info">
                                    <p class="time">{{itemc.fromName}} </p>
                                    <div class="info-content">{{itemc.message}}</div>
                                </div>
                                <!--                                <img :src="itemc.headUrl">-->
                            </div>
                        </div>

                    </div>
                    <div style="width: 100%;height:30%;border: 1px solid #bfc6b0" @keyup.enter="sendMessage">
                        <el-input
                                type="textarea"
                                :rows="6"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </div>
                </div>
                <div style="margin-left: auto;width: 30%;height: 100%;">
                    <div style="border: 1px solid #bfc6b0;width: 100%;height: 10%" class="firendlist">
                        <div>好友列表</div>
                    </div>
                    <div style="border: 1px solid #bfc6b0;width: 100%;height: 30%;border-bottom: none;position: relative">
                        <div class="friend">
                            <div v-for="(item1,index) in firendList" :key="index" @click="checkMessageName(item1)">
                                {{item1}}
                            </div>
                        </div>
                        <div style="position: absolute;bottom: 0" class="systemmessage">系统广播</div>
                    </div>
                    <div style="border: 1px solid #bfc6b0;width: 100%;height: 60%">
                        <div class="systemfirend">
                            <div v-for="(item,index) in systemList " :key="index">您的好友 {{item}} 已上线</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                textarea: "",
                ws: {},
                firendList: [],
                systemList: [],
                //当前用户的名字
                name: "",
                isFlag: false,
                //当前要发送信息的用户
                messageName: "",
                //我们发送的聊天信息
                myMessage: [],
                //接受到的聊天信息
                formMessage: [],
                //所有的聊天信息
                allMessage: []
            }
        },
        mounted() {
            this.name = localStorage.getItem("name")
            var $vue = this;
            $vue.ws = new WebSocket(`ws://localhost:9001/online`, [localStorage.getItem("token")]);
            $vue.ws.onopen = function () {
                console.log("连接建立成功")
            }
            $vue.ws.onmessage = function (evt) {
                var dataStr = evt.data;
                var res = JSON.parse(dataStr);
                //如果当前接受到的是系统消息
                if (res.isSystem) {
                    $vue.firendList = [];
                    $vue.systemList = [];
                    // 当前的是系统消息
                    for (var i = 0; i < res.message.length; i++) {
                        if (sessionStorage.getItem("name") == res.message[i]) {
                        } else {
                            $vue.firendList.push(res.message[i]);
                            $vue.systemList.push(res.message[i])
                        }
                    }
                } else {
                    //如果当前发送的名字和接受的名字是一样的 那我们就直接保存本地 并且要绑定本地数据
                    if ($vue.messageName == res.fromName) {
                        var chatdata = sessionStorage.getItem(res.fromName)
                        if (chatdata != null) {
                            $vue.formMessage = JSON.parse(chatdata);
                            $vue.formMessage.push(res)
                            sessionStorage.setItem(res.fromName, JSON.stringify($vue.formMessage))
                            $vue.allMessage = [...$vue.formMessage]
                        } else {
                            $vue.formMessage = []
                            $vue.formMessage.push(res)
                            sessionStorage.setItem(res.fromName, JSON.stringify($vue.formMessage))
                            $vue.allMessage = [...$vue.formMessage]
                        }
                    } else {
                        //不一样的话 我们就接受信息保存到本地(因为切换信息要看到) 但是这里不需要绑定数据 我们只要记录一下就好了
                        var chatdata = sessionStorage.getItem(res.fromName)
                        if (chatdata != null) {
                            var otherinfo = JSON.parse(chatdata);
                            otherinfo.push(res)
                            sessionStorage.setItem(res.fromName, JSON.stringify(otherinfo))
                        }else{
                            var nummessage = []
                            nummessage.push(res)
                            sessionStorage.setItem(res.fromName, JSON.stringify(nummessage))
                        }
                    }
                }
            }
            $vue.ws.onclose = function (e) {
                console.log("前端已经关闭")
                console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                console.log(e)
            }
            window.onbeforeunload = function () {
                console.log("关闭方法被调用了")
                $vue.ws.close();
            };
        },
        methods: {
            sendMessage() {
                //将JavaScript对象转为json
                var json = {"toName": this.messageName, "message": this.textarea}
                this.ws.send(JSON.stringify(json))
                var chatdata = sessionStorage.getItem(this.messageName)
                //如果当前数据不是空的
                if (chatdata != null) {
                    //取到原来存储的数据
                    this.myMessage = JSON.parse(chatdata);
                    //放到里面
                    this.myMessage.push(json)
                    //记录要发送的用户的名字
                    sessionStorage.setItem(this.messageName, JSON.stringify(this.myMessage))
                    this.allMessage = [...this.myMessage]
                } else {
                    this.myMessage = []
                    //如果当前数据是空的
                    this.myMessage.push(json)
                    sessionStorage.setItem(this.messageName, JSON.stringify(this.myMessage))
                    this.allMessage = [...this.myMessage]
                }
                this.textarea = ""
            },
            /**
             * 点击切换的话 我们要从sessionStorage 取出当前我们保存的聊天 取出所对应名字的数据
             * @param name
             */
            checkMessageName(name) {
                //将原来的聊天数据清空
                this.myMessage = []
                this.formMessage = []
                this.allMessage = []
                this.isFlag = true
                this.messageName = name;
                var data = sessionStorage.getItem(this.messageName)
                if (data != null) {
                    //将聊天数据渲染
                    this.myMessage = JSON.parse(data)
                    this.allMessage = [...this.myMessage]
                }
            }
        }
    }
</script>

<style scoped>
    .friend {
        margin-left: 20px;
        margin-top: 10px;
    }

    .firendlist * {
        margin: 10px;
    }

    .friend * {
        margin-top: 10px;
    }

    .systemmessage {
        border-bottom: 3px solid red;
        margin-left: 10px;
    }

    .systemfirend {
        margin: 10px;
    }

    .systemfirend * {
        margin-top: 10px;
    }
</style>
