//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    socketMsgQueue: [],
    userInfo: null,
    dialogs: [{ name: "yangmi", number: "13113007378", read: "false" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "false" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }, { name: "yangmi", number: "13113007378", read: "true" }]
  },
  //事件处理函数
  bindViewTap: function (event) {
    //完全不懂为什么要用that一下
    var that = this
    that.data.dialogs[event.currentTarget.id].read = 'true'
    that.setData(that.data)
    wx.navigateTo({
      url: '../dialog/dialog?key=' + that.data.dialogs[event.currentTarget.id].number
    })
    wx.setStorageSync('dialogs', that.data.dialogs)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //更新数据
    that.setData({
      // userInfo: userInfo,
      dialogs: (wx.getStorageSync('dialogs') || [])
    })
    if (that.data.userInfo == null) {
      wx.setNavigationBarTitle({
        title: 'offline'
      })
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        if (userInfo != null) {
          wx.setNavigationBarTitle({
            title: 'SMS'
          })
          that.setData({
            userInfo: userInfo,
            // dialogs: (wx.getStorageSync('dialogs') || [])
          })
          //登录成功,建立socket连接
          that.firstSocket();
        }

      })
    }

  },
  //建立socket连接，还有设置监听器
  firstSocket: function () {
    wx.connectSocket({
      url: "wss://URL",
      data: {},
      // header: {}, // 设置请求的 header
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    })
    wx.onSocketOpen(function (res) {
      socketOpen = true
      for (var i = 0; i < that.data.socketMsgQueue.length; i++) {
        that.sendSocketMessage(that.data.socketMsgQueue[i])
      }
      that.setData({ socketMsgQueue: [] })
    })
  },
  sendSocketMessage:    function (msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        that.data.socketMsgQueue.push(msg)
      }
      that.setData({socketMsgQueue: that.data.socketMsgQueue})
    },
  onPullDownRefresh: function () {
    var that = this
    if (that.data.userInfo == null) {
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        if (userInfo != null) {
          wx.setNavigationBarTitle({
            title: 'SMS'
          })
          that.setData({
            userInfo: userInfo,
            // dialogs: (wx.getStorageSync('dialogs') || [])
          })
          //登录成功,建立socket连接

        } else {
          //选择不登陆，给与提示，设置授权
        }

      })
    } else {
      //socket更新数据

    }
  }
})
