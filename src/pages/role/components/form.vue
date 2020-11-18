<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 树形控件 -->
        <el-form-item label="角色名称" label-width="120px">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加角色'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleAdd, reqMenuList,reqRoleDetail,reqRoleUpdate } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1
      },
      menuList: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.user).then(res => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("添加成功");
          //弹框关闭
          this.cancel();
          //让页面置空
          this.empty();
          //刷新页面
          this.$emit("init");
        }
      });
    },
    getOne(id){
      reqRoleDetail(id).then(res=>{
        this.user=res.data.list
        //树形控件
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus))
        this.user.id=id
      })
    },
    update(){
      reqRoleUpdate(this.user).then(res=>{
        if(res.data.code === 200){
          successAlert("修改成功")
          this.cancel();
          //让页面置空
          this.empty();
          //刷新页面
          this.$emit("init");
        }
      })
    },
    closed(){
      if(this.info.title==="编辑角色"){
        this.empty()
      }
    }
  },
  mounted() {
    reqMenuList().then(res => {
      this.menuList = res.data.list;
    });
  }
};
</script>

<style>
</style>