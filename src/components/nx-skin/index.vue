<template>
  <div>
    <el-dropdown
      @command="handleCommandSkin"
      trigger="hover"
      class="eldropdown"
    >
      <span class="el-dropdown-link lang">主题</span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item v-for="(item,index) in skins" :key="index" :command="item.name">{{generateSkinColor(item.label)}}</el-dropdown-item> -->
        <el-dropdown-item
          v-for="(item, index) in skins"
          :key="index"
          :command="item.name"
          >{{ generateSkinColor(item.label) }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { generateSkinColor } from "@/utils/i18n"; // 国际化主题名字
import { global } from "@/global/global";
export default {
  name: "nx-skin",
  data() {
    return {
      skins: [
        { name: "Blue", label: "Blue" },
        { name: "Green", label: "Green" },
        { name: "Red", label: "Red" },
        { name: "Purple", label: "Purple" },
        { name: "Default", label: "Default" },
      ],
    };
  },
  mounted() {},
  methods: {
    generateSkinColor,
    handleCommandSkin(command) {
      // global.changeTheme(command)

      if (command == "Blue") {
        console.log(11, command);
        this.removeCss("000");
        this.loadCss("static/theme-ffb400/index.css");
      } else {
        console.log(12, command);
        this.removeCss("theme-ffb400");
        this.loadCss("static/000/index.css");
      }
    },
    loadCss(path) {
      var head = document.getElementsByTagName("head")[0];
      var link = document.createElement("link");
      link.href = path;
      link.rel = "stylesheet";
      link.type = "text/css";
      console.log(111, link);
      head.appendChild(link);
    },
    removeCss(href) {
      var links = document.getElementsByTagName("link");
      for (var i = 0; i < links.length; i++) {
        var _href = links[i].href;
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
          links[i].parentNode.removeChild(links[i]);
        }
      }
    },
  },
};
</script>

<style scoped>
.lang {
  cursor: pointer;
  color: #5a5e66;
}

.eldropdown {
  margin-right: 5px;
}
.skin {
  /*margin-top: 3px;*/
  cursor: pointer;
}
</style>
