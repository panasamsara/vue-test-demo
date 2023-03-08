// 使用：在标签中加：v-draggable  例如：<div v-draggable></div>
const draggable = {
  bind() {},
  inserted(el) {
    el.onmousedown = (e) => {
      let x = e.clientX - el.offsetLeft;
      let y = e.clientY - el.offsetTop;
      document.onmousemove = (e) => {
        let xx = e.clientX - x + "px";
        let yy = e.clientY - y + "px";
        el.style.left = xx;
        el.style.top = yy;
      };
      el.onmouseup = (e) => {
        document.onmousemove = null;
      };
    };
  },
}
export default draggable;