

<template>

<div class="goods-info">
    <van-panel title="编辑地址">
    </van-panel>

    <!-- <button type="warn" class="save-btn" formType="submit">保存</button>
    <button wx:if="{{!addressData}}" type="primary" class="save-btn" bindtap="readFromWx">从微信读取</button>
    <button type="default" class="save-btn" bindtap="deleteAddress" data-id="{{addressData.id}}" wx:if="{{addressData}}">删除该地址</button>
    <button type="default" class="cancel-btn" bindtap="bindCancel">取消</button> -->

</div>

</template>

<script>

import {
  formatTime
}
  from '@/utils/index'
import {
  cstHandUpAction,
  cstHandDownAction
}
  from '@/utils/api'

import card from '@/components/card'
import PostUserBref from '@/components/postuserbref'
import store from './store'
// import wxParse from 'mpvue-wxparse'
export default {
  components: {
    card,
    // wxParse,
    PostUserBref
  },
  computed: {
    post () {
      return store.state.post
    },
    userbref: {
      get () {
        return store.state.post.userbref
      }
    }
  },
  data () {
    return {
      logs: [],
      id: '',
      cstHandUpAction: cstHandUpAction,
      cstHandDownAction: cstHandDownAction
    }
  },
  methods: {
    async getData (postId) {
      console.log('before getData')
      console.log(this.$http)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
      }
      this.$getPost(token, postId).then((res) => {
        console.log(res)
        console.log(res.code)
        console.log(res.data)
        store.commit('updatePost', res.data)
      })
    },
    // async onHidePost(postId) {
    //   console.log(postId)
    //
    //   const res = await this.$http.request({
    //     method: 'get',
    //     url: '/post/hide',
    //     body: {
    //       'token': '',
    //       'postId': postId
    //     }
    //   })
    //   console.log(res)
    //   console.log(res.code)
    //   console.log(res.data)
    // },
    async onHandActionPost (postId, handAction) {
      console.log(postId)
      console.log('before onHandActionPost')
      console.log(this.$http)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      const res = await this.$http.request({
        method: 'get',
        url: '/post/hand',
        body: {
          'token': token,
          'postId': postId,
          'handaction': handAction
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      await this.getData(postId)
      // store.commit('updatePost', res.data)
    },

    async onDoFavPost (postId) {
      console.log(postId)
      console.log('before onDoFavPost')
      console.log(this.$http)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }

      const res = await this.$http.request({
        method: 'get',
        url: '/post/fav',
        body: {
          'token': token,
          'postId': postId
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      await this.getData(postId)
    },
    async onHidePost (postId) {
      console.log('onHidePost')
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
      } else {
        console.log(`token:${token}`)
      }

      const res = await this.$http.request({
        method: 'get',
        url: '/post/hide',
        body: {
          'token': token,
          'postId': postId
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      await this.getData(postId)
    }
  },
  onShow () {
    // let token = wx.getStorageSync('token')
    // if (token === '') {
    //   this.$getOpenid()
    //   return
    // }
    // console.log(`postId: ${postId}`)
    // console.log(`token: ${token}`)
    // this.$getPost(token, postId).then((res) => {
    //   console.log(res)
    //   console.log(res.code)
    //   if (res.code === 0) {
    //     console.log(res.data)
    //     store.commit('updatePost', res.data)
    //   }
    // })
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
