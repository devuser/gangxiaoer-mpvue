<template>
  <div>
    <form class="form-container">
      类别<input type="类别" class="form-control" v-model="motto" placeholder="v-model" />
      主题<input type="主题" class="form-control" v-model="motto" placeholder="v-model" />
      正文<input type="te正文xt" class="form-control" v-model="motto" placeholder="v-model" />
      图片<input type="图片" class="form-control" v-model="motto" placeholder="v-model" />
      联系方式<input type="联系方式" class="form-control" v-model="motto" placeholder="v-model" />
        <button class="weui-btn" type="primary">发布</button>
    </form>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: []
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
