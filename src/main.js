import Vue from 'vue';
import axios from 'axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App';
import router from './router';
// 引入 vuex的store
import store from './store/index';
// import fetch from './api/ajax';

// 引入mockserver
import './mock/mockServer';

// 引入iconfont
import '../public/iconfont/iconfont.css';
// require styles
import 'swiper/dist/css/swiper.css'; // <mt-button>
// 引入css
import './assets/css/reset.css';
// 加载过滤器
import './filters/index';
import 'mint-ui/lib/style.css'
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);
Vue.use(VueAwesomeSwiper /* { default global options } */);
new Vue({
  router,
  // watch: {
  // 检测路由变化
  //   '$route.path': function (newVal, oldVal) {
  //     console.log(newVal);
  //   },
  // },
  store,
  render: h => h(App),
}).$mount('#app');
