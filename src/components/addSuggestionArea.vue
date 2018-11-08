

<template>

<div>
    <van-button @click="onAddSuggestionBtn($event)"> 我有话说</van-button>
</div>

</template>

<script>

export default {
  props: {
    // userbref: {}
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
    onAddSuggestionBtn (event) {
      console.log(event)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      let addSuggestionURL = '/pages/addSuggestion/main'
      wx.navigateTo({
        url: addSuggestionURL
      })
    }
  }
}
</script>
