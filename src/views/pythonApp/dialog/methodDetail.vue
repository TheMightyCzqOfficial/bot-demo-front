<template>
  <div>
    <el-card shadow="always" style="margin-top: 10px">
      <div style="display: flex;">
        <div style="width: 50%;">
          <el-form label-position="left" label-width="150px" :model="userForm" >
        <el-form-item label="1、请选择账号平台：" prop="userType" >
          <el-select v-model="userForm.userType" placeholder="请选择" @change="queryUser()">
            <el-option
             label="财务共享"
            value="1">
            </el-option>
            <el-option
             label="远光二开"
            value="2">
            </el-option>
          </el-select>
        </el-form-item>
            <el-form-item label="2、请选择账号">
        <el-select v-model="userForm.userId" placeholder="请选择账号" @change="handleSelectUser()">
        <el-option v-for="(item,index) in userList" :key="index" :label="item.username" :value="item.userId"></el-option>
        </el-select>
        </el-form-item>
            <el-form-item label="3、核对密码：" prop="password" >
            <el-input v-model="userForm.password" :disabled="pwdDisabled" style="width:217px"></el-input>
            <el-button size="small" type="primary" style="margin-left:1%;" @click="pwdDisabled=!pwdDisabled">编辑</el-button>
          </el-form-item>
         
        </el-form>   
        </div>
        <div style="width: 50%;">
          <el-row style="margin-bottom: 40px;">
            <el-col :span="8">
              <!-- <a href="./static/excelFile/download20240207143016.xls"> xiazai</a> -->
              <span>方法名称：{{ methodForm.methodName }}</span>
            </el-col>
            <el-col :span="8">
              <span>方法执行平台：{{ methodForm.methodType }}</span>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 40px;">
            <el-col :span="8">
              <span>账号类型：{{ methodForm.userType }}</span>
            </el-col>
            <el-col :span="8">
              <span>方法步骤总数：{{ methodForm.stepCount }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-popover
                placement="bottom"
                width="200"
                trigger="manual"
                v-model="tipVisiable">
                先选择账号，然后点击配置本次方法的运行细节，最后运行！
                <el-button type="primary" size="mini" @click="tipVisiable = false" style="margin: 5px;">我知道了</el-button>
              <el-button type="primary" @click="handleOpenDialog" icon="el-icon-search" slot="reference">查看所有步骤 AND 配置方法</el-button>
                </el-popover>
              
            </el-col>
            
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
      <el-button size="small" type="primary" @click="add()">提交</el-button>
         <el-button size="small" type="danger" @click="visible=!visible">关闭</el-button>
    </el-card>
    <el-dialog
  title="方法配置"
  :visible.sync="stepDialogVisible"
  width="100%"
  >
  <el-steps :active="0" finish-status="wait" process-status="finish">
    <el-step :title="item.stepName" v-for="(item,index) in stepList" :key="index" ></el-step>
  </el-steps>
  <el-row style="margin-top: 15px;">
    <el-col :span="3">
      <el-button type="primary" @click="downloadFile()" icon="el-icon-download" >配置模版文件</el-button>
    </el-col>
    <el-col :span="5">
      <el-upload
            ref="uploadFile"
            class="upload-demo"
            :before-upload="checkFile"
            :limit="1"
            :on-exceed="handleExceed"
            action=""
            :http-request="handleUpdate"
            :file-list="fileList"
            multiple>
            <el-button  type="primary" :disabled="isDownload">点击上传</el-button>
          </el-upload>
    </el-col>
  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="stepDialogVisible = false">关 闭</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { getUserConfig } from "api/python";
import { getMethodData } from "api/python";
import { downloadMethodExcel } from "api/python";
import { upload } from "api/python";
export default {
  props:[],
  computed: {},
  data() {
    return {
      isDownload:true,
      fileList:[],
      tipVisiable:false,
      methodForm:{

      },
      userForm:{
        userType:'',
        username:'',
        password:'',
        userId:''
      },
      stepList:[],
      stepDialogVisible:false,
      pwdDisabled:true,
      userList:[],
      visible:false,
      usertype:true,
      userFormList:[],
      cwgxList:[],
      ygekList:[],
    };
  },

  created() {},
  methods: {
    downloadFile(){
      downloadMethodExcel({methodId:this.methodForm['methodId']}).then(res=>{
        console.log(res)
        let fileName=res.data
        let downloadDom=document.createElement('a')
        downloadDom.href="./static/excelFile/"+fileName
        // downloadDom.download=fileName //--不是必须 若需要【前端重命名文件夹】的话这句代码就需要
        document.body.appendChild(downloadDom)
        downloadDom.click()
        document.body.removeChild(downloadDom)
        this.isDownload=false
      })  
    },
    handleOpenDialog(){
      if(this.userForm.password!=''){
        this.stepDialogVisible=true
      }else{
        this.$message.error('请选择账号')
      }
      
    },
    setMethodDetail(data){
      this.tipVisiable=true
      this.methodForm={...data}
      getMethodData({methodId:this.methodForm.methodId}).then(res=>{
          console.log(res)
          this.methodForm['methodName']=res.data.methodName
          this.methodForm['editable']=res.data.editable
          this.methodForm['methodType']=res.data.methodType
          if(res.data.methodType=='财务共享'){
            this.userForm.userType='1'
          }else{
            this.userForm.userType='2'
          }
          
          this.queryUser()
          this.methodForm['userType']=res.data.userType
          this.methodForm['stepCount']=res.data.stepCount
          this.methodForm['methodId']=res.data.methodId
          this.stepList=[]
          Object.keys(res.data.stepData).forEach(item=>{
            this.stepList.push(res.data.stepData[item])
          })
        }).catch((error) => {
              this.$message.error(error);
            });
    },
    queryUser(){
      this.userList=[]
      this.userForm['username']=''
      this.userForm['password']=''
      this.userForm['userId']=''
      getUserConfig().then(res=>{
          Object.keys(res.data).forEach(item => {
            var pushData={
                ...res.data[item],
                userId:''}
                pushData['userId']=item
            if(this.userForm.userType=='1'){
              if(res.data[item]['type']=='1')
              this.userList.push(pushData)
            }else{
              if(res.data[item]['type']=='2')
              this.userList.push(pushData)
            }
            
          });
        }).catch((error) => {
              this.$message.error(error);
            });
    },
    handleSelectUser(){
      console.log(this.userList)
      this.$nextTick(()=>{
        console.log(this.userForm.userId)
      })
      
    this.userList.forEach(item=>{
      if(this.userForm.userId==item.userId){
        this.userForm.username=item.username
        this.userForm.password=item.password
      }
    })
    },
    checkFile(file){
    let arr = file.name.split('.')
    let suffix = arr[arr.length-1]
    if(suffix!='xls'){
      this.$message.error('只能上传.xls文件')
      this.$refs.uploadFile.clearFiles()
      return false
    }
  },
  handleExceed(files, fileList){
      this.$message.error('目前只能上传一个文件')
    },
    handleUpdate(params){
      upload(params.file).then(res=>{
        this.$message.success("文件上传成功，等待后台处理")
      }).catch((error) => {
        
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


