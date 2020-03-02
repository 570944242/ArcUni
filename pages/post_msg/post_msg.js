const app = getApp()
var Bmob = require('../../utils/Bmob162.min.js');

var util = require('../../utils/util.js');
Page({
  data: {

  },
  formSubmit: function(e) {
    console.log(e);
    if (!e.detail.value.detail) {
      wx.showModal({
        title: '提示',
        content: '请输入发布的内容',
        showCancel: false
      })
    } else {

      let content = e.detail.value.detail;
      Bmob.checkMsg(content).then(res => {
        const pointer = Bmob.Pointer('_User')
        const query = Bmob.Query('data');
        if (e.detail.target.id != 4) {
          query.set("name", e.detail.value.name1);
        }
        if (e.detail.target.id != 4 && !e.detail.target.dataset.img) {
          wx.showToast({
            title: '请上传图片',
            icon: 'none'
          })
        } else {
          query.set("img", e.detail.target.dataset.img);
        }

        query.set("detail", e.detail.value.detail);
        query.set("eid", Number(e.detail.target.id));
        query.set("connect", e.detail.value.connect);
        query.set("poster", pointer.set(wx.getStorageSync('userID')));
        query.save().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
       wx.showToast({
         title: '内容违规',
         icon:'none'
       })
      })

      
    }


  },
  onLoad: function(e) {
    console.log(e)
    this.setData({
      eid: e.id
    })
    if (e.id == 1) {
      wx.setNavigationBarTitle({
        title: '发布表白墙'
      })
    } else if (e.id == 2) {
      wx.setNavigationBarTitle({
        title: '发布树洞'
      })
    } else if (e.id == 3) {
      wx.setNavigationBarTitle({
        title: '发布寻物启事'
      })
    } else if (e.id == 4) {
      wx.setNavigationBarTitle({
        title: '发布失物招领'
      })
    }


  },
  uploadPic: function() {
    var that = this;
    var time = util.formatTime(new Date());
    wx.chooseImage({
      count: 4,
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          file = Bmob.File('abc.jpg', item);
        }
        file.save().then(res => {
          console.log(res.length);
          var ress = [];
          for (var i = 0; i < res.length; i++) {
            var resi = JSON.parse(res[i]);
            ress.push(resi.url)
          }
          console.log(ress);
          that.setData({
            img_res: ress
          })
        })

      }
    })
  }

})