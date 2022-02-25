<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="mouseleave">
      <h2 ref="all" class="all" @mouseenter="mouseenter">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div v-show="show" class="sort">
          <div class="all-sort-list2" @click="goSearch">
            <div v-for="(item,index) in categoryList"
                 :key="item.categoryId"
                 :class="{cur:currentIndex===index} "
                 class="item"
                 @mouseleave="leaveIndex">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-category1id="item.categoryId"
                   :data-categoryname="item.categoryName"
                   href="javascript:void(0)">{{ item.categoryName }}</a>
              </h3>
              <!--            二、三级分类-->
              <div :style="{display:currentIndex===index?'block':'none'}" class="item-list">
                <div v-for="(item2) in item.categoryChild" :key="item2.categoryId" class="subitem">
                  <dl class="fore">
                    <dt>
                      <a :data-category2id="item2.categoryId"
                         :data-categoryname="item2.categoryName"
                         href="javascript:void(0)">{{ item2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(item3) in item2.categoryChild" :key="item3.categoryId">
                        <a :data-category3id="item3.categoryId"
                           :data-categoryname="item3.categoryName "
                           href="javascript:void(0)">{{ item3.categoryName }}</a>
                      </em>

                    </dd>
                  </dl>
                </div>
              </div>
            </div>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },

  mounted() {
    this.$store.dispatch('getCategoryList')

    //路由跳转到search隐藏竖列导航
    if (this.$route.name === 'search' || this.$route.name === 'detail') {
      this.show = false
    }

  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    },),
    leaveIndex() {
      this.currentIndex = -1
    },
    //在搜索页面隐藏/显示typenav
    mouseenter() {
      this.show = true
    },
    //在搜索页面隐藏/显示typenav
    mouseleave() {
      if (this.$route.name === 'search' || this.$route.name === 'detail') {
        this.show = false
      }
    },
    //给Search传参
    goSearch(event) {
      let {categoryname, category1id, category2id, category3id} = event.target.dataset
      let query = {categoryName: categoryname}
      if (category1id) {
        query.category1Id = category1id
      }
      else if (category2id) {
        query.category2Id = category2id
      }
      else {
        query.category3Id = category3id
      }
      let params = this.$route.params || undefined
      this.$router.push({
        name: 'search',
        query,
        params
      })
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        height: 464px;
        overflow: hidden;

        .cur {
          background-color: #d9d9d9;
        }

        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }


        }
      }
    }

    .sort-enter {
      height: 0px;
      width: 200px;
    }

    .sort-enter-to {
      height: 464px;
      width: 210px;
    }

    .sort-enter-active {
      transition: height .2s linear, width .5s;
    }
  }
}
</style>