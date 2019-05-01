class UserInfo{
    constructor() {
        this.authSetting = '';
    }

    getSetting() {  // 获取---用户是否授权
        wx.getSetting({
            success: (res) => {
                console.log(res.authSetting);
                this.authSetting = res.authSetting;
                if (JSON.stringify(this.authSetting) == "{}") {
                        // 调用---引导用户授权
                } else {
                    return true;
                }
            }
        })
    }

    openSetting() {
        wx.openSetting({
            success(res) {
                console.log(res.authSetting)
                // res.authSetting = {
                //   "scope.userInfo": true,
                //   "scope.userLocation": true
                // }
            }
        })
    }
}
let userInfo = new UserInfo();

export default {
    userInfo: userInfo
};