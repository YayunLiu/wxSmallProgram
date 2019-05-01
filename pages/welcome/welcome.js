Page({
    /**
     *  首页跳转新闻页
     */
    onTap() {
        wx.openSetting({
            success: (res) => {
                console.log(res);
                if (res.authSetting['scope.userInfo'] == false) {
                    console.log(`触发了openSetting-success`);
                    wx.showToast({
                        title: '请授权用户信息,否则将无法登陆',
                        icon: 'none'
                    })
                    setTimeout(() => {
                        wx.hideToast();
                    }, 10000);
                } else {
                    this.getUserInfo(); // 调用用户授权信息userInfo
                }
                
            },
            fail: (res) => {  
            }
        }) 
    },
    startOpen() {
         
    },
    getUserInfo() {
        wx.getUserInfo({
            withCredentials: true,
            success: (res) => { 
                console.log('获取用户信息');
                console.log(res);
                this.setData({
                    userData: res.userInfo
                });
            },
            fail: (res) => { },
            complete: (res) => { }
        })
    },
    /**
     * 跳转---带有tabBar页面的方法
     */
    onSwitchTab() {
        wx.switchTab({
            url: '../news/news',
            success: () => {
                console.log('路由跳转成功执行');
            },
            fail: () => {
                console.log("路由跳转失败执行");
            },
            complete: () => {
                console.log("路由跳转成功失败都执行");
            }
        })
    },
    onimageTo() {
        
    },
  /**
   * 页面的初始数据
   */
  data: {
      userData: '',
      authSetting: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    //   wx.getSetting({       // 获取当前授权状态
    //       success: (res) => {
    //           console.log(res);
    //       }
    //   });
    //   wx.openSetting({  // 引导用户开启授权
    //       success(res) {
    //           console.log(res.authSetting)
    //           // res.authSetting = {
    //           //   "scope.userInfo": true,
    //           //   "scope.userLocation": true
    //           // }
    //       }
    //   })
    //   wx.getSetting({       // 获取用户当前的授权状态
    //       success(res) {
    //           console.log(res.authSetting)
    //           // res.authSetting = {
    //           //   "scope.userInfo": true,
    //           //   "scope.userLocation": true
    //           // }
    //       }
    //   });
    //   wx.login({    // 设置用户静默登录
    //       success: (res) => {   // 用户登录
    //           wx.getUserInfo({  // 获取用户信息
    //               withCredentials: true,
    //               success(res) {
    //                   console.log(res);
    //                   const userInfo = res.userInfo
    //                   const nickName = userInfo.nickName
    //                   const avatarUrl = userInfo.avatarUrl
    //                   const gender = userInfo.gender // 性别 0：未知、1：男、2：女
    //                   const province = userInfo.province
    //                   const city = userInfo.city
    //                   const country = userInfo.country
    //               },
    //               fail(res) {
    //                   console.log(res);
    //               }
    //           })
    //       }
    //   });
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
        wx.login({  // 设置用户静默登录
            success: (res) => {
                console.log(`用户登录成功`);
                wx.getSetting({ // 查询用户当前的授权状态
                    success: (res) => {
                        if (res.authSetting['scope.userInfo'] == false) {
                            console.log('用户未授权UserInfo');
                            this.setData({
                                authSetting: false
                            });
                        } else {
                            console.log('用户已授权');
                            this.setData({
                                authSetting: true
                            });
                            this.getUserInfo(); // 调用用户授权信息userInfo
                        }
                    }
                })
            },
            fail: (res) => {

            }
        })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log(`welcome页面被销毁了Hide`);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('welcome页面被销毁了unload');
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