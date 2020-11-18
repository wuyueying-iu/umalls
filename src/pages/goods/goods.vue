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
import {mapActions,mapGetters} from "vuex"
import vForm from "./components/form"
import vList from "./components/list"
export default {
  data() {
    return {
      info:{
        isshow:false,
        title:"添加商品"
      }
    }
  },
  components:{
    vList,
    vForm
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info.isshow=true
      this.info.title="添加商品"
    },
    edit(id){
      this.info={
        isshow:true,
        title:"编辑商品"
      }
      this.$refs.form.getOne(id)
    }
  },
}
</script>

<style>

</style>