<template>
  <div>
    <div class="goods">
      <!-- 左边部分 食物目录-->
      <div class="menu-wrapper">
        <!-- 左边的食物分类列表 -->
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img :src="good.icon" alt class="icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右边额滑动部分 食物信息-->
      <div class="foods-wrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的
        所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsRight">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index" @click="showFood(food)"
              >
                <div class="icon">
                  <img :src="food.icon" width="57" height="57" alt srcset />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>

                  <div class="extra">
                   <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                 </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                   <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
                 <div class="cartcontrol-wrapper">
                  <!-- 插入组件:最右边的 + 号 -->
                  <CartControl :food="food"></CartControl>
                </div>
                </div>

              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--底部购物车-->
      <shop-cart></shop-cart>
    </div>
    <!-- 插入组件 Food 食物具体属性幻灯 ?????????????????????????????????????????
    父组件调用子组件方法
     -->
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from '@better-scroll/core';
import CartControl from '../../../components/CartControl/CartControl';
import Food from '../../../components/Food/Food';
import ShopCart from '../../../components/ShopCart/ShopCart';

export default {
  data() {
    return {
      // goods: [],
      food: {},
      scrollY: 0,
      tops: [],
    };
  },
  components: {
    CartControl,
    Food,
    ShopCart,
  },
  computed: {
    ...mapState(['goods']),
    currentIndex() {
      const { scrollY, tops } = this;
      // console.log(Array.isArray(tops))
      // 当前的scrollY和top比较
      const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1]);
      return index;
    },
  },
  methods: {

    showFood(food) {
      this.food = food;
      // 显示food组件 (在父组件中调用子组件对象的方法)
      this.$refs.food.toggleShow();
      // 一般是事件方法
    },
    _initScroll() {
      new BScroll('.menu-wrapper', {
        click: true,
      });
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 3,
        click: true,

      });
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on('scroll', ({ x, y }) => {
        // console.log(x,y)
        this.scrollY = Math.abs(y);
      });
      // 给右侧列表绑定scroll结束的监听  probeType: 2 :解决滑动不更新的bug
      // this.foodsScroll.on('scrollEnd', ({x, y}) => {
      //   // console.log('scrollEnd', x, y)
      //   this.scrollY = Math.abs(y)
      // })
    },
    _initTop() {
      // 获取 top的li的各个高度
      const tops = [];
      let top = 0;
      // tops第一个值是0
      tops.push(top);
      const foodLis = this.$refs.foodsRight.children;
      // foodLis 是类数组,对象 需要Array.prototype.slice.call(arrayLike)转化
      // console.log(foodLis)
      // console.log(Array.isArray(foodLis))
      Array.prototype.slice.call(foodLis).forEach((li) => {
        // console.log(li.clientHeight)
        top += li.clientHeight;
        tops.push(top);
      });
      // console.log(tops)
      // 更新tops
      this.tops = tops;
    },
    // 左边点击滑动
    clickMenuItem(index) {
      const scrollY = this.tops[index];
      // this.scrollY = scrollY
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },


  },
  mounted() {
    // mock模拟数据
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {
        // new BScroll('.menu-wrapper')
        // new BScroll('.foods-wrapper')
        // 初始化滚动
        this._initScroll();
        this._initTop();
      });
    });
    // this.$fetch("/goods").then(response => {
    //   this.goods = response.data;
    //   console.log(response.data);
    // });
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/common.styl'
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
