
<template>

<div class="index" >
  <BannerSwiper :images="banners" />
    <div class="c">


        <van-row gutter="0">
            <van-col span="20">
                <div class="postSubject">{{post.subject}}</div>
            </van-col>
            <van-col span="4">
              <van-button size="small" round hover-class="none" open-type="share" > 分享</van-button>
              </van-col>
        </van-row>
        <van-row gutter="0">
          <van-col span="4">
             发布
          </van-col>
            <van-col span="20">
                <div class="postdateAdd">{{post.dateAdd}}</div>
            </van-col>
        </van-row>
        <van-row gutter="0">
            <van-col span="24" >
              <wxParse height="20rpx" :content="markedPostContent" @preview="preview" @navigate="navigate" />
            </van-col>
        </van-row>

        <van-row gutter="0">
          <van-col span="4">发布人</van-col>
            <van-col span="20">
                <PostUserBref :userbref="userbref"/>
            </van-col>
        </van-row>

        <van-row gutter="0">
            <van-col span="12">
                <div @click="onHandActionPost(post.id,HandUpAction)" class="add">
                    大拇指<van-tag round type="success">{{post.handupcount}}</van-tag>
                </div>
                </van-col>
                <van-col span="12">

                <div  @click="onHandActionPost(post.id,HandDownAction)" class="add">
                  小拇指<van-tag round type="danger">{{post.handdowncount}}</van-tag>
                </div>

            </van-col>
        </van-row>

        <van-row gutter="0">
          <van-col span="20">
            &nbsp;
          </van-col>
          <van-col span="4">
                    <p v-if="post.isfav">
                      <van-icon name="like" @click="onDoFavPost(post.id)"/>
                    {{post.favcount}}
                    </p>
                    <p v-if="post.isfav==false">
                      <van-icon name="like-o" @click="onDoFavPost(post.id)"/>{{post.favcount}}
                    </p>
            </van-col>
        </van-row>
        <van-row gutter="0">
          <van-col span="24">
        <block v-for="(tag, tagIndex) in post.tags" :key="tagIndex">
          <van-tag class="demo-margin-right" round :id="tag.id"
          :type="tag.tagType"
          > {{ tag.Tag }} </van-tag>
        </block>
        </van-col>
      </van-row>

    </div>

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
import {
  hitShare
}
  from '@/utils/request'

import card from '@/components/card'
import PostUserBref from '@/components/postuserbref'
import store from './store'
import wxParse from 'mpvue-wxparse'
import marked from 'marked'
import BannerSwiper from '@/components/swiper'
export default {
  components: {
    card,
    wxParse,
    PostUserBref,
    BannerSwiper
  },
  computed: {
    mydata: {
      get () {
        return store.state.mydata
      }
    },
    post: {
      get () {
        return store.state.post
      }
    },
    banners: {
      get () {
        return store.state.post.banners
      }
    },
    markedPostContent: {
      get () {
        return marked(store.state.post.content)
      }
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
      HandUpAction: cstHandUpAction,
      HandDownAction: cstHandDownAction
    }
  },
  methods: {
    preview (src, e) {
      // do something
      console.log(src)
      console.log(e)
    },
    navigate (href, e) {
      // do something
      console.log(href)
      console.log(e)
    },
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
        let _post = res.data
        let _tags = []
        _post.tags.forEach((tag) => {
          _tags.push({'id': tag.id,
            'Tag': tag.Tag,
            'tagType': this.$randomTagType() })
        })
        let _banners = []
        _post.auximages.forEach((auxImage) => {
          let foo = { 'image_url': auxImage.imageShortURL }
          _banners.push(foo)
        })
        _post.banners = _banners
        _post.tags = _tags
        store.commit('updatePost', _post)
      })
    },
    async onShareBtnClick (postId) {
      console.log(postId)

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
    },
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
  // end of methods
  async onShareAppMessage (res) {
    console.log(res)
    if (res.from === 'button') {
      console.log('来自页面内转发按钮')
      console.log(res.target)
    } else {
      console.log('来自右上角转发菜单')
    }
    let _postId = this.post.id
    let _title = this.post.subject
    let _openId = wx.getStorageSync('openId')
    let shareToken = ''
    const getDefaultShareObject = () => {
      let param = {
        channel: 'wxappShare',
        shareToken: shareToken,
        postId: _postId
      }
      // const replacer = (key, value) => {
      //   if (typeof value === 'string') {
      //     let regexpX = /\\-/g
      //     return value.replace(regexpX, '+')
      //   }
      //   return value
      // }

      let _path = `/pages/viewPost/main?rq=` + encodeURIComponent(JSON.stringify(param))
      console.log(`sharePath: ${_path}`)
      console.log(`_title: ${_title}`)
      return {
        title: _title,
        path: _path,
        imageUrl: '/static/images/share_bg_1.png',
        success: (res) => {
          console.log('转发成功', res)
        },
        fail: (res) => {
          console.log('转发失败', res)
        }
      }
    }

    console.log('in onShareAppMessage')
    // 快速获取shareToken
    let ressharetoken = await this.$http.request({
      method: 'get',
      url: '/post/sharetoken',
      body: {}
    })
    if (ressharetoken.code !== 0) {
      return getDefaultShareObject()
    }
    //
    shareToken = ressharetoken.data.shareToken
    console.log(`shareToken:${shareToken}`)
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return getDefaultShareObject()
    }
    // // 注册本次分享的详情
    let _body = {
      'token': token,
      'postId': _postId,
      'shareToken': shareToken,
      'shareOpenId': _openId
    }
    console.log(_body)
    let addShareRes = await this.$post('/post/share/add', _body)
    console.log(addShareRes)
    // // 分享事件需要返回一个Objec
    let shareObject = getDefaultShareObject()
    console.log(shareObject)
    return shareObject
  },
  onUnload () {

  },
  onLoad () {
    // const reverser = (key, value) => {
    //   if (typeof value === 'string') {
    //     let regexpX = /\\+/g
    //     return value.replace(regexpX, '-')
    //   }
    //   return value
    // }

    console.log('viewPost onLoad')
    console.log(this.$root.$mp.appOptions)
    console.log(`query:${this.$root.$mp.query}`)
    let rq = decodeURIComponent(this.$root.$mp.query.rq)
    console.log(`rq:${rq}`)
    let param = JSON.parse(rq)
    console.log(`param: ${param}`)
    console.log(param)
    console.log(param.shareToken)
    console.log(param.postId)
    console.log(param.channel)
    let channel = param.channel
    let shareToken = param.shareToken
    let postId = param.postId

    let _mydata = this.mydata
    _mydata.channel = channel
    _mydata.shareToken = shareToken
    store.commit('updateMyData', _mydata)
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return
    }
    this.getData(postId).then((res) => {
      console.log(res)
    })
    // 记录本次引流
    console.log(`shareToken: ${shareToken}`)
    if (shareToken !== '') {
      console.log(`hitShare: ${hitShare}`)
      hitShare(token, shareToken)
    }
    /// ///////////////////////////////////////////////
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
<style>
@import url("~mpvue-wxparse/src/wxParse.css");
</style>

<style lang='scss' scoped>
@import "./style.scss";
</style>
