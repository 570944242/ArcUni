// pages/wall/wall.js
var Bmob = require('../../utils/Bmob162.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuo: false,
    navbar: ['综合', '表白', "树洞", "招领", "寻物"],
    all: true,
    is_comment: false,
    showModal: false,
    v_jvbao: ''
  },
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  inputChange: function(e) {
    this.setData({
      inputChange: e.detail.value
    })
  },
  onConfirm: function(e) {
    console.log(e)

    var inputChange = this.data.inputChange;
    if (inputChange) {

      const query = Bmob.Query('data');
      query.get(e.target.id).then(res => {
        var res_jvbao_con = res.jvbao_con;
        if (res_jvbao_con) {
          res_jvbao_con.push(inputChange)
        } else {
          res_jvbao_con = [inputChange]
        }
        res.set('jvbao_con', res_jvbao_con)
        res.save();
        this.hideModal();
        this.setData({
          inputChange: ''
        });
        wx.showToast({
          title: '举报成功',
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    }

  },
  navbarTap: function(e) {
    console.log(e)
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    that.setData({
      all: false,
      currentTab: idx,
    });
    if (e.currentTarget.dataset.idx == 0) {
      that.rep()
    } else {
      that.rep(e.currentTarget.dataset.idx)
    }

  },
  frb: function(e) {
    console.log(e);
    if (!e.detail.value.contect) {
      wx.showToast({
        title: '请输入评论内容',
        icon: "none"
      })
    } else {
      let content = e.detail.value.contect
      Bmob.checkMsg(content).then(res => {
        var userID = wx.getStorageSync('userID');
        var userInfo = wx.getStorageSync('userInfo');
        const pointer = Bmob.Pointer('_User')
        const poiID = pointer.set(userID)

        const data = Bmob.Pointer('data')

        const datID = pointer.set(e.target.id)

        console.log(userInfo.nickName, userInfo.avatarUrl, e.detail.value.contect, poiID, datID)
        const query = Bmob.Query('comment');
        query.set("post_name", userInfo.nickName);
        if (userInfo.avatarUrl) {
          query.set("post_img", userInfo.avatarUrl);
        };
        query.set("contect", e.detail.value.contect);
        query.set("poster", poiID);
        query.set("data", datID);
        query.save().then(res => {
          wx.showToast({
            title: '发表成功',
          });
          this.setData({
            com_value: ''
          });
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        wx.showToast({
          icon: 'none',
          title: '请输入合法内容',
        })
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  post: function(options) {
    var that = this;
    var tuo = this.data.tuo;
    that.setData({
      tuo: !tuo
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  red: function(e) {
    wx.navigateTo({
      url: '/pages/post_msg/post_msg?id=' + e.target.id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  zan: function(e) {
    console.log(e);
    var that = this;
    var is_comment = that.data.is_comment;
    that.setData({

      is_comment: !is_comment,
      v_id: e.target.id,
    })

    const query = Bmob.Query("comment");
    query.equalTo("data", "==", e.target.id);
    query.find().then(res => {
      console.log(res)
      that.setData({
        res_comment: res
      })
    });


  },
  wxswi_index: function() {
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },
  contact: function(e) {
    console.log('contact: function');
    console.log(e);
  },
  showAllAction: function(e) {
    console.log(e)
    this.setData({
      isShowAllContent: !this.data.isShowAllContent
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onLoad: function() {
    console.log(223)
    this.rep()
  },
  rep: function(num, k) {
    var that = this;
    that.setData({
      res_msg: []
    })
    const query = Bmob.Query("data");
    query.equalTo('eid', "==", num);
    query.order("-createdAt");
    query.find().then(res => {
      console.log(res);

      that.setData({
        res_msg: res
      })

    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  show_img: function(e) {

    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: [e.currentTarget.dataset.url]
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onShow: function() {
    this.setData({
      tuo: false
    })
  },
  // bindReplaceInput: function (e) {
  //   this.setData({
  //     sousuoneirong: e.detail.value
  //   })
  // },
  // /**
  //  * 用户点击右上角分享
  //  */
  // yyy: function () {
  //   var sousuoneirong=this.data.sousuoneirong
  //   var that = this;
  //   if (sousuoneirong){
  //     that.setData({
  //       res_msg: []
  //     })
  //     const query = Bmob.Query("data");
  //     query.equalTo('eid', "==", num);
  //     query.order("-createdAt");
  //     query.equalTo("detail", "==", { "$regex": "" + sousuoneirong + ".*" });
  //     query.find().then(res => {
  //       console.log(res);

  //       that.setData({
  //         res_msg: res
  //       })

  //     });
  //   }

  // }
})