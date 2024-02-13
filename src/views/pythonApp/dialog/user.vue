<template>
  <div>
    <!-- <span>登录账号配置</span> -->
    <el-card shadow="always" style="margin-top: 10px">
      <el-popover
    placement="bottom"
    trigger="manual"
    v-model="visible">
    <el-form label-position="right" label-width="100px" :model="addForm" ref="addForm" :rules="rules" >
          <el-form-item label="账号：" prop="username">
            <el-input v-model="addForm.username" ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
        <el-form-item label="账号平台：" prop="type">
        <el-radio v-model="addForm.type" label="2" >远光二开</el-radio>
        <el-radio v-model="addForm.type" label="1" >财务共享</el-radio>
        </el-form-item>
         <el-button size="small" type="primary" style="margin-left:30%;" @click="add()">提交</el-button>
         <el-button size="small" type="danger" @click="visible=!visible">关闭</el-button>
        </el-form>   
        <div v-show="userFormList.length==0" style="text-align: center;margin-top:10px">该类型账号未配置，请配置</div>
    <el-button size="small" type="primary" slot="reference" @click="handleOpen()">新增账号</el-button>
  </el-popover>
      <el-switch v-model="usertype" active-text="财务共享" inactive-text="远光二开" @change="handleSwitch()" style="float:right" active-color="#13ce66"
  inactive-color="#13ce66"></el-switch>
    <div style="margin-top: 10px;height:500px;overflow:auto">
      <el-card   v-for="(item,index) in userFormList" :key="index">
        <el-form label-position="right" label-width="100px" :model="item" :inline="true" class="demo-form-inline">
          <el-row>
            <el-col :span="6">
          <el-form-item label="账号：">
            <el-input v-model="item.username" v-show="item.isEdit==true" style="width: 140px;"></el-input>
            <span v-show="item.isEdit==false">{{ item.username }}</span>
          </el-form-item>
        </el-col>
          <el-col :span="6">
          <el-form-item label="密码：">
            <el-input v-model="item.password" v-show="item.isEdit==true" style="width: 140px;"></el-input>
            <span v-show="item.isEdit==false">{{ item.password }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="平台类型：">
        <el-radio v-model="item.type" label="2" :disabled="!item.isEdit">远光二开</el-radio>
        <el-radio v-model="item.type" label="1" :disabled="!item.isEdit">财务共享</el-radio>
        </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item ><el-button size="small" type="primary" style="margin-bottom: 10px;" @click="modify(index)" v-show="item.isEdit==false">修改</el-button>
         <el-button size="small" type="success" style="margin-bottom: 10px;" @click="save(index)" v-show="item.isEdit==true">保存</el-button>
          <el-button size="small" type="danger" style="margin-bottom: 10px;" @click="del(index)">删除</el-button></el-form-item>
        </el-col>
        </el-row>
        </el-form>   
      </el-card>
    </div>
    </el-card>
  </div>
</template>

<script>
import { getUserConfig } from "api/python";
import { setUserConfig } from "api/python";
import { addUserConfig } from "api/python";
import { delUserConfig } from "api/python";
export default {
  props:[],
  computed: {},
  data() {
    return {
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择账号平台', trigger: 'change'  }
          ]
        },
      addForm:{
        username:'',
        password:'',
        type:'',
      },
      visible:false,
      usertype:true,
      userFormList:[],
      cwgxList:[],
      ygekList:[],
    };
  },
  // destroyed(){
  //   this.$socket.emit('disconnect')
  // },
  created() {this.getConfig()},

  // sockets:{  
  //   connect: function(){  
  //     console.log('socket 连接成功')  
  //   },  
  //   initMessage: function(res){
  //     res=JSON.parse(res) 
  //     console.log(res)
  //     if(res.isLogin){
  //       this.isLogin=true
  //     }
  //   },
  //   messageFormPython: function(res){  
  //     res=JSON.parse(res) 
  //     if(res.messageList.length>this.messageList.length){
  //       this.messageList=res.messageList
  //       this.$nextTick(()=>{
  //         let div=document.getElementById('message')
  //       div.scrollTop=div.scrollHeight
  //       })
  //     }
  //   },
  //   },  
  methods: {
    // init(){
    //   this.$socket.emit('init')
    // },
    handleOpen(){
      this.visible=!this.visible
      if(this.usertype){
          this.addForm.type="1"
        }else{
          this.addForm.type="2"
        }
    },
    handleSwitch(){
      if(this.usertype){
        this.userFormList=this.cwgxList
      }else{
        this.userFormList=this.ygekList
      }
      if(this.userFormList.length==0){
        this.visible=true
        if(this.usertype){
          this.addForm.type="1"
        }else{
          this.addForm.type="2"
        }
      }else{
        this.visible=false
      }
      console.log(this.visible)
    },
    getConfig() {
      this.cwgxList=[]
      this.ygekList=[]
      this.userFormList=[]
        getUserConfig().then(res=>{
          let keys=Object.keys(res.data)
          for(let i=0;i<keys.length;i++){
            let userData={...res.data[keys[i]],"pk":keys[i],"isEdit":false}
            if(res.data[keys[i]]["type"]==1){
              this.cwgxList.push(userData)
            }else{
              this.ygekList.push(userData)
            }
          }
          this.handleSwitch()
        }).catch((error) => {
              this.$message.error(error);
            });
    },
    modify(index){
      this.userFormList[index].isEdit=true
    },
    del(index){
      this.$confirm('此操作将永久删除'+this.userFormList[index].username+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUserConfig(this.userFormList[index]).then(res=>{
        if(res.status=="111"){
          this.getConfig()
        }
        }).catch((error) => {
              this.$message.error(error);
            });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
    },
    save(index){
      let isNull=false
      let keys = Object.keys(this.userFormList[index])
      keys.forEach(item => {
        if(this.userFormList[index][item].length==0){
          this.$message.error("保存失败，请检查是否有空数据！");
          isNull=true
          return ;
        }
      });
      if(isNull){
        return;
      }
      setUserConfig(this.userFormList[index]).then(res=>{
        if(res.status=="111"){
          this.$message.success("保存成功");
          this.userFormList[index].isEdit=false
          this.getConfig()
        }
        }).catch((error) => {
              this.$message.error(error);
            });
          
    },
    add(){
      this.$refs["addForm"].validate((valid) => {
          if (valid) {
            addUserConfig(this.addForm).then(res=>{
              if(res.status=="111"){
                this.$message.success("新增成功");
                this.getConfig()
                this.visible=!this.visible
                this.addForm={}
              }
              }).catch((error) => {
                    this.$message.error(error);
                  });
                } 
        });
     
    },
  }
};
</script>

<style lang="scss" scoped>
.input{
  width: 350px;
}
</style>


