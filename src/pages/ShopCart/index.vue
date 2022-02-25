<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">属性</div>
        <div class="cart-th4">单价（元）</div>
        <div class="cart-th5">数量</div>
        <div class="cart-th6">小计（元）</div>
        <div class="cart-th7">操作</div>
      </div>
      <div class="cart-body">
        <ul v-for="(item,index) in cartInfoList" :key="item.id" class="cart-list">
          <li class="cart-list-con1">
            <input :checked="item.isChecked" name="chk_list" type="checkbox" @change="updateChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" href="javascript:void(0)" @click="reduce(item,index);changeAmount('-',-1,item)">-</a>
            <input :value="data_num[index]" autocomplete="off" class="itxt" minnum="1" type="text"
                   @change="changeAmount('big',$event.target.value*1-item.skuNum,item)"
                   @input="$event.target.value=$event.target.value.replace(/[^1-9]/g, '')">
            <a class="plus" href="javascript:void(0)" @click="add(index);changeAmount('+',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" href="javascript:void(0)" @click="deleteCart(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input :checked="isAllCheck&&cartInfoList.length>0" class="chooseAll"
               type="checkbox" @click="updateAllChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import debounce from "lodash/debounce";


export default {
  name: 'ShopCart',
  data() {
    return {
      data_num: [],
      //按钮的点击次数
      flag: 0
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    //给服务器getData后，cartInfoList发生变化，调用collectNum（）更新data_num
    cartInfoList() {
      this.collectNum()
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList')
    },
    //把skuNum存到数组 data_num里
    collectNum() {
      this.cartInfoList.forEach((item, index) => {
        this.data_num[index] = item.skuNum
      })
    },
    add(index) {
      this.data_num[index]++
      this.flag++
    },
    reduce(item, index) {
      if (this.data_num[index] > 1) {
        this.data_num[index]--
        this.flag++
      }
    },
    //修改商品数量
    changeAmount: debounce(async function (type, num, item) {
      if (type === '-') {
        num = -this.flag
      }
      if (type === '+') {
        num = this.flag
      }
      try {
        //代表的是修改成功
        await this.$store.dispatch('addOrUpdateShopCart', {skuId: item.skuId, skuNum: num})
        //再一次获取服务器最新的数据进行展示
        this.getData();
        this.flag = 0
      } catch (error) {
        console.log(error.message)
      }
    }, 200),
    //删除某一件产品
    deleteCart(item) {
      try {
        this.$store.dispatch('deleteCart', item.skuId)
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    },
    //更改商品选中属性
    async updateChecked(item, event) {
      let isChecked = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('updateChecked', {skuId: item.skuId, isChecked})
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    },
    //全选
    async updateAllChecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        //派发action
        await this.$store.dispatch("updateAllChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全部选中的产品
    async deleteAllCheckedCart() {
      try {
        //派发一个action
        await this.$store.dispatch("deleteAllCheckedCart");
        //再发请求获取购物车列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

  },
  computed: {
    ...mapGetters(['cartList']),
    //拿到购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //计算购物车商品总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(i => {
        sum += i.skuNum * i.skuPrice
      })
      return sum
    },
    //判断是否全选
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 10%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 28%;
      }

      .cart-th3 {
        width: 12%;
      }

      .cart-th4 {
        width: 15%;
      }

      .cart-th5 {
        width: 9.5%;
      }

      .cart-th6 {
        width: 13.5%;
      }

      .cart-th7 {
        width: 5%;

      }

    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>