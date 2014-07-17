//访问平台
var from = "native";
var debug = false;
var doubleClickTime = 300;

//设备ID

/**
 * The ajaxRequest method of the ajaxRequest.
 * 与服务器端的接口进行交互
 *
 * @param request
 * cacheObj 缓存中的名称
 * action 请求的action名称
 * reqData 请求的参数名称及值
 * successCallback 交互成功回调
 * errorCallback  交互失败回调
 * isConfirmError 是否需要弹出网络连接错误提示框
 * @param response
 * 接收服务器返回以后回调指定的方法
 */
function ajaxRequest(cacheObj,url, reqData, successCallback, errorCallback,loginCallback,isNeedLogin) {
    reqData+="&from=native";
    if(isNeedLogin){
        if(!isLogin()){
            if(loginCallback==null){
                location.href="../../html/memberCenter/memberCenter.html";
            }else{
                loginCallback();
                return;
            }
        }else{
            reqData+=getLoginUserInfo();
        }

    }

     url += reqData;
    console.log(url)
    try {
        var request = $.ajax({
            type:"GET",
            url: url,
            dataType: "jsonp",
            jsonp: "callbackparam", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            success: function (returnData) {
              // console.log(obj2str(returnData))
                window.localStorage.setItem(cacheObj,obj2str(returnData));
                successCallback()
            },
            error: function (xhr,errorType , error) {
                errorCallback();
            }
        });
    } catch (err) {
        console.log(err);
    }
}
