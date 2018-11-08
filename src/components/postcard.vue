

<template>

<van-card num="2" tag="标签" price="2.00" :desc="post.content" :title="post.subject" :thumb="post.mainimage" @click="onViewPostDetail(post.id)">
    <view slot="footer">
        <!-- <div class="post-dateAdd">{{post.dateAdd}}</div>
<div class="post-favcount">收藏{{post.favcount}}</div>
<div class="post-handupcount">大拇指{{post.handupcount}}</div>
<div class="post-handdowncount">小拇指{{post.handdowncount}}</div> -->
        <van-icon :name="like-o" />{{post.favcount}}
        <van-icon :name="like" />{{post.favcount}}
        <van-button :size="mini" @click="onHandActionPost(post.id,'handup')">大拇指{{post.handupcount}}</van-button>
        <van-button :size="mini" @click="onHanddownPost(post.id,'handdown')">小拇指{{post.handdowncount}}</van-button>
        <van-button :size="mini" @click="onDoFavPost(post.id)">收藏</van-button>
        <van-button :size="mini" @click="onViewPostDetail(post.id)">详情</van-button>
    </view>
</van-card>

</template>

<script>

export default {
  props: {
    post: []
  },
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500
    }
  },
  methods: {
    onViewPostDetail (postId) {
      console.log(postId)
      wx.navigateTo({
        url: '/pages/pC/viewPost/main?postId=' + postId
      })
    },
    async onHandActionPost (postId, handAction) {
      console.log(postId)
      console.log('before getData')
      console.log(handAction)
      console.log(this.$http)
      const res = await this.$http.request({
        method: 'get',
        url: `/post/${handAction}`,
        body: {
          'token': '',
          'postId': postId
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      // store.commit('updatePost', res.data)
    },

    async onDoFavPost (postId) {
      console.log(postId)
      console.log('before getData')
      console.log(this.$http)
      const res = await this.$http.request({
        method: 'get',
        url: '/post/fav',
        body: {
          'token': '',
          'postId': postId
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
    },
    async onHidePost (postId) {
      console.log(postId)

      const res = await this.$http.request({
        method: 'get',
        url: '/post/hide',
        body: {
          'token': '',
          'postId': postId
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
    }
  }
}
</script>
