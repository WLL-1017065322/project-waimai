<template>
  <div>
    <div v-if="!userInfo.name" class="order-none">
      <header class="order-header">
        <header-top title="订单列表"></header-top>
      </header>
      <section class="order_no_login">
        <img src="../common/img/person.png" alt srcset />
        <h3>登录查看外卖订单</h3>
        <button @click="$router.push('/login')">立即登录</button>
        <!-- <button>立即登录</button> -->
      </section>
    </div>

    <div class="order-main" v-else>
      <div class="order-header">
        我的订单
      </div>
      <div class="order-content" v-show="false">
        <div class="nav">
          <div class="nav-item active">全部</div>
          <div class="nav-item">待付款</div>
          <div class="nav-item">带使用</div>
          <div class="nav-item">待评价</div>
          <div class="nav-item">退款/售后</div>
        </div>
        <div class="item-container">
          <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" >
            <!-- slides -->
            <swiper-slide v-for="(item,index) in orderHeaderLists" :key="index">
              <div class="order-item" v-for="(good,inx) in orderGoodsLists" :key="inx">
                <div class="item-header">
                  <span class="title">{{good.title}}</span>
                  <span class="done">{{good.isDone}}</span>
                </div>
                <div class="item-content">
                  <div class="item-img">
                    <img :src="src" alt="">
                  </div>
                  <div class="item-right">
                    <span>影院:</span>
                    <span>场次:</span>
                    <span>数量:</span>
                    <span>总价:</span>
                  </div>

                </div>
                <div class="pinjia">
                   <span>评价</span>
                </div>
              </div>
            </swiper-slide>
            <!-- Optional controls -->
          </swiper>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import HeaderTop from '../components/HeaderTop/HeaderTop';
import { mapState } from 'vuex';

export default {
  data() {
    return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        },
        orderHeaderLists:[1,2,3,4,5],
        orderGoodsLists:[
          {
            title:'神话',
            isDone:'已付款',
            img:'../assets/images/001.jpg',
            yingyuan:'',
            changci:'2018-08-26 15:40',
            number:'2',
            price:'33'
          }
        ],

        
    };
  },
  components: {
    HeaderTop
  },
  computed:{
    ...mapState(['userInfo']),
    swiper() {
      }
  },

};
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/common.styl"
  .order-none
    .order-header  //订单
      width 100%
      .header //头部公共css
        position fixed
        z-index 100
        left 0
        top 0
        width 100%
        height 45px
        .header_search
          position absolute
          left 15px
          top 50%
          transform translateY(-50%)
          width 10%
          height 50%
          .iconfont
            font-size 22px
            color #fff
        .header_title
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          width 30%
          color #fff

    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #ffd000
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px

  .order-main
    .order-header
      height 45px
      width 100%
      text-align center
      line-height 45px
      background #ffd000
      letter-spacing .1rem
    .order-content
      .nav
        background-color #fff 
        padding 0 1.5rem
        display flex
        justify-content space-between
        flex-direction row
        font-size .8rem

        .nav-item
          padding .6rem 0
          &.active
            border-bottom 2px solid #ffd000

      .item-container
        .order-item
          box-sizing border-box
          width 100%
          margin-top 1rem
          background-color #fff
          border-radius 5px;
          padding .5rem 1rem
          .item-header
            display flex
            justify-content space-between
            border-bottom .5px solid #eeeeee
            padding .5rem 
            .title
              font-size 1rem
            .done
              font-size .8rem
              color #aaa

          .item-content
            margin-top 1rem
            display flex
            flex-direction row
            justify-content space-between
            .item-img
              width 3rem
              height 3rem
              overflow hidden
              img 
                width 100%
                height auto
            .item-right
              flex 1
              display flex
              flex-direction column
              justify-content space-between
              margin 0 1rem
              span 
                padding-bottom .5rem
                font-size .9rem
                color #777

          .pinjia
            display flex 
            justify-content flex-end
            font-size .8rem
            color #555
            span  
              border 1px solid #eeeeee
              padding .5rem
              border-radius 10px
             



      


</style>
