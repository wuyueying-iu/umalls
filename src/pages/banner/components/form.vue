<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="user.pid!==0">
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" />
            <input type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加轮播图'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: null,
        status: 1
      },
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqBannerList: "banner/reqList"
    }),
    cancel() {
      this.info.isshow = false;
    },
    changeFile(e) {
      let file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        errorAlert("图片大小不能超过2M");
        return;
      }

      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    empty() {
      this.user = {
        title: "",
        img: null,
        status: 1
      };
      this.imgUrl = "";
    },
    add() {
      reqBannerAdd(this.user).then(res => {
          console.log(res)
        if (res.data.code == 200) {
          //弹出成功弹框
          successAlert("添加成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.reqBannerList();
        }
      });
    },
    getOne(id) {
      reqBannerDetail(id).then(res => {
          console.log(res)
        this.user = res.data.list;
        //
        this.imgUrl = this.$imgPre + this.user.img;
        //补ids
        this.user.id = id;
      });
    },
    update() {
      reqBannerUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.reqBannerList();
        }
      });
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
</style>