

<template>
  <div>
    <label>{{userbref.nickname}}</label>
    <label>{{userbref.title}}</label>
    <label>{{userbref.membergrade}}</label>
    <label>{{userbref.mobile}}</label>


    <!-- <label>{{userbref.mainActivityArea}}</label>
    <label>{{userbref.ActiveGrade}}</label>
    <label>{{userbref.UserGrade}}</label>
    <label>{{userbref.MemberGrade}}</label>
    <label>{{userbref.PaidupMember}}</label>
    <label>{{ValidateStartAt}}</label>
    <label>{{ValidateOverAt}}</label> -->
</div>

</template>

<script>

export default {
  props: {
    userbref: {}
  },
  data () {
    return {
      // indicatorDots: true,
      // autoplay: true,
      // interval: 3000,
      // duration: 500
    }
  },
  methods: {
    onViewPostDetail (postId) {
      console.log(postId)
      let param = {
        channel: 'wxappShare',
        shareToken: '',
        postId: postId
      }
      wx.navigateTo({
        url: '/pages/viewPost/main?rq=' + encodeURIComponent(JSON.stringify(param))
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
