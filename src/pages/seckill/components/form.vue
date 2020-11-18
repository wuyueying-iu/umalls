<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 时间选择 -->

        <el-form-item label="活动期限" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="user.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="user.second_cateid" placeholder="请选择二级分类" @change="changeSecond">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px" prop="goodsid">
          <el-select v-model="user.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加秒杀活动'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqgoodsList,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
  reqcateList
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      value: [],
      secondCateList: [],
      goodsList: []
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      GoodsList: "goods/list",
      seckillList: "seckill/list"
    })
  },
  methods: {
    ...mapActions({
      reqBannerList: "banner/reqList",
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqseckillList: "seckill/reqList"
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.secondCateList = [];
      this.goodsList = [];
      this.value = [];
    },
    changeFirst() {
      this.user.second_cateid = "";

      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    changeSecond() {
      this.user.goodsid = "";
      this.getGoodsList();
    },
    getGoodsList() {
      reqgoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
        this.goodsList = res.data.list;
      });
    },
    add() {
      this.user.begintime = this.value[0].getTime();
      this.user.endtime = this.value[1].getTime();
      reqseckAdd(this.user).then(res => {
        if (res.data.code == 200) {
          //弹出成功弹框
          successAlert("添加成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.reqseckillList();
        }
      });
    },
    getOne(id) {
      reqseckDetail(id).then(res => {
        console.log(res);
        this.user = res.data.list;
        //补ids
        this.user.id = id;
        this.getSecondList()
        this.getGoodsList()
        this.value.push(
          new Date(JSON.parse(this.user.begintime)),
          new Date(JSON.parse(this.user.endtime))
        );
      });
    },
    update() {
      this.user.begintime = this.value[0].getTime();
      this.user.endtime = this.value[1].getTime();
      reqseckUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");

          this.cancel();
          this.empty();
          //通知父组件刷新页面
          this.reqseckillList();
        }
      });
    },
    closed() {
      if (this.info.title == "编辑秒杀活动") {
        this.empty();
      }
    }
  },
  mounted() {
    this.reqGoodsList();
    this.reqCateList();
    this.reqseckillList();
  }
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