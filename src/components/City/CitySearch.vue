<template>
  <div class="city-search">
    <div class="city-header">
      <router-link to="/" tag="div" class="iconfont icon-fanhui2"></router-link>
      <span class="city-title">城市选择</span>
      <div></div>
    </div>
    <div class="search-header">
      <input type="text" placeholder="输入城市名或者拼音" class="search-input" v-model="keyword" />
    </div>
    <div class="search-content" v-show="keyword" ref="search">
      <ul>
        <li
          class="search-item border-bottom"
          v-for="item in list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >{{item.name}}</li>
        <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll';
import { mapMutations } from 'vuex';

export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data() {
    return {
      keyword: '',
      list: [],
      timer: null
    };
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city);
      // this.$store.commit('changeCity', city);
      this.$router.push('/');
      // console.log(city)
    },
    ...mapMutations(['changeCity'])
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        this.list = [];
        return;
      }

      this.timer = setTimeout(() => {
        const result = [];
        for (const i in this.cities) {
          this.cities[i].forEach(value => {
            if (
              value.spell.indexOf(this.keyword) > -1 ||
              value.name.indexOf(this.keyword) > -1
            ) {
              result.push(value);
            }
          });
        }
        this.list = result;
      }, 100);
    }
  }
};
</script>
<style lang="scss" scoped>
.city-search {
  position: sticky;
  top: 0;
  width: 100%;
  // height: 2.5rem;
  line-height: 2.5rem;
  .city-header {
    position: sticky;
    top: 0;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffd000;
    .router-link-active {
      color: #000;
    }
    .city-title {
      display: inline-block;
      flex: 1;
      text-align: center;
    }
  }
  .search-header {
    background-color: #ffd000;
    input {
      box-sizing: border-box;
      width: 100%;
      height: 2.3rem;
      padding: 0.3rem 0.1rem;
      border-radius: 0.5rem;
      text-align: center;
    }
  }
  .search-content {
    z-index: 1;
    overflow: auto;
    background: #fff;
    height: 100vh;

    .search-item {
      font-size: 0.5rem;
      height: 2rem;
      padding-left: 0.5rem;
    }
    .border-bottom {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
