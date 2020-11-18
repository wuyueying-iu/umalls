<template>
  <div>
    <div class="box" id="main"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import echarts from "echarts";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "数量"
            },
            tooltip: {},
            legend: {
              data: ["数量"]
            },
            xAxis: {
              data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "bar",
                data: this.list.map(item=>item.children?item.children.length:0)
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    })
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style scoped>
.box {
  width: 80%;
  height: 500px;
  border: 1px solid violet;
  margin: 20px auto;
}
</style>