const api = require('./api.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 时间戳转化为年 月 日 时 分 秒
 * ts: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
function tsFormatTime(timestamp, format) {

    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];

    let date = new Date(timestamp);
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    returnArr.push(year, month, day, hour, minute, second);

    returnArr = returnArr.map(formatNumber);

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;

}
const wxRequest = (url, params, successCallback, errorCallback, completeCallback) => {
  wx.request({
    url: getApp().globalData.domain + '/Api/' + url,
    data: params || {},
    header: { 'content-type': 'application/json' },
    method: 'POST',
    success: function (res) {
      if(res.statusCode== 200){
        successCallback(res.data)
      }else{
        errorCallback(res)
      }
    },
    fail: function(res) {
      errorCallback(res)
    },
    complete: function (res) {
      completeCallback(res)
    }
  })
}

//设置信息
const getWindowSize = () => {
  var data = {}
  wx.getSystemInfo({
    success: function(res) {
      data.screenWidth = res.windowWidth
      data.screenHeight = res.windowHeight
      data.wHeight = res.windowHeight
    }
  })
  return data
}

// 第三季增加
const getLoginStatus = () => {
  if (getApp().globalData.login == false){
    // 打开授权登录页
    wx.navigateTo({
      url: '/pages/member/login/login',
    })
    return false
  }else{
    return true
  }
}

// 自定义设置缓存（带有效期）
const setStorageStudyfox = (key, value) => {
  //获取缓存有效期
  var time = getApp().globalData.storageTime
  var seconds = parseInt(time)
  if (seconds > 0){
    // 设缓存
    wx.setStorageSync(key, value)
    //获取当前时间戳
    var timestamp = Date.parse(new Date()) / 1000
    // 有效时间戳
    var destroytime = timestamp + seconds
    // 再设一个键名失效时间的缓存
    wx.setStorageSync(key + '_destroytime', destroytime + '')
  }else{
    console.log('缓存' + key + '设置失败')
  }
}

// 自定义获取缓存
const getStorageStudyfox = (key) => {
  // 有效时间戳
  var destroytime = parseInt(wx.getStorageSync(key + '_destroytime'))
  //获取当前时间戳
  var timestamp = Date.parse(new Date()) / 1000
  //时间戳对比
  if (timestamp < destroytime){
    // 缓存在有效期内
    return wx.getStorageSync(key)
  }else{
    return false
  }
}

// 清除缓存
const remove = (key) => {
  wx.removeStorageSync(key)
  wx.removeStorageSync(key + '_destroytime')
}

// 清除所有缓存
const clear = () => {
  wx.clearStorageSync()
}

const wxRequestExpress = (params, url, successCallback, errorCallback, completeCallback) => {
  wx.request({
    url: url,
    data: params || {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200)
        successCallback(res.data)
      else
        errorCallback(res)
    },
    fail: function (res) {
      errorCallback(res)
    },
    complete: function (res) {
      completeCallback(res)
    }
  })
}

const getExpress100 = (params, s, e, c) => wxRequestExpress(params, api.API_EXPRESS_100, s, e, c);

const getCompany100 = (params, s, e, c) => wxRequestExpress(params, api.API_COMPANY_100, s, e, c);

module.exports = {
  formatTime: formatTime,
  wxRequest: wxRequest,
  getWindowSize: getWindowSize,
  getLoginStatus: getLoginStatus,
  setStorageStudyfox: setStorageStudyfox,
  getStorageStudyfox: getStorageStudyfox,
  remove: remove,
  clear: clear,
  getExpress100: getExpress100,
  getCompany100: getCompany100,
  tsFormatTime:tsFormatTime
}
