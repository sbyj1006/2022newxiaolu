// index.js

const util = require('../../../utils/util.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var WxParse = require('../../../wxParse/wxParse.js');

var qqmapsdk;
//获取应用实例

const app = getApp()

Page({
  data: {
	  domain:app.globalData.domain,
	  tarselected:'',
    motto: 'Hello World',
    userInfo: {},
	
	switchIndex: '1',
	chart: 'article',
	height: 0,
	listData: [],
	liuyanclass:'',
	newsxx:{},
	mescontent:'',
	toView: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad(op) {
	  console.log(op)
	  this.getnewsxx(op.id)
	  this.getdataa(3)
	  
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  /**
   * 获取数据
   */
  getdataa: function (id){
    var url = 'index/getdataa'
    var params = { id: id}
    console.log(params)
    util.wxRequest(url, params, data => {
		console.log(data);
      if (data.code == 200) {
        
        this.setData({ datas: data.datas})

      }
  console.log(this.data);
     
    }, data => { }, data => { })
  },
  
  
  
  /**
   * 获取数据
   */
  getnewsxx: function (id){
    var url = 'index/getnewsxx'
    var params = { id: id}
    console.log(params)
    util.wxRequest(url, params, data => {
  		console.log(data);
      if (data.code == 200) {
            WxParse.wxParse('articlea', 'html', data.newsxx.content, this, 5)
        this.setData({ newsxx: data.newsxx})
  
      }
  console.log(this.data);
     
    }, data => { }, data => { })
  },
  
  
  /**
   * 点击进入页面
   */
  ggurlb: function (e) {
	  console.log(e)
	 var url=e.currentTarget.dataset.actionUrl
    wx.navigateTo({
      url: url,
    })
  },
   onShow: function (){
	  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
	    this.getTabBar().setData({
	      tarselected: 0  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
	    })
	  }
  },
  switchTab(e) {
  	console.log(e)
    const data = e.currentTarget.dataset
    const url = data.path
	  if(data.index=='1' || data.index=='2' ){
		  console.log(1)
		   wx.navigateTo({ url })
      
      this.setData({
        tarselected: data.index
      })
	  }else{
		  console.log(2)
		 wx.switchTab({ url })
		  this.setData({
		    tarselected: data.index
		  })
	  }
    
  },
  
  
  liuyan(){
  		let target = 'liuyan';
  		this.setData({
  			liuyanclass:"liuyans",
			toView: target
  		})
  		console.log(this.data)
  	},
  //
    onChangeinputa:function(event) {
      // event.detail.value 为当前输入的值
      console.log(event);
  this.setData({
      mescontent: event.detail.value
    })
       console.log(this.data.mescontent);
    },
    
    addliuyan:function(){
  	    console.log(this.data.mescontent);
    	if (this.data.mescontent == '') {
  		 console.log(1);
    	  wx.showToast({
    	    title: '请填写留言',
    	    icon: 'none'
    	  })
    	} else {
  		 console.log(2);
    var url = 'index/liuyans'
    var params = {
		id:this.data.newsxx.id,
		types:4,
		mescontent:this.data.mescontent,
		openid: app.globalData.openid,
		// token: app.globalData.userInfo.token
	}
    console.log(params)
	var that=this
    util.wxRequest(url, params, data => {
  		console.log(data);
      if (data.code == 200) {
        wx.showToast({
          title: data.msg,
          icon: 'none',
		  
	    duration: 2000,
	    success: function () {
	      setTimeout(function() {
	       that.getnewsxx(data.aid)
	      }, 2000);
	    }
        })	
       
      }else{
		  wx.showToast({
		    title: data.msg,
		    icon: 'none',
	
		  })	
	  }
  console.log(this.data);
     
    }, data => { }, data => { })
	

  	
  	}
    },
    
    
  
  dianzan(e){
	  var that=this
	    console.log(e.currentTarget.dataset.id,)
  	if(app.globalData.userInfo.status){
 
    var url = 'index/paihangdianzana'
    var params = {
		id:e.currentTarget.dataset.id,
		types:e.currentTarget.dataset.types,
		openid: app.globalData.openid,
		// token: app.globalData.userInfo.token
	}
    console.log(params)
    util.wxRequest(url, params, data => {
  		console.log(data);
      if (data.code == 200) {
        wx.showToast({
          title: data.msg,
          icon: 'none',
		  
	    duration: 2000,
	    success: function () {
	      setTimeout(function() {
	      that.getnewsxx(e.currentTarget.dataset.id)
	      }, 2000);
	    }
        })	
       
      }else{
		  wx.showToast({
		    title: data.msg,
		    icon: 'none',
	
		  })	
	  }
  console.log(this.data);
     
    }, data => { }, data => { })
	

  	
  	}else{
  	wx.showToast({
  	  title: '您还审核通过',
  	  icon: 'none'
  	})	
  	}
  },


  
})
