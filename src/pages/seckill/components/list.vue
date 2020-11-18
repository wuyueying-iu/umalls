<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable></el-table-column>
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {reqseckDel} from "../../../utils/http"
import {successAlert} from "../../../utils/alert"
export default {
  computed: {
    ...mapGetters({
        list:"seckill/list"
    })
  },
  methods: {
    ...mapActions({
        reqseckList:"seckill/reqList"
    }),
    del(id){
        reqseckDel(id).then(res=>{
            if(res.data.code==200){
                successAlert("删除成功")
                this.reqseckList()
            }
        })
    },
    edit(id){
        this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqseckList()
  },
};
</script>

<style scoped>
.btn{
    display: inline-block;
}
img{
    width: 80px;
    height: 80px;
}
</style>