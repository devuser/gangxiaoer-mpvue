import {
  getOpenid
}
  from './api'
  // import Vue from 'vue'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

//
// //----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------
//
//
// export function toLogin() {
//   const userInfo = wx.getStorageSync('userInfo');
//   if (!userInfo) {
//     wx.navigateTo({
//       url: "/pages/pC/login/main"
//     });
//   } else {
//     return true;
//   }
// }
//
// export function login() {
//   const userInfo = wx.getStorageSync('userInfo');
//   if (userInfo) {
//     return userInfo;
//   }
// }

// ----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

//
// export function getStorageOpenid() {
//   const openId = wx.getStorageSync("openId");
//   if (openId) {
//     return openId;
//   } else {
//     return ''
//   }
// }

// export function getOpenid() {
// wx.login({
//   success: res => {
//     if (res.code) {
//       //发起网络请求
//       wx.request({
//         url: 'https://api.weixin.qq.com/sns/jscode2session',
//         data: {
//           "appid": "wx601ce71bde7b9add",
//           "secret": "abed5421d88eb8236e933c6e42d5c14e",
//           "js_code": res.code,
//           "grant_type": "authorization_code"
//         },
//         success: function (data) {
//           var openid = data.data.openid;
//           wx.setStorageSync("openid", openid);
//         }
//       })
//     } else {
//       console.log('登录失败！' + res.errMsg)
//     }

//   },
//   fail: () => {},
//   complete: () => {}
// });
// }

export default {
  formatNumber,
  formatTime,
  getOpenid
}
