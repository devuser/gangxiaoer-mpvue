
<template>

<div class="goods-info">
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
  <BannerSwiper :images="banners" />
    <div class="c">
      <block v-for="(item, index) in postList" :key="index">
        <PostCard :post= "item"/>
      </block>



    </div>

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
import PostCard from '@/components/postcard'
// import card from '@/components/card'
// import PostUserBref from '@/components/postuserbref'
import store from './store'
// import wxParse from 'mpvue-wxparse'
// import marked from 'marked'
import BannerSwiper from '@/components/swiper'
export default {
  components: {
    // card,
    // wxParse,
    PostCard,
    // PostUserBref,
    BannerSwiper
  },
  computed: {
    mydata: {
      get () {
        return store.state.mydata
      }
    },
    keyword: {
      get () {
        return store.state.keyword
      }
    },
    postList: {
      get () {
        return store.state.mydata.postList
      }
    },
    banners: {
      get () {
        return store.state.mydata.banners
      }
    }
  },
  data () {
    return {
      logs: []
    }
  },
  methods: {
    onChangeKeyword (event) {
      let _keyword = event.mp.detail.value
      store.commit('updateKeyword', _keyword)
    },
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
      }
      console.log(`keyword: ${_keyword}`)
      this.searchByKeyword(token, _keyword)
    },
    searchByKeyword (token, _keyword) {
      console.log(`keyword: ${_keyword}`)
      this.$post('/es/search', {
        'token': token,
        'keyword': _keyword
      }).then((res) => {
        if (res.code === 0) {
          console.log(res)
          let _mydata = this.mydata
          _mydata.postList = this.$beautifyPostList(res.data.data)
          _mydata.pageindex = res.data.pageindex
          _mydata.pagecount = res.data.pagecount
          _mydata.pagelen = res.data.pagelen
          console.log(_mydata)
          store.commit('updateMyData', _mydata)
        }
      })
    }
  //   preview (src, e) {
  //     // do something
  //     console.log(src)
  //     console.log(e)
  //   },
  //   navigate (href, e) {
  //     // do something
  //     console.log(href)
  //     console.log(e)
  //   },
  //   async getData (postId) {
  //     console.log('before getData')
  //     console.log(this.$http)
  //     let token = wx.getStorageSync('token')
  //     if (token === '') {
  //       this.$getOpenid()
  //     }
  //     this.$getPost(token, postId).then((res) => {
  //       console.log(res)
  //       console.log(res.code)
  //       console.log(res.data)
  //       let _post = res.data
  //       let _tags = []
  //       _post.tags.forEach((tag) => {
  //         _tags.push({'id': tag.id,
  //           'Tag': tag.Tag,
  //           'tagType': this.$randomTagType() })
  //       })
  //       let _banners = []
  //       _post.auximages.forEach((auxImage) => {
  //         let foo = { 'image_url': auxImage.imageShortURL }
  //         _banners.push(foo)
  //       })
  //       _post.banners = _banners
  //       _post.tags = _tags
  //       store.commit('updatePost', _post)
  //     })
  //   },
  //   async onShareBtnClick (postId) {
  //     console.log(postId)
  //
  //   //   const res = await this.$http.request({
  //   //     method: 'get',
  //   //     url: '/post/hide',
  //   //     body: {
  //   //       'token': '',
  //   //       'postId': postId
  //   //     }
  //   //   })
  //   //   console.log(res)
  //   //   console.log(res.code)
  //   //   console.log(res.data)
  //   },
  //   async onHandActionPost (postId, handAction) {
  //     console.log(postId)
  //     console.log('before onHandActionPost')
  //     console.log(this.$http)
  //     let token = wx.getStorageSync('token')
  //     if (token === '') {
  //       this.$getOpenid()
  //       return
  //     }
  //     const res = await this.$http.request({
  //       method: 'get',
  //       url: '/post/hand',
  //       body: {
  //         'token': token,
  //         'postId': postId,
  //         'handaction': handAction
  //       }
  //     })
  //     console.log(res)
  //     console.log(res.code)
  //     console.log(res.data)
  //     await this.getData(postId)
  //     // store.commit('updatePost', res.data)
  //   },
  //
  //   async onDoFavPost (postId) {
  //     console.log(postId)
  //     console.log('before onDoFavPost')
  //     console.log(this.$http)
  //     let token = wx.getStorageSync('token')
  //     if (token === '') {
  //       this.$getOpenid()
  //       return
  //     }
  //
  //     const res = await this.$http.request({
  //       method: 'get',
  //       url: '/post/fav',
  //       body: {
  //         'token': token,
  //         'postId': postId
  //       }
  //     })
  //     console.log(res)
  //     console.log(res.code)
  //     console.log(res.data)
  //     await this.getData(postId)
  //   },
  //   async onHidePost (postId) {
  //     console.log('onHidePost')
  //     let token = wx.getStorageSync('token')
  //     if (token === '') {
  //       this.$getOpenid()
  //     } else {
  //       console.log(`token:${token}`)
  //     }
  //
  //     const res = await this.$http.request({
  //       method: 'get',
  //       url: '/post/hide',
  //       body: {
  //         'token': token,
  //         'postId': postId
  //       }
  //     })
  //     console.log(res)
  //     console.log(res.code)
  //     console.log(res.data)
  //     await this.getData(postId)
  //   }
  // },
  // onShareAppMessage (res) {
  //   console.log(res)
  //   let _postId = this.post.id
  //   let _title = this.post.title
  //   return {
  //     title: _title,
  //     path: `/pages/viewPost?postId=${_postId}`
  //   }
  },

  onLoad () {
    let _keyword = this.$root.$mp.query.keyword
    let token = wx.getStorageSync('token')
    if (token === '') {
      this.$getOpenid()
      return
    }
    this.searchByKeyword(token, _keyword)
    //
    this.$http.request({
      method: 'get',
      url: '/banner/list',
      body: {}
    }).then((res) => {
      let _banners = []
      res.data.forEach((item) => {
        _banners.push({
          'image_url': item.picUrl
        })
      })
      let _mydata = this.mydata
      _mydata.banners = _banners
      store.commit('updateMyData', _mydata)
    })
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
