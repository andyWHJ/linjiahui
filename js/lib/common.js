var width=$(window).width();
var height=$(window).height();
//取URL参数
function Request(strName) {
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for (var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");

		if (arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}

//返回APP首页
function gotoHome() {

	//用户登陆参数整合
	var localreqData = str2obj(window.localStorage.localreqData);
	//登录用户Id
	var loginUserId = localreqData.loginUserId;
	//校验字符串
	var checkStr = localreqData.checkStr;
	//是否是会员标识
	var isMember = localreqData.isMember;

	window.location.href = 'index.html?loginUserId=' + loginUserId + '&checkStr=' + checkStr + '&isMember=' + isMember;

}

$(".header").find(".left").on("click",function(){
    back();
})

$("footer").find("li").tap(function(){
    $("footer").find("i").animate({
        color:"#BEBEBE"
    },500,"easy-out");
    $(this).find("i").animate({
        color:"red"
    },500,"easy-out");
    location.href=$(this).attr("data-url");
})

function isLogin(){
    return (localStorage.getItem("loginUserId")!=null&&localStorage.getItem("checkStr")!=null&&localStorage.getItem("isMember")!=null)
}

function getLoginUserInfo(){
    return "&loginUserId=" + localStorage.getItem("loginUserId") + "&checkStr=" + localStorage.getItem("checkStr") + "&isMember=" + localStorage.getItem("isMember");
}


function str2obj(json) {
	return eval("(" + json + ")");
}

// 对象转字符串
function obj2str4DM(o, flag, replace) {
	var arr_start = "ARRAY_S";
	var arr_end = "ARRAY_E";
	if (flag == null) {
		flag = "\'";
		// 默认是双引号
	}
	if (replace == null) {
		replace = true;
	}
	var r = [];
	if ( typeof o == "string" || o == null) {
		return o;
	}
	// alert(typeof(o));
	if ( typeof o == "object") {
		// alert(o.sort);
		if (!o.sort) {
			// alert("in if");
			r[0] = "{";
			for (var i in o) {
				// alert(i+"="+o[i]);
				r[r.length] = flag;
				r[r.length] = i;
				r[r.length] = flag;
				r[r.length] = ":";
				r[r.length] = flag;
				r[r.length] = obj2str(o[i], flag, false);
				r[r.length] = flag;
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {// 数组元素
			r[0] = arr_start;
			for (var i = 0; i < o.length; i++) {
				r[r.length] = flag;
				r[r.length] = obj2str(o[i], flag, false);
				r[r.length] = flag;
				r[r.length] = ",";
			}
			r[r.length - 1] = arr_end;
		}

		var str = r.join("");
		// alert("结果:"+str);
		// 针对{} 就是没有属性的对象，会返回单个 },把它补齐
		if (str == "}") {
			str = "{}";
		}
		// 针对[] 就是长度为0的数组，会返回单个 ],把它补齐
		if (str == arr_end) {
			str = arr_start + arr_end;
		}

		if (replace) {// 在递归子循环中不替换,到最后统一替换
			// 替换掉 "{ }" "[ ]"
			var reg = new RegExp(flag + "{", "g");
			// 包含字符 "{
			str = str.replace(reg, "{");

			reg = new RegExp("}" + flag, "g");
			// 包含字符 }"
			str = str.replace(reg, "}");

			reg = new RegExp(flag + arr_start, "g");
			// 包含字符 "[
			str = str.replace(reg, "[");

			reg = new RegExp(arr_end + flag, "g");
			// 包含字符 ]"
			str = str.replace(reg, "]");

			// alert(str);

			if (str.indexOf(arr_start + "{") > -1) {
				reg = new RegExp(arr_start + "{", "g");
				str = str.replace(reg, "[{");
			}
			if (str.indexOf("}" + arr_end) > -1) {
				reg = new RegExp("}" + arr_end, "g");
				str = str.replace(reg, "}]");
			}
		}
		// alert("--"+str);
		return str;
	}
	return o.toString();
}

// 对象转字符串 地图专用
function obj2str(o, flag, replace) {
	var arr_start = "ARRAY_S";
	var arr_end = "ARRAY_E";
	if (flag == null) {
		flag = "\"";
		// 默认是双引号
	}
	if (replace == null) {
		replace = true;
	}
	var r = [];
	if ( typeof o == "string" || o == null) {
		return o;
	}
	// alert(typeof(o));
	if ( typeof o == "object") {
		// alert(o.sort);
		if (!o.sort) {
			// alert("in if");
			r[0] = "{";
			for (var i in o) {
				// alert(i+"="+o[i]);
				r[r.length] = flag;
				r[r.length] = i;
				r[r.length] = flag;
				r[r.length] = ":";
				r[r.length] = flag;
				r[r.length] = obj2str(o[i], flag, false);
				r[r.length] = flag;
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {// 数组元素
			r[0] = arr_start;
			for (var i = 0; i < o.length; i++) {
				r[r.length] = flag;
				r[r.length] = obj2str(o[i], flag, false);
				r[r.length] = flag;
				r[r.length] = ",";
			}
			r[r.length - 1] = arr_end;
		}

		var str = r.join("");
		// alert("结果:"+str);
		// 针对{} 就是没有属性的对象，会返回单个 },把它补齐
		if (str == "}") {
			str = "{}";
		}
		// 针对[] 就是长度为0的数组，会返回单个 ],把它补齐
		if (str == arr_end) {
			str = arr_start + arr_end;
		}

		if (replace) {// 在递归子循环中不替换,到最后统一替换
			// 替换掉 "{ }" "[ ]"
			var reg = new RegExp(flag + "{", "g");
			// 包含字符 "{
			str = str.replace(reg, "{");

			reg = new RegExp("}" + flag, "g");
			// 包含字符 }"
			str = str.replace(reg, "}");

			reg = new RegExp(flag + arr_start, "g");
			// 包含字符 "[
			str = str.replace(reg, "[");

			reg = new RegExp(arr_end + flag, "g");
			// 包含字符 ]"
			str = str.replace(reg, "]");

			// alert(str);

			if (str.indexOf(arr_start + "{") > -1) {
				reg = new RegExp(arr_start + "{", "g");
				str = str.replace(reg, "[{");
			}
			if (str.indexOf("}" + arr_end) > -1) {
				reg = new RegExp("}" + arr_end, "g");
				str = str.replace(reg, "}]");
			}
		}
		// alert("--"+str);
		return str;
	}
	return o.toString();
}


function trim(string) {
	return string.replace(/(^\s*)|(\s*$)/g, '');
}

//上一页or下一页
function showOrHide(currentPage, totalPage) {
	if (totalPage == 1) {
		$("#dis-prev").show();
		$("#dis-next").show();

		$("#prev").hide();
		$("#next").hide();
	} else if (currentPage == 1) {
		$("#dis-prev").show();
		$("#next").show();

		$("#prev").hide();
		$("#dis-next").hide();
	} else if (currentPage == totalPage) {
		$("#prev").show();
		$("#dis-next").show();

		$("#dis-prev").hide();
		$("#next").hide();
	} else {
		$("#prev").show();
		$("#next").show();

		$("#dis-prev").hide();
		$("#dis-next").hide();
	}
}

function validatePhoneNum(phoneNum) {
	var myreg = /^(((13[0-9]{1})|14[0-9]{1}|15[0-9]{1}|18[0-9]{1})+\d{8})$/;
	return myreg.test(phoneNum);
}

function validateEmailAddress(emailAddress) {
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	return reg.test(emailAddress);
}

function validateRealName(realName) {
	if (realName.length > 0 && realName.length <= 100) {
		return true;
	} else {
		return false;
	}
}

function validateidentityNum(identityNum) {
	var reg = /([1-6]\d{5}(19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}[0-9xX])|([1-6]\d{5}\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3})/;
	return reg.test(identityNum);
}

/**
 * 验证数字会员卡合法性(8位数字)
 * @param request
 * digitalCard 数字会员卡
 * @param response
 * 如果符合,返回true
 * 如果不符合,返回false
 */
function validateDigitalCard(digitalCard) {
	if (!isNumber(digitalCard)) {
		return false;
	}
	if (digitalCard.length != 8) {
		return false;
	}
	return true;
}

/**
 * The isNumber method of the paramValidate.
 * 判断传入的是不是数字
 * @param request
 * string 字符串
 * @param response
 * 如果符合,返回true
 * 如果不符合,返回false
 */
function isNumber(str) {
	if (str == null || str == "")
		return false;
	for (var i = 0; i < str.length; i++) {
		var cI = str.charAt(i);
		if (cI < '0' || cI > '9')
			return false;
	}
	return true;
}

//跳转到网站首页
function back_index() {
	window.ljhWebview.back();
}

//跳转到商品全部分类列表
function skipTocategoryList() {
	window.location.href = '/html/shop/categoryList.html';
}

//跳转商品搜索页
function skipToProductSearch() {
	window.location.href = '../search/productSearchList.html';
}

//跳转积分商品搜索页
function skipToScoreSearch() {
	window.location.href = '../search/productScoreSearchList.html';
}

//跳转促销信息搜索页
function skipToPromotionSearch() {
	window.location.href = '../search/promotionSearchList.html';
}

//跳转搜索主页
function skipToIndexSearch() {
	window.location.href = '../search/index.html.html';
}

//跳转会员中心页面
function skipToMemberCenter() {
	window.location.href = '../memberCenter/memberCenter.html';
}

//删除收藏商品
function deleteFavouriteProduct() {
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	$("#favourite").css("left", (document.body.scrollWidth - parseInt($("#favourite").css("width"))) / 2);
	$("#favourite").show();
	$("#_mask").show();
	$("#ok").bind('click', function(event) {
		$("input:checked").each(function(index) {
			var productId = $(this).val();
			cancelCareProduct(productId);
		});
		$("#favourite").hide();
		$("#_mask").hide();
	});
	$("#cancel").bind('click', function(event) {
		$('#favourite').hide();
		$('#_mask').hide();
		$(":checkbox").attr("checked", null);
	});
}

//删除收藏积分商品
function deleteFavouriteScore() {
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	$("#favourite").css("left", (document.body.scrollWidth - parseInt($("#favourite").css("width"))) / 2);
	$("#favourite").show();
	$("#_mask").show();
	$("#ok").bind('click', function(event) {
		$("input:checked").each(function(index) {
			var scoreExchangeId = $(this).val();
			cancelCareScoreProduct(scoreExchangeId);
		});
		$("#favourite").hide();
		$("#_mask").hide();
	});
	$("#cancel").bind('click', function(event) {
		$('#favourite').hide();
		$('#_mask').hide();
		$(":checkbox").attr("checked", null);
	});
}

//删除收藏促销信息
function deleteFavouritePromotion() {
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	$("#favourite").css("left", (document.body.scrollWidth - parseInt($("#favourite").css("width"))) / 2);
	$("#favourite").show();
	$("#_mask").show();
	$("#ok").bind('click', function(event) {
		$("input:checked").each(function(index) {
			var promotionId = $(this).val();
			cancelPromotion(promotionId);
		});
		$("#favourite").hide();
		$("#_mask").hide();
	});
	$("#cancel").bind('click', function(event) {
		$('#favourite').hide();
		$('#_mask').hide();
		$(":checkbox").attr("checked", null);
	});
}

var browser = {
	versions : function() {
		var u = navigator.userAgent.toLowerCase();
		return {//移动终端浏览器版本信息
			android : u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或uc浏览器
			iPhone : u.indexOf('iphone') > -1, //是否为iPhone或者QQHD浏览器
		};
	}()
}
//判断网络是否连通
function checkNetWorkState() {
	if (browser.versions.iPhone) {
		return navigator.onLine;
	} else if (browser.versions.android) {
		return navigator.onLine;;
	}else{
		return true;
	}
}

//IOS调用此方法，将网络状态写入本地数据库。 参数为boolean类型       true:有网络  false:无网络
function setNetWorkState(value) {
	var status = true;
	if(value == 0){
		status = false;
	}
	window.localStorage.setItem("netWorkState", status);
}

//登陆成功
function loginSuccessed(data, s) {
	if (browser.versions.iPhone) {
		window.location.href = "login://m.v2/fun=loginSuccessed:&param1=" + s;
	} else if (browser.versions.android) {
		window.ljhWebview.loginSuccessed(obj2str(data));
		//请求登录接口成功后的JSON字符串
	}
}

//注册成功   打开注册页面 以URL开始
function registerSuccessed(data, s) {
	if (browser.versions.iPhone) {
		window.location.href = "login://m.v2/fun=registerSuccessed:&param1=" + s;
	} else if (browser.versions.android) {
		window.ljhWebview.registerSuccessed(obj2str(data));
		//请求注册接口成功后的JSON字符串
	}
}

//打开广开
function showAd(locator) {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=showAd:&param1=" + locator;
	} else if (browser.versions.android) {
		window.ljhWebview.showAd(locator);
	}
}

//用户注销
function syslogout() {
	if (browser.versions.iPhone) {
		window.location.href = "login://m.v2/fun=logout"
	} else if (browser.versions.android) {
		window.ljhWebview.logout();
	}
}

//登录
function goLogin() {
	if (browser.versions.iPhone) {
		window.location.href = "login://m.v2/fun=goLogin";
	} else if (browser.versions.android) {
		window.ljhWebview.goLogin();
	}
}

//关闭当前界面方法， 如果是tabbar 根界面，不用做任何响应，否则，pop当前界面
function closePage(s) {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=close:&param1=" + s;
	} else if (browser.versions.android) {
		window.ljhWebview.close();
	}
}

//获取经纬度
function getLongtitudeAndLatitudeStr() {
	if (browser.versions.iPhone) {
		var longtitude = Request("longtitude");
		var latitude = Request("latitude");
		return "longtitude=" + longtitude + "&latitude=" + latitude;
	} else if (browser.versions.android) {
		return window.ljhWebview.getCoordinateStr();
	}
}

function setLongtitudeAndLatitudeStr(longtitude, latitude) {
	window.localStorage.setItem("longtitude", longtitude);
	window.localStorage.setItem("latitude", latitude);
}

//打开详情页  root
function toDetail(locator, name) {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=showDetail:withURL:&param1=" + name + "&param2=" + locator;
	} else if (browser.versions.android) {
		window.ljhWebview.showDetail(locator, name);
		//传参：String url, String title
	}
}

//分享
function share(message) {
	if (browser.versions.iPhone) {
		window.location.href = "objc://m.v2/fun=socialShare:withUrl:&param1=" + message;
	} else if (browser.versions.android) {
		window.ljhWebview.share(message);
	}
}

function storageVisitor(loginUserId, checkStr, isMember) {
	if (browser.versions.iPhone) {
		window.localStorage.setItem("loginUserId", loginUserId);
		window.localStorage.setItem("checkStr", checkStr);
		window.localStorage.setItem("isMember", isMember);
	} else if (browser.versions.android) {
		window.localStorage.setItem("loginUserId", loginUserId);
		window.localStorage.setItem("checkStr", checkStr);
		window.localStorage.setItem("isMember", isMember);
		window.ljhWebview.setSharedPreferencesValue("UserId", loginUserId);
		//add
		window.ljhWebview.setSharedPreferencesValue("Token", checkStr);
		//add
		window.ljhWebview.setSharedPreferencesValue("IsMember", isMember);
		//add
	}
}

function clearFeedback() {
	window.localStorage.removeItem("feedback");
	window.localStorage.removeItem("phoneOrEmail");
}

//获取设备号
function getDeviceNum() {
	if (browser.versions.iPhone) {
		return window.localStorage.getItem("deviceNum");
	} else if (browser.versions.android) {
		return window.ljhWebview.getDeviceNum() + "";
	}
}

//IOS调用此方法，将设备号写入本地数据库。
function setDeviceNum(deviceNum) {
	window.localStorage.setItem("deviceNum", deviceNum);
}

//弃用
function goUserStr_m() {
	if (browser.versions.iPhone) {

	} else if (browser.versions.android) {
		window.ljhWebview.goUserStr_m();
	}
}

//传标题界面   广告
function showAdWithTitle(uri, title) {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=showAdWithTitle:withURL:&param1=" + uri + "&param2=" + title;
	} else if (browser.versions.android) {
		window.ljhWebview.showAdWithTitle(uri, title);
		//传参：String url,String title
	}
}

//修改密码
function changePassword() {
	if (browser.versions.iPhone) {
		window.location.href = "login://m.v2/fun=changePassWord"
	} else if (browser.versions.android) {
		window.ljhWebview.changePassword();
	}
}

//退出APP掉用此方法。
function setUserPointStatus() {
	window.localStorage.setItem("userPointStatus", true);
}

//获取本地存储的值。
function getLocalValue(key) {
	if (browser.versions.iPhone) {
		var value = Request(key)
		if (value == '') {
			value = window.localStorage.getItem(key);
		};
		return value;
	} else if (browser.versions.android) {
		return window.ljhWebview.getSharedPreferencesValue(key) + "";
	}
}

//将数据存储在本地
function setLocalvalue(key, value) {
	if (browser.versions.iPhone) {
		window.localStorage.setItem(key, value);
	} else if (browser.versions.android) {
		window.ljhWebview.setSharedPreferencesValue(key, value);
	}
}

//获取本地存储的用户信息。
function getLocalUserValue(key) {//
	if (browser.versions.iPhone) {
		var value = Request(key)
		if (value == '') {
			value = window.localStorage.getItem(key);
		};
		return value;
	} else if (browser.versions.android) {
		return window.ljhWebview.getUserSharedPreferencesValue(key) + "";
	}
}

//注册协议
function goProtocolActivity() {
	if (browser.versions.iPhone) {
		window.location.href = "login://m.v2/fun=goProtocolActivity";
	} else if (browser.versions.android) {
		window.ljhWebview.goProtocolActivity();
	}
}

//弃用
function promotionShowLayout() {
	if (browser.versions.iPhone) {

	} else if (browser.versions.android) {
		window.ljhWebview.showLayout("true");
		//显示移动框
	}
}

//切换收藏图标
function promotionShowIcon(favored) {
	if (browser.versions.iPhone) {
		window.location.href = "objc://m.v2/fun=showIcon:&param1=" + favored;
	} else if (browser.versions.android) {
		window.ljhWebview.showIcon(favored + "");
	}
}

//门店列表点击返回地图
function goMapDetail(obj) {
	if (browser.versions.iPhone) {
		window.location.href = "objc://m.v2/fun=mapDetail:url:&param1=" + obj2str(obj);
	} else if (browser.versions.android) {
		window.ljhWebview.setMaker(obj2str(obj));
	}
}

//获取网络类型
function getNetType() {
	if (browser.versions.iPhone) {
		return window.localStorage.getItem("netType");
	} else if (browser.versions.android) {
		return window.ljhWebview.getNetType();
	}
}

//IOS调用此方法，将网络类型写入本地数据库。 参数为String类型       有以下3中：wifi，3g，2g
function setNetType(value) {
	window.localStorage.setItem("netType", value);
}

//打开新样式促销界面  促销
function showBottombarDetail(url, title, message) {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=showBottombarDetail:withTitle&param1=" + url + "&param2=" + title+ "&param3=" + message;
	} else if (browser.versions.android) {
		window.ljhWebview.showBottombarDetail(url, title);
	}
}

//跳转到会员卡中心
function goMemberCenter(){
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=goMemberCenter";
		//"memberCenter.html";
	} else if (browser.versions.android) {
		window.ljhWebview.goMemberCenter();
	}
}
//跳转到会员卡中心
function cardLoginGoMemberCenter(obj) {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=goMemberCenter:&param1="+obj;
		//"memberCenter.html";
	} else if (browser.versions.android) {
		window.ljhWebview.goMemberCenter();
	}
}

//跳转到错误页
function goError() {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=goErrorHtml";
	} else if (browser.versions.android) {
		window.ljhWebview.goErrorHtml()
	}
}

//弃用
function showLoading() {
	if (browser.versions.iPhone) {

	} else if (browser.versions.android) {
		window.ljhWebview.showLoading();
	}
}

//弃用
function cancelLoading() {
	if (browser.versions.iPhone) {

	} else if (browser.versions.android) {
		window.ljhWebview.cancelLoading();
	}
}

//首页点击会员中心跳转
function homeTomember() {
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=goMemberCenter";
	} else if (browser.versions.android) {
		window.ljhWebview.goLogin();
	}
}

//到收藏页
function toFavorite() {
	if (browser.versions.iPhone) {
		window.location.href = "../../html/memberCenter/favoritePromotionList.html";
	} else if (browser.versions.android) {
		var locator = domain + "/html/memberCenter/favoritePromotionList.html";
		toDetail(locator, "我的收藏");
	}
}

function goDeviceParameters() {
	if (browser.versions.iPhone) {
		return window.localStorage.getItem("deviceParameters");
	} else if (browser.versions.android) {
		return window.ljhWebview.goDeviceParameters();
	}
}

//IOS调用，将注册和登录时候需要的额外参数写到本地
function setDeviceParameters(value){
	window.localStorage.setItem("deviceParameters",value);
}
function callBackMessage(message, callBack) {
	$("#bgDiv").show();
	var messageHtml = "<div class='alert-message'><div class='message'><span id='title'>" + message + "</span></div><div class='cp-lnk'><a id='ok' href='javascript:void(0)'>确定</a></div></div></div>";
	var bgDiv="<div id='bgDiv' style='position: absolute;top: 0px; background-color: rgb(119, 119, 119); opacity: 0.6; left: 0px; width: 100%; height: 100%; z-index.html: 10000; background-position: initial initial; background-repeat: initial initial;'></div>";
	if ($(".alert-message").length > 0) {
		$("#title").html(message);		
	} else {
		$("body").append(messageHtml);
	}
	if ($("#bgDiv").length > 0) {
		$("#bgDiv").show();		
	} else {
		$("body").append(bgDiv);
	}
	$(".alert-message").css("left", (document.body.scrollWidth - parseInt($(".alert-message").css("width"))) / 2);
	$("#ok").unbind().bind('click', function(event) {
		$(".alert-message").remove();
		$("#bgDiv").hide();
		if (callBack!=null) {
			callBack();
		};
	});
}
function replacePic(pic, size) {
	return pic.replace("/b/", "/" + size + "/");
}
var getBytes= function (str){ 
    var len = str.length; 
    var bytes = len; 
    for(var i=0; i<len; i++){ 
        if (str.charCodeAt(i) > 255) bytes++; 
    } 
    return bytes; 
};
allStoreage= getBytes(function(){ 
    var str=""; 
    for(var i=0, l=window.localStorage.length; i<l; i++){ 
        str+=window.localStorage.getItem(window.localStorage.key(i)); 
    }    
    return str; 
}()); 
function getAllStorage(){
	return ((allStoreage)/(1024*1024)).toFixed(2)?0.00:0;
}
function callPhone(phoneNum){
	if (browser.versions.iPhone) {
	} else if (browser.versions.android) {
		window.ljhWebview.callPhone(phoneNum);
	}
}
function dmMsgInfoPage(uri, title){
	if (browser.versions.iPhone) {
		window.location.href = "page://m.v2/fun=showAdWithTitle:withURL:&param1=" + uri + "&param2=" + title;
	} else if (browser.versions.android) {
		window.ljhWebview.dmMsgInfoPage(uri, title);
	}
}
function hideBody(){
	 $("body").hide();
}