// table组件使用，下拉加载更多：v-tableScrollLoad
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