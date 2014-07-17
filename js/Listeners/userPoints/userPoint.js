//用户登陆参数整合
/*var localreqData = str2obj(window.localStorage.localreqData);

if (localreqData == null) {
var checkStr = window.localStorage.checkStr;
var loginUserId = window.localStorage.loginUserId;
var isMember = window.localStorage.isMember;
//用户登陆参数定义
//var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
//将用户信息写入到本地数据库
var localreqData = {
"loginUserId" : loginUserId,
"checkStr" : checkStr,
"isMember" : isMember
};
window.localStorage.setItem("localreqData", obj2str(localreqData));
} else {
//登录用户Id
var loginUserId = localreqData.loginUserId;
//校验字符串
var checkStr = localreqData.checkStr;
//是否是会员标识
var isMember = localreqData.isMember;
}*/
//固定箭头

var userPointsListPage = 1;
var userPointsListCacheName = "userPointsListCacheName";
var scoreCategoryCacheName = "scoreCategoryCacheName";
$(document).ready(function() {
	//userPointsListCacheName = "userPointsListCacheName";
	//window.localStorage.setItem("userPointsCategoryId", 1);
	if (window.localStorage.getItem(scoreCategoryCacheName) == null) {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshcategoryData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshcategoryData();
		} else {
			//将缓存中的数据渲染到页面中
			categorySuccess();
		}

	}
	
	/*if ((getLocalValue("userPointStatus")) == 'false') {

	} else {
		if (window.localStorage.getItem("userInfoPoint") == null) {
			if (true) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshUserInfoPoint();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
		} else {
			if (true) {
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshUserInfoPoint();
			} else {
				//将缓存中的数据渲染到页面中
				userInfoPointSuccess();
			}
		}
	}*/

})
function refreshUserInfoPoint() {
	var loginUserId = getLocalUserValue("loginUserId");//add
   	var checkStr = getLocalUserValue("checkStr");//add
	var isMember = getLocalUserValue("isMember");//add
	ajaxRequest("userInfoPoint", userInfoUrl, "&loginUserId=" + loginUserId +"&checkStr="+checkStr+"&isMember="+isMember, null, userInfoPointSuccess, userInfoPointError, false);
}

function userInfoPointSuccess() {
	var returnData = str2obj(window.localStorage.getItem("userInfoPoint"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var data = returnData.data;
		var point = data.userForm.userInfo.point;
		if (point==undefined) {
			point=0;
		};
		var pointHtml = '<div id="_mask" onclick="$(this).hide();setLocalvalue(\'userPointStatus\',false)" style="background: #FFF6E5 url(../../images/icon_30.png) right center no-repeat no-repeat;text-align:center;position:fixed;left:0px;bottom:0;line-height:40px;width:100%;height:40px;z-index.html:9998;">账户积分余额：' + point + '</div>';
		$("body").append(pointHtml);
	}
}

function userInfoPointError() {

}

function refreshcategoryData() {
	ajaxRequest(scoreCategoryCacheName, userPointcategoryListUrl, "", null, categorySuccess, categoryError, false);
}

function categorySuccess() {
	var returnData = str2obj(window.localStorage.getItem(scoreCategoryCacheName));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var leftHtml='<div style="float: left;border-bottom: 2px solid #d1ccc8;background:#f9f9f9;height:40px;" ><img src="../../images/navigation_left_press.png" height="40px" width="32px" id="left"></div>';
		var rightHtml='<div style="float: right;border-bottom: 2px solid #d1ccc8;background:#f9f9f9;height:40px;"><img src="../../images/navigation_right.png" height="40px" width="32px" id="right"></div>';
		$("#topBar").prepend(leftHtml+rightHtml);
		var message = returnData.data;
		var userDMListHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.list;
		if (resultList == null) {
			$("#category").html("");
			window.localStorage.removeItem(scoreCategoryCacheName);
			return;
		};
		if (resultList.length == 0) {
			$("#category").html("");
			window.localStorage.removeItem(scoreCategoryCacheName);
			return;
		}
		var categoryHTML = '';
		for (var i = 0; i < returnData.data.list.length; i++) {
			var Name = returnData.data.list[i].name;
			var categoryId = returnData.data.list[i].id;
			if (i == 0) {
				categoryHTML += '<li class="tab-li ohter on" id="first" ><a href="javascript:;" name="' + categoryId + '">' + Name + '</a></li>';
				window.localStorage.setItem("userPointsCategoryId", categoryId);
				if (window.localStorage.getItem(userPointsListCacheName + "_" + categoryId + "_" + 1) == null) {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshuserPointsData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshuserPointsData();
		} else {
			//将缓存中的数据渲染到页面中
			userPointsListSuccess();
		}

	}
			} else if (i == returnData.data.list.length - 1) {
				categoryHTML += '<li class="tab-li ohter " id="last" ><a href="javascript:;" name="' + categoryId + '">' + Name + '</a></li>';
			} else {
				categoryHTML += '<li class="tab-li ohter"><a href="javascript:;"  name="' + categoryId + '">' + Name + '</a></li>';
			}
		};
		categoryHTML += '';
		$("#categoryList").html(categoryHTML);
		var imgWidth = $(".img-li").length * 32;
		var liwidth = $(".ohter").length * 85.3;
		var ulwidth = imgWidth + liwidth;
		$(".scroll_ul").width(ulwidth);

		$("#categoryList>li>a").bind('click', function(event) {
			if ($(this).attr("class") != 'on') {
				$("#categoryList>li").removeClass('on');
				$(this).parent().addClass("on");
			};
			var leftPicDivHTML = '<div class="outDiv" id="leftPic"></div>';
			var rightPicDivHTML = '<div class="outDiv" id="rightPic"></div>';
			$("#dataList").html(leftPicDivHTML + rightPicDivHTML);
			var categoryId = $(this).attr("name");
			window.localStorage.setItem("userPointsCategoryId", categoryId);
			userPointsListPage = 1;
			if (window.localStorage.getItem(userPointsListCacheName + "_" + categoryId + "_" + userPointsListPage) == null) {
				if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshuserPointsData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
			} else {
				if (checkNetWorkState()) {
					//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
					refreshuserPointsData();
				} else {
					//将缓存中的数据渲染到页面中
					userPointsListSuccess();
				}

			}
		});
	}
}

function categoryError() {

}

function refreshuserPointsData() {
	var categoryId = window.localStorage.getItem("userPointsCategoryId");
	ajaxRequest(userPointsListCacheName + "_" + categoryId + "_" + userPointsListPage, listByCategoryUrl, "categoryId=" + categoryId + "&condition.curPage=" + userPointsListPage, userPointsListPage, userPointsListSuccess, userPointsListError, false);
}

function userPointsListSuccess() {
	var length = 9;
	var width = $(window).width();
	if (width < 400) {
		length = 9;
	} else if (width < 640) {
		length = 14;
	}
	var categoryId = window.localStorage.getItem("userPointsCategoryId");
	var returnData = str2obj(window.localStorage.getItem(userPointsListCacheName + "_" + categoryId + "_" + userPointsListPage));
	if (returnData.data.page.result != "") {
		$("#topBar").css("position", "fixed");
		var Detail = '';
		for (var i = 0; i < returnData.data.page.result.length; i++) {
			var Name = returnData.data.page.result[i].title;
			var imageUrl = returnData.data.page.result[i].pictureUrl;
			var score = returnData.data.page.result[i].score;
			var id = returnData.data.page.result[i].id;
			var remainDay = returnData.data.page.result[i].remainDay;
			imageUrl = imageUrl.replace("/b/", "/80/80/");
			if (i == 0) {
				Detail += '<a href="javascript:toScoreProductDetail(' + id + ',\'' + Name + '\');"><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;margin-top: -6px;margin-right: 6px;padding:6px 0px;">';
				Detail += '<table cellspacing="0" cellpadding="0" class="tab" width="95%"><tbody><tr>';
				Detail += '<td class="p-img" style="float:none;padding-left:16px;" width="80px">';
				if (window.localStorage.getItem(imageUrl) != undefined && window.localStorage.getItem(imageUrl) != 'undefined') {
					var obj = window.localStorage.getItem(imageUrl);
					var imageBase64 = obj;
					Detail += '<img src="data:image/png;base64,' + imageBase64 + '" alt="" height="80" width="80"/></td>';
				} else {
					//如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
					if (window.localStorage.getItem("pic") == null) {
						window.localStorage.setItem("pic", imageUrl);
					} else {
						window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + imageUrl);
					}
					Detail += '<img src="' + imageUrl + '" alt="" height="80" width="80"/></td>';
				}
				if (Name.length > length) {
				Detail += '<td  valign="top" class="text"><div class="p-name" style="#3C3C3C;font-size: 0.875em;;line-height: 44px">' + Name.substring(0, length) + '...</div>';
			} else {
				Detail += '<td  valign="top" class="text"><div class="p-name" style="#3C3C3C;font-size: 0.875em;;line-height: 44px">' + Name + '</div>';
			}
				//Detail += '<td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br/>';
				Detail += '<div style="float:left;"> <font class="up-detail" color="red" style="font-family:Arial;font-weight:bold">剩余' + remainDay + '天</font></div> <div class="test" style="padding-left:' + 0.4 * $(window).width() + 'px;"> <font class="up-detail" color="red" style="font-family:Arial;font-weight:bold">积分：' + score + '</font> </div></td></tr></tbody></table></div> </a>';
			} else {
				Detail += '<a href="javascript:toScoreProductDetail(' + id + ',\'' + Name + '\');"><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;padding:6px 0 6px 0;">';
				Detail += '<table cellspacing="0" cellpadding="0" class="tab" width="95%"><tbody><tr>';
				Detail += '<td class="p-img" style="float:none;padding-left:16px;" width="80px">';
				if (window.localStorage.getItem(imageUrl) != undefined && window.localStorage.getItem(imageUrl) != 'undefined') {
					var obj = window.localStorage.getItem(imageUrl);
					var imageBase64 = obj;
					Detail += '<img src="data:image/png;base64,' + imageBase64 + '" alt="" height="80" width="80"/></td>';
				} else {
					//如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
					if (window.localStorage.getItem("pic") == null) {
						window.localStorage.setItem("pic", imageUrl);
					} else {
						window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + imageUrl);
					}
					Detail += '<img src="' + imageUrl + '" alt="" height="80" width="80"/></td>';
				}
				if (Name.length > length) {
				Detail += '<td  valign="top" class="text"><div class="p-name" style="#3C3C3C;font-size: 0.875em;;line-height: 44px">' + Name.substring(0, length) + '...</div>';
			} else {
				Detail += '<td  valign="top" class="text"><div class="p-name" style="#3C3C3C;font-size: 0.875em;;line-height: 44px">' + Name + '</div>';
			}
			//	Detail += '<td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br/>';
				Detail += '<div style="float:left;"> <font class="up-detail" color="red" style="font-family:Arial;font-weight:bold">剩余' + remainDay + '天</font></div> <div class="test" style="padding-left:' + 0.4 * $(window).width() + 'px;"> <font class="up-detail" color="red" style="font-family:Arial;font-weight:bold">积分：' + score + '</font> </div></td></tr></tbody></table></div> </a>';
			}
		}
	} else {
		$("#topBar").css("position", "relative");
		var Detail = '<div class="t-lists"><div class="refill tc" style="margin-top:200px">此分类下还没有商品，<a href=index.html.html>点我回列表</a><div></div>';

	}
	$("#categoryListDetail").html(Detail);
	if (width < 400) {
		$(".up-detail").css("font-size","0.84em");
		$(".test").css("padding-left",0.28 * $(window).width()+"px");
	}
	storePic();
}

function userPointsListError() {

}

function toScoreProductDetail(id,name) {
	//window.localStorage.setItem("scoreExchangeId",id)
	setLocalvalue("scoreExchangeId", id);
	var locator = domain + "/html/userPoints/productDeatil.html"
	toDetail(locator,name);
}

//积分商品分类数据获取
// function userPointcategoryList() {
// var action = userPointcategoryListUrl;
// var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
// var name = "userPointcategoryList";
// console.log(action);
// ajaxJson(name, action, reqData, userPointcategoryListpage);
// }

//商品分类渲染
// function userPointcategoryListpage() {
// var returnData = str2obj(window.localStorage.userPointcategoryList);
// var categoryHTML = '';
// for (var i = 0; i < returnData.data.list.length; i++) {
// var Name = returnData.data.list[i].name;
// var categoryId = returnData.data.list[i].id;
// if (i == 0) {
// categoryHTML += '<li class="tab-li ohter on" id="first"><a href="javascript:;" name="' + categoryId + '">' + Name + '</a></li>';
// }else if (i==returnData.data.list.length-1) {
// categoryHTML += '<li class="tab-li ohter " id="last"><a href="javascript:;" name="' + categoryId + '">' + Name + '</a></li>';
// }else{
// categoryHTML += '<li class="tab-li ohter"><a href="javascript:;"  name="' + categoryId + '">' + Name + '</a></li>';
// }
// };
// categoryHTML += '';
// $("#categoryList").html(categoryHTML);
// var imgWidth = $(".img-li").length * 32;
// var liwidth = $(".ohter").length *85.3;
// var ulwidth = imgWidth + liwidth;
// $(".scroll_ul").width(ulwidth);
//
// $("#categoryList>li>a").bind('click', function(event) {
// if ($(this).attr("class") != 'on') {
// $("#categoryList>li").removeClass('on');
// $(this).parent().addClass("on");
// };
// var leftPicDivHTML = '<div class="outDiv" id="leftPic"></div>';
// var rightPicDivHTML = '<div class="outDiv" id="rightPic"></div>';
// $("#dataList").html(leftPicDivHTML + rightPicDivHTML);
// var categoryId = $(this).attr("name");
// window.localStorage.setItem("userpointsCategoryId", categoryId);
// userpointsListPage = 1;
// refreshuserpointsData();
// });
//

//
// var Detail = '<div class="new-service"><div class="new-serv-lst new-p-re"><ul class="new-tbl-type" id="func" style="position:absolute;margin-left:0px" ontouchstart="touchstart(event)" ontouchmove="touchmove(event);" ontouchend="touchend(event);"><li class="new-tbl-cell"><div><img src="../../img/navigation_left_press.png">';
// for (var i = 0; i < returnData.data.list.length; i++) {
//
// if ((i + 1) % 4 != 0) {
// var Name = returnData.data.list[i].name;
// var id = returnData.data.list[i].id;
// Detail += '<a href="index.html.html?categoryId=' + id + '" ><span>' + Name + '</span></a>　';
// } else {
// Detail += '<img src="../../img/navigation_right.png"></div></li><li class="new-tbl-cell"><div><img src="../../img/navigation_left.png">';
// var Name = returnData.data.list[i].name;
// var id = returnData.data.list[i].id;
// Detail += '<a href="index.html.html?categoryId=' + id + '" ><span>' + Name + '</span></a>　';
// }
// }
// Detail += '<img src="../../img/navigation_right_press.png"></div></li></ul></div>';
// $("#new-servicepage").html(Detail);

// }

// function refreshuserpointsData() {
// var categoryId = window.localStorage.getItem("listByCategoryList");
// if (categoryId == null || categoryId == undefined) {
// categoryId = 1;
// }
// ajaxRequest(userpointsListCacheName, listByCategoryUrl, "categoryId=" + categoryId + "&condition.curPage=" + userpointsListPage + "&condition.fetchNum=4", userpointsListPage, userPointcategoryListpage, userpointsListError, false);
// }

//积分商品按分类数据获取
function listByCategory(categoryId) {
	var action = listByCategoryUrl;
	var reqData = "categoryId=" + categoryId + "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	var name = "listByCategoryList";
	console.log(action);
	ajaxJson(name, action, reqData, listByCategorypage);
}

//积分商品按分类数据获取渲染
function listByCategorypage() {
	var returnData = str2obj(window.localStorage.listByCategoryList);
	if (returnData.data.page.result != "") {
		var Detail = '';
		for (var i = 0; i < returnData.data.page.result.length; i++) {
			var Name = returnData.data.page.result[i].title;
			var imageUrl = returnData.data.page.result[i].pictureUrl;
			var score = returnData.data.page.result[i].score;
			var id = returnData.data.page.result[i].id;
			Detail += '<br/><hr /><br/><a href="productDeatil.html?id=' + id + '&name=' + Name + '"><div class="box first" style="height:auto;background:url(../../img/lib/arrow.png) center right no-repeat;margin-right:6px;"><table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + imageUrl + '" alt="" width="100"/></td><td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br><span style="float:left"> <font color="red" style="font-family:Arial;font-weight:bold">积分：' + score + '</font> <span><div class="p-detail" style="width:180px; float:right"></div></td></tr></tbody></table></div> </a>';

		}

	} else {
		var Detail = '<div class="t-lists"><div class="refill tc" style="margin-top:200px">此分类下还没有商品，<a href=index.html.html>点我回列表</a><div></div>';

	}

	$("#mc").html(Detail);

}

//积分商品详情数据获取
function detail(id) {
	var action = detailUrl;
	//登录用户Id
	var loginUserId = Request("loginUserId");
	//校验字符串
	var checkStr = Request("checkStr");
	//是否是会员标识
	var isMember = Request("isMember");

	var reqData = "scoreId=" + id + "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	var name = "scoredetail";
	//console.log(action);
	ajaxJson(name, action, reqData, detailpage);
}

//积分商品详情渲染
function detailpage() {
	var returnData = str2obj(window.localStorage.scoredetail);
	var Name = returnData.data.scoreProduct.product.name;
	var PictureUrls = returnData.data.scoreProduct.pictures;
	var productId = returnData.data.scoreProduct.id;
	var liHTML = "";
	var imgHTML = "";
	for (var i = 0; i < PictureUrls.length; i++) {
		imgHTML += '<figure><div class="wrap"><div class="image"><img onclick="toDetail(\'' + PictureUrls[i] + '\',\'' + '商品详情' + '\')"  src="' + PictureUrls[i] + '" height="100px" width="200px" style="line-height:100px;margin-top:12px;"/></div></div></figure>';
		if (i == 0) {
			liHTML += '<li class="on"></li>';
		} else {
			liHTML += '<li class=""></li>';
		}
	};
	$(".swipe-wrap").html(imgHTML);
	$("#position").html(liHTML);
	$("#position").css("left", (document.body.scrollWidth - parseInt($("#position>li").css("width")) * $("#position>li").length) / 2);
	var bullets = document.getElementById('position').getElementsByTagName('li');
	var slider = Swipe(document.getElementById('slider'), {
		continuous : false,
		callback : function(pos) {
			var i = bullets.length;
			while (i--) {
				bullets[i].className = ' ';
			}
			bullets[pos].className = 'on';
		}
	});
	$("#i_pre").bind('click', function(event) {
		slider.prev();
	});
	$("#i_next").bind('click', function(event) {
		slider.next();
	});
	var ShortDescription = '<br>' + returnData.data.scoreProduct.product.fullDescription;
	var score = returnData.data.scoreProduct.skus[0].score;
	var favored = returnData.data.favored;

	if (favored == false) {
		var favor = '<a id="save" onclick="userCareScoreProduct(' + productId + ')"><img src="../../images/icon_27.png" style="float: left;"></a>';
		var unfavor = '<a id="unsave" onclick="userCareScoreProductCancel(' + productId + ')"  style="display:none"><img src="../../images/icon_27.png" style="float:left;"></a>';
	} else if (favored == true) {
		var favor = '<a onclick="userCareScoreProduct(' + productId + ')"" id="save" style="display:none"><img src="../../images/icon_27.png" style="float: left;"></a>';
		var unfavor = '<a onclick="userCareScoreProductCancel(' + productId + ')" id="unsave" ><img src="../../images/icon_27.png" style="float:left;"></a>';
	}

	var Detail = '<h3 class="h_h3">' + Name + '</h3>';
	var Detail = '';
	for (var i = 0; i < returnData.data.scoreProduct.pictures.length; i++) {

		var imageUrl = returnData.data.scoreProduct.pictures[i];

		Detail += '<br/><hr /><br/><a href="productDeatil.html?productId=' + productId + '&name=' + Name + '"><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;margin-right:6px;"><table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + imageUrl + '" alt="" width="100"/></td><td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br><span style="float:left"> <font color="red" style="font-family:Arial;font-weight:bold">积分：' + score + '</font> <span><div class="p-detail" style="width:180px; float:right"></div></td></tr></tbody></table></div> </a>';

	}
	var admessage = Name + '仅售' + score + '积分就在掌上'+partnerName+'！';
	var share_a = '<a href="javascript:share(\'' + admessage + '\');"><img id="share" src="../../images/detail_unshare.png" style="float: right;"></a>';
	$("#div_img").html(imgHTML + '<br/>');
	$("#div_img>img :first").show();
	$("#name").html(Name);
	$("#share_a").html(share_a);
	$("#mc").html(Detail);
	$("#ShortDescription").html(ShortDescription);
	$("#score").html(score);
	$("#share_a").html(share_a);
	$("#favor").html(favor);
	$("#unfavor").html(unfavor);

}

/**
 * @author wang
 */
var productDetailCacheName;
var brandFavActionTrigger = false;
var scoreId = (Request("id"));
function iconShow(name) {
	var scrollleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var left = scrollleft - 60 + (allWidth / 2);
	document.getElementById(name).style.left = left + 'px';
	var scrollheight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	var allHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var top = scrollheight - 25 + (allHeight / 2);
	document.getElementById(name).style.top = top + 'px';
	$('#' + name).show();
}

$(function() {
	var width = (document.body.scrollWidth - 121) / 2;

	var cp = 1;
	$("#i_pre").bind('click', function(event) {
		var max = $("#div_img>img").length;
		$("#showPic" + cp).hide();
		cp = cp + 1;
		if (cp == (max + 1)) {
			cp = 1;
		}
		$("#showPic" + cp).show();
	});
	$("#i_next").bind('click', function(event) {
		var max = $("#div_img>img").length;
		$("#showPic" + cp).hide();
		cp = cp - 1;
		if (cp == 0) {
			cp = max;
		}
		$("#showPic" + cp).show();
	});

})
function addsuccess() {
	var width = (document.body.scrollWidth - 228) / 2;
	$("#cart").css("left", width);
	$("#cart").show();
	$("#_mask").show();
}

//商品添加关注
function userCareScoreProduct(productId) {
	var checkStr = window.localStorage.checkStr;
	var loginUserId = window.localStorage.loginUserId;
	var isMember = window.localStorage.isMember;

	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == '' || isMember == 0) {
		goLogin();
	} else {

		var action = userCareScoreProductCancelUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&scoreId=" + productId + "&Type=" + 1 + "&";
		var name = "userCareOrCancelProduct";
		ajaxJson(name, action, reqData, userCareScoreProductSuccess);
	}
}

function userCareScoreProductSuccess() {
	iconShow("saved")
	$("#saved").fadeIn();
	setTimeout(function() {
		$("#saved").fadeOut();
	}, 1000);
	$("#save").hide();
	$("#unsave").show();

}

//商品取消关注
function userCareScoreProductCancel(productId) {
	var checkStr = window.localStorage.checkStr;
	var loginUserId = window.localStorage.loginUserId;
	var isMember = window.localStorage.isMember;
	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == '' || isMember == 0) {
		goLogin();
	} else {
		var action = userCareScoreProductCancelUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&scoreId=" + productId + "&Type=" + 0 + "&";
		var name = "userCareScoreProductCancel";
		ajaxJson(name, action, reqData, userCareScoreProductCancelSuccess);
	}
}

function userCareScoreProductCancelSuccess() {
	iconShow("unsaved")
	$("#unsaved").fadeIn();
	setTimeout(function() {
		$("#unsaved").fadeOut();
	}, 1000);
	$("#unsave").hide();
	$("#save").show();
}

function replacePic(pic, size) {
	return pic.replace("/b/", "/" + size + "/");
}