// pages/start/start.js
var Bmob = require('../../utils/Bmob162.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const query = Bmob.Query('start');
    query.equalTo("detail", "==", '开始界面的图片');
    query.find().then(res => {
      console.log(res)
      that.setData({
        url: res[0].img_url
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {


      Bmob.User.upInfo(e.detail.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
      })
      wx.redirectTo({
        url: '/pages/main/main'
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})