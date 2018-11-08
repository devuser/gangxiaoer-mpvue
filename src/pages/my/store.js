// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
// import Vue from 'vue'
import Vuex from 'vuex'

// Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      avatarUrl: ''
    },
    // activePageMap: {
    //   "van-tab-profile": 0,
    //   "van-tab-latest": 1,
    //   "van-tab-fav": 2
    // },
    activePageMap: new Map([
      ['van-tab-profile', 0],
      ['van-tab-latest', 1],
      ['van-tab-fav', 2]
    ]),
    post: {},
    mydata: {
      base: {
        loginid: '',
        nickname: ''
      },
      history: {
        postCount: 0,
        scoreBalance: 0,
        signinedToday: false,
        latestPosts: {
          data: [],
          pageindex: 1,
          pagele: 10,
          pagecount: 1
        },
        favPosts: {
          data: [],
          pageindex: 1,
          pagele: 10,
          pagecount: 1
        }
      },
      signinTodayTitle: ''
    },
    historyLatestPostsData: [],
    historyFavPostsData: [],
    activeTabId: 0
  },
  mutations: {
    updateMyData: (state, newValue) => {
      const obj = state
      console.log('更新store.state.mydata')

      if (newValue.history.signinedToday) {
        newValue.signinTodayTitle =
          `已经签到,积分${newValue.history.scoreBalance}`
      } else {
        newValue.signinTodayTitle =
          `签到,积分${newValue.history.scoreBalance}`
      }
      obj.mydata = newValue
      obj.historyFavPostsData = newValue.history.favPosts.data
      console.log('obj.historyFavPostsData')
      console.log(obj.historyFavPostsData.length)
      obj.historyLatestPostsData = newValue.history.latestPosts.data
      console.log('obj.historyLatestPostsData')
      console.log(obj.historyLatestPostsData.length)
    },
    updatehistoryLatestPostsData: (state, newValue) => {
      const obj = state
      obj.historyLatestPostsData = newValue
    },
    updateActiveTab: (state, newValue) => {
      const obj = state
      let tabId = obj.activePageMap.get(newValue)
      console.log(`updateActiveTab: ${tabId}`)
      obj.activeTabId = tabId
    },
    updateUserInfo: (state, newValue) => {
      console.log('updateUserInfo')
      console.log(newValue.nickName)
      const obj = state
      obj.userInfo = newValue
    },
    updateScoreBalance: (state, newValue) => {
      const obj = state
      obj.mydata.history.scoreBalance = newValue
    }
  }
})

export default store
