<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- table -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- 分页 -->
    <!-- 
      total 总页数
      page-sizes 一页有几条数据
      
    -->
    <!-- 1 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
    <!-- 弹框 -->
    <!-- 5 -->
    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqUserList, reqUserCount } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加管理员"
      },
      list: [],
      //2
      total: 0,
      size: 2, //一页的数量
      page: 1 //当前页码
    };
  },
  components: {
    vList,
    vForm
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
    },
    init() {
      reqUserList({ page: this.page, size: this.size }).then(res => {
        let list = res.data.list ? res.data.list : [];
        // 6
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
      });
    },
    edit(uid) {
      (this.info = {
        isshow: true,
        title: "编辑信息"
      }),
        this.$refs.form.getOne(uid);
    },
    // 3
    getCount() {
      reqUserCount().then(res => {
        this.total = res.data.list[0].total
      });
    },
    // 4
    changePage(page) {
      this.page = page;
      this.init();
    },
    // 5
    newInit() {
      this.init();
      this.getCount();
    }
  },
  mounted() {
    //一进来就要获取列表中的数据
    this.init();
    // 3
    this.getCount();
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>