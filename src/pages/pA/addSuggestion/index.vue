

<template>

<div class="goods-info">
    <van-cell-group>

      <van-field :value="mydata.content" label="吐槽"  maxlength="1500" type="textarea" placeholder="请输入吐槽内容" autosize :border="true" @change="onChangeContent($event)"/>
      <van-field :value="mydata.orderSeq" label="捆绑订单"  maxlength="32" type="textarea" placeholder="如果需要请输入订单编号"  :border="true" @change="onChangeorderSeq($event)"/>
    </van-cell-group>
<van-row gutter="0">
  <van-col span="16">
    &nbsp;
  </van-col>
    <van-col span="8">
      <van-button size="small" type="primary" @click="onSubmit()"> 点击提交</van-button>
      </van-col>
  </van-row>
</van-row>
</div>
</template>

<script>

import {
  formatTime
}
  from '@/utils/index'

import store from './store'
// import wxParse from 'mpvue-wxparse'
export default {
  components: {},
  computed: {
    mydata () {
      return store.state.mydata
    }
  },
  data () {
    return {}
  },
  methods: {
    onSubmit () {
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      let _mydata = store.state.mydata
      this.$post('/user/myself/suggestion/add', {
        token: token,
        content: _mydata.content,
        orderSeq: _mydata.orderSeq
      }).then((res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/my/main'
        })
      })
    },
    onChangeContent (event) {
      console.log(event)
      let _content = event.mp.detail
      let _mydata = store.state.mydata
      _mydata.content = _content
      store.commit('updateData', _mydata)
    },
    onChangeorderSeq (event) {
      console.log(event)
      let _orderSeq = event.mp.detail
      let _mydata = store.state.mydata
      _mydata.orderSeq = _orderSeq
      store.commit('updateData', _mydata)
    }

  },
  onShow () {
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return
    }
    // console.log(`postId: ${postId}`)
    console.log(`token: ${token}`)
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
