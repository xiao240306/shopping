<template>

    <!--登录框div的样式-->
<div class="container">
    <div class="login">
        <el-card class="loginCard" shadow="always">
            <el-form :model="mymodel" :rules="myrule" ref="myform">
                <h2 style="text-align: center">商品信息管理系统</h2>
                <el-form-item prop="managerLoginId">
                    <el-input type="text" v-model="mymodel.loginId" auto-complete="off" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item prop="currentPassword">
                <el-input type="password" v-model="mymodel.currentPassword" auto-complete="off" placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login(myform)" style="width: 100%;">登 录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="closewin(myform) " style="width: 100%;">取消</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</div>

</template>


<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus';
//导入axios实例(从封装的http.js中导入)
import http from "../../util/http.js";
//引入路由实例(从封装的myRouter.js中导入)
import router from "../../router/myRouter.js";
//把表单定义为一个响应数据对象
const myform = ref();
const mymodel = reactive({
    managerId: '',
    loginId: '',
    currentPassword: '',
    managerName: ''
})
const myrule = ref({
    loginId: [
        { required: true, message: '请输入登录账号', trigger: 'blur' },
    ],
    currentPassword: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
    ]
})
//登录验证函数
const login = async (form) => {
    let valid = await form.validate();
    if (valid) {
        //TODO: 到后台验证用户
        //模拟登录
        let res = await http.get("/manager");
        let loginFlag = false;
        let managerInfo = {}
        if (res.status === 200 || res.status === 201) {
            res.data.forEach(manager => {
                if (manager.loginId == mymodel.loginId && manager.currentPassword ==
                    mymodel.currentPassword) {
                    loginFlag = true;
                    managerInfo = {
                        id: manager.id,
                        loginId: manager.loginId,
                        managerName: manager.managerName,
                        managerType: manager.managerType,
                    };;
                }
            })
        }
        if (loginFlag) {
            //验证成功
            //创建一个本地会话，存放用户信息
            sessionStorage.setItem("managerInfo", JSON.stringify(managerInfo));
            //路由跳转: 可以根据角色跳转到不同的入口
            if (managerInfo.managerType == '0') {
                router.push('/app/index')
            } else if (managerInfo.managerType == '1') {
                router.push('/app/index')
            }
        } else {
            //验证失败
            ElMessage.error({
                message: '用户名/密码错误，请重新登录！'
            })
            //路由跳转:跳转到重新登录页面
            router.push('/login')
        }
    } else {
        ElMessage.error({
            message: '用户名和密码不能为空！'
        })
        return false;
    }
}


//取消
const closewin =async (from)=>{
    if(confirm('确认要取消吗？')){
        window.opener=null;
        window.open("about:blank","_top").close();
    }
}


</script>


<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/2.gif");
    background-size: 100%;
}
.login{
    width: 50%;
    height: 50%;
    margin: 0;
    padding: 0;
    /* background-image: url("../../assets/2.gif"); */
    /* background-Size:100% */
}
.loginCard{
    position: relative;
    top: 150px;
    margin: 0 auto;
    padding: 0 20px;

}

</style>