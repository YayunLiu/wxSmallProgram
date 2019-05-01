// pages/film/film.js
let app = getApp();
import api from '../../util/api.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filmBox: true,
        searchFilm: false,
        searchText: '',
        hotFilmData: {
            title: '正在热播',
            detail: {
            }
        },
        soonFilmData: {
            title: '即将上映',
            detail: {
            }
        },
        top250Data: {
            title: 'TOP3',
            detail: {
            }
        },
        searchData: {
            title: '搜索',
            detail: {
            }
        }
    },
    /**
     * 封装请求 服务器的方法
     */
    requestServer(url, data, methods) {
        wx.showLoading({
            title: '加载中',
        });
        return new Promise((resolve, reject) => {
            wx.request({                            // 请求热搜
                url: `http://t.yushu.im${url}`,
                data: data || '',
                header: {
                    "Conten-Type": "application/xml"
                },
                method: methods || "GET",
                success: (res) => {
                    wx.hideLoading();
                    resolve(res);
                },
                fail: (res) => {
                    wx.hideLoading();
                    reject(res);
                },
                complete: (res) => {

                }
            })
        });
    },
    /**
     * 过滤名字长度
     */
    filterLength(dataList) {
        let tmp = dataList;
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].title = tmp[i].title.substring(0, 6);
        };
        return tmp;
    },
    /**
     * 查询电影输入框---获取焦点
     */
    onBindFocus(event) {
        console.log('input获取焦点');
        console.log(event);
        this.setData({
            searchFilm: true,
            filmBox: false,
        });
    },
    /**
     * 进入电影详情页面
     */
    onFilmDetail(event) {
        console.log(event.currentTarget.dataset.id);
        wx.navigateTo({
            url: `./filmDetail/filmDetail?id=${event.currentTarget.dataset.id}`,
        })
    },
    /**
     * 查询电影输入框---失去焦点调用接口查询
     */
    bindblur(event) {
        console.log('input失去焦点');
        let tmp = event.detail.value;
        let searchUrl = `/v2/movie/in_theaters?q=${tmp}`;
        console.log(tmp);
        api.requestSever(searchUrl).then(
            (res) => {
                console.log(res);
                this.setData({
                    'searchData.detail': res.data.subjects.slice(0, 3)
                });
            },
            (rej) => {

            }
        );
    },
    /**
     * 隐藏电影查询框
     */
    hideSearchFilm() {
        this.setData({
            searchFilm: false,
            filmBox: true,
            'searchData.detail': '',
            searchText: ''
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let hotFilm = "/v2/movie/in_theaters";  // 热映的影片
        let soonFilm = "/v2/movie/coming_soon"; // 将要上映
        let top250 = "/v2/movie/top250";
        this.requestServer(hotFilm).then(   // 请求热映影片
            (res) => {
                this.setData({
                    'hotFilmData.detail': res.data.subjects.slice(0, 3)
                });
            },
            (rej) => {
            }
        );
        this.requestServer(soonFilm).then(  // 请求将要上映的
            (res) => {
                this.setData({
                    'soonFilmData.detail': res.data.subjects.slice(12, 15)
                });
            }
        );
        this.requestServer(top250).then(
            (res) => {
                this.setData({
                    'top250Data.detail': this.filterLength(res.data.subjects.slice(6, 9))
                });
                console.log(this.data.top250Data.detail);
            },
            (rej) => {

            }
        );
    },
    onFilmMoreTo(event) {
        wx.navigateTo({
            url: `./filmMore/filmMore?title=${event.currentTarget.dataset.title}&page=主页`
        })
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

    }
})