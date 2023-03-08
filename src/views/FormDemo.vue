<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="display: flex; justify-content: center">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" prop="name" :rules="validate.vdRequired()">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="primary" @click="goBack">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import valid from '@/utils/validate';

export default {
  name: "HelloWorld",
  components: {
    
  },
  data() {
    return {
      msg: "Form Test",
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      validate: {},
    };
  },
  created(){
    this.validate = valid;
  },
  mounted() {
    
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

  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.form.validate(valid=>{
        if(valid){
          console.log(111)
        }else{
          this.$message.error('校验不通过！')
        }
      })
    }
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
