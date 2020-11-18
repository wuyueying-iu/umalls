<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" sortable></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable></el-table-column>
      <el-table-column label="规格属性" sortable>
        <template slot-scope="scope">
          <el-tag type="danger" v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
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
import { reqspecsDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      changePage: "specs/changePage",
      reqCount: "specs/reqCount"
    }),
    del(id) {
      reqspecsDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqCount()
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqList();
    this.reqCount();
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