<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加管理员'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqUserAdd,
  reqRoleList,
  reqUserDetail,
  reqUserUpdate
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      rolelist: []
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
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    add() {
      reqUserAdd(this.user).then(res => {
        if (res.data.code == 200) {
          //弹出成功弹框
          successAlert("添加成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.$emit("init");
        }
      });
    },
    getOne(uid) {
      reqUserDetail(uid).then(res => {
        this.user = res.data.list;
        this.user.password = "";
      });
    },
    update() {
      reqUserUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.$emit("init");
        }
      });
    }
  },
  mounted() {
    reqRoleList().then(res => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list;
      }
    });
  }
};
</script>

<style scoped>
</style>