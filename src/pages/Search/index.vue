<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!--          面包屑-->
          <ul class="fl sui-tag">
            <!--query即category产生的面包屑-->
            <li v-if="searchParams.categoryName"
                class="with-x"
                @click="removeCategoryName">
              {{ searchParams.categoryName }}<i>×</i>
            </li>
            <!--params即keyword产生的面包屑-->
            <li v-if="searchParams.keyword"
                class="with-x"
                @click="removeKeyword">
              {{ searchParams.keyword }}<i>×</i></li>
            <!--tradeMark产生的面包屑-->
            <li v-if="searchParams.trademark"
                class="with-x"
                @click="removeTradeMark">
              {{ searchParams.trademark.split(':')[1] }}<i>×</i>
            </li>
            <!--产品属性生成的面包屑 -->
            <li v-for="(attrValue, index) in searchParams.props"
                :key="index"
                class="with-x"
                @click="removeAttr(index)">
              {{ attrValue.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getAttrValue="getAttrValue" @getTradeMark="getTradeMark"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--排序-->
              <ul class="sui-nav">
                <li :class="{active:isOne}">
                  <a @click="changeOrder('1')">综合
                    <span v-if="isOne&&searchParams.order.includes('asc')">▲</span>
                    <span v-if="isOne&&searchParams.order.includes('desc')">▼</span>
                  </a>
                </li>
                <li :class="{active:isTwo}">
                  <a @click="changeOrder('2')">价格
                    <span v-if="isTwo&&searchParams.order.includes('asc')">▲</span>
                    <span v-if="isTwo&&searchParams.order.includes('desc')">▼</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="item in goodsList" :key="item.id" class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="{name:'detail',params:{skuId:item.id}}" target="_blank">
                      <img v-lazy="item.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="item.html" target="_blank" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                       v-html="item.title">
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger" target="_blank">加入购物车</a>
                    <a class="sui-btn btn-bordered" href="javascript:void(0);">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :continues="5"
                      :pageNo="searchParams.pageNo"
                      :pageSize="searchParams.pageSize"
                      :total="total"
                      @getPageNo="getPageNo">
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import {mapGetters, mapState} from "vuex";

export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "props": [],
        "trademark": ""
      }
    }
  },
  beforeMount() {
    //this.searchParams即第一个参数也会改变
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchInfo', this.searchParams)
    },
    //删除第一类面包屑
    removeCategoryName() {
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData()
      //只清除query，保留params
      if (this.$route.params) {
        this.$router.push({name: "search", params: this.$route.params});
      }
    },
    //删除第二类面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.searchParams.keyword = undefined;
      this.searchParams.keyword = undefined;
      this.searchParams.keyword = undefined;
      this.getData()
      //清空搜索框input的值
      //只清除params，保留query
      if (this.$route.query) {
        this.$router.push({name: "search", query: this.$route.query});
      }
      //通知Header删除搜索框内容
      this.$bus.$emit("clear")
    },
    //从子组件拿到数据生成第三类面包屑
    getTradeMark(tradeMark) {
      this.searchParams.trademark = tradeMark.tmId + ':' + tradeMark.tmName
      this.getData();
    },
    //删除第三类面包屑
    removeTradeMark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    //从子组件拿到数据生成第四类面包屑
    getAttrValue(attrName, attrValue) {
      let props = `${attrName.attrId}:${attrValue}:${attrName.attrName}`;
      console.log(props)
      //数组去重
      //if语句里面只有一行代码：可以省略大花括号
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      //再次发请求
      this.getData();
    },
    //删除第四类面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    //改变排序箭头
    changeOrder(which) {
      //点击当前按钮，修改asc为desc/desc为asc
      if (this.searchParams.order.includes(which)) {
        if (this.searchParams.order.includes('asc')) {
          this.searchParams.order = this.searchParams.order.replace('asc', 'desc')
        }
        else {
          this.searchParams.order = this.searchParams.order.replace('desc', 'asc')
        }
      }
      //点击的不是当前选中的按钮，修改1为2/2为1
      else {
        if (this.searchParams.order.includes('1')) {
          this.searchParams.order = this.searchParams.order.replace('1', '2')
        }
        else {
          this.searchParams.order = this.searchParams.order.replace('2', '1')
        }
      }
      this.getData();
    },
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  computed: {
    ...mapGetters(['goodsList',]),
    ...mapState({
      total: state => state.search.searchInfo.total
    }),
    isOne() {
      return this.searchParams.order.includes('1')
    },
    isTwo() {
      return this.searchParams.order.includes('2')
    },

  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  },

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>