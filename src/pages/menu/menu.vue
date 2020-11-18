<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- 弹框 -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    return {
      //1弹框显示
      info: {
        isshow: false,
        title:"菜单添加"
      },
      list: []
    };
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
      reqMenuList().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id){
      this.info.isshow = true
      this.info.title = "编辑菜单"
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    this.init();
  },
  components: {
    vList,
    vForm
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>