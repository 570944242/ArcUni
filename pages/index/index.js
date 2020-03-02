const app = getApp()
var Bmob = require('../../utils/Bmob162.min.js');

var util = require('../../utils/util.js');
Page({
  data: {

  },
  formSubmit: function(e) {
    console.log(e)

    if (e.detail.target.id == 1 || e.detail.target.id == 2) {
      if (!e.detail.value.name1 || !e.detail.value.detail) {
        wx.showToast({
          title: '请完善物品名称',
        })
      }
    } else if (e.detail.target.id == 3) {
      if (!e.detail.value.name1) {
        wx.showToast({
          title: '请输入表白对象称呼',
        })
      } else if (!e.detail.value.detail) {
        wx.showToast({
          title: '请输入表白内容',
        })
      }
    } else if (e.detail.target.id == 4) {
      if (!e.detail.value.name1 && !e.detail.value.detail) {
        wx.showToast({
          title: '请编辑发布内容',
        })
      }
    }
    const pointer = Bmob.Pointer('_User')
    const query = Bmob.Query('data');
    if (e.detail.target.id != 4) {
      query.set("name", e.detail.value.name1);
    }
    query.set("img", JSON.parse(e.detail.target.dataset.img));
    query.set("detail", e.detail.value.detail);
    query.set("eid", Number(e.detail.target.id));
    query.set("poster", pointer.set(wx.getStorageSync('userID')));
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })


  },
  onLoad: function(e) {
    this.setData({
      eid: e.id
    })
    if (e.id == 1) {
      this.setData({
        class: '表白',
        name1: '请输入物品名称',
        img_say: '可选择上传物品图片',
        detail: '请输入详细的描述信息、丢失的地点、时间等'
      })
    } else if (e.id == 2) {
      this.setData({
        class: '失物招领',
        name1: '请输入物品名称',
        img_say: '请上传物品图片',
        detail: '请输入描述信息、遇到物品的地点、时间等'
      })
    } else if (e.id == 3) {
      this.setData({
        class: '表白墙',
        name1: '请输入你对对方的称呼',
        img_say: '选择上传一张表白图片',
        detail: '请输入表白内容'
      })
    } else if (e.id == 4) {
      this.setData({
        class: '树洞',
        img_say: '选择上传一张图片',
        detail: '请输入要说的话'
      })
    }

    if (e.id == 5) {
      // this.setData({
      //   class: '闲置二手'
      // })
    }
  },
  uploadPic: function() {
    var that = this;
    var time = util.formatTime(new Date());
    console.log(time)
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          console.log(item)
          file = Bmob.File(time + '.jpg', item);
        }
        file.save().then(res => {

          console.log(res)
          that.setData({
            img: res[0],
            pic_URL: JSON.parse(res[0]).url
          })
        })

      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        console.log(this.show)
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {}
    })

  }
})