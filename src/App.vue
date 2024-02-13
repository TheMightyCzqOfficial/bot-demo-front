<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "app",

  mounted() {
    this.$router.replace("/");
  },
  computed: {
    ...mapState({
      token: state => state.adminUser.token
    })
  },
  
};
</script>