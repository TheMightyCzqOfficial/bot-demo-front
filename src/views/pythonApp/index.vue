<template>
    <div style="width: 100%;">
        <div class="tabs">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">登录账号配置</el-menu-item>
  <el-menu-item index="2">方法管理</el-menu-item>
  <el-menu-item index="3" disabled>运行方法</el-menu-item>
  <!-- <el-submenu index="2">
    <template slot="title" >我的工作台</template>
    <el-menu-item index="2-1">批量重置密码</el-menu-item>
    <el-menu-item index="2-2">Excel对比小工具</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu> -->
</el-menu>
      <div class="mainWindow">
        <userComponent v-show="activeIndex=='1'" ></userComponent>
        <methodComponent v-show="activeIndex=='2'" @handleSelect="handleExecute"></methodComponent>
        <methodDetailComponent v-show="activeIndex=='3'"  ref="methodDetail"></methodDetailComponent>
      </div>
        </div>
    </div>
</template>

<script>

import userComponent from "./dialog/user.vue"
import methodComponent from "./dialog/method.vue"
import methodDetailComponent from "./dialog/methodDetail.vue"
export default {
  name:'pythonApp1',
  components:{
    userComponent,methodComponent,methodDetailComponent
  },
  computed: {
  },

  data() {
    return {
      loading: true,
      activeIndex: '2',
    };
  },

  created() {

  },

  methods: {

    /**
     * 页码改变时触发
     */
    handleSelect(tag) {
      this.activeIndex=tag
      },
      handleExecute(data) {
      this.activeIndex='3'
      this.$refs.methodDetail.setMethodDetail(data)
      },
  }
};
</script>

<style lang="scss" scoped>
.tabs{
    width: 70%;
    margin: 0 auto;
}
.mainWindow{
  margin-top: 20px;
  height: 100%;
}
</style>


