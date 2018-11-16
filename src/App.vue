<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style lang='scss' scoped>
/* @import url("./iconfont/iconfont.css"); */
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}


page {
  background: #f4f4f4;
  height: 100%;
}

button {
  background: none;
  padding: 0;
  font-weight: normal;
  font-size: 32rpx;
  box-sizing: content-box;
}
button::after {
  border: 0;
}

view,
text {
  font-size: 28rpx;
  color: #333;
}

.wxParse .p {
  margin: 0 !important;
}

.wxParse .img {
  display: block !important;
}

/* this rule will be remove */

/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */

</style>
