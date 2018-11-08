<style lang='scss' scoped>

@import "./style";

</style>

<template>

<div class="login">
    <div class="logo">

    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">微信登录</button>
</div>

</template>

<script>

import {
  post,
  host
}
  from '@/utils/request'
// var qcloud = require('wafer2-client-sdk/index.js')
export default {

  mounted () {
    console.log(host)

    // qcloud.setLoginUrl(host + '/login')
  },
  data () {
    return {}
  },
  components: {},
  methods: {
    loginSuccess: function (res) {
      let that = this
      console.log(res)
      console.log(res.data)
      if (res.data.code === 10000) {
        // 去注册
        that.registerUser()
        return
      }
      if (res.data.code !== 0) {
        // 登录错误
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '无法登录，请重试',
          showCancel: false
        })
        return
      }
      // console.log('token:' + res.data.data)
      // console.log('token:' + res.data.data.token)
      // wx.setStorageSync('token', res.data.data.token)
      // wx.setStorageSync('uid', res.data.data.uid)
      // 回到原来的地方放
      wx.navigateBack({delta: 1})
    },
    login: function (res) {
      wx.request({
        url: `${host}/user/wxapp/login`,
        data: {
          code: res.code
        },
        success: res => {
          this.loginSuccess(res)
        }
      })
    },
    onLoadingSuccess: function () {
      // console.log(res)
      /// /////////////////////////////////
      wx.login({
        success: (res) => {
          console.log('in wx.login')
          console.log(res)
          console.log(res.code)
        }
      })
    },
    doLogin: function () {
      // let pages = getCurrentPages()
      // // let currPage = pages[pages.length - 1] // 当前页面
      // let prevPage = pages[pages.length - 2] // 上一个页面
      // let that = this
      let token = wx.getStorageSync('token')
      //
      // // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      // prevPage.setData({
      //   data: data
      // })

      console.log(`token: ${token}`)
      if (token) {
        wx.request({
          url: `${host}/user/check-token`,
          data: {
            token: token
          },
          success: (res) => {
            console.log(res)
            if (res.data.code !== 0) {
              console.log('invalidate token')
              wx.removeStorageSync('token')
              // that.login(res)
              // wx.navigateTo({url: '/pages/my/main'})
              this.$registerUser()
              // wx.navigateBack({delta: 1})
            } else {
              // 回到原来的地方放
              //
              console.log('check-token success')
              this.$registerUser()
              wx.navigateBack({delta: 1})
              // wx.navigateTo({
              //   url: '/pages/my/main'
              // })
            }
          }
        })
      }

      // wx.showLoading({
      //   title: '登录中...', // 提示的内容,
      //   mask: true, // 显示透明蒙层，防止触摸穿透,
      //   success: res => {
      //     console.log(res)
      //     that.registerUser()
      //   }
      // })
      //
      // that.onLoadingSuccess()
    }

  },
  computed: {},
  onLoad () {
    console.log('onLoad')
  },
  create () {
    console.log(post)
    console.log(this.$http)
    console.log('login')
  }
}
</script>
