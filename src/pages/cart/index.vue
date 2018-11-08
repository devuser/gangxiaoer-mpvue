
<template>

<div class="goods-info">
  <van-cell-group>
  <van-cell value="内容" icon="shop" is-link>
    <view slot="title">
      <span class="van-cell-text">单元格</span>
      <van-tag type="danger">标签</van-tag>
    </view>
  </van-cell>
  <van-cell title="单元格" icon="location" is-link />
  <van-cell title="单元格" :border="false">
    <van-icon slot="plus-icon" name="search" class="van-cell__right-icon" />
  </van-cell>
</van-cell-group>

  <van-panel title="管理地址">
  </van-panel>
  <van-cell-group>
    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" label="描述信息" :border="false" />
    <van-cell title="单元格" value="内容" label="描述信息" :border="true" />
  </van-cell-group>

<van-panel >
    <van-button type="danger" size="small">
  新增地址</van-button>
  </van-panel>
</div>

</template>

<script>

import {
  formatTime
}
  from '@/utils/index'
// import {
//   cstHandUpAction,
//   cstHandDownAction
// }
//   from '@/utils/api'

import card from '@/components/card'
// import PostUserBref from '@/components/postuserbref'
import store from './store'
// import wxParse from 'mpvue-wxparse'
export default {
  components: {
    card
    // wxParse
  },
  computed: {
    addrList () {
      return store.state.addrList
    }
  },
  data () {
    return {
      logs: []
    }
  },
  methods: {
    // async getData(postId) {
    //   console.log('before getData')
    //   console.log(this.$http)
    //   let token = wx.getStorageSync('token')
    //   if (token === '') {
    //     this.$getOpenid()
    //   }
    //   this.$getPost(token, postId).then((res) => {
    //     console.log(res)
    //     console.log(res.code)
    //     console.log(res.data)
    //     store.commit('updatePost', res.data)
    //   })
    // },
    // // async onHidePost(postId) {
    // //   console.log(postId)
    // //
    // //   const res = await this.$http.request({
    // //     method: 'get',
    // //     url: '/post/hide',
    // //     body: {
    // //       'token': '',
    // //       'postId': postId
    // //     }
    // //   })
    // //   console.log(res)
    // //   console.log(res.code)
    // //   console.log(res.data)
    // // },
    // async onHandActionPost(postId, handAction) {
    //   console.log(postId)
    //   console.log('before onHandActionPost')
    //   console.log(this.$http)
    //   let token = wx.getStorageSync('token')
    //   if (token === '') {
    //     this.$getOpenid()
    //     return
    //   }
    //   const res = await this.$http.request({
    //     method: 'get',
    //     url: '/post/hand',
    //     body: {
    //       'token': token,
    //       'postId': postId,
    //       'handaction': handAction
    //     }
    //   })
    //   console.log(res)
    //   console.log(res.code)
    //   console.log(res.data)
    //   await this.getData(postId)
    //   // store.commit('updatePost', res.data)
    // },
    //
    // async onDoFavPost(postId) {
    //   console.log(postId)
    //   console.log('before onDoFavPost')
    //   console.log(this.$http)
    //   let token = wx.getStorageSync('token')
    //   if (token === '') {
    //     this.$getOpenid()
    //     return
    //   }
    //
    //   const res = await this.$http.request({
    //     method: 'get',
    //     url: '/post/fav',
    //     body: {
    //       'token': token,
    //       'postId': postId
    //     }
    //   })
    //   console.log(res)
    //   console.log(res.code)
    //   console.log(res.data)
    //   await this.getData(postId)
    // },
    // async onHidePost(postId) {
    //   console.log('onHidePost')
    //   let token = wx.getStorageSync('token')
    //   if (token === '') {
    //     this.$getOpenid()
    //   } else {
    //     console.log(`token:${token}`)
    //   }
    //
    //   const res = await this.$http.request({
    //     method: 'get',
    //     url: '/post/hide',
    //     body: {
    //       'token': token,
    //       'postId': postId
    //     }
    //   })
    //   console.log(res)
    //   console.log(res.code)
    //   console.log(res.data)
    //   await this.getData(postId)
    // }
  },
  onShow () {
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return
    }
    // console.log(`postId: ${postId}`)
    // console.log(`token: ${token}`)
    this.$getMyselfAddrList(token).then((res) => {
      console.log(res)
      console.log(res.code)
      if (res.code === 0) {
        console.log(res.data)
        store.commit('updateAddrList', res.data)
      }
    })
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
