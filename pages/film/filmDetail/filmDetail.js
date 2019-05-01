// pages/film/filmDetail/filmDetail.js
import api from '../../../util/api.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let baseUrl = `/v2/movie/subject/${options.id}`
        console.log(options.id);
        api.requestSever(baseUrl).then(
            (res) => {
                console.log(res.data);
                this.setData({
                    detail: res.data
                });
            },
            (rej) => {
            }
        );
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

    },
    /**
     * 查看图片的小程序api,点击缩放图片,会将原始的图片进行放大展示
     */
    checkImage(event) {
        let tmp = event.currentTarget.dataset.imgurl;
        console.log(event.currentTarget.dataset.imgurl);
        wx.previewImage({
            current: tmp, // 当前显示图片的http链接
            urls: [tmp] // 需要预览的图片http链接列表
        })
    }
})