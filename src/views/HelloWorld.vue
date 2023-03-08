<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <nx-skin class="theme-switch right-menu-item"></nx-skin>
      <el-row>
        <el-button type="primary">按钮1</el-button>
      </el-row>
    </div>
    <div>
      <el-button type="primary" @click="goForm">Form页面</el-button>
    </div>
  </div>
</template>

<script>
import { toggleClass } from "../utils/index.js";
import nxSkin from "@/components/nx-skin/index";

export default {
  name: "HelloWorld",
  components: {
    nxSkin,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    toggleClass(document.body, "custom-" + this.themecolor);
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
