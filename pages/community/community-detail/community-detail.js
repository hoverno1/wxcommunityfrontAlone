// pages/community/community-detail/community-detail.js
//var postsData = require('../../../data/posts-data.js')
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postsData:[],
    postId:'',
    // 留言部分
    disabled: false,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    sqFlag: false,
    liuyanName: '',
    list: [],
    // 留言部分
    inputVal: '',
    msgData: [],
    globalUserName:app.globalData.globalUserName,
    msg:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    //console.log(self.data.postId);
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/queryPost',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) { 
        var postsData = req.data;
          self.setData({
            postsData: req.data
    });
    
    // 获取从community传来的id
    var postId = options.id;
    //console.log(postId);
    //不知道为什么数据库中postId会自动增加10:已经解决，数据库自动增量的初始值设置一下
    var postData = postsData[postId];
    // console.log(postData);
    self.setData({
      postId:postId,
      postData: postData
    })
  
  }
})
    //console.log(self.data.postId);
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/queryMessageList',
      method: 'POST',
      data: {
        postId: options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值 上传用这个类型好
      },
      success: function (req) {
        console.log(req.data)
        req.data.forEach(function (item, index) {
          console.log(item); //这里的item就是从数组里拿出来的每一个每一组
          self.data.msgData.push({
            msg: item.message
          });
        })
        // self.setData({
        //   msgData: req.data
        // });
        self.setData({
          msgData: self.data.msgData,
        });
      }
    })
  },

  // 留言部分
  changeInputVal(ev) {
    this.setData({
      inputVal: ev.detail.value
    });
  },
  addMsg() {
    //   this.data.msgData.push({
    //     msg:this.data.inputVal
    //   });

    //console.log(app.globalData.globalUserName)
    //判断用户是否已经登录，不登录提示登录
    if (app.globalData.globalUserName == -1){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var list = this.data.msgData;
    if (this.data.inputVal==null){
      return
    }
    this.data.msg=app.globalData.globalUserName + ' 说 ' + this.data.inputVal;
    list.push({
      msg: app.globalData.globalUserName + ' 说 ' + this.data.inputVal
    });
    // 更新
    this.setData({
      msgData: list,
      inputVal: ''
    });
    //将留言上传至服务器
      var self = this;
      //console.log(self.data.msgData.length)

    //console.log(self.data.msg),
      wx.request({
        url: 'https://my.plantdisrecogn.com/wxcommunity/insertMessage',
        method: 'POST',
        data: {
          postId: self.data.postData.postId,
          nid: self.data.msgData.length,
          message: self.data.msg,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值 上传用这个类型好
        },
      })
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