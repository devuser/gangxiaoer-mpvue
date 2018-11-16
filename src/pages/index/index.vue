<template>
<div class="index" >

    <van-row>
      <van-col span="4">
            {{cityName}}

    </van-col>
    <van-col  span="16">

        <input type="text" :value="keyword" placeholder="搜索帖子" @change="onChangeKeyword($event)">


      </van-col>
      <van-col  span="4">
        <van-button size="small" type="primary" @click="toSearch($event)">搜索
        </van-button>
      </van-col>
    </van-row>

    <BannerSwiper :images="banner" />

    <!-- <div>
        Banner 组件模式结束
    </div> -->
    <!-- <div class="swiper">
        <swiper class="cont" @change="switchItem('switchItem',$event)" :current="currentTab" circular="true" skip-hidden-item-layout="true">
            <block v-for="(item, urlIndex) in banner" :key="urlIndex">
                <swiper-item>
                    <div class="item">
                        {{item.image_url}}
                    </div>
                </swiper-item>
            </block>
        </swiper>
    </div>
    <div class="swiper">
        <swiper class="cont" @change="switchItem('switchItem',$event)" :current="currentTab" circular="true" skip-hidden-item-layout="true">

            <swiper-item>
                A
            </swiper-item>
            <swiper-item>
                B
            </swiper-item>
            <swiper-item>
                C
            </swiper-item>

        </swiper>
    </div> -->
    <van-tabs :active="activeTabIndex" @change="onChange">
      <block v-for="(category, categoryIndex) in categoryList" :key="categoryIndex">
      <van-tab :title="category.categorycn" :id="category.categoryId" >
        <PostButtonArea :bShowPostButton="bShowPostButton" :toporbottom="'top'" />
        <div>
        <block v-for="(item, index) in postList" :key="index">
          <PostCard :post= "item"/>
        </block>
        </div>
          <PostButtonArea :bShowPostButton="bShowPostButton" :toporbottom="'bottom'" />
      </van-tab>
    </block>
    </van-tabs>


<van-cell-group>
  <van-cell>
    <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
  </van-cell>
</van-cell-group>

    <!-- <div class="userinfo" @click="bindViewTap">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <div class="userinfo-nickname">
            <card :text="userInfo.nickName"></card>
        </div>
    </div>

    <div class="usermotto">
        <div class="user-motto">
            <card :text="motto"></card>
        </div>
    </div> -->

</div>
</template>

<script>
import store from './store'
// import {
//   getOpenid
// } from '@/utils/api'
//
import MsgBus from '@/utils/msgBus'
import BannerSwiper from '@/components/swiper'
// import card from '@/components/card'
import PostCard from '@/components/postcard'
import PostButtonArea from '@/components/PostButtonArea'
// import 'weui'
// import 'weui/dist/style/weui.css'

export default {
  data () {
    return {
      a: 1,
      // motto: 'Hello World',
      currentTab: 0,
      categoryList: [],
      // postMap: new Map([
      //   ['1', []],
      //   ['2', []],
      //   ['3', []],
      //   ['4', []]
      // ]),
      // tabBar: [{
      //   'title': '本周最热A'
      // }, {
      //   'title': '好评排行B'
      // }, {
      //   'title': '借阅排行C'
      // }],

      // brandList: [{ name: 'A', floor_price: 100.00, new_pic_url: '' }],
      banner: []
    }
  },

  components: {
    // card,
    BannerSwiper,
    PostCard,
    PostButtonArea
  },
  computed: {
    cityName: {
      get () {
        return store.state.cityName
      }
    },
    keyword: {
      get () {
        return store.state.keyword
      }
    },
    activeTabId: {
      get () {
        return store.state.currentCategoryId
      }
    },
    currentCategoryId () {
      return store.state.currentCategoryId
    },
    postList () {
      return store.state.postList
    },
    bShowPostButton () {
      // return (store.state.postList.length > 5)
      return true
    },
    userInfo: {
      get () {
        return store.state.userInfo
      }
    },

    pageindex: {
      get () {
        return store.state.pageindex
      }
    },
    pagelen: {
      get () {
        return store.state.pagelen
      }
    },
    pagecount: {
      get () {
        return store.state.pagecount
      }
    }
  },
  methods: {
    onChangeKeyword (event) {
      let _keyword = event.mp.detail.value
      store.commit('updateKeyword', _keyword)
    },
    onAddPost (event) {
      console.log(event)
      console.log('onAddPost')
      console.log(`this.currentCategoryId: ${this.currentCategoryId}`)
      let addPostURL = `/pages/pB/addPost/main?postId=0&postCategoryId=${this.currentCategoryId}`
      console.log(`addPostURL:${addPostURL}`)
      wx.navigateTo({
        url: addPostURL
      })
    },
    onChange (event) {
      console.log(event)
      let _activeTabIndex = event.target.index
      let _postCategoryId = event.target.index + 1
      let _postcategoryName = event.mp.detail.title
      wx.showToast({
        title: `切换到标签 ${_postcategoryName}`,
        icon: 'none'
      })
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      let _pageindex = this.pageindex
      let _pagelen = this.pagelen
      store.commit('updateactiveTabIndex', _activeTabIndex)
      store.commit('updateCurrentCategoryId', _postCategoryId)
      this.$getPostList(token, _postCategoryId, _pageindex, _pagelen).then((res) => {
        this.onGetPostSuccess(res)
        wx.hideToast()
      })
    },
    swiperChange (e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动')
    },
    animationfinish (e) {
      console.log('第' + e.mp.detail.current + '张轮播图滑动结束')
    },
    switchTab: function (prompt, res) {
      console.log(prompt, res)
      let oIndex = res.mp.currentTarget.dataset.current
      this.currentTab = oIndex
    },
    switchItem: function (prompt, res) {
      console.log(prompt, res.mp.detail.current)
      let oIndex = res.mp.detail.current
      this.currentTab = oIndex
    },
    clickTab (e) {
      this.currentTab = e
    },
    changeTab (e) {
      this.currentTab = e.mp.detail.current
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({
        url
      })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              store.commit('updateUserInfo', res.userInfo)
            }
          })
        }
      })
    },
    // clickHandle (msg, ev) {
    //   console.log('clickHandle:', msg, ev)
    //   // weui.alert('alert')
    // },
    async getBanner () {
      console.log('before getBanner')
      console.log(this.$http)
      const res = await this.$http.request({
        method: 'get',
        url: '/banner/list',
        body: {}
      })
      // console.log(res)
      // console.log(res.code)
      // console.log(res.data)
      let banner = []
      res.data.forEach((item) => {
        banner.push({
          'image_url': item.picUrl
        })
      })
      this.banner = null
      this.banner = banner
      // this.$set(this.data, 'banner', banner)
      // console.log('this.banner:' + this.banner)
      // console.log(this.banner)
      // this.banner.forEach((res) => {
      //   console.log(res.image_url)
      // })
      // this.$apply()

      // console.log(bannerList)
      // console.log(bannerList.code)
    },
    // async getPostList (postCategoryId) {
    //   console.log('before getData')
    //   console.log(this.$http)
    //   let token = wx.getStorageSync('token')
    //   const res = await this.$http.request({
    //     method: 'get',
    //     url: '/post/list',
    //     body: {
    //       'token': token,
    //       'postCategoryId': postCategoryId,
    //       'pageindex': this.pageindex,
    //       'pagelen': this.pagelen
    //     }
    //   })
    //   console.log(res)
    //   console.log(res.code)
    //   console.log(res.data)
    //   let postList = []
    //   res.data.data.forEach((item) => {
    //     console.log(item.subject)
    //     postList.push(item)
    //   })
    //   console.log('postList: ' + postList)
    //   return {
    //     postList: postList,
    //     pagelen: res.data.pagelen,
    //     pageindex: res.data.pageindex,
    //     pagecount: res.data.pagecount }
    // },
    async getData () {
      console.log('before getData')
      console.log(this.$http)
      const postcategoryListRes = await this.$http.request({
        method: 'get',
        url: '/postcategory/list',
        body: {
        }
      })
      console.log(postcategoryListRes.data)
      this.categoryList = null
      this.categoryList = postcategoryListRes.data
      console.log('postcategoryList:' + this.categoryList)
      console.log(this.categoryList)
      let _categoryList = []
      postcategoryListRes.data.forEach((category) => {
        let foo = {'postCategoryId': category.id, 'categorycn': category.categorycn}
        _categoryList.push(foo)
      })
      wx.setStorageSync('categoryList', JSON.stringify(_categoryList))
      let _postCategoryId = 1
      let token = wx.getStorageSync('token')
      let _pageindex = 1
      let _pagelen = this.$globalData.pagelen ? this.$globalData.pagelen : 10
      store.commit('updateCurrentCategoryId', _postCategoryId)
      this.$getPostList(token, _postCategoryId, _pageindex, _pagelen).then((res) => {
        this.onGetPostSuccess(res)
      })

      // // let postMap = new Map()
      // let subfuncList = []
      // this.categoryList.forEach(postcategory => {
      //   const postCategoryId = postcategory.id
      //   const subFunc = () => {
      //     let postList = await this.getPostList(postCategoryId)
      //     return { 'postList': postList, 'postCategoryId': postCategoryId }
      //   }
      //   subfuncList.push(subFunc)
      // })
      // this.$http.all(subfuncList).then(this.$http.spread(function (...result) {
      //   // 两个请求都完成
      //   result.forEach((res) => {
      //     console.log(res)
      //   })
      // }))

      //
      // this.categoryList.forEach(function(postcategory) {
      //   const postCategoryId = postcategory.id
      //   this.getPostList(postCategoryId).then(function(result) {
      //     console.log('result: ' + result)
      //     this.postMap.set(postCategoryId, result)
      //
      //     console.log(this.postMap.get(postCategoryId).postList)
      //   })
      // })
    },
    onGetPostSuccess (res) {
      // let { _data, pagelen, pageindex, pagecount } = res.data.data
      console.log('getPostList:' + res)
      console.log(res)
      console.log(res.data.data)
      console.log(res.data.pagelen)
      let pagelen = res.data.pagelen
      let pageindex = res.data.pageindex
      let pagecount = res.data.pagecount
      let _data = res.data.data
      //   console.log(`${this.pagelen}-${this.pageindex}-${this.pagecount}`)
      let _postList = this.$beautifyPostList(_data)
      console.log('_postList')
      //   console.log(_postList)
      let pagenav = JSON.stringify({'postCategoryId': this.currentCategoryId, 'pageindex': pageindex, 'pagecount': pagecount, 'pagelen': pagelen})
      wx.setStorageSync('pagenav', pagenav)
      store.commit('updatePostList', _postList, pageindex, pagecount, pagelen)
    },
    // @todo: 如下增量下来数据的逻辑，有待优化
    // 超过1024后，使用翻页机制
    getPagenav () {
      const cstDefaultPagenav = '{"postCategoryId":1,"pageindex":1,"pagecount":1,"pagelen":10}'
      const cstMaxPageLen = 1024
      let strPagenav = wx.getStorageSync('pagenav')
      if (strPagenav === '') {
        strPagenav = cstDefaultPagenav
      }
      // @todo: 如下增量下来数据的逻辑，有待优化
      // 超过1024后，使用翻页机制
      let pagenav = JSON.parse(strPagenav)
      let _pagelen = pagenav.pagelen + 5
      let _pageindex = pagenav.pageindex
      if (_pagelen > cstMaxPageLen) {
        _pagelen = pagenav.pagelen
        _pageindex = pagenav.pageindex + 1
      }
      let _postCategoryId = pagenav.postCategoryId
      console.log(`_postCategoryId:_pagelen:_pageindex:${_postCategoryId}:${_pagelen}:${_pageindex}`)
      return {'postCategoryId': _postCategoryId, 'pageindex': _pageindex, 'pagecount': 1, 'pagelen': _pagelen}
    },
    // 支持 上拉刷新，下拉刷新
    _getRegisterInfo () {
      let _that = this
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      if (_that.pageindex >= _that.pagecount) {
        wx.showToast('已经到末尾')
        return
      }
      let pagenav = this.getPagenav()
      wx.showLoading({
        title: '玩命加载中'
      })

      this.$getPostList(token, pagenav.postCategoryId, pagenav.pageindex, pagenav.pagelen).then((res) => {
        this.onGetPostSuccess(res)
        wx.hideLoading()
      })
    },
    // end of _getRegisterInfo
    toSearch (event) {
      console.log(event)
      console.log(this.keyword)
      let _keyword = this.keyword
      if (_keyword === '') {
        wx.showToast({
          title: `请输入您要查询的关键词`,
          icon: 'none'
        })
        return
      }
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      let targetURL = '/pages/pC/searchPost/main?keyword=' + _keyword
      wx.navigateTo({
        url: targetURL
      })
    }
    // end of function toSearch

  }, // end of methods

  // 后台接口可忽略
  // get('/os-wx-bee/sso/getRegisterInfo.html?pageNum=' + pageNum + '&pageSize=' + pageSize, {}).then(res => {
  //   if (res.code === 0) {
  //     if (res.data.listPartner.length) {
  //       this.sellerList.push(...res.data.listPartner)
  //     } else {
  //
  //     }
  //     wx.hideLoading()
  //   }
  // }).catch(err => {
  //   console.log(err)
  // })
  /// /////////////////////////////////////////////////////////////////
  // onShow () {
  //   // `this` 指向 vm 实例
  //   console.log('a is: ' + this.a, '小程序触发的 onshow')
  // },
  onLoad () {
    this.getBanner()
    this.getData()
  },
  mounted () {
    MsgBus.$on('add-post', (msg) => {
      console.log(msg)
      console.log(`this.currentCategoryId: ${this.currentCategoryId}`)
      let addPostURL = `/pages/pB/addPost/main?postId=0&postCategoryId=${this.currentCategoryId}`
      console.log(`addPostURL: ${addPostURL}`)
      wx.navigateTo({
        url: addPostURL
      })
    })
  },
  created () {
    // this.getBanner()
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // var userInfo = {
    //   openId: 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c',
    //   nickName: '何玉硕',
    //   gender: 1,
    //   language: 'zh_CN',
    //   city: 'Changping',
    //   province: 'Beijing',
    //   country: 'China',
    //   avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132',
    //   watermark: { timestamp: 1535513485, appid: 'wx601ce71bde7b9add' }
    // }
    // var openId = userInfo.openId
    // wx.setStorageSync('userInfo', userInfo)
    // wx.setStorageSync('openId', openId)
    // console.log('app created and cache logs by setStorageSync')
    // 获取openid

    if (!wx.getStorageSync('openid')) {
      console.log('before getOpenid')
      this.$getOpenid()
    }
  },
  // 上拉加载
  onReachBottom: function () {
    // 执行上拉执行的功能
    // let that = this
    // that.setData({pageindex: that.pageindex + 1})
    this._getRegisterInfo()
  },
  // 停止下拉刷新
  async onPullDownRefresh () {
  // to doing..
  // 停止下拉刷新
    wx.stopPullDownRefresh()
  }
}
</script>
<style scoped>

.userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}

.userinfo-nickname {
    color: #aaa;
}

.usermotto {
    margin-top: 150px;
}

.form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
}

.counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
}

.container {
    flex: 1;
}


/*第二功能模块*/

.section-two {
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: #fff;
}


/*轮播图导航 */

.tab {
    width: 100%;
    height: 90rpx;
    box-sizing: border-box;
    padding: 20rpx 0 20rpx;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #ebebeb;
}

.nav {
    text-align: center;
    flex: 1;
    font-weight: 600;
    box-sizing: border-box;
}

.nav:nth-of-type(odd) {
    border-left: 1rpx solid #ebebeb;
    border-right: 1rpx solid #ebebeb;
}

.nav.active {
    color: #16cc80;
}


/*轮播图内容*/

.cont {
    width: 100%;
    height: 520rpx;
    padding-top: 25rpx;
    font-size: 28rpx;
    display: 'flex';
}

.cont swiper-item {
    width: auto;
    height: 100%;
    background-color: #5fd9a6;
    border: 1rpx solid #ebebeb;
    text-align: center;
    font-size: 50rpx;
    box-sizing: border-box;
}

.message {
    color: red;
    padding: 10px;
    text-align: center;
}

</style>

<style lang='scss' scoped>
@import "./style.scss";
</style>
