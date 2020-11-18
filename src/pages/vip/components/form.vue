<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" v-if="user.pid!==0">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqVipDetail, reqVipUpdate } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        uid: 1,
        phone: "",
        nickname: "",
        password: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      vipList: "vip/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList"
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        pid: 1,
        phone: "",
        nickname: "",
        password: "",
        status: 1
      };
    },
    getOne(uid) {
      reqVipDetail(uid).then(res => {
        this.user = res.data.list;
        //补ids
        // this.user.id = id;
      });
    },
    update() {
      reqVipUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.reqList();
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>