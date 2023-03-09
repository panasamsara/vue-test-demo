<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <nx-skin class="theme-switch right-menu-item"></nx-skin>
      <el-row>
        <el-button type="primary" @click="imgDialogVisible=true">图片</el-button>
      </el-row>
    </div>
    <div>
      <el-button type="primary" @click="goForm">Form页面</el-button>
    </div>

    <el-dialog
      class="previewDialog"
      title="预览"
      :visible.sync="imgDialogVisible"
      width="400px"
      :append-to-body="true"
      :modal='false'
      :close-on-click-modal='false'
      v-draggable
    >
      <div class="imgPreview" >
        <img id="printMe" ref="imgPreviewId"  src="../assets/logo.png" alt />
      </div>
      <div class="buttons">
        <el-button @click="closeDialog" class="my-menu">关闭</el-button>
        <el-button class="my-menu" @click="translateFunc" >旋转</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="previewDialog"
      title="预览"
      :visible.sync="pdfDialogVisible"
      width="400px"
      :append-to-body="true"
      :modal='false'
      :close-on-click-modal='false'
      v-draggable
    >
      <div class="pdfPreview" >
        <iframe
          id="printMe"
          ref="pdfIframe2"
          :src="pdfSrc"
          allowfullscreen="true"
          frameborder="0"
          :style="{width:'100%',height:pageHt+'px'}"
        ></iframe>
      </div>
      <div class="buttons">
        <el-button @click="pdfDialogVisible=false" class="my-menu">关闭</el-button>
        <div class="my-menu" @click="pdfPrintAll" v-if="pdfSrc">打印</div>
      </div>
    </el-dialog>

    <!-- <DataCharts ref="DataCharts" :chartsType="activeName" :chartsData="chartsData" :loading="loading" :performanceValueType='performanceValueType'></DataCharts> -->
  </div>
</template>

<script>
import util from "@/utils/index";
import nxSkin from "@/components/nx-skin/index";
import DataCharts from '@/components/echarts/dataCharts.vue';

export default {
  name: "HelloWorld",
  components: {
    nxSkin, DataCharts
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      imgDialogVisible: false,
      pdfDialogVisible: false,
      current: 0,
      pageHt: window.innerHeight,
      pdfSrc: '',
      activeName: 'line', // line-折线图   histogram-柱状图
      chartsData: [],
      loading: false,
      performanceValueType: 0,
    };
  },
  mounted() {
    util.toggleClass(document.body, "custom-" + this.themecolor);
    let curcolor = this.$store.state.themecolor;
    this.classH2 = "custome-" + curcolor;
  },
  computed: {
    themecolor: {
      get() {
        return this.$store.state.themecolor;
      },
      set(val) {
        this.$store.commit("setThemeColor", val);
      },
    },
  },
  watch: {
    themecolor: {
      handler() {
        toggleClass(document.body, "custom-" + this.themecolor);
      },
    },
  },
  methods:{
    goForm(){
      this.$router.push({
        name: 'FormDemo'
      })
    },
    closeDialog(){
      this.imgDialogVisible = false;
    },
    // 图片旋转
    translateFunc(){
      this.current += 90;
      this.current = this.current%360;
      this.$refs['imgPreviewId'].style.transform = 'rotate('+this.current+'deg)';
    },
    // 改成浏览器自带打印预览
    pdfPrintAll() {
      document.querySelectorAll('#printMe')[0].contentWindow.print()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
