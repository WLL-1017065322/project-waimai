<template>
  <div>
    <div class="aboutme" v-if="userInfo.name">
      <section class="profile">
        <header-top title="我的美团"></header-top>
        <section class="profile-number">
          <div class="profile-link">
            <div class="profile_image">
              <i class="iconfont icon-yonghuming"></i>
            </div>
            <div class="user-info">
              <p class="user-info-top" v-if="!ison">用户名:{{userInfo.name}}</p>
              <p class="user-info-top">账户余额:{{phoneNumber}}</p>
            </div>
            <span class="arrow">
              <i class="iconfont icon-fanhui1"></i>
            </span>
          </div>
        </section>

        <section class="profile_info_data border-1px">
          <div class="info_data_top">
            <span class="iconfont icon-dd"></span>
            <span>全部订单</span>
          </div>
          <div class="info_data_bottom">
            <div>
              <span class="iconfont icon-base"></span>
              <p>待付款</p>
            </div>
            <div><span class="iconfont icon-qian"></span><p>待使用</p></div>
            <div><span class="iconfont icon-pingjia"></span><p>待评价</p></div>
            <div><span class="iconfont icon-shouhou"></span><p>退款/售后</p></div>

          </div>
        </section>
        <section class="profile_my_order border-1px">
          <div class="item">
            <span class="iconfont icon-shoucang"></span>
            <span class="item-title">我的收藏</span>
            <span class="iconfont icon-fanhui1"></span>
          </div>
          <div class="item">
            <span class="iconfont icon-quan"></span>
            <span class="item-title">我的抵用券</span>
            <span class="iconfont icon-fanhui1"></span>
          </div>
          <div class="item">
            <span class="iconfont icon-choujiang"></span>
            <span class="item-title">我的抽奖单</span>
            <span class="iconfont icon-fanhui1"></span>
          </div>
          <div class="item">
            <span class="iconfont icon-jifen"></span>
            <span class="item-title">我的积分</span>
            <span class="iconfont icon-fanhui1"></span>
          </div>
        </section>
        <section class="profile_my_order border-1px">
          <mt-button type="danger" style="width: 100%" @click="logout">退出登录</mt-button>
        </section>
      </section>
    </div>
    <div v-else class="aboutme-none">
      <section class="order_no_login">
        <img src="../common/img/person.png" alt srcset />
        <h3>登录查看"我的"页面</h3>
        <button @click="$router.push('/login')">立即登录</button>
        <!-- <button>立即登录</button> -->
      </section>
    </div>
  </div>
</template>

<script>
// import { MessageBox, Toast } from 'mint-ui';
import HeaderTop from '../components/HeaderTop/HeaderTop';
import { MessageBox } from 'mint-ui';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      ison: false,
      phoneNumber: '155'
    };
  },
  methods:{
    logout(){
      MessageBox.confirm('确认退出码?').then(
        action => {
          this.$store.dispatch('logout')
        }
      )
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  components: {
    HeaderTop
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/common.styl'
    .profile
      width 100%
      overflow hidden
      .header //头部公共css
        background-color #ffd000
        position sticky
        z-index 100
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
          font-size 22px
          text-align center
      .profile-number
        .profile-link
          display flex
          justify-content space-between
          flex-direction row
          align-items center
          background #ffd000
          padding 20px 10px
          background url('../assets/images/bg.jpg')  no-repeat
          background-size  cover
          .profile_image
            width 60px
            height 60px
            border-radius 50%
            overflow hidden
            vertical-align top
            .icon-yonghuming
              background #e4e4e4
              font-size 62px
          .user-info
            flex 1
            margin-left 2rem
            p 
              font-size .9rem
              margin .7rem 0
              color #333

          .arrow
            width 12px
            height 12px
            right 15px
            top 40%
            .icon-fanhui1
              color #fff
              font-size 5px
      .profile_info_data
        margin-top .8rem
        border 1px solid #eee
        width 100%
        background #fff
        overflow hidden
        .info_data_top
          width 100%
          height 3rem
          display flex
          justify-content start
          align-items center
          border-bottom 1px solid #eee
          span 
            margin 0 .5rem
          .icon-dd 
            height 1.5rem
            width 1.5rem
            background-color #FE8C00
            color #fff
            font-size 1.3rem
            line-height 1.5rem
            text-align center

        .info_data_bottom
          display flex
          justify-content space-around
          align-content center
          
          div 
            width 25%
            text-align center
            // line-height 3rem
            border-right 1px solid #eeeeee
            display flex
            flex-direction column
            justify-content center
            align-items center
            .iconfont 
              font-size 2rem
              margin .9rem 0 .2rem
            p   
              font-size .5rem 
              margin .2rem 0 .9rem
          &:nth-child(4)
            border-right 0
      
      .profile_my_order
        margin-top .6rem
        background #ffffff
        display flex
        flex-direction column
        justify-content center
        align-items center
        .item 
          box-sizing border-box 
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          width 100%
          height 3rem
          border-bottom 1px solid #eee
          padding 0 1rem
          .item-title
            flex 1
            margin-left .5rem


    .aboutme-none
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

</style>
