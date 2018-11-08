

<template>

<van-cell-group>

    <block v-for="(tagItem, tagIndex) in tagListData" :key="tagIndex">
        <van-cell :value="tagItem.tag+ '('+tagItem.postcount+')'" icon="shop" is-link @click="onTagClick($event, tagItem.id)">
        </van-cell>
    </block>
</van-cell-group>

</template>

<script>

export default {
  props: {
    tagListData: [],
    pageindex: 1,
    pagelen: 20,
    total: 20
  },
  data () {
    return {
      // indicatorDots: true,
      // autoplay: true,
      // interval: 3000,
      // duration: 500
    }
  },
  // computed: {
  //   tagListData () {
  //     return this.tagList.data
  //   }
  // },
  methods: {
    onTagClick (event, tagId) {
      console.log(event)
      console.log(tagId)
    }
    // onViewAddrListBtn (event) {
    //   console.log(event)
    //   let token = wx.getStorageSync('token')
    //   if (token === '') {
    //     this.$getOpenid()
    //     return
    //   }
    //   let targetURL = '/pages/viewAddrList/main'
    //   wx.navigateTo({
    //     url: targetURL
    //   })
    // }
  }
}
</script>
