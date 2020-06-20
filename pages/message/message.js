Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    g_id: '',
    no: '',
    title: '',
    messages: '',
    message: '',
    condition: false,
    repeatcondition: true,
    formId: '',
    messagesnull: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var self = this;
    var postId = option.postId;
    self.setData({
      postId: postId
    })
  },

  //获取留言本文域信息
  getmessages: function (e) {
    this.setData({
      messages: e.detail.value,
    })
  },

  //点击提交留言
  btnmessage: function (e) {
    var that = this;
    console.log("提交的留言信息为" + that.data.messages)
    if (that.data.messages == "") {
      wx: wx.showToast({
        title: '请输入留言内容...',
        icon: 'none',
      })
    } else {
      if (that.data.repeatcondition == true) {
        wx: wx.showToast({
          title: '正在发布',
          icon: 'loading',
        })
        that.setData({
          message: that.data.messages
        })
        //显示留言内容
        that.setData({
          condition: true,
          repeatcondition: false,
          messagesnull: ''
        })
        wx.request({
          url: 'http://localhost:8080/writeMessage',
          //url: 'https://www.plantdisrecogn.com/wxupload/goods/getUser',//自己请求的服务器的地址
          method: 'POST',
          data: {
            postId: self.data.postId,
            message: that.data.messages
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值 上传用这个类型好
          },
          success: function (req) {
            console.log(req.data);
            wx: wx.showToast({
              title: '留言成功',
              icon: 'success',
            })
          }
        })
        
      } else {
        wx: wx.showToast({
          title: '您已经留过言了',
          icon: 'none',
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // var that = this;
    // if (that.data.messages == "") {
    //   console.log("没有留言数据！")
    // } else {
    //   console.log("formid" + that.data.formId)
    //   wx.request({
    //     url: '自己服务器API', //上传留言内容
    //     data: {
    //       username: wx.getStorageSync('username'),//用户名
    //       avatarUrl: wx.getStorageSync('headpath'),//头像
    //       messages: that.data.messages,//留言内容
    //       title: that.data.title,// 标题
    //       ischeck: '0', //作者是否已回复
    //       no: that.data.no,  //文章编号
    //       openid: wx.getStorageSync('openid'), //用户唯一标识
    //       g_id: that.data.g_id,   //公众号标识
    //       form_id: that.data.formId,//表单id
    //       token: wx.getStorageSync('token')//token
    //     },
    //     header: {
    //       'content-type': 'application/json' // 数据格式（默认值）
    //     },
    //     method: 'post', //上传方式
    //     success: function (res) {   //回调成功
    //       console.log(res.data)
    //       if (res.statusCode == 200) {
    //         // wx: wx.showToast({
    //         //   title: '留言成功',
    //         //   icon: 'success',
    //         // })
    //         wx.request({
    //           url: '自己服务器API',//给公众号主发送消息
    //           data: {
    //             g_id: that.data.g_id,   //公众号标识
    //             messages: that.data.messages,//留言内容
    //             title: that.data.title,// 标题
    //             username: wx.getStorageSync('username'),//用户名
    //             page: 'pages/lookmessage/lookmessage?title=' + that.data.title + '&no=' + that.data.no + '&id=' + that.data.g_id
    //           },
    //           method: 'POST',
    //           success: function (res) {
    //             console.log("留言成功！")
    //           },
    //           fail: function (err) {
    //             wx.showToast({
    //               title: '网络连接失败',
    //               icon: 'none',
    //             })
    //           }
    //         });
    //       } else {
    //         wx: wx.showToast({
    //           title: '留言失败',
    //           icon: 'none',
    //         })
    //       }
    //     },
    //     //回调失败
    //     fail: function (res) {
    //       console.log(res)
    //       wx.showToast({
    //         title: '服务器错误',
    //         icon: 'fail',
    //       })
    //     },
    //   })
    // }
  },
  //通过消息推送到用户微信
  //   var l = '自己服务器API';//消息模板路径
  //   var d = {
  //     form_id: that.data.formId,//表单id
  //     type: '2'
  //     // touser: that.data.g_id,//公众号id
  //     // page: '/pages/index/index',//跳转页面
  //     // form_id: that.data.formId,//表单id
  //     // title: that.data.title,//文章标题
  //     // message: that.data.message,//留言内容
  //     // person: wx.getStorageSync('username')//留言者
  //   }
  //   console.log('formid提交：' + that.data.formId)
  //   wx.request({
  //     url: l,
  //     data: d,
  //     method: 'POST',
  //     success: function (res) {
  //       console.log("留言成功！")
  //     },
  //     fail: function (err) {
  //       wx.showToast({
  //         title: '网络连接失败',
  //         icon: 'none',
  //       })
  //     }
  //   });
  // }
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})