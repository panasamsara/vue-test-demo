// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import 'element-ui/lib/theme-chalk/index.css';
// import '../theme/index.css';
import store from './store'
// import '../theme/index.css'
// import './assets/css/theme/000/index.css';
// import './assets/css/theme/FFB400/index.css';
// import '../theme/theme-ffb400/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
