// select组件使用，下拉加载更多：v-selectScrollLoad
const tableScrollLoad = {
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    )
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      const condition =
        this.scrollHeight - this.scrollTop <= this.clientHeight
      if (condition) {
        binding.value()
      }
    })
  }
}
export default tableScrollLoad;