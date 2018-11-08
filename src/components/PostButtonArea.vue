<template>
  <div :class="className">
    <van-button v-show="bShowPostButton"  @click="onAddPost">发帖</van-button>
  </div>
</template>

<script>
import MsgBus from '@/utils/msgBus'
export default {
  props: {
    bShowPostButton: Boolean,
    toporbottom: String
  },
  methods: {
    onAddPost: (e) => {
      console.log(e)
      MsgBus.$emit('add-post', '来自组件')
    }
  },
  computed: {
    className () {
      if (this.toporbottom === 'top') {
        return 'top-pustbuttondiv'
      }
      return 'bottom-pustbuttondiv'
    }
  }
}
</script>

<style>
.top-pustbuttondiv {
  margin:0 auto;
  align-items: flex-end;
  border-bottom: 1px dashed #000;
  background: #00000;
  margin-bottom: 10rpx;
  padding-bottom: 10rpx;
  padding: 10px;
}

.bottom-pustbuttondiv {
  margin:0 auto;
  align-items: flex-end;
  border-top: 1px dashed #000;
  background: #00000;
  margin-bottom: 10rpx;
  padding-bottom: 10rpx;
  padding: 10px;
}
</style>
