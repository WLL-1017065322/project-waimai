<template>
  <div class="city-list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom" >当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <!-- <div class="button">{{this.$store.state.city}}</div> -->
            <div class="button">{{this.currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item in hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item,key) in cities" :key="key" :ref="key" >
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list" v-for="innerItem in item" :key="innerItem.id" @click="handleCityClick(innerItem.name)">
          <div class="item border-bottom">{{innerItem.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll';
import { mapState, mapMutations } from 'vuex';

export default {
  data(){
    return {
    }
  },
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object,
    letter: String,
  },
  computed: {
    ...mapState({
      currentCity: 'city',
    }),
  },
  methods: {
    test(){
      console.log('33');
    },
    handleCityClick(city) {
      console.log('111');
      this.changeCity(city);
      // this.$store.commit('changeCity', city);省略action
      // this.$store.dispatch('changeCity', city)
      this.$router.push('/');
      // console.log(city)
    },
    ...mapMutations(['changeCity']),
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper,{click: true});
  },

  watch: {
    letter() {
      //   console.log(this.letter)
      if (this.letter) {
        const element = this.$refs[this.letter][0];
        // console.log(this.$refs[this.letter])
        this.scroll.scrollToElement(element);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.border-topbottom {
  &:before {
    border-color: #ccc;
  }
  &:after {
    border-color: #ccc;
  }
}

.border-bottom {
  &:before {
    border-color: #ccc;
  }
}

.city-list {
  overflow: hidden;
  .title {
    line-height: 1.5rem;
    background: #eee;
    padding-left: 0.2rem;
    color: #666;
    font-size: 0.26rem;
  }
  .button-list {
    overflow: hidden;
    padding: 0.1rem 0.6rem 0.1rem 0.1rem;
    background-color: #fff;
    .button-wrapper {
      float: left;
      width: 33.33%;
      .button {
        margin: .6rem;
        padding: .3rem 0;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 0.06rem;
        color: #333;
        font-size: .8rem;
      }
    }
  }
  .item-list {
    background-color: #fff;
    .item {
      line-height: 2rem;
      padding-left: 0.2rem;
      color: #333;
      font-size: .8rem;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
