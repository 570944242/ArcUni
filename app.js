var Bmob = require('utils/Bmob162.min.js')
Bmob.initialize("32189d043525da5580c31aaf221d7d19", "240261f868e9ee2ddb8517dff1075da5",'4bfe8f1b3187812586e4be184a8f8346');

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function(e) {
    Bmob.User.auth().then(res => {
      console.log(res)
      console.log('一键登陆成功')
      wx.setStorageSync('userID', res.objectId)
    }).catch(err => {
      console.log(err)
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  }
})