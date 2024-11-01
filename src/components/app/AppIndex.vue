<template>
  <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
    <!--普通用户的首页框架-->
    <el-container class="index">
        <el-header class="header">
            <div>
                <!-- <img src="/src/assets/1.jpg"> -->
                <span><h1>商品管理系统</h1></span>
                
            </div>
            <el-col :span="12" class="manager">
                    <span>{{ managerInfo.managerName }}</span>&nbsp;&nbsp;
                    <el-link :underline="false" type="primary" @click="logout">
                        <el-icon><switch-button /></el-icon>
                    </el-link>
                </el-col>
        </el-header>

    <el-container class="container">
        <el-aside class="lefter">
            <el-scrollbar >
                <el-menu
                    class="el-menu-vertical"
                    background-color="#324057"
                    text-color="#fff"
                    active-text-color="#409eff">
                 <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Menu /></el-icon>商品管理
                    </template>
                    <router-link to="/app/goodslist">
                        <el-menu-item index="1-1">
                            <el-icon><List /></el-icon>全部商品
                        </el-menu-item>
                    </router-link>
                 </el-sub-menu>
                 <el-sub-menu index="2">
                    <template #title>
                        <el-icon><Menu /></el-icon>用户管理
                    </template>
                    <router-link to="/app/managerlist">
                        <el-menu-item index="2-1">
                            <el-icon><Manager /></el-icon>用户列表
                        </el-menu-item>
                    </router-link>
                    <el-menu-item index="2-2">
                        <el-icon><Lock /></el-icon>账户禁用
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <el-icon><Refresh /></el-icon>密码重置
                    </el-menu-item>
                 </el-sub-menu>
                 <el-sub-menu index="3">
                    <template #title>
                        <el-icon><Menu /></el-icon>个人中心
                    </template>
                    <el-menu-item index="3-1">
                        <el-icon><Avatar /></el-icon>个人信息
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <el-icon><Lock /></el-icon>密码修改
                    </el-menu-item>
                 </el-sub-menu>
                 <el-menu-item index="4" @click="logout">
                    <el-icon><SwitchButton /></el-icon>退出系统
                 </el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-main class="content">
            <el-scrollbar>
         <!--通过router-view加载其他组件-->
            <router-view></router-view>
            </el-scrollbar>
        </el-main>
    </el-container>
    </el-container>

</template>



<script>

//引入路由实例(从封装的myRouter.js中导入)
import router from "../../router/myRouter.js";
export default {
    name: "AppIndex",
    //定义响应数据
    data: function () {
        return {
            managerInfo: {
                managerId: '',
                loginId: '',
                managerName: ''
            }
        }
    },
    //使用生命周期函数
    mounted() {
        //获得登录用户信息
        //通过this引用data中定义的数据
        if (JSON.parse(sessionStorage.getItem('managerInfo')) != null) {
            this.managerInfo = JSON.parse(sessionStorage.getItem('managerInfo'))
        }
        //路由到默认首页页面
        router.push("/app/home")
    },
    methods: {
        logout: function () {
            sessionStorage.removeItem('managerInfo')
            router.replace('/')
        }
    }
}



</script>

<style>
/*定义index页面的布局及样式*/
.index {
    width: 100%;
    height: 100%;
}
/*头部样式*/
.header {
    background-color: #324057;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    /* border-buttom:1px solid #324057; */

    /* box-sizing: border-box;
    width: 100%;
    height: 80px;
    min-width: 600px; 
    padding: 5px;
    background: #324057;
    color: #fff;
    font-size: 25px;
    border-bottom: 1px solid #324057;
    display: flex;
    justify-content: space-between; */
   
}
.logo-container {
    line-height: 60px;
    min-width: 400px;
}
.logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
}
.title {
    vertical-align: middle;
    font-size: 22px;
    letter-spacing: 3px;
    /* padding: 3px; */
    /* text-align: center; */
}
.manager {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 20px;
}
.container{
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 80px);
    /* background-image: url("/src/assets/02.jpg"); */
}
/*左侧菜单样式*/
.lefter {
    box-sizing: border-box;
    width: 220px;
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color:#324057;
}
.el-menu {
    border: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
    margin: 0;
    padding: 0;
    background: #324057;
}
.el-menu-vertical {
    margin: 0;
    width: 220px;
    margin: 0;
    padding: 0;
}
.el-submenu .el-menu-item {
    min-width: 220px;
}
.el-menu-item{
    width: 220px;
}
a {
    text-decoration: none;
}
.el-menu-item.is-active{
    background-color: #296a4d;
}
.content {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

</style>