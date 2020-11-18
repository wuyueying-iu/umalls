<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addArr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delArr(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1
      },
      attrArr: [{ value: "" }]
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount"
    }),
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    addArr() {
      this.attrArr.push({
        value: ""
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1
      };
      this.attrArr = [{ value: "" }];
    },
    add() {
      this.user.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      reqspecsAdd(this.user).then(res => {
        if (res.data.code == 200) {
          //弹出成功弹框
          successAlert("添加成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.reqList();
          this.reqCount();
        }
      });
    },
    getOne(id) {
      reqspecsDetail(id).then(res => {
        this.user = res.data.list[0];
        this.attrArr = JSON.parse(this.user.attrs).map(item => ({
          value: item
        }));
      });
    },
    update() {
      this.user.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      reqspecsUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");

          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      if (this.info.title == "编辑规格") {
        this.empty();
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>