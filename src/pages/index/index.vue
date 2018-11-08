
<template>

<!-- @click="clickHandle('test click', $event)" -->
<div class="index" >
    <!-- 新增代码开始 -->
    <!-- <view class="swiper-container">
     <swiper class="swiper_box"
                 autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" @bindchange="swiperchange">
         <block wx:for="{{banners}}" wx:key="id">
             <swiper-item>
                 <image bindtap="tapBanner" data-id="{{item.businessId}}" src="{{item.picUrl}}_m" class="slide-image" width="750rpx" height="562.5rpx"/>
             </swiper-item>
         </block>
     </swiper>
     <view class="dots">
         <block wx:for="{{banners}}" wx:key="unique">
             <view class="dot{{index == swiperCurrent ? ' active' : ''}}"></view>
         </block>
     </view>
</view> -->
    <!-- <div class="swiper">
        <ul>
            <li v-for="(item, itemIndex) in banner" :key="itemIndex">
                {{item.image_url}}
            </li>
        </ul>
    </div> -->
    <!-- <div>
        Banner 本地模式
    </div> -->
    <!-- <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.image_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div> -->
    <!-- <div>
        Banner 组件模式开始
    </div> -->
    <div class="search">
      <div @click="toMappage">
        {{cityName}}
      </div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索帖子">
        <span class="icon"></span>
      </div>
    </div>

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
    <van-tabs :active="active" @change="onChange">
    <block v-for="(categoryItem, categoryIndex) in categoryList" :key="categoryIndex">

      <van-tab :title="categoryItem.categorycn" :id="categoryItem.id" >

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
      pageindex: 1,
      pagelen: 20,
      pagecount: 0,
      categoryList: [],

      postMap: new Map(),
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
    active () {
      return store.state.active
    },
    postList () {
      return store.state.postList
    },
    bShowPostButton () {
      return (store.state.postList.length > 5)
    },
    currentCategoryId () {
      return store.state.currentCategoryId
    },
    userInfo: {
      get () {
        return store.state.userInfo
      }
    }
  },
  methods: {
    // onAddPostEvent(msg) {
    //   this.$bus.$emit('addPost', msg)
    // },
    onAddPost (event) {
      console.log(event)
      console.log('onAddPost')
      console.log(`this.currentCategoryId: ${this.currentCategoryId}`)
      let addPostURL = `/pages/pB/addPost/main?postId=0&postcategoryId=${this.currentCategoryId}`
      console.log(`addPostURL:${addPostURL}`)
      wx.navigateTo({
        url: addPostURL
      })
    },
    onChange (event) {
      console.log(event)
      let _postcategoryId = event.target.index + 1
      let _postcategoryName = event.mp.detail.title
      wx.showToast({
        title: `切换到标签 ${_postcategoryName}`,
        icon: 'none'
      })
      let token = wx.getStorageSync('token')
      let _pageindex = this.pageindex
      let _pagelen = this.pagelen
      this.$getPostList(token, _postcategoryId, _pageindex, _pagelen).then((res) => {
        // console.log('getPostList:' + res)
        // console.log(res)
        // console.log(res.data.data)
        // console.log(res.data.pagelen)
        this.pagelen = res.data.pagelen
        this.pageindex = res.data.pageindex
        this.pagecount = res.data.pagecount
        let _data = res.data.data
        console.log(`${this.pagelen}-${this.pageindex}-${this.pagecount}`)
        let _postList = []
        _data.forEach((itm) => { _postList.push(itm) })
        console.log('_postList')
        console.log(_postList)
        store.commit('updatePostList', _postList)

        store.commit('changeActive', event.target.index)
        store.commit('updateCurrentCategoryId', _postcategoryId)
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
      console.log('before getData')
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
    // async getPostList (postcategoryId) {
    //   console.log('before getData')
    //   console.log(this.$http)
    //   let token = wx.getStorageSync('token')
    //   const res = await this.$http.request({
    //     method: 'get',
    //     url: '/post/list',
    //     body: {
    //       'token': token,
    //       'postcategoryId': postcategoryId,
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
      this.categoryList = null
      this.categoryList = postcategoryListRes.data
      console.log('postcategoryList:' + this.categoryList)
      console.log(this.categoryList)
      let _postcategoryId = 1
      let token = wx.getStorageSync('token')
      let _pageindex = 1
      let _pagelen = this.$globalData.pagelen ? this.$globalData.pagelen : 10
      this.$getPostList(token, _postcategoryId, _pageindex, _pagelen).then((res) => {
        // let { _data, pagelen, pageindex, pagecount } = res.data.data
        console.log('getPostList:' + res)
        console.log(res)
        console.log(res.data.data)
        console.log(res.data.pagelen)
        this.pagelen = res.data.pagelen
        this.pageindex = res.data.pageindex
        this.pagecount = res.data.pagecount
        let _data = res.data.data
        console.log(`${this.pagelen}-${this.pageindex}-${this.pagecount}`)
        let _postList = []
        _data.forEach((itm) => { _postList.push(itm) })
        console.log('_postList')
        console.log(_postList)
        store.commit('updatePostList', _postList)
      })

      // // let postMap = new Map()
      // let subfuncList = []
      // this.categoryList.forEach(postcategory => {
      //   const postcategoryId = postcategory.id
      //   const subFunc = () => {
      //     let postList = await this.getPostList(postcategoryId)
      //     return { 'postList': postList, 'postcategoryId': postcategoryId }
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
      //   const postcategoryId = postcategory.id
      //   this.getPostList(postcategoryId).then(function(result) {
      //     console.log('result: ' + result)
      //     this.postMap.set(postcategoryId, result)
      //
      //     console.log(this.postMap.get(postcategoryId).postList)
      //   })
      // })
    }
  },
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
      let addPostURL = `/pages/pB/addPost/main?postId=0&postcategoryId=${this.currentCategoryId}`
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
