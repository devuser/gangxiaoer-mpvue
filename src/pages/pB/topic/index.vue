
<template>

<div class="goods-info">
  <van-panel title="热点">
  <TagCellGroup :tagListData= "hotTagList.data"
  :pageindex = "hotTagList.pageindex"
  :pagelen = "hotTagList.pagelen"
  :total = "hotTagList.total"
  />
</van-panel>
<van-panel title="最新">
  <TagCellGroup :tagListData= "topTagList.data"
  :pageindex = "topTagList.pageindex"
  :pagelen = "topTagList.pagelen"
  :total = "topTagList.total"
/>
  </van-panel>
  <van-panel title="所有">
    <TagCellGroup :tagListData= "tagList.data"
    :pageindex = "tagList.pageindex"
    :pagelen = "tagList.pagelen"
    :total = "tagList.total"

    />
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
import TagCellGroup from '@/components/tagcellgroup'
// import PostUserBref from '@/components/postuserbref'
import store from './store'
// import wxParse from 'mpvue-wxparse'
export default {
  components: {
    card,
    TagCellGroup
    // wxParse
  },
  computed: {
    hotTagListData: {
      get () {
        let _tagListData = store.state.hotTagList.data
        // _tagListData.forEach((itmX) => { console.log(itmX) })
        console.log('_tagListData' + _tagListData)
        return _tagListData
      }
    },
    topTagList: {
      get () {
        return store.state.topTagList
      }
    },
    hotTagList: {
      get () {
        return store.state.hotTagList
      }
    },
    tagList: {
      get () {
        return store.state.tagList
      }
    },
    pageIndex: {
      get () {
        return store.state.pageIndex
      }
    },
    pageLen: {
      get () {
        return store.state.pageLen
      }
    },
    total: {
      get () {
        return store.state.total
      }
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
    // const _hotTagList = await this.$getTagList(token, 'hotTagList', this.pageIndex, this.pageLen)
    // const _topTagList = this.$getTagList(token, 'topTagList', this.pageIndex, this.pageLen)
    // const _tagList = this.$getTagList(token, 'tagList', this.pageIndex, this.pageLen)
    // store.commit('updateHotTagList', _hotTagList)
    // store.commit('updateTopTagList', _topTagList)
    // store.commit('updateTagList', _tagList)
    this.$getTagList(token, 'hotTagList', this.pageIndex, this.pageLen).then((_tagList) => {
      store.commit('updateHotTagList', _tagList)
    })
    this.$getTagList(token, 'topTagList', this.pageIndex, this.pageLen).then((_tagList) => {
      store.commit('updateTopTagList', _tagList)
    })
    this.$getTagList(token, 'tagList', this.pageIndex, this.pageLen).then((_tagList) => {
      store.commit('updateTagList', _tagList)
    })
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
