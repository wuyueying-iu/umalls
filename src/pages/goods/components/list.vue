<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable></el-table-column>
      <el-table-column prop="market_price" label="市场价格" sortable></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="primary" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- 32.绑定confirm事件 -->
          <del-btn @confirm="del(scope.row.id)" class="btn"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqgoodsDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size"
    })
  },
  methods: {
    ...mapActions({
      reqGoodsList: "goods/reqList",
      changePage: "goods/changePage",
      reqGoodsCount: "goods/reqCount"
    }),
    del(id) {
      reqgoodsDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqGoodsList();
          this.reqGoodsCount();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqGoodsList();
    this.reqGoodsCount();
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
}
img {
  width: 80px;
  height: 80px;
}
</style>