import Vue from 'vue'
import App from './index'
// import {
//   request
// }
//   from '../../utils/request'
//
// Vue.prototype.$http = request
const app = new Vue(App)

app.$mount()
export default {
  config: {
    'navigationBarBackgroundColor': '#ffffff',
    'backgroundTextStyle': 'light',
    'enablePullDownRefresh': true
  }
}
