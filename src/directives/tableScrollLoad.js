/**
 *  table组件使用，下拉加载更多：v-tableScrollLoad
 *  <el-table v-tableScrollLoad="loadmore"></el-table>
 *  例：
 *  methods: {
 *    loadmore(){
 *      // 最后一页时不再下拉加载； 有搜索条件时不执行
 *      if (this.searchForm.userName == ''
 *       && this.searchFormpage < Math.floor(Number(this.total) / 10) + 1
 *      ) {
 *       this.searchForm.page = this.searchForm.page + 1;
 *       this.getList(true);
 *      }
 *    },
 *    getList(isScroll = false) {
 *      const { data, code } = await this.$post[serviceName]({
 *         ...this.searchForm,
 *       });
 *       if (code && data) {
 *        this.messsgeList = isScroll ? [...this.messsgeList, ...data.list] : data.list;
 *     }
 *  }
 * 
 */
const tableScrollLoad = {
  bind(el, binding) {
    const Scroll_DOM = el.querySelector(
      '.el-table .el-table__body-wrapper '
    )
    Scroll_DOM.addEventListener('scroll', function () {
      const condition =
        this.scrollHeight - this.scrollTop <= this.clientHeight
      if (condition) {
        binding.value()
      }
    })
  }
}
export default tableScrollLoad;