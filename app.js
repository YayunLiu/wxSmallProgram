App({                       // 入口文件注入js
    globalData: {           // 存放变量的对象, 全局变量
        g_musie: true,
        baseUrl: 'http://t.yushu.im'    // 全局变量数据豆瓣地址
    },
    /**
     * 应用程序展示的时候
     */
    onshow() {
        console.log(`app.js入口 页面显示`)
    },
    /**
     * 隐藏到后台的时候
     */
    onHide() {
        
        console.log(`app.js入口 页面隐藏`);
    },
    /**
     * 应用程序的启动的时候
     */
    onLaunch() {

    }
})