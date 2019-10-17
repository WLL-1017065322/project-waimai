<template>
  <section class="msite">
    <header class="navbar">
      <router-link tag="div" to="/city" class="nav-wrap-left">
          <span class="city">{{this.city}}</span>
          <i class="iconfont icon-fanhui"></i>
      </router-link>
      <router-link tag="div" to="/search" class="box-search">
          <span class="iconfont icon-sousuo"></span>
          <span>请输入商家名、品类或者商圈...</span>
      </router-link>
      <router-link tag="div" to="/aboutme" class="nav-wrap-right">
        <i class="iconfont icon-yonghuming"></i>
      </router-link>
    </header>

    <!-- 轮播图 -->
    <nav class="msite_nav">
      <div class="swiper-container swiper-container-initialized swiper-container-horizontal">
        <div
          class="swiper-wrapper"
          style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"
        >
          <div class="swiper-slide" v-for="(page,index) in pages" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(item,index) in page" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+item.image_url" alt srcset />
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- 轮播圆点 -->
        <div class="swiper-pagination swiper-pagination-bullets">
          <span class="swiper-pagination-bullet" v-for="(page,index) in pages" :key="index"></span>
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>
    </nav>
    <!-- 首页附近商家列表 -->

    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>
  </section>
</template>

<script>
// import axios from "axios";

// 组件中使用swiper
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Swiper from 'swiper';
// require styles
import 'swiper/dist/css/swiper.css';
import ShopList from '../components/ShopList/ShopList';
import HeaderTop from '../components/HeaderTop/HeaderTop';

import { ajax } from '../api/ajax.js';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userInfo: {
        _id: 1,
      },

      categoryArr: [],
      baseImageUrl: 'https://fuss10.elemecdn.com',
    };
  },
  components: {
    HeaderTop,
    ShopList,
    swiper,
    swiperSlide,
  },
  computed: {
    ...mapState(['address', 'categorys','city']),
    cityCC(){
      return this.$store.state.city
    },
    // 一个屏幕8个icon
    pages() {
      const pages = [];
      this.categorys.forEach((item, index) => {
        const page = Math.floor(index / 8); // 向下取整 页码
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    },

    // address(){
    //   return this.$store.state.address
    // }
  },

  mounted() {
    this.$store.dispatch('getAddress');
    this.$store.dispatch('getCategorys');
    this.$store.dispatch('getShops');

    // 测试
    // axios.get("/api/index_category").then(response => console.log(response));
    // ajax("/api/index_category").then(response => console.log(response));

    // $fetch:封装
    // this.$ajax("/api/index_category").then(response => {
    //   console.log(response.data);
    //   this.categoryArr = response.data;
    // });

    // 轮播 失效
    // var mySwiper = new Swiper('.swiper-container', {
    // autoplay:true,
    // loop:true,
    //  pagination: {
    //   el: '.swiper-pagination',
    // },
    // })
  },
  // 解决轮播失效bug
  watch: {
    pages(value) {
      // categorys数组中有数据了 但界面还没有异步更新
      // 使用setTimeout可以实现效果, 但是时机不准确
      /*
      setTimeout(() => {
        // 创建一个Swiper实例对象来实现轮播
        new Swiper('.swiper-container', {
          autoplay: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
      }, 100) */

      // 在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(() => {
        // 一旦完成界面更新, 立即执行回调
        new Swiper('.swiper-container', {
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });

        // new BScroll('.miste-content-wrapper', {
        //   click: true
        // })
      });
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/common.styl"
  .msite  //首页
    width 100%
    .navbar
      position sticky
      display flex
      justify-content space-around
      align-items center
      z-index 100
      top 0
      width 100%
      height 45px
      background-color #FFD000
      line-height 45px
      .nav-wrap-left
        width 3.8rem
        text-align  center
        font-size 0.8rem
        .city
          padding-right 0.3rem
        .icon-fanhui
          font-size .5rem
      .box-search 
        background #fff
        height 30px
        line-height 30px
        // width 15rem
        border-radius .3rem
        font-size .8rem
        color #aaaaaa
        flex 1
        display flex
        justify-content space-around
        
      .nav-wrap-right
        width 3.8rem
        text-align  center
        font-size 0.8rem
    .msite_nav
      bottom-border-1px(#e4e4e4)
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #ffd000
    .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
