// pages/film/filmMore/filmMore.js
import api from '../../../util/api.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headTitle: '..',
        starNum: 0,
        refreshOrLoad: '',
        dataList: {
            title: '正在热播',
            page: '',
            detail: []
        }
    },
    getData(options) {

        let hotFilm = `/v2/movie/in_theaters?start=${this.data.starNum}&count=12`;  // 热映的影片
        let soonFilm = `/v2/movie/coming_soon?start=${this.data.starNum}&count=12`; // 将要上映
        let top250 = `/v2/movie/top250?start=${this.data.starNum}&count=12`;
        
        console.log(api.requestSever);
        switch (options.title) {
            case "正在热播":
                console.log(`点击的是${options.title}`);
                api.requestSever(hotFilm).then(
                    (res) => {
                        console.log(res);
                        if (this.data.refreshOrLoad == 'refresh') {
                            this.setData({
                                'dataList.title': options.title,
                                'dataList.page': options.page,
                                'dataList.detail': res.data.subjects
                            });
                        } else {
                            this.setData({
                                'dataList.title': options.title,
                                'dataList.page': options.page,
                                'dataList.detail': this.data.dataList.detail.concat(res.data.subjects)
                            });
                        // this.data.dataList.detail.concat(res.data.subjects);
                        }
                    },
                    (rej) => {

                    }
                );
                break;
            case "即将上映":
                console.log(`点击的是${options.title}`);
                api.requestSever(soonFilm).then(
                    (res) => {
                        console.log(res);
                        if (this.data.refreshOrLoad == 'refresh') {
                            this.setData({
                                'dataList.title': options.title,
                                'dataList.page': options.page,
                                'dataList.detail': res.data.subjects
                            });
                        } else {
                            this.setData({
                                'dataList.title': options.title,
                                'dataList.page': options.page,
                                'dataList.detail': this.data.dataList.detail.concat(res.data.subjects)
                            });
                            // this.data.dataList.detail.concat(res.data.subjects);
                        }
                    },
                    (rej) => {

                    }
                );
                break;
            case "TOP3":
                console.log(`点击的是${options.title}`);
                api.requestSever(top250).then(
                    (res) => {
                        console.log(res);
                        if (this.data.refreshOrLoad == 'refresh') {
                            this.setData({
                                'dataList.title': options.title,
                                'dataList.page': options.page,
                                'dataList.detail': res.data.subjects
                            });
                        } else {
                            this.setData({
                                'dataList.title': options.title,
                                'dataList.page': options.page,
                                'dataList.detail': this.data.dataList.detail.concat(res.data.subjects)
                            });
                            // this.data.dataList.detail.concat(res.data.subjects);
                        }
                    },
                    (rej) => {

                    }
                );
                break;
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            headTitle: options
        });
        this.getData(options);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.headTitle.title
        });
    },
    /**
     * catch:tap ------跳转电影的详情页面
     */
    onFilmDetail(event) {
        wx.navigateTo({
            url: `../filmDetail/filmDetail?id=${event.currentTarget.dataset.id}`,
        })
    },
    /**
     * 滚动条触底,事件触发
     */
    scrollDown() {
        
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
    onPullDownRefresh: function (event) {
        this.data.refreshOrLoad = 'refresh';
        this.getData(this.data.headTitle);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.data.refreshOrLoad = 'load';
        this.data.starNum += 0;
        console.log('滚动条触底');
        this.getData(this.data.headTitle);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})