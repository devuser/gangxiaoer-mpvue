
<template>

<div class="goods-info">
    <div class="c">

        <van-row gutter="0">
            <van-col span="20">
                <div class="postSubject">{{post.subject}}</div>
            </van-col>
            <van-col span="4">
              <van-button size="small" round hover-class="none" open-type="share" @click="onShareBtnClick(post.id)" > 分享</van-button>
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
                <div @click="onHandActionPost(post.id,cstHandUpAction)" class="add">
                    大拇指<van-tag round type="success">{{post.handupcount}}</van-tag>
                </div>
                </van-col>
                <van-col span="12">

                <div  @click="onHandActionPost(post.id,cstHandDownAction)" class="add">
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

import card from '@/components/card'
import PostUserBref from '@/components/postuserbref'
import store from './store'
import wxParse from 'mpvue-wxparse'
import marked from 'marked'

export default {
  components: {
    card,
    wxParse,
    PostUserBref
  },
  computed: {
    post: {
      get () {
        return store.state.post
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
      cstHandUpAction: cstHandUpAction,
      cstHandDownAction: cstHandDownAction
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
        store.commit('updatePost', res.data)
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
  onShareAppMessage (res) {
    console.log(res)
    let _postId = this.post.id
    let _title = this.post.title
    return {
      title: _title,
      path: `/pages/viewPost?postId=${_postId}`
    }
  },

  onShow () {
    let postId = Number(this.$root.$mp.query.postId)
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return
    }
    console.log(`postId: ${postId}`)
    console.log(`token: ${token}`)
    this.$getPost(token, postId).then((res) => {
      console.log(res)
      console.log(res.code)
      if (res.code === 0) {
        console.log(res.data)
        store.commit('updatePost', res.data)
      }
    })
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
