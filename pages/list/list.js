// pages/list/list.js
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
    console.log(options);
    var that = this;
    const query = Bmob.Query("data");

    query.equalTo("eid", "==", Number(options.id));
    query.include('poster');
    query.find().then(res => {
      console.log(res)
      var res_list = [];
      for (var i = 0; i < res.length; i++) {
        var obje = res[i];
        res_list.push({
          detail: obje.detail,
          img_url: obje.img.url,
          name: obje.name,
          createdAt: obje.createdAt,
          poster: obje.poster.objectId
        })
      }
      that.setData({
        res_list: res_list
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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