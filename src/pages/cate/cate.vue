<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- table -->
    <v-list @edit="edit"></v-list>

    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加分类"
      }
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
    edit(id){
      this.info={
        isshow:true,
        title:"编辑分类"
      }
      this.$refs.form.getOne(id)
    }
  }
};
</script>

<style>
</style>