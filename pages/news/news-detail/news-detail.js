let newsDetail = require('../../../mock/mock.js');
let app = getApp(); // 引入入口文件 获取全局变量
// pages/news/news-detail/news-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectionUrl: '../../../images/icon/collection-anti.png',
        shareUrl: '../../../images/icon/share.png',
        toastObj: {
            toastText: '',
            toastInfo: false
        },
        music: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(`我是全局变量${app.globalData.g_musie}`);
        console.log(options.id); // 接收组件之间的传值
        console.log(options.bannerIndex);
        console.log(newsDetail.newsData);
        for (let i = 0; i < newsDetail.newsData.length; i++) {
            if (options.bannerIndex) {
                this.setData({
                    detailData: newsDetail.newsData[options.bannerIndex].newsDetail
                });
            } else {
                if (newsDetail.newsData[i].postId == options.id) {
                    this.setData({
                        detailData: newsDetail.newsData[i].newsDetail
                    });
                    /**
                     * 判断 文章是否被收藏
                     */
                    if (wx.getStorageSync('collection')) {
                        this.setData({
                            collectionUrl: '../../../images/icon/collection.png'
                        });
                    }
                    this.startMusic();
                    this.checkMusic();
                    return;
                }
            }
        }
    },
    /**
     * tap_____收藏事件点击
     */
    onCllectionTap(event) {
        // this.setData({
        //     'toastObj.toastInfo': true
        // });
        if (wx.getStorageSync('collection')) {
            wx.removeStorageSync('collection');
            this.setData({
                collectionUrl: '../../../images/icon/collection-anti.png',
                'toastObj.toastText': '取消关注'
            });
            wx.showToast({
                title: '取消关注',
                icon: 'none',
                duration: 800
            })
        } else {
            wx.setStorageSync('collection', true); // 同步设置缓存
            this.setData({
                collectionUrl: '../../../images/icon/collection.png',
                'toastObj.toastText': '添加关注'
            });
            wx.showToast({
                title: '添加关注',
                icon: 'none',
                duration: 800
            })
        }
        // setTimeout(() => {
        //     this.setData({
        //         'toastObj.toastInfo': false
        //     });
        // }, 800);
    },
    /**
     * tap事件____音乐播放
     */
    onMusic() {
        this.setData({
            music: !this.data.music
        });
        if (this.data.music) {
            this.startMusic();
        } else {
            wx.pauseBackgroundAudio();
        }
    },
    /**
     * 开始播放音乐
     */
    startMusic() {
        wx.playBackgroundAudio({
            dataUrl: this.data.detailData.musicUrl,
            title: this.data.detailData.musicName,
            coverImgUrl: ''
        })
    },
    /**
     * 底部上升选择框
     */
    onshowActionSheet() {
        wx.showActionSheet({
            itemList: ['转发'],
            success(res) {
                console.log(res.tapIndex)
            },
            fail(res) {
                console.log(res.errMsg)
            }
        })
    },
    /**
     * 音乐播放事件监听----监听音乐的播放
     */
    checkMusic() {
        wx.onBackgroundAudioPlay(() => {    // 监听音乐播放 开始
            console.log('音乐播放被触发了');
            this.setData({
                music: true
            });
        });
        wx.onBackgroundAudioPause(() => {   // 监听音乐播放 暂停
            this.setData({
                music: false
            });
        });
        wx.onBackgroundAudioStop(() => {   // 监听音乐播放 完成
            this.setData({
                music: false
            });
        });
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