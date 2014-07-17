if (debug) {
	var promotionDetail = "http://file.hfcs.linjiahui.com:9090/file/source/advert/94/58/25/index.html.html";
	var promotionId = 7;
	var promotionTitle = "标题4";
} else {
	var promotionDetail = getLocalValue("fpromotionDetail");
	var promotionId = getLocalValue("fpromotionId");
	var promotionTitle = getLocalValue("fpromotionTitle");
	var favorShareMessage = getLocalValue("favorShareMessage");
	var display = setLocalvalue("fpromotionId_"+promotionId,display);
}
//add
$("#detail").attr("src", promotionDetail);
$("#detail").attr("width", $(window).width());
$("#detail").attr("height", $(window).height());
refreshPromotionFavorStatus(promotionId);
$("#save").bind('click', function(event) {
	userCarePromotion(promotionId)
});
$("#unsave").bind('click', function(event) {
	userCarePromotionCancel(promotionId)
});
$("#share").bind('click', function(event) {
	share(favorShareMessage);
});
function localUserCarePromotion(){
	userCarePromotion(promotionId);
}
function localUserCarePromotionCancel(){
	userCarePromotionCancel(promotionId);
}
function userCarePromotion(promotionId) {
	var checkStr =getLocalUserValue("checkStr");
	var loginUserId = getLocalUserValue("loginUserId");
	var isMember = getLocalUserValue("isMember");

	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == '' || isMember == 0) {
		goLogin();
	} else {

		var action = userCareOrCancelPromotionUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&promotionId=" + promotionId + "&Type=" + 1;
		var name = "userCarePromotion";
		if (checkNetWorkState()) {
		ajaxJson(name, action, reqData, userCarePromotionSuccess);
		} else {
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
		},2000);
		}
		
	}
}

function userCarePromotionSuccess() {
	iconShow("saved")
	promotionShowIcon("true");
	$("#saved").fadeIn();
	setTimeout(function() {
		$("#saved").fadeOut();
	}, 1000);
	$("#save").hide();
	$("#unsave").show();

}

//商品取消关注
function userCarePromotionCancel(promotionId) {
	var checkStr = getLocalUserValue("checkStr");
	var loginUserId = getLocalUserValue("loginUserId");
	var isMember = getLocalUserValue("isMember");
	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == '' || isMember == 0) {
		goLogin();
	} else {
		var action = userCareOrCancelPromotionUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&promotionId=" + promotionId + "&Type=" + 0;
		var name = "userCarePromotionCancel";
		if (checkNetWorkState()) {
		ajaxJson(name, action, reqData, userCarePromotionCancelSuccess);
		} else {
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
		},2000);
		}
	}
}

function userCarePromotionCancelSuccess() {
	iconShow("unsaved")
	promotionShowIcon("false");
	$("#unsaved").fadeIn();
	setTimeout(function() {
		$("#unsaved").fadeOut();
	}, 1000);
	$("#unsave").hide();
	$("#save").show();
}

function iconShow(name) {
	var scrollleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var left = scrollleft - 50 + (allWidth / 2);
	//document.getElementById(name).style.left = left + 'px';
	$("#" + name).css("left", left + 'px');
	var scrollheight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	var allHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var top = scrollheight - 25 + (allHeight / 2);
	//document.getElementById(name).style.top = top + 'px';
	$("#" + name).css("top", top + 'px');
	$('#' + name).show();
}

function refreshPromotionFavorStatus(promotionId) {
	var loginUserId = getLocalUserValue("loginUserId");
	if (checkNetWorkState()) {
		ajaxRequest(loginUserId +"_"+promotionId+"_fpromotionFavorStatus", promotionFavorUrl, "&promotionId=" + promotionId, null, promotionSuccess, promotionError, true);
	} else {
		if(window.localStorage.getItem(loginUserId +"_"+promotionId+"_fpromotionFavorStatus") == null){
			goError();
		}else{
			promotionSuccess();
		}
	}
}

function promotionSuccess() {
	var loginUserId = getLocalUserValue("loginUserId");
	var promotionId = getLocalValue("fpromotionId");
	var returnData = str2obj(window.localStorage.getItem(loginUserId +"_"+promotionId+"_fpromotionFavorStatus"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	//if (returnData.data.favored) {
	//	$("#unsave").show();
	//	$("#save").hide()
	//} else {
	//	$("#unsave").hide();
	//	$("#save").show()
	//}
	promotionShowLayout();
	promotionShowIcon(returnData.data.favored);//"true" 已收藏  "false"//未收藏
}

function promotionError() {

}