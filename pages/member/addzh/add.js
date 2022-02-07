// pages/myform/freesj/add.js
const util = require('../../../utils/util.js')
// import Toast from '../../yy/toast/toast';
//获取应用实例
const app = getApp()
// const citys = {
//   浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
//   福建: ['福州', '厦门', '莆田', '三明', '泉州'],
// };
Page({
  /**
   * 页面的初始数据
   */
  data: {
    client_id: '',
    phone: '',
    content: '',

    columns: ['收单客户', '贷款客户'],
    //以下为省市区数据相关
upatime:'',
zhtype:'',
	domain: app.globalData.domain,

	show: false,
	showt: false,


 currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },

  },
 showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  
  showPopupt() {
     this.setData({ showt: true });
   },
  
   onCloset() {
     this.setData({ showt: false });
   },
  onInput(event) {
	  console.log(1)
	  var kfdate=util.tsFormatTime(event.detail,'Y-M-D')
      this.setData({
        upatime: kfdate,showt:false
      });
    },
  onChange(event) {
      const { picker, value, index } = event.detail;
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
 //    onChange(event) {
 //      const { picker, value, index } = event.detail;
 //      // picker.setColumnValues(1, citys[value[0]]);
 //    },
	onConfirm(event) {
	    const { picker, value, index } = event.detail;
	    // Toast(`当前值：${value}, 当前索引：${index}`);
		console.log(`当前值：${value}, 当前索引：${index}`)
		this.setData({ show: false,zhtype:value});
	  },
	
	  onCancel() {
	    Toast('取消');
	  },

 onChangea({ detail }) {
	 
	 if(this.data.iscanshai==''){
		  this.setData({ iscanshai: 'iscanshai' });
	 }else{
		  this.setData({ iscanshai: '' });
	 }
	 console.log(this.data.iscanshai)
    // 需要手动对 checked 状态进行更新
    this.setData({ checkeda: detail });
  },
  onChangeb({ detail }) {
     // 需要手动对 checked 状态进行更新
     this.setData({ checkedb: detail });
   },
// 城市



//

  //保存
  submit: function() {
    var client_id = this.data.client_id
    var upatime = this.data.upatime
    var zhtype = this.data.zhtype
	   if(client_id.length<2){
	   	 wx.showToast({
	   	   title: "请输入客户号",
	   	   icon: 'none'
	   	 }) 
	   	  return false
	   	}
		if(upatime.length<2){
			 wx.showToast({
			   title: "请输入转化日期",
			   icon: 'none'
			 }) 
			  return false
			}
			if(zhtype.length<2){
				 wx.showToast({
				   title: "请选择客户转化类型",
				   icon: 'none'
				 }) 
				  return false
				}
	   
    var url = 'User/zhuanhuakehu'
    var params = {
      client_id: client_id,
      upatime: upatime,
      zhtype: zhtype,

      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    util.wxRequest(url, params, data => {
		console.log(data)
      if (data.code == 200) {
   
     wx.showToast({
       title: data.msg,
       icon: 'none',
       
     duration: 2000,
     success: function () {
       setTimeout(function() {
     wx.switchTab({
     	url:"../index/index",
     })
     	  				 	   
       }, 2000);
     }
     })	
     
      }else{
		wx.showToast({
		  title: data.msg,
		  icon: 'none'
		})  
	  }
    }, data => { }, data => { })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	    var that = this

	  

	  
    if (options.returnType != undefined){
      this.setData({ returnType: options.returnType })
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
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    this.getTabBar().setData({
      tarselected: 2  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
    })
  }
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
   checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  
      const items = this.data.items
      const values = e.detail.value
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        items[i].checked = false
  
        for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (items[i].value === values[j]) {
            items[i].checked = true
            break
          }
        }
      }
  
      this.setData({
        items
      })
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
  
  },

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