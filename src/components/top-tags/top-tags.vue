<template>
    <div v-if="showTags" class="tags">
        <el-tabs v-model="thisRoute">
            <el-tab-pane
                v-for="(item,index) in tagsList"
                :key="item.path"
                :label="item.title"
                :name="item.path"
            >
                <div
                    slot="label"
                    class="tags-li"
                    :class="[{'active': isActive(item.path)},'zl-zdy-'+item.name]"
                    @contextmenu="showMenu_click($event,index)"
                    @click="goPage(item.name,item.path)"
                >
                    <el-tooltip effect="dark" :content="item.title" placement="top">
                        <div class="tags-li-title">
                            {{ item.title }}
                        </div>
                    </el-tooltip>
                    <span v-show="item.path !=='/dashboard'" class="tags-li-icon" @click.stop="closeTags(index)">
                        <i class="el-icon-close" />
                    </span>
                </div>
                <div class="" style="display: none" />
            </el-tab-pane>
        </el-tabs>

        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown" class="tags-close">
                    <el-dropdown-item command="other">关闭其它</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    <p class="recentlyClosed_title">最近关闭</p>
                    <div v-if="recentlyClosed.length >0 " class="recently-closed">
                        <ul>
                            <li v-for="(item,index) in recentlyClosed" :key="index" class="recently-closed-list">
                                <el-tooltip effect="dark" :content="item.title" placement="left">
                                    <router-link :to="item.path" class="">
                                        <span>
                                            {{ item.title }}
                                        </span>
                                    </router-link>
                                </el-tooltip>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p class="recently-closed-no-data">无记录</p>
                    </div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <!--自定义鼠标右键点击 菜单-->
        <div
            v-show="showMenu.Visible"
            class="showMenu-box"
            @contextmenu="preventDefault_r($event)"
            @click="closeMenu_click"
        >
            <div class="showMenu-list" :style="{'top':showMenu.showMenu_top,'left':showMenu.showMenu_left}">
                <ul class="showMenu-list-box">
                    <li @click="closeTags(showMenu.show_index)">关闭当前标签页</li>
                    <li
                        :class="[{'disable': !showMenu.menuCloseOther_allow}]"
                        @click="menuCloseOther(showMenu.show_index)"
                    >关闭其他标签页
                    </li>
                    <li
                        :class="[{'disable': !showMenu.menuCloseLeft_allow}]"
                        @click="menuCloseLeft(showMenu.show_index)"
                    >关闭左侧标签页
                    </li>
                    <li
                        :class="[{'disable': !showMenu.menuCloseRight_allow}]"
                        @click="menuCloseRight(showMenu.show_index)"
                    >关闭右侧标签页
                    </li>
                    <li :class="[{'disable': !showMenu.closeAll_allow}]" @click="closeAll">关闭全部标签页</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                thisRoute: this.$route.fullPath,
                tagsList: [],
                home: {
                    name: 'Dashboard',
                    path: '/dashboard',
                    title: '工作台',
                },
                recentlyClosed: [],

                showMenu: {
                    showMenu_top: '0px',
                    showMenu_left: '0px',
                    Visible: false,
                    show_index: null,

                    menuCloseOther_allow: false,
                    menuCloseLeft_allow: false,
                    menuCloseRight_allow: false,
                    closeAll_allow: false,

                },
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0
            },
        },
        watch: {
            $route(newValue, oldValue) {
                this.setTags(newValue)
            },
        },
        created() {
            this.setTags(this.$route)
            // 关闭当前菜单
            this.$bus.$on('closeTagsCurrentBus', (data) => {
                // 获取当前 index
                let idx = null
                this.tagsList.forEach((item, index) => {
                    if (this.thisRoute === item.path) {
                        idx = index
                    }
                })
                this.closeTags(idx)
            })
            this.$bus.$on('closeTagName', (data) => {
                // 获取当前 index
                let idx = null
                this.tagsList.forEach((item, index) => {
                  if (data == item.name) {
                    idx = index
                  }
                })
                this.closeTags(idx)
            })
        },
        /* 销毁前 运行 7*/
        beforeDestroy() {
            this.$bus.$off('closeTagsCurrentBus')
            this.$bus.$off('closeTagName')
        },

        methods: {
            /**
             * 判断当前
             * */
            isActive(path) {
                this.thisRoute = this.$route.fullPath
                return path === this.$route.fullPath
            },

            /**
             * 右键菜单 打开弹窗
             * */
            showMenu_click(event, index) {
                // console.log(this.tagsList.length);
                // console.log(index);
                if (index === 0) {
                    event.preventDefault()
                } else {
                    event.preventDefault()
                    if (this.tagsList.length <= 1) {
                        this.showMenu.menuCloseOther_allow = false
                        this.showMenu.menuCloseLeft_allow = false
                        this.showMenu.menuCloseRight_allow = false
                        this.showMenu.closeAll_allow = false
                    } else if (this.tagsList.length === 2) {
                        this.showMenu.menuCloseOther_allow = false
                        this.showMenu.menuCloseLeft_allow = false
                        this.showMenu.menuCloseRight_allow = false
                        this.showMenu.closeAll_allow = true
                    } else {
                        this.showMenu.menuCloseOther_allow = true
                        this.showMenu.closeAll_allow = true
                        if (this.tagsList.length === (index + 1)) {
                            this.showMenu.menuCloseLeft_allow = true
                            this.showMenu.menuCloseRight_allow = false
                        } else if (index > 1) {
                            this.showMenu.menuCloseLeft_allow = true
                            this.showMenu.menuCloseRight_allow = true
                        } else if (index === 1) {
                            this.showMenu.menuCloseLeft_allow = false
                            this.showMenu.menuCloseRight_allow = true
                        }
                    }

                    this.showMenu.show_index = index
                    this.showMenu.showMenu_top = event.pageY + 'px'
                    this.showMenu.showMenu_left = event.pageX + 'px'
                    this.showMenu.Visible = true
                }
            },

            /**
             * 右键关闭弹窗
             * */
            preventDefault_r(event) {
                event.preventDefault()
                this.showMenu.Visible = false
            },

            // 左键点击关闭弹窗
            closeMenu_click() {
                this.showMenu.Visible = false
            },

            // 右键菜单关闭其他
            menuCloseOther(index) {
                if (!this.showMenu.menuCloseOther_allow) {
                    return
                }
                let current_tag_item = null
                let count = 0
                const curItem = this.tagsList.filter((item) => {
                    count = count + 1
                    if (count - 1 === index) {
                        current_tag_item = item
                        return item
                    } else if (item.path === '/dashboard') {
                        //
                    } else {
                        this.TagsrecentlyClosed(item)
                    }
                })
                this.tagsList = curItem
                if (curItem[0].path === '/dashboard') {
                    //
                } else {
                    this.tagsList.unshift(this.home)
                }
                this.$router.push(current_tag_item.path)
            },

            // 右键菜单关闭左侧标签(保留右侧数据)
            menuCloseLeft(index) {
                if (!this.showMenu.menuCloseLeft_allow) {
                    return
                }
                let current_tag_item = null
                let home_item = this.tagsList[0]
                let fullPath_idx = null
                const tagsList_right = [] // 右侧数据
                this.tagsList.forEach((v, i) => {
                    const item = this.tagsList[i]
                    if (this.$route.fullPath === item.path) {
                        fullPath_idx = i
                    }
                    if (i < index) {
                        // 左侧数据
                        this.TagsrecentlyClosed(item)
                    } else if (i > index) {
                        // 右侧数据
                        tagsList_right.push(item)
                    } else if (i === index) {
                        current_tag_item = item
                    } else if (item.path === '/dashboard') { // 过滤home
                        home_item = item
                    } else {
                        this.TagsrecentlyClosed(item)
                    }
                })

                tagsList_right.unshift(current_tag_item)
                tagsList_right.unshift(home_item)// 添加首页
                this.tagsList = tagsList_right

                if (fullPath_idx < index) {
                    this.$router.push(current_tag_item.path)
                }
            },

            // 右键菜单关闭右侧标签(保留左侧数据)
            menuCloseRight(index) {
                if (!this.showMenu.menuCloseRight_allow) {
                    return
                }
                let current_tag_item = null
                let fullPath_idx = null
                const tagsList_letf = [] // 左侧数据
                this.tagsList.forEach((v, i) => {
                    const item = this.tagsList[i]
                    if (this.$route.fullPath === item.path) {
                        fullPath_idx = i
                    }
                    if (i < index) {
                        // 左侧数据
                        tagsList_letf.push(item)
                    } else if (i > index) {
                        // 右侧数据
                        this.TagsrecentlyClosed(item)
                    } else if (i === index) {
                        current_tag_item = item
                    } else if (item.path === '/dashboard') { // 过滤home

                    } else {
                        this.TagsrecentlyClosed(item)
                    }
                })
                tagsList_letf.push(current_tag_item)
                this.tagsList = tagsList_letf
                if (fullPath_idx > index) {
                    this.$router.push(current_tag_item.path)
                }
            },
            // 关闭单个标签
            closeTags(index) {
              if (!index) {
                  return
              }
              let delItem = {}
              // 获取关闭 数据
              // eslint-disable-next-line prefer-const
              delItem = this.tagsList.splice(index, 1)[0]
              // 获取关闭数据 上一组数据
              const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
              if (item) {
                  // eslint-disable-next-line no-unused-expressions
                  delItem.path === this.$route.fullPath && this.$router.push(item.path)
              } else {
                  this.$router.push('/')
              }
              this.TagsrecentlyClosed(delItem)
            },

            // 关闭全部标签
            closeAll() {
                if (this.tagsList.length <= 1) {
                    return
                }
                this.tagsList.forEach((v, i) => {
                    const item = this.tagsList[i]
                    if (item.path === '/dashboard') { // 过滤home

                    } else {
                        this.TagsrecentlyClosed(item)
                    }
                })
                this.tagsList = []
                this.$router.push('/dashboard')
            },
            // 关闭其他标签
            closeOther() {
                const curItem = this.tagsList.filter((item) => {
                    if (this.$route.fullPath === item.path) {
                        return item.path === this.$route.fullPath // 获取当前标签
                    } else if (item.path === '/dashboard') {
                        //
                    } else {
                        this.TagsrecentlyClosed(item)
                    }
                })
                this.tagsList = curItem
                if (curItem[0].path === '/dashboard') {
                    //

                } else {
                    this.tagsList.unshift(this.home)
                }
            },
            // 添加最近关闭标签
            TagsrecentlyClosed(data) {
              // 平台服务费线下确认详情 不添加
              if (data.path === '/dashboard' || data.name ==='BidExpanseConfirmDetail') {
                  return
              }
              this.recentlyClosed.forEach((v, i) => {
                  if (data.path === v.path) {
                      // eslint-disable-next-line no-unused-expressions
                      this.recentlyClosed.splice(i, 1)[0] // 关闭相同
                  }
              })
              if(this.recentlyClosed.length>=10){
                this.recentlyClosed.pop() // 最近关闭的只保留10条，删除数组最后一个
              }
              this.recentlyClosed.unshift(data) // 添加最近关闭 数据（数组开头添加一个元素）
            },

            // 设置标签
            setTags(route) {
                // console.log('设置标签')
                const isExist = this.tagsList.some((item) => item.path === route.fullPath)
                if (!isExist) {
                    if (this.tagsList.length >= 9999) {
                        this.TagsrecentlyClosed(this.tagsList[1])
                        //                        this.tagsList.shift(); //删除第一个
                        this.tagsList.splice(1, 1)// 删除第二个
                    }

                    let tag_index = this.getArrayIndex(this.tagsList, route.meta.title); // 避免产生多个详情页签
                    if(tag_index<0){ 
                        this.tagsList.push({
                            title: route.meta.title,
                            path: route.fullPath,
                            name: route.matched[1].components.default.name,
                        })
                    }else{
                        this.tagsList[tag_index] = {
                            title: route.meta.title,
                            path: route.fullPath,
                            name: route.matched[1].components.default.name,
                        }
                    }
                    
                }

                // this.$bus.$emit('tags', this.tagsList)
                // 添加首页
                if (this.tagsList[0].path === '/dashboard') {
                    //
                } else {
                    this.tagsList.unshift(this.home)
                }
            },
            getArrayIndex(arr, title) {
                let num = -1
                if(arr && arr.length>0){
                    for(let i=0;i<=arr.length;i++) { 
                        if (arr&&arr[i]&&arr[i].title === title) {
                            num = i;
                            break;
                        }
                    } 
                }
                return num;
            },
            handleTags(command) {
                if (command === 'other') {
                    this.closeOther()
                } else {
                    this.closeAll()
                }
            },

            /**
             * 跳转
             * */
            goPage(name, path) {
                if (path !== this.thisRoute) {
                    this.$router.push(path)
                    // this.goRouter(name, params, query)
                }
            },
        },
    }
</script>

<style>
    .zl-tags-box .el-tabs__item {
        padding: 0 0px !important;
    }
</style>

<style scoped lang="scss">
    .tags {
        position: relative;
        height: 40px;
        overflow: hidden;
        background: #ffffff;
        padding-right: 65px;
    }

    .tags-li {
        float: left;
        margin: 10px 0 0 0;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        background: rgba(245, 246, 250, 1);
        padding: 0 15px 0 20px;
        vertical-align: middle;
        -webkit-transition: all .3s ease-in;
        -o-transition: all .3s ease-in;
        transition: all .3s ease-in;
        border-radius: 20px 20px 0 0;
        border: 1px rgba(223, 225, 232, 1) solid;
        position: relative;
    }

    .tags-li.active {
        background-color: rgba(234, 244, 251, 1);
        border: 1px solid rgba(202, 224, 239, 1);
        color: #232f3f;
    }

    .tags-li.active .tags-li-title {
        color: rgba(0, 0, 0, 0.65);
    }

    .tags-li-title {
        color: rgba(0, 0, 0, 0.65);
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        margin-right: 5px;
        display: inline-block;
    }

    .tags-li-icon{
        display: inline-block;
        float: right;
    }

    .tags-li-icon .el-icon-close{
        z-index: 9;
    }

    .tags-close-box {
        position: absolute;
        right: 0px;
        top: 0px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        /* width: 110px; */
        height: 40px;
        width: 62px;
        border-radius: 0;
        z-index: 10;
        /*background: #d9dee4;*/
        /* box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1); */
    }

    .tags-close-box .el-dropdown .el-button {
        width: 62px;
        height: 40px;
        background: #EAF4FB;
        border-radius: 6px 0px 0px 0px;
        border-color:#EAF4FB;
        color: rgba(104, 122, 149, 1);
        font-size: 16px;
    }

    /*右键菜单弹窗*/
    .showMenu-box {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 99;
        top: 0;
        left: 0;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0);
    }

    .showMenu-list {
        position: fixed;
        padding: 0 0;
        width: 140px;
        height: auto;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: white;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    }

    .showMenu-list .showMenu-list-box {
        box-sizing: border-box;
        padding: 0;
    }

    .showMenu-list-box li {
        text-align: center;
        list-style: none;
        line-height: 32px;
        padding: 0 10px;
        margin: 0;
        color: #606266;
        cursor: pointer;
        outline: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 14px;
    }

    .showMenu-list-box li:first-child {
        border-top: none;
    }

    .showMenu-list-box li.disable {
        cursor: not-allowed;
    }

    .showMenu-list-box li:hover {
        color: #000;
        background-color: #C7CCD4;
    }

    .recentlyClosed_title {
        text-align: center;
        line-height: 27px;
        padding: 0 15px;
        font-size: 13px;
        color: #606266;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        cursor: default;
        background-color: rgb(232, 243, 255);
        box-sizing: border-box;
    }

    .recently-closed-no-data {
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        cursor: not-allowed;
    }

    .recently-closed-list {
        line-height: 30px;
        padding: 0 15px;
        font-size: 13px;
        cursor: pointer;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        text-align: center;
    }

    .recently-closed-list a {
        color: #606266;
    }

    .recently-closed-list:hover a {
        color: rgb(255, 140, 0);
    }

    .recently-closed-list:hover {

    }

</style>
