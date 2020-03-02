// pages/main/main.js
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
    query.equalTo("detail", "==", '滑动图片');
    query.find().then(res => {
      console.log(res)
      var img = [];
      for (var i = 0; i < res.length; i++) {
        var url = res[i].img_url;
        img.push(url)
      }
      console.log(img)
      that.setData({
        img: img
      })
    });
    var that = this;
    const cc = Bmob.Query('start');
    cc.equalTo("detail", "==", '通知');
    cc.find().then(res => {
      console.log(11, res)
      that.setData({
        p_url: res[0].img_url
      })
    });
  },
  go_qiang: function() {
    wx.redirectTo({
      url: '/pages/wall/wall',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  hope: function() {
    wx.showToast({
      title: '敬请期待',
      icon:'none'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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