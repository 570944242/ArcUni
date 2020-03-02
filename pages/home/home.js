//logs.js
var Bmob = require('../../utils/Bmob162.min.js')
Page({
  data: {
    isPopping: false, //是否已经弹出
    animPlus: {}, //旋转动画
    animCollect: {}, //item位移,透明度
    animTranspond: {}, //item位移,透明度
    animInput: {}, //item位移,透明度
    animInput4: {},
    animInput5: {},
    my_sent_item: [{
      id: 6,
      src: 'img/all.png',
      contant: '综合',

    }, {
      id: 1,
      src: 'img/find.png',
      contant: '寻物启事',

    }, {
      id: 2,
      src: 'img/goods.png',
      contant: '失物招领',

    }, {
      id: 3,
      src: 'img/biao.png',
      contant: '表白墙',

    }],
    my_sent_item2: [{
      id: 4,
      src: 'img/tree.png',
      contant: '树洞',

    }, {
      id: 5,
      src: 'img/hand_2.png',
      contant: '闲置二手',
    }]

  },
  go_list: function(e) {
    console.log(e)
    wx.redirectTo({
      url: '/pages/list/list?id=' + e.target.id,
    })
  },
  //点击弹出
  plus: function() {
    if (this.data.isPopping) {
      //缩回动画
      this.takeback();
    } else if (!this.data.isPopping) {
      //弹出动画
      this.popp();
    }
    this.setData({
      isPopping: !this.data.isPopping
    })
  },
  input: function(e) {
    console.log(e);
    wx.redirectTo({
      url: '/pages/index/index?id=' + e.target.id,
    })
  },


  //弹出动画
  popp: function() {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animation4 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animation5 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).step();
    animationcollect.translate(-100, 0).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-50 * Math.sqrt(3), -50).rotateZ(360).opacity(1).step();
    animationInput.translate(-50, -50 * Math.sqrt(3)).rotateZ(360).opacity(1).step();
    animation4.translate(0, -100).rotateZ(360).opacity(1).step();
    animation5.translate(50, -50 * Math.sqrt(3), ).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
      animInput4: animation4.export(),
      animInput5: animation5.export(),
    })
  },
  //收回动画
  takeback: function() {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animation4 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animation5 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    animation4.translate(0, 0).rotateZ(0).opacity(0).step();
    animation5.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput4: animation4.export(),
      animInput5: animation5.export(),
      animInput: animationInput.export(),
    })
  },


  onLoad: function(options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})