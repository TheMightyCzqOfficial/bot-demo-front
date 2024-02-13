import Vue from 'vue'
import App from './App.vue'
import MyBread from 'components/MyBread/MyBread.vue'
import router from './router'
import store from './vuex/store'
import './styles/index.scss'
import './assets/css/reset.css';
import './assets/fonts/iconfont.css'




// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import VueSocketio from 'vue-socket.io'

// Vue.use(VueSocketio,'http://127.0.0.1:8092')
Vue.config.productionTip = false

Vue.use(VueQuillEditor)
Vue.component(MyBread.name, MyBread)


new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')