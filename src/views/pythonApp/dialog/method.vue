<template>
  <div>
    <el-card shadow="always" style="margin-top: 10px">
      <el-button type="primary" size="small" @click="handleAdd()">新增方法</el-button>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="methodName"
        label="方法名称"
        min-width="180">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.row)" :disabled="!scope.row.editable">{{scope.row.methodName}}</el-link>
      </template>
      </el-table-column>
      <el-table-column
      prop="methodType"
        label="平台类型"
        min-width="120">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.methodType === '财务共享' ? 'primary' : 'success'">{{scope.row.methodType}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="userType"
        label="账号类型"
        min-width="120">
        <template slot-scope="scope">
          <el-tag type="primary" v-show="scope.row.userType=='个人账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="success" v-show="scope.row.userType=='运维账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="warning" v-show="scope.row.userType=='管理员账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="danger" v-show="scope.row.userType=='审批员账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="info" v-show="scope.row.userType=='远光二开账号'">{{scope.row.userType}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="stepCount"
        label="方法步骤总数"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="editable"
        label="是否可修改"
        min-width="100">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.editable  ? 'success' : 'danger'">{{scope.row.editable?"是":"否"}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="最后修改时间"
        min-width="180">
      </el-table-column>
      <el-table-column
      fixed="right"
      width="180">
      <template slot="header">
        <el-button type="primary" size="mini" icon="el-icon-full-screen" @click="methodListDialogVisible=true" style="float: right;"></el-button>
      </template>
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)"  :disabled="!scope.row.editable">配置</el-button>
        <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog
  title="方法列表"
  :visible.sync="methodListDialogVisible"
  width="100%"
  >
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="methodName"
        label="方法名称"
        min-width="180">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.row)" :disabled="!scope.row.editable">{{scope.row.methodName}}</el-link>
      </template>
      </el-table-column>
      <el-table-column
      prop="methodType"
        label="平台类型"
        min-width="120">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.methodType === '财务共享' ? 'primary' : 'success'">{{scope.row.methodType}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="userType"
        label="账号类型"
        min-width="120">
        <template slot-scope="scope">
          <el-tag type="primary" v-show="scope.row.userType=='个人账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="success" v-show="scope.row.userType=='运维账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="warning" v-show="scope.row.userType=='管理员账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="danger" v-show="scope.row.userType=='审批员账号'">{{scope.row.userType}}</el-tag>
          <el-tag type="info" v-show="scope.row.userType=='远光二开账号'">{{scope.row.userType}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="stepCount"
        label="方法步骤总数"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="editable"
        label="是否可修改"
        min-width="100">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.editable  ? 'success' : 'danger'">{{scope.row.editable?"是":"否"}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="最后修改时间"
        min-width="180">
      </el-table-column>
      <el-table-column
      fixed="right"
      width="300">
      <template slot-scope="scope">
        <!-- <el-button type="success" size="small" @click="handleExecute(scope.row)">执行</el-button> -->
        <el-button type="primary" size="small" @click="handleEdit(scope.row)"  :disabled="!scope.row.editable">配置</el-button>
        <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="methodListDialogVisible = false">关 闭</el-button>
  </span>
</el-dialog>
    </el-card>
<el-drawer
  :title="title"
  :visible.sync="dialogVisible"
  direction="btt"
  size="100%"
  :before-close="handleClose">
  <div style="width: 70%;margin-left:20%">
  <el-form ref="methodForm" :model="methodForm" label-width="120px" :rules="methodRules">
    <el-row>
      <el-col :span="10">
        <el-form-item label="方法名称" prop="methodName">
    <el-input v-model="methodForm.methodName"></el-input>
  </el-form-item>
      </el-col>
    </el-row>
  <el-row>
    <el-col :span="5">
        <el-form-item label="平台类型" prop="methodType">
    <el-select v-model="methodForm.methodType" placeholder="请选择平台类型">
      <el-option label="财务共享" value="财务共享"></el-option>
      <el-option label="远光二开" value="远光二开"></el-option>
    </el-select>
  </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="账号类型" prop="userType">
      <el-select v-model="methodForm.userType" placeholder="请选择账号类型">
        <el-option label="个人账号" value="个人账号"></el-option>
        <el-option label="运维账号" value="运维账号"></el-option>
        <el-option label="管理员账号" value="管理员账号"></el-option>
        <el-option label="审批员账号" value="审批员账号"></el-option>
        <el-option label="远光二开账号" value="远光二开账号"></el-option>
    </el-select>
  </el-form-item>
      </el-col>
    </el-row>
    <el-row>
    <el-col :span="5">
      <el-form-item label="是否可修改" prop="editable">
    <el-select v-model="methodForm.editable" placeholder="请选择是否可修改">
      <el-option label="是" value="是"></el-option>
      <el-option label="否" value="否"></el-option>
    </el-select>
  </el-form-item>
    </el-col>
    <el-col :span="5">  
  <el-form-item label="方法步骤总数">
    <el-tag type="success" effect="dark">{{ methodForm.stepCount }}</el-tag>
  </el-form-item></el-col>
  </el-row>
</el-form>
</div>
<el-divider></el-divider>
<div style="height: 60%;">
  <div style="height: 50px;">
    <el-row>
      <el-col :span="8">
        <el-button-group style="margin-bottom: 10px;margin-left:10px">
      <el-button type="primary" icon="el-icon-arrow-left" @click="currentStep=currentStep-1" :disabled="currentStep==0">上一步</el-button>
      <el-button type="primary" @click="currentStep=currentStep+1" :disabled="currentStep+1==stepList.length">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      <el-button type="success" @click="addStep" icon="el-icon-plus">新增步骤</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="delStep()" :disabled="stepList.length<=1">删除步骤</el-button>
    </el-button-group>
  </el-col>
  <el-col :span="6">
    <span>当前步骤：</span>
    <el-select v-model="currentStep" placeholder="请选择" @change="handlechange">
    <el-option
      v-for="(item,index) in stepList"
      :key="index"
      :label="item.stepName"
      :value="index">
    </el-option>
  </el-select>
</el-col>
<el-col :span="6"> <el-button type="primary" @click="stepDialogVisible=true" icon="el-icon-search">查看所有步骤</el-button></el-col>
    </el-row>
  </div>
  <el-divider></el-divider>
  <div style="height: 100%;overflow:auto;margin-left:10%;">
    <el-form :model="stepList[currentStep]" label-width="180px" style="margin-top: 20px;">
      <el-row>
        <el-col>
          <el-form-item label="步骤名称">
    <el-input v-model="stepList[currentStep].stepName" clearable style="width: 300px;"></el-input>
  </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <el-form-item label="执行动作">
          <el-select v-model="stepList[currentStep].action" placeholder="请选择执行动作">
              <el-option label="输入文本" value="input"></el-option>
              <el-option label="点击" value="click"></el-option>
              <el-option label="进入iframe" value="enterFrame"></el-option>
              <el-option label="退出iframe" value="exitFrame"></el-option>
              <el-option label="切换至新窗口" value="switchToNewWindow"></el-option>
              <el-option label="关闭窗口并返回" value="switchToPreWindow"></el-option>
              <el-option label="刷新该页面" value="refresh"></el-option>
          </el-select>
  </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
            <el-form-item label="元素Xpath">
            <el-input v-model="stepList[currentStep].xpath" clearable style="width: 300px;"></el-input>
    </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Xpath列表索引">
        <el-input-number v-model="stepList[currentStep].xpathIndex" :min="0"></el-input-number>
  </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="定位文本（下拉框内容）">
        <el-input v-model="stepList[currentStep].locateText" clearable style="width: 300px;"></el-input>
  </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <el-form-item label="下一步骤等待时长（秒）">
    <el-input-number v-model="stepList[currentStep].waitSecond" :min="0"></el-input-number>
  </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">

        </el-col>
      </el-row>
         -->
</el-form>
  </div>
</div>
<div style="width:100%;text-align:center">
  <el-button type="primary" @click="onSubmit('add')" :disabled="methodForm.stepCount==0" v-show="dialogType=='add'">立即创建</el-button>
  <el-button type="primary" @click="onSubmit('edit')" :disabled="methodForm.stepCount==0" v-show="dialogType=='edit'">保存</el-button>
  <el-button type="danger" @click="handleReset">重置</el-button>
</div>
</el-drawer>
<el-dialog
  title="所有步骤"
  :visible.sync="stepDialogVisible"
  width="100%"
  >
  <el-steps :active="currentStep" finish-status="wait" process-status="finish">
    <el-step :title="item.stepName" v-for="(item,index) in stepList" :key="index" ></el-step>
  </el-steps>
  <span slot="footer" class="dialog-footer">
    <el-button @click="stepDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="stepDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { getMethodList } from "api/python";
import { getMethodData } from "api/python";
import { delMethod } from "api/python";
import { addMethod } from "api/python";
import { setMethod } from "api/python";
export default {
  props:[],
  computed: {},
  data() {
    return {
        methodRules: {
          methodName: [
            { required: true, message: '请输入方法名', trigger: 'blur' }
          ],
          methodType: [
            { required: true, message: '请选择方法对应平台', trigger: 'change' }
          ],
          editable: [
            { required: true, message: '请选择是否可修改', trigger: 'change'  }
          ],
          userType: [
            { required: true, message: '请选择账号类型', trigger: 'change' }
          ],
        },
      methodForm:{
        methodName:'',
        methodType:'',
        editable:'是',
        userType:'',
        stepCount:0
      },
      stepList:[{
              stepName: "",
              action: "",
              xpath: "",
              xpathIndex: '0',
              waitSecond: '0',
              locateText: ""
            }],
      currentStep:0,
      methodListDialogVisible:false,
      dialogVisible:false,
      dialogType:'',
      stepDialogVisible:false,
      title:'',
      tableData:[],
      visible:false,
      usertype:true,
      userFormList:[],
      cwgxList:[],
      ygekList:[],
    };
  },

  created() {this.queryMethodList()},
  methods: {
    handleDel(row){
      this.$confirm('是否删除方法'+row.methodName+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { 
          delMethod({methodId:row.methodId}).then(res=>{
              this.$message.success("删除成功");
              this.queryMethodList()
        }).catch((error) => {
              this.$message.error(error);
            });
        })
    },
    onSubmit(type){
      this.$refs["methodForm"].validate((valid) => {
          if (valid) {
            let data={
              ...this.methodForm,
              stepData:{}
            }
            for(let i = 0;i<this.stepList.length;i++){
        if(this.stepList[i].stepName==''||
        this.stepList[i].xpath==''||
        this.stepList[i].action==''){
          this.$notify.error({
          title: '无法提交',
          message: '步骤'+(i+1)+'有空数据'
        });
        return
      }
        data.stepData["step"+(i+1)]=this.stepList[i]
            }
            console.log(data)
            if(type=='add'){
              addMethod(data).then(res=>{
              this.$message.success("创建成功");
              this.reset()
              this.dialogVisible=false
              this.queryMethodList()
        }).catch((error) => {
              this.$message.error(error);
            });
            }else{//edit
              data['methodId']=this.methodForm.methodId
              setMethod(data).then(res=>{
              this.$message.success("保存成功");
              this.reset()
              this.dialogVisible=false
              this.queryMethodList()
        }).catch((error) => {
              this.$message.error(error);
            });
            }
            
            } 
        });
      
    },
    handlechange(){
      console.log(this.currentStep,' ',this.stepList.length)
      console.log(this.currentStep+1==this.stepList.length)
    },
    handleReset(){
      this.$confirm('是否重置整个页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { this.reset()})
    },
    reset(){
          this.methodForm={
        methodName:'',
        methodType:'',
        editable:'是',
        userType:'',
        stepCount:0
      }
      this.stepList=[{
              stepName: "",
              action: "",
              xpath: "",
              xpathIndex: '0',
              waitSecond: '0',
              locateText:''
            }]
      this.currentStep=0
      
    },
    queryMethodList() {
      this.tableData=[]
      getMethodList().then(res=>{
        this.tableData=res.data
          console.log(res)
        }).catch((error) => {
              this.$message.error(error);
            });
    },
    handleEdit(row){
      this.dialogType='edit'
      this.dialogVisible=true
      this.title="方法配置"
      getMethodData({methodId:row.methodId}).then(res=>{
          console.log(res)
          this.reset()
          this.methodForm['methodName']=res.data.methodName
          this.methodForm['editable']=res.data.editable
          this.methodForm['methodType']=res.data.methodType
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
    handleExecute(row){
      console.log(row)
      this.$emit("handleSelect",{...row})
    },
    handleAdd(){
      this.title="方法新增"
      this.dialogVisible=true
      this.dialogType='add'
    },
    handleClose(){
      this.$confirm('是否关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogVisible=false
          this.reset()

        })
    },
    addStep(){
      if(this.stepList[this.currentStep].stepName==''||
        this.stepList[this.currentStep].xpath==''||
        this.stepList[this.currentStep].action==''){
          this.$notify.error({
          title: '无法新增',
          message: '请完善当前步骤，再点击新增'
        });
        return
      }
      this.stepList.push({
        stepName: "",
        action: "",
        xpath: "",
        xpathIndex:'0',
        waitSecond: '0',
        locateText:''
      })
      this.methodForm.stepCount=this.stepList.length
      this.currentStep=this.stepList.length-1
    
      
    },
    delStep(){
      console.log(this.currentStep)
      console.log(this.stepList)
      console.log(this.stepList[this.currentStep])
      if(this.stepList.length==0){
        this.$message.error("未选择当前步骤");
        return
      }
      this.$confirm('删除步骤： '+this.stepList[this.currentStep].stepName+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.stepList.length==1){
              this.stepList.push({
                stepName: "",
                action: "",
                xpath: "",
                xpathIndex: '0',
                waitSecond: '0',
                locateText:''
              })
            }
          this.stepList.splice(this.currentStep,1)
          this.stepList.length==1?this.currentStep=0:this.currentStep-=1
            this.methodForm.stepCount=this.stepList.length
          this.$nextTick(()=>{
            this.$message.success("已删除");
          })
          
        })

    },
  }
};
</script>

<style lang="scss" scoped>
.input{
  width: 350px;
}


.el-scrollbar{

  .el-scrollbar__bar{
    opacity:1; //是它是它就是它，1就显示了
  }
}

</style>


