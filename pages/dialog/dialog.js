//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    dialog: []
  },
  onLoad: function (m) {
    console.log(m);
    wx.setNavigationBarTitle({
       title: m.key
    })
    this.setData({
     
    })
  }
})
