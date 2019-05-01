let requestSever = (url, data, methods) => {
    let baseUrl = `http://t.yushu.im${url}`;
    wx.showLoading({
        title: '加载中',
    });
    return new Promise((resolve, reject) => {
        wx.request({                            // 请求热搜
            url: baseUrl || '',
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
}
export default {
    requestSever: requestSever
};