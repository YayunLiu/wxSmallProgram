var newsDataList = require('../../mock/mock.js');
var bannerUrl = require('../../mock/bannerUrl.js');
// pages/news/news.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(`onLoad, 页面初始化`);
        console.log(newsDataList);
        console.log(bannerUrl.bannerUrl);
        this.setData({
            newsData: newsDataList.newsData,
            bannerUrl: bannerUrl.bannerUrl
        });
    },
    /**
     * 点击事件_______跳转新闻详情页面
     */
    onNewsDetailTo(event) {
        console.log(event.currentTarget.dataset.postid);
        let postId = event.currentTarget.dataset.postid;
        let index = event.currentTarget.dataset.index;
        wx.navigateTo({
            url: `./news-detail/news-detail?id=${postId}`,
            success: () => {
                console.log(event);
                console.log(`postid: ${event.currentTarget.dataset.postid} ***
                 index:${event.currentTarget.dataset.index} 路由成功`);
            },
            fail: () => {
                console.log(`postid: ${event.currentTarget.dataset.postid} ***
                 index:${event.currentTarget.dataset.index} 路由失败`);
            },
            complete: () => {
                console.log(`postid: ${event.currentTarget.dataset.postid} ***
                 index:${event.currentTarget.dataset.index} 成功或失败`);
            }
        });
    },
    /**
     * 点击banner图片
     */
    onclickBannerTo(event) {
        console.log(event.currentTarget.dataset.bannerindex);
        wx.navigateTo({
            url: `./news-detail/news-detail?bannerIndex=${event.currentTarget.dataset.bannerindex}`,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log(`onReady, 页面初次渲染`);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log(`onShow, 页面显示的时候`);

        // setTimeout(() => {
        //     console.log("延迟函数触发了");
        //     this.setData(swiperInfo);
        //     console.log(this);
        // }, 10000);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log(`onHide, 页面隐藏的时候`);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log(`onUnload, 页面卸载的时候`);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        console.log(`onPullDownRefresh`);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        console.log(`onReachBottom`);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        console.log('share');
    }
})