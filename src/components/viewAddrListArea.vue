

<template>


  <van-cell @click="onViewAddrListBtn($event)" is-link="true">
    收货地址
    <van-icon slot="right-icon" name="search" class="van-cell__right-icon" />
  </van-cell>


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
    onViewAddrListBtn (event) {
      console.log(event)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      let targetURL = '/pages/viewAddrList/main'
      wx.navigateTo({
        url: targetURL
      })
    }
  }
}
</script>
