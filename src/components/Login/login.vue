<template>
    <div class="login">
        <div class="login-lift-from">
            <div class="from-title">
                <p>{{isLoginOrSign?"登录":"注册" }}</p>
            </div>
            <!-- 登录 -->
            <div class="from-input" v-if="isLoginOrSign">
                <div class="input-text">
                    <p>手机号:</p>
                </div>
                <el-input class="input" 
                v-model="login_from.phone"  
                placeholder="请输入手机号" 
                clearable
                />
                <div class="input-text">
                    <p>密码:</p>
                </div>
                <el-input class="input" 
                type="password" 
                v-model="login_from.password"  
                placeholder="请输入密码" 
                clearable
                show-password
                />
            </div>
            <!-- 注册 -->
            <div class="from-input" v-else>
                <div class="input-text">
                    <p>姓名:</p>
                </div>
                <el-input class="input" 
                v-model="sign_from.username"  
                placeholder="请输入姓名" 
                clearable
                />
                <div class="input-text">
                    <p>手机:</p>
                </div>
                <el-input class="input" 
                type="password" 
                v-model="sign_from.phone"  
                placeholder="请输入手机号" 
                clearable
                />
                <div class="input-text">
                    <p>密码:</p>
                </div>
                <!-- 输入密码时调用两个密码检查函数 -->
                <el-input class="input" 
                type="password" 
                v-model="sign_from.password"  
                placeholder="请输入密码" 
                clearable
                show-password
                />
                <el-input class="input" 
                type="password" 
                v-model="sign_from.aspassword"  
                placeholder="请再次输入密码" 
                clearable
                show-password
                />
                
                
            </div>
            <div class="from-button">
                <el-button class="button" type="primary" @click="loginOrsign()">{{isLoginOrSign?"登录":"注册" }}</el-button>
            </div>
            <div class="from-isLoginOrSign" @click="SetisLoginOrSign()">
                <p>{{isLoginOrSign?"没有账号？点击注册！":"已有账号，点击登录！" }}</p>
            </div>
        </div>
        <div class="login-right-contion">
            <!-- <el-image class="imge" src="/png/sql-5.png" fit="cover" width="100%" height="100%"></el-image> -->
            <img class="imge" src="../../assets/png/sql-5.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return{
            login_from:{
                phone:'',
                password: ''
            },
            sign_from:{
                username:'',
                password:'',
                aspassword:'',
                phone:'',
            },
            isLoginOrSign:true,
        }
    },
    methods:{
        SetisLoginOrSign(){
            this.isLoginOrSign = !this.isLoginOrSign
            this.clearForm()
        },
        async loginOrsign(){
            if (this.isLoginOrSign) {
                // 登录逻辑
                if (!this.checkLogin()) return
                
                try {
                    const loginData = {
                        phoneNumber: this.login_from.phone.toString(),
                        password: this.login_from.password.toString()
                    }
                    
                    console.log('发送登录请求:', loginData)
                    const res = await this.$store.dispatch('user/login', loginData)
                    console.log('登录响应:', res)
                    
                    if (res.code === 200) {
                        await this.$store.dispatch('user/getUserInfo')
                        this.$message.success('登录成功')
                        this.$router.push('/')
                    } else {
                        this.$message.error(res.msg || '登录失败')
                    }
                } catch (error) {
                    console.error('登录错误:', error)
                    this.$message.error(error.msg || '登录失败')
                }
            } else {
                // 注册逻辑
                if (!this.checkSign()) return
                if (!this.checkPassword()) return

                try {
                    const signData = {
                        username: this.sign_from.username,
                        password: this.sign_from.password,
                        phoneNumber: this.sign_from.phone
                    }
                    
                    await this.$store.dispatch('user/register', signData)
                    this.$message.success('注册成功')
                    this.isLoginOrSign = true
                    this.clearForm()
                } catch (error) {
                    this.$message.error(error.msg || '注册失败')
                }
            }
        },
        //检查注册时两个密码是否一致
        checkPassword(){
            if(this.sign_from.password != this.sign_from.aspassword){
                this.$message.error('两次密码不一致')
                return false
            }
            return true
        },
        //登录检查
        checkLogin(){
            if(this.login_from.phone == '' || this.login_from.password == ''){
                this.$message.error('请输入完整信息')
                return false
            }
            return true
        },
        //注册检查
        checkSign(){
            if(this.sign_from.username == '' || 
               this.sign_from.password == '' || 
               this.sign_from.aspassword == '' || 
               this.sign_from.phone == ''){
                this.$message.error('请输入完整信息')
                return false
            }
            return true
        },
        //清空表单
        clearForm(){
            this.login_from = {
                phone:'',
                password: ''
            }
            this.sign_from = {
                username:'',
                password:'',
                aspassword:'',
                phone:'',
            }
        }
    },
    mounted(){
    }
}
</script>

<style lang="less">
p{
    // margin: 0;
}
.login{
    display: flex;
    width: calc(100vw - 20px);
    height: calc(100vh - 140px);
    box-sizing: border-box;
    padding: 10px;
    .login-lift-from{
        width: 50%;
        height: 100%;
        // border: 1px solid red;
        box-sizing: border-box;
        padding: 10px;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        .from-title{
            height: 50px;
            width: 100%;
            // background-color: aqua;
            display: flex;
            justify-content: center;
            align-content: center;
            p{
                line-height: 20px;
                font-size: 20px;
                font-weight: bolder;
            }
        }
        .from-input{
            .input-text{
                p{
                    color: rgba(0, 0, 0, 0.538);
                }
            }
            .input{
            }
        }
        .from-button{
            margin-top: 10px;
            .button{
                width: 100%;
            }
        }
        .from-isLoginOrSign{}
    }
    .login-right-contion{
        width: 50%;
        height: 100%;
        // aspect-ratio: 16/9;
        img{
            width: 100%;
            height: 100%;
            // aspect-ratio: 16/9;
        }
        // border: 1px solid red;
    }
}
</style>