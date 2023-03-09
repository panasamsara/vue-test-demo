<template>
  <div>
    <div id="echarts" v-loading="loading"></div>
    <img src="" id="printImg" style="height: 40%;width:100%; position: absolute;  " />
  </div>
</template>

<script>
import * as echarts from "echarts";
import chartsConfig from "./chartsConfig";
import util from "@/utils/index";

export default {
  data() {
    return {};
  },
  props: {
    // 柱状图还是折线图
    chartsType: {
      type: String,
      default: "histogram",
    },
    // 传过来数据
    chartsData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    performanceValueType:  {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    chartsType(newVal, oldVal) {
      if (newVal) {
        this.init();
      }
    },
    chartsData: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
      immediate: false,
      deep: true,
    },
  },
  methods: {
    init() {
      let chartDom = document.getElementById("echarts");
      let myChart = echarts.init(chartDom);
      myChart.clear()
      let option = util.deepClone(chartsConfig[this.chartsType].option);
      if (this.chartsData.length) {
        let { xAxisData, seriesData, nameData, nums } = this.dataHandle();
        option.xAxis.data = [...new Set(xAxisData)];
        option.legend.data = nameData;
        const obj = util.deepClone(option.series[0]);
        for (let index = 0; index < nums; index++) {
          option.series[index] = util.deepClone(obj);
          option.series[index].data = Array.isArray(seriesData[index])
            ? seriesData[index]
            : seriesData;
          option.series[index].name = nameData[index];
        }
        option.xAxis.name = '日期';
        switch(this.performanceValueType){
          case 0:
            option.yAxis.name = '项目数量';
            break;
          case 1:
            option.yAxis.name = '委托估算金额(万元)';
            break;
          case 2:
            option.yAxis.name = '定标金额(万元)';
            break;
          case 3:
            option.yAxis.name = '比较(创效)(万元)';
            break;
        }
        
      } // 没有数据的时候的显示
      else {
        option = {
          title: {
            text: "暂无数据",
            x: "center",
            y: "center",
            textStyle: {
              color: "#409EFF",
              fontWeight: "normal",
              fontSize: 16,
            },
          },
        };
      }
      option && myChart.setOption(option);
      // echart canvas 保存为图片src
      myChart.on('finished', function () {
        let img = myChart.getDataURL();
        let printImgId = document.getElementById('printImg')
        printImgId.setAttribute('src', img);
      });
    },
    // 数据处理
    dataHandle() {
      // 横坐标，数据（有可能有多条折线）,多条数据数量
      let xAxisData = [],
        seriesData = [],
        nameData = [],
        nums = 1;
      const func = (data) => {
        data.forEach((item, index) => {
          if (Array.isArray(item)) {
            nums = data.length;
            nameData.push(item[0].name);
            let list = [];
            item.forEach((sonItem) => {
              list.push(sonItem.value);
              xAxisData.push(sonItem.key);
            });
            seriesData.push(list);
          } else {
            xAxisData.push(item.key);
            seriesData.push(item.value);
          }
        });
      };
      func(this.chartsData);

      return { xAxisData, seriesData, nameData, nums };
    },
  },
};
</script>

<style scoped>
#echarts {
  width: 100%;
  height: 500px;
}
</style>