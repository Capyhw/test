<template>
  <div class="pagination">
    <button :disabled="pageNo===1"
            @click="$emit('getPageNo',pageNo-1)">上一页
    </button>
    <button v-if="getStartAndEnd.start>1"
            :class="{active:pageNo===1}"
            @click="$emit('getPageNo',1)">1
    </button>
    <button v-if="getStartAndEnd.start>2"
            :class="{active:pageNo===2}"
            @click="$emit('getPageNo',2)">2
    </button>
    <button v-if="getStartAndEnd.start>3">···</button>
    <button v-for="(item,index) in continues"
            :key="index"
            :class="{active:pageNo===index + getStartAndEnd.start}"
            @click="$emit('getPageNo',index + getStartAndEnd.start)">{{ index + getStartAndEnd.start }}
    </button>
    <button v-if="getStartAndEnd.end<Math.ceil(this.total / this.pageSize)-1">···</button>
    <button v-if="getStartAndEnd.end<Math.ceil(this.total / this.pageSize)"
            :class="{active:pageNo===Math.ceil(total / pageSize)}"
            @click="$emit('getPageNo',Math.ceil(total / pageSize))">{{ Math.ceil(total / pageSize) }}
    </button>
    <button :disabled="pageNo===Math.ceil(total / pageSize)"
            @click="$emit('getPageNo',pageNo+1)">下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    getStartAndEnd() {
      let start, end = 0
      if (this.continues > this.total) {
        start = 1
        end = this.total
      }
      else {
        start = this.pageNo - Math.floor(this.continues / 2)
        end = this.pageNo + Math.floor(this.continues / 2)
        if (start < 1) {
          start = 1
          end = this.continues
        }
        if (end > Math.ceil(this.total / this.pageSize)) {
          end = Math.ceil(this.total / this.pageSize)
          start = end - this.continues + 1
        }


      }
      return {start, end}

    }
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
