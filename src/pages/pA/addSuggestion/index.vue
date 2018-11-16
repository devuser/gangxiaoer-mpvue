

<template>

<div class="goods-info">
    <van-cell-group>

        <van-field :value="mydata.content" label="吐槽" maxlength="1500" type="textarea" placeholder="请输入吐槽内容" autosize :border="true" @change="onChangeContent($event)" />
        <van-field :value="mydata.orderSeq" label="捆绑订单" maxlength="32" type="textarea" placeholder="如果需要请输入订单编号" :border="true" @change="onChangeorderSeq($event)" />
    </van-cell-group>
    <van-row gutter="0">
        <van-col span="16">
            &nbsp;
        </van-col>
        <van-col span="8">
            <van-button size="small" type="primary" @click="onSubmit()"> 点击提交</van-button>
        </van-col>
    </van-row>
    <block v-for="(item, itemIndex) in history" :key="itemIndex">
        <van-row gutter="2">
            <van-col span="4">
                吐槽
            </van-col>
            <van-col span="18">
                {{item.content}}
            </van-col>
        </van-row>

        <van-row gutter="2">
            <van-col span="4">
                订单
            </van-col>
            <block v-if="item.orderSeq ===''">
                <van-col span="18">
                    &nbsp;
                </van-col>
            </block>
            <block v-else>
                <van-col span="18">
                    {{item.orderSeq}}
                </van-col>
            </block>
        </van-row>
        <van-row gutter="2">
            <van-col span="24">
                <van-steps :steps="steps" :active="item.status" direction="horizontal" active-color="#f44" />
            </van-col>
        </van-row>

    </block>
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
    },
    history: {
      get () {
        return store.state.mydata.history
      }
    },
    steps: {
      get () {
        return store.state.mydata.steps
      }
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
        'token': token,
        'content': _mydata.content,
        'orderSeq': _mydata.orderSeq
      }).then((res) => {
        console.log(res)
        wx.navigateBack({
          delta: 1
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
    this.$post('/user/myself/suggestion/list', {
      'token': token
    }).then((res) => {
      let _history = []
      res.data.history.forEach((suggestion) => {
        _history.push({
          'id': suggestion.id,
          'content': suggestion.content,
          'orderSeq': suggestion.orderSeq,
          'status': suggestion.status
        })
      })
      let _steps = []
      res.data.steps.forEach((step) => {
        _steps.push({
          'text': step.text,
          'desc': step.desc
        })
      })

      let _mydata = this.mydata
      _mydata.content = ''
      _mydata.orderSeq = ''
      _mydata.history = _history
      _mydata.steps = _steps
      store.commit('updateData', _mydata)
    })
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
