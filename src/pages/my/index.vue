<style>

.log-list {
    display: flex;
    flex-direction: column;
    padding: 40rpx;
}

.log-item {
    margin: 10rpx;
}

</style>

<template>

<div>
    <div>
        <van-tabs :active="activeTabId" @change="onChange">
            <van-tab title="我的资料" key="van-tab-profile">
                    <div class="myinfo">
                        <img @click="toLogin" :src="avatarUrl" alt="">
                        <div @click="toLogin">
                            <p>{{userInfo.nickName}}</p>
                            <p v-if="userInfo.nickname==''">点击登录</p>
                            <p v-else>微信用户</p>
                        </div>

                    </div>
                    <van-cell-group>
                      <van-cell v-if="userInfo.nickname!=''" :title="signinTodayTitle" @click="onSignClick($event)">

                      </van-cell>
                    </van-cell-group>
                <van-panel title="活跃成绩">
                    <van-row @click="onClickLabel($event, 'latest')">
                        <van-col>
                            发帖数量
                        </van-col>
                        <van-col>
                            {{history.postCount}}
                        </van-col>
                    </van-row>
                    <van-row @click="onClickLabel($event, 'fav')">
                        <van-col>
                            收藏
                        </van-col>
                        <van-col>
                            {{historyFavPostsData.length}}
                        </van-col>
                    </van-row>

                    <van-row>
                        <van-col>
                            积分
                        </van-col>
                        <van-col>
                            {{history.score}}
                        </van-col>
                    </van-row>
                </van-panel>
                <van-panel>
                    <van-row>
                        <van-col>
                            邀请好友
                        </van-col>
                    </van-row>
                </van-panel>
                <van-panel title="基础资料">
                    <van-row>
                        <van-col>
                            用户名
                        </van-col>
                        <van-col>
                            {{base.loginid}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            姓
                        </van-col>
                        <van-col>
                            {{base.firstname}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            名
                        </van-col>
                        <van-col>
                            {{base.secondname}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            称谓
                        </van-col>
                        <van-col>
                            {{base.title}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            性别
                        </van-col>
                        <van-col>
                            <block v-if="base.isMale">
                                男性
                            </block>
                            <block v-if="base.isMale == false">
                                女性
                            </block>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            主要经营区域
                        </van-col>
                        <van-col>
                            {{base.mainActivityArea}}
                        </van-col>
                    </van-row>

                </van-panel>
                <van-panel title="社交资料">
                    <van-row>
                        <van-col>
                            生日
                        </van-col>
                        <van-col>
                            {{base.birthday}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            Email
                        </van-col>
                        <van-col>
                            {{base.email}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            微信
                        </van-col>
                        <van-col>
                            {{base.wexin}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            微博
                        </van-col>
                        <van-col>
                            {{base.wexin}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col>
                            QQ
                        </van-col>
                        <van-col>
                            {{base.qq}}
                        </van-col>
                    </van-row>
                </van-panel>
                <van-cell-group>
                    <van-cell title="收货地址" icon="location" is-link url="/pages/pA/viewAddrList/main">

                    </van-cell>
                    <van-cell title="我有话说" icon="chat" is-link url="/pages/pA/addSuggestion/main">

                    </van-cell>
                </van-cell-group>
            </van-tab>
            <van-tab title="最近发帖" key="van-tab-latest">

                <PostButtonArea :bShowPostButton="bShowPostButton" :toporbottom="'top'" />
                <div>
                    <block v-for="(item, index) in historyLatestPostsData" :key="index">
                        <PostCard :post="item" :id="index" />
                    </block>
                </div>
                <PostButtonArea :bShowPostButton="bShowPostButton" :toporbottom="'bottom'" />
            </van-tab>
            <van-tab title="收藏" key="van-tab-fav">

                <PostButtonArea :bShowPostButton="bShowPostButton" :toporbottom="'top'" />
                <div>
                    <block v-for="(item, index) in historyFavPostsData" :key="index">
                        <PostCard :post="item" :id="index" />
                    </block>
                </div>
                <PostButtonArea :bShowPostButton="bShowPostButton" :toporbottom="'bottom'" />
            </van-tab>


        </van-tabs>
    </div>
</div>

</template>

<script>

import {
  // get,
  toLogin
  // login
}
  from '../../utils/api'

import {
  formatTime
}
  from '@/utils/index'
import store from './store'
import card from '@/components/card'
import PostCard from '@/components/postcard'
import AddSuggestionArea from '@/components/addSuggestionArea'
import ViewAddrListArea from '@/components/viewAddrListArea'
export default {
  components: {
    card,
    PostCard,
    AddSuggestionArea,
    ViewAddrListArea
  },

  data () {
    return {
      logs: []
      // historyFavPostsData: [],
      // historyLatestPostsData: []
      // mydata: store.state.mydata,
      // base: store.state.mydata.base,
      // history: store.state.mydata.history
    }
  },
  computed: {
    mydata: {
      get () {
        return store.state.mydata
      },
      set (newValue) {
        store.commit('updateMyData', newValue)
      }
    },
    avatarUrl: {
      get () {
        return store.state.userInfo.avatarUrl
      }
    },
    userInfo: {
      get () {
        return store.state.userInfo
      }
    },
    base: {
      get () {
        return store.state.mydata.base
      }
    },
    signinTodayTitle: {
      get () {
        return store.state.mydata.signinTodayTitle
      }
    },
    history: {
      get () {
        return store.state.mydata.history
      }
    },
    scoreBalance: {
      get () {
        return store.state.mydata.history.scoreBalance
      }
    },
    historyFavPostsData: {
      get () {
        return store.state.historyFavPostsData
      }
    },
    historyLatestPostsData: {
      get () {
        return store.state.historyLatestPostsData
      }
    },
    activeTabId: {
      get () {
        return store.state.activeTabId
      }
    }

  },
  methods: {
    goTo (url) {
      if (toLogin()) {
        wx.navigateTo({
          url: url
        })
      }
    },
    toLogin () {
      if (!this.userInfo.avatarUrl) {
        wx.navigateTo({
          url: '/pages/pC/login/main'
        })
      }
    },
    onManageAdrrListBtn (event) {
      console.log(event)
      // let token = wx.getStorageSync('token')
      // if (token === ''){
      //   this.$getOpenid()
      //   return
      // }
      wx.navigateTo('/pages/viewAddrList')
    },
    onClickLabel (event, actionType) {
      console.log(actionType)
      let _activeTabId = 'van-tab-profile'
      if (actionType === 'latest') {
        _activeTabId = 'van-tab-latest'
      } else if (actionType === 'fav') {
        _activeTabId = 'van-tab-fav'
      }
      store.commit('updateActiveTab', _activeTabId)
    },
    onSignClick (event) {
      console.log(event)
      let token = wx.getStorageSync('token')
      // let _userInfo = this.userInfo
      // let _loginid = this.base.loginid
      this.$doSignIn(token).then((res) => {
        console.log(res.code)
        if (res.code === 0) {
          let _balance = res.data.balance
          let _score = res.datas.score
          console.log(res)
          let _title = `${res.data.sign.message},您已经连续签到${res.data.sign.continuedDays}天`
          if (_score > 0) {
            _title = `${res.data.sign.message},您已经连续签到${res.data.sign.continuedDays}天,新增积分${_score}`
            let _mydata = store.state.mydata
            _mydata.history.scoreBalance = _balance
            _mydata.history.signinedToday = true
            store.commit('updateMyData', _mydata)
          }
          wx.showToast({
            title: _title,
            icon: 'none'
          })
        }
      })
    }
  },
  onShow () {
    // // 是否微信授权
    // if (this.userInfo.avatarUrl === '') {
    //   this.userInfo = login()
    //   console.log(this.userInfo)
    //   this.avator = this.userInfo.avatarUrl
    // } else {
    //   this.toLogin()
    // }
    // 是否登录到应用服务器
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return
    }
    let _userInfo = wx.getStorageSync('userInfo')
    console.log(_userInfo)
    if (_userInfo) {
      store.commit('updateUserInfo', _userInfo)
    }

    let pageindex = 1
    let pagelen = this.$globalData.pagelen ? this.$globalData.pagelen : 10
    this.$getMySelfPrivateData(token, pageindex, pagelen).then((res) => {
      console.log(res)
      console.log(res.code === 0)
      console.log(res.data)
      console.log(res.data.base.loginid)
      if (res.code === 0) {
        let _mydata = res.data
        store.commit('updateMyData', _mydata)
        store.commit('updatehistoryLatestPostsData', _mydata.history.latestPosts.data)
      }
    })
  },
  onLoad () {
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
    }
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
