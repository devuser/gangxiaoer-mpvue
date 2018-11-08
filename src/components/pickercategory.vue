<template>
  <div>
    <picker @change="handlePickerChange" :value="selectedIndex" :range="categoryList">
      <view class="picker">当前消息：{{ categoryList[selectedIndex] }}</view>
    </picker>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: [],
    defaultCategoryIndex: 0
  },
  data () {
    return {
      selectedIndex: 0
    }
  },
  methods: {
    handlePickerChange (e) {
      console.log(e)
    }
  }
}
</script>
