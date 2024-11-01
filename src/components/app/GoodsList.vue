<template>
<div>
    <!-- 面包屑导航区 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/app/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        </el-breadcrumb>
    <el-card>
        <template #header>
            <div>
                <h3>商品列表</h3> 
            
                <el-row :gutter="20">
<!-- 

                    <el-input placeholder="请输入名称" v-model="inputVal" clearable size="small"></el-input>
                    <el-button icon="el-icon-search"
                                type="primary"
                                size="small"
                                @click="searchData(true)"
                                style="margin: 0 10px 0 10px; height: 30px;"
                    ></el-button> -->

                    <!-- <input type="text" @input="handlerInput" v-model="inputText" style="border:1px solid red;"/> -->
                    <!-- <input type="text" placeholder="请输入查询内容" v-model="searchValue" /> -->
<!--                     
                    <el-col :span="8">

                        <el-input placeholder="请输入内容" v-model="searchValue"
                            clearable>
                    <template #append>
                        <el-button :icon="Search" @click="initTable">搜索</el-button>
                    </template>



                </el-input></el-col>  -->

                    <el-col :span="4">
                        <el-button class="button"
                           @click="onAdd()" 
                           type="primary">添加商品
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </template>

        
        <el-table :data="goodslist"
                  :stripe="true"
                  style="width:100%">
          <el-table-column type="index"
                          label=""
                          align="center"
                          width="50">
          </el-table-column>
          <el-table-column  prop="goodsName"
                            label="商品名称"
                            align="center"
                            width="120">
          </el-table-column>
          <el-table-column  prop="goodsPrice"
                            label="商品价格"
                            align="center"
                            width="120">
          </el-table-column>
          <el-table-column  prop="goodsLeixing"
                            label="商品类型"
                            align="center"
                            width="120">
          </el-table-column>
          <el-table-column  prop="goodsBeizhu"
                            label="商品备注"
                            align="center"
                            width="120">
          </el-table-column>
          <el-table-column  prop="goodsChangjia"
                            label="商品厂家"
                            align="center"
                            width="120">
          </el-table-column>
          <el-table-column  prop="goodsDate"
                            label="上架时间"
                            width="120">
            <template #default="scope">
                <span v-text="formatDate(scope.row.goodsDate)"></span>
            </template>
          </el-table-column>
          <el-table-column  prop="currentStatus"
                            label="是否上架"
                            align="center"
                            width="120">
            <template #default="scope">
                <span v-if="scope.row.currentStatus == '0'">
                    <el-icon :size="30" color="#008000FF" ><VideoPlay /></el-icon>
                </span>
                <span v-if="scope.row.currentStatus == '1'">
                    <el-icon :size="30" color="#008000FF"><SuccessFilled /></el-icon>
                </span>
            </template>
          </el-table-column>
          <el-table-column  prop=""
                            label="操作"
                            align="center">
            <template #default="scope">

                
                <span v-if="scope.row.currentStatus == '0'">
                    <el-button  size="small"
                                plain type="primary"
                                @click="onEdit(scope.$index)">修改</el-button>
                </span>
                <span v-if="scope.row.currentStatus == '1'">
                    <el-button  size="small"
                                disabled
                                plain type="primary"
                                @click="onEdit(scope.$index)">修改
                    </el-button>
                </span>
                &nbsp;


                <span v-if="scope.row.currentStatus == '0'">
                    <el-button  size="small"
                                plain type="success"
                                @click="onComplete(scope.$index)">完成
                    </el-button>
                </span>
                <span v-if="scope.row.currentStatus == '1'">
                    <el-button  size="small"
                                disabled
                                plain type="success"
                                @click="onComplete(scope.$index)">完成
                    </el-button>
                </span>
                &nbsp;
                <span v-if="scope.row.currentStatus == '0'">
                    <el-button  size="small"
                                disabled
                                plain type="primary"
                                @click="onReset(scope.$index)">重启
                    </el-button>
                </span>
                <span v-if="scope.row.currentStatus == '1'">
                    <el-button  size="small"
                                plain type="primary"
                                @click="onReset(scope.$index)">重启
                    </el-button>
                </span>
                &nbsp;
                    <el-button  size="small"
                                plain type="danger"
                                @click="onDelete(scope.$index)">删除
                    </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- <el-pagination
            v-model:current-page="mymodel.pagenum"
            v-model:page-size="mymodel.pageSize"
            :page-sizes="[1, 2,4 , 8]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            /> -->

        <!--对话框-->
        <el-dialog
            width="40%"
            v-model="dialog.show"
            :title="dialog.title"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body='false'>
          <el-form
                :model="mymodel"
                :rules="myrule"
                ref="myform">
            <el-form-item label="商品名称" required prop="goodsName">
                <el-col :span="15">
                    <el-input
                        type="text"
                        v-model="mymodel.goodsName">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="商品价格" required prop="goodsPrice">
                <el-col :span="15">
                    <el-input
                        type="text"
                        v-model="mymodel.goodsPrice">
                    </el-input>
                </el-col>
            </el-form-item>
         
                <el-form-item label="商品类型" required prop="goodsLeixing">
                    <el-col :span="15">
                        <el-select v-model="mymodel.goodsLeixing" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    />
                    </el-select>
                    </el-col>
                </el-form-item>

            <el-form-item label="商品备注" required prop="goodsBeizhu">
                <el-col :span="15">
                    <el-input
                        type="text"
                        v-model="mymodel.goodsBeizhu">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="商品厂家" required prop="goodsChangjia">
                <el-col :span="15">
                    <el-input
                        type="text"
                        v-model="mymodel.goodsChangjia">
                    </el-input>
                </el-col>
            </el-form-item>
          <el-form-item label="上架日期" required prop="goodsDate">
            <el-col :span="15">
                <el-date-picker
                    v-model="mymodel.goodsDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item></el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click='onSave("myform")'>保 存</el-button>
            <el-button @click="dialog.show = false">取 消</el-button>
          </div>
        </el-dialog>
    </el-card>
</div>
</template>

<script>
//导入axios实例(从封装的http.js中导入)
import http from "../../util/http.js";
import { ElMessage } from "element-plus";
// import {ref} from 'vue';

export default {
    // searchValue:'',
    name: "GoodsList",
    // 定义响应式数据
    data: function () {
        return {
            options:[
                {
                    value:'彩妆类',
                    label:'彩妆类',
                },
                {
                    value:'服饰类',
                    label:'服饰类'
                },
                {
                    value:'装饰类',
                    label:'装饰类'
                },
                {
                    value:'鞋帽类',
                    label:'鞋帽类'
                }
            ],
            // inputText:'',
            searchValue:'',
          // querystr:'',
        //    inputVal:"",
            goodslist: [],
            total:0,
            mymodel: {
                managerId: "",
                id: "",
                goodsName: "",
                goodsPrice:"",
                goodsBeizhu:"",
                goodsLeixing:"",
                goodsChangjia:"",
                goodsDate: "",
                currentStatus: 0,
                //  query:'',
                // //当前的页数
                // pagenum:2,
                // //当前每页显示多少条数据
                // pageSize:3
            },

            // value=ref(''),
            // options:[
            //     {
            //         value:'option1',
            //         label:'option1',
            //     },
            //     {
            //         value:'option2',
            //         label:'option2'
            //     }
            // ],


            myrule: {
                goodsName: [
                    { required: true, message: '商品名称不能为空', trigger: 'blur' },
                ],
                goodsPrice: [
                    { required: true, message: '商品价格不能为空', trigger: 'blur' },
                ],
                goodsLeixing: [
                    { required: true, message: '商品类型不能为空', trigger: 'blur' },
                ],
                goodsBeizhu: [
                    { required: true, message: '商品备注不能为空', trigger: 'blur' },
                ],
                goodsChangjia: [
                    { required: true, message: '商品厂家不能为空', trigger: 'blur' },
                ],
                goodsDate: [
                    { required: true, message: '上架日期不能为空', trigger: 'blur' },
                ],
            },
            dialog: {
                title: '',
                show: false,
                option: ''
            },
            selectedIndex: -1,
            managerInfo: {},
            itemCurrentStatus: '' //查询任务当前状态,''默认为所有任务
        }
    },

   
    //生命周期函数
    mounted() {
        this.initTable();
    },
    // computed(){//计算属性
    //     searchDate(){
    //         if(!this.searchValue) return this.todolist;
    //         return this.todolist.filter(v=>v.indexOf(this.searchValue)!=-1);
    //     }
    // },
    methods: {

        //初始化表格
        initTable() {

            this.managerInfo = JSON.parse(sessionStorage.getItem('managerInfo'));
            http.get("/goods").then(res => {
                //更新表格
                this.goodslist = res.data;
                // this.total=res.total;
            })
        },


        // handlerInput(){
        //     let newList=this.todolist.filter(item => item.indexOf(this.inputText) > -1);
        //     this.todolist=newList;
        // },
        // searchDate(){
        //     if(!this.searchValue) return this.goodslist;
        //     return this.todolist.filter(v=>v.indexOf(this.searchValue)!=-1);
        // },
        // 右上角搜索框--模糊查询
    
        // searchData(bool){
        //     this.currentPage=1;
        //     if(bool){
        //         let newListData=[];
        //         if(this.inputVal){
        //             this.itemName.Vue.filter((item)=>{
        //                 if(item.name.indexOf(this.inputVal) !== -1){
        //                     newListData.push(item);
        //                 }
        //             }                
        //         });
        //     }
        // }
        
        // filePersons(){
        //     return this.todolist.filter((item)=>{
        //         return itemName.indexOf(this.querystr)!==-1;
        //     })
        // },

        // getPageInfo(){
        //     this.mymodel=[];
        //     for(let i=(this.currentPage-1)*this.pageSize;i<this.total;i++){
        //         this.todolist.push(this.todolist[i]);
        //         if(this.mymodel.length===this.pageSize) break;
        //     }
        // },
        //监听pagesize改变的事件
        // handleSizeChange(newSize){
        //     //console.log(newSize);
        //     //this.mymodel.pageSize=newSize;
        //     //this.todolist();
        //     this.pageSize=newSize;
        //     this.getPageInfo();
        // },
        //监听页码值改变的事件
        // handleCurrentChange(newPage){
        //     //console.log(newPage);
        //     //this.mymodel.pagenum=newPage;
        //     //this.todolist();
        //     this.currentPage=newPage;
        //     this.getPageInfo();
        // },
        //打开添加任务对话框
        onAdd: function () {
            //清空表单旧数据
            this.mymodel = {
                managerId: "",
                id: "",
                goodsName: "",
                goodsDate: "",
                currentStatus: 0
            }
            //打开对话框
            this.dialog = {
                title: '添加商品',
                show: true,
                option: 'add'
            }
        },


        //打开修改任务对话框
        onEdit: function (index) {
            //回填表单
            let item = this.goodslist[index];
            this.mymodel = {
                managerId: item.managerId,
                id: item.id,
                goodsName: item.goodsName,
                goodsPrice:item.goodsPrice,
                goodsLeixing:item.goodsLeixing,
                goodsBeizhu:item.goodsBeizhu,
                goodsChangjia:item.goodsChangjia,
                goodsDate: item.goodsDate,
                //定义各种函数
                currentStatus: item.currentStatus
            }
            //临时保存选中的索引
            this.selectedIndex = index
            //打开对话框
            this.dialog = {
                title: '修改商品',
                show: true,
                option: 'edit'
            }
        },


        //保存
        onSave(formName) {
            const managerInfo = JSON.parse(sessionStorage.getItem('managerInfo'))
            if (this.dialog.option == 'add') {
                //添加保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.mymodel.managerId = this.managerInfo.managerId;
                        http.post("/goods", this.mymodel).then(res => {
                            //console.log(res.data)
                            ElMessage({
                                message: '添加成功！',
                                type: 'success'
                            })
                            //更新表格
                            //this.todolist.push(res.data)
                            this.initTable();
                            //清空表单旧数据
                            this.mymodel = {
                                managerId: "",
                                id: "",
                                goodsName: "",
                                goodsDate: "",
                                currentStatus: 0
                            }
                            //关闭对话框
                            this.dialog = {
                                title: '',
                                show: false,
                                option: ''
                            }
                        })
                    }
                })
            } else if (this.dialog.option == 'edit') {
                //修改保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //json-server更新数据需要带一个路径变量id，才能修改
                        //格式如：http://localhost:3000/todo/1001
                        http.put("/goods/" + this.mymodel.id, this.mymodel).then(res => {
                            ElMessage({
                                message: '修改成功！',
                                type: 'success'
                            })
                            //更新页面
                            this.initTable();
                            //清空表单旧数据
                            this.mymodel = {
                                managerId: "",
                                id: "",
                                goodsName: "",
                                goodsDate: "",
                                currentStatus: 0
                            }
                            //关闭对话框
                            this.dialog = {
                                title: '',
                                show: false,
                                option: ''
                            }
                        })
                    }
                })
            }
        },




        //完成任务
        onComplete: function (index) {
            let item = this.goodslist[index]
            //状态改为1
            item.currentStatus = 1
            //更新服务器数据
            http.put("/goods/" + this.goodslist[index].id, item).then(res => {
                ElMessage({
                    message: '商品完成！',
                    type: 'success'
                })
                //更新页面
                //this.todolist.splice(index, 1, res.data)
                this.initTable();
            })
        },


        //重置任务
        onReset: function (index) {
            let item = this.goodslist[index]
            item.currentStatus = 0
            http.put("/goods/" + this.goodslist[index].id, item).then(res => {
                ElMessage({
                    message: '商品重置成功！',
                    type: 'success'
                })
                //this.todolist.splice(index, 1, res.data)
                this.initTable();
            })
        },


        //删除任务
        onDelete: function (index) {
            http.delete("/goods/" + this.goodslist[index].id).then(res => {
                if (res.status == '200') {
                    ElMessage('删除成功！')
                    this.goodslist.splice(index, 1)
                }
            })
        },


        //时间格式化成中国时间
        formatDate: function (itemDate) {
            let date = new Date(itemDate);
            let seperator = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + seperator + month + seperator + strDate;
            return currentdate;
        },
        
        
       

    }
}

</script>

<style scoped>

</style>