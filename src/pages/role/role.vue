<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- table -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
import {reqRoleList} from "../../utils/http"
export default {
  data() {
    return {
      info:{
        isshow:false,
        title:"添加角色"
      },
      list:[]
    }
  },
  components: {
    vForm,
    vList
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info.isshow = true
    },
    init(){
      reqRoleList().then(res=>{
        this.list=res.data.list
      })
    },
    edit(id){
      this.info={
        isshow:true,
        title:"编辑角色"
      }
      this.$refs.form.getOne(id)
    }
  } ,
  mounted() {
    this.init()
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>