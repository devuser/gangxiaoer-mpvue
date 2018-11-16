<template>

<div class="swiper">
    <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in images " :key="index">
            <swiper-item class="swiper-item">
                <image :src="item.image_url" class="slide-image" />
            </swiper-item>
        </block>
    </swiper>
</div>

</template>

<script>

export default {
  props: {
    images: {
      type: Array
    }
  },
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
