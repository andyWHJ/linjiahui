$(function() {
	//输入框获取焦点 为了从注册页面回退用。
	if($("#card").val()!=''){
		$("#card").focus();
	}
	$("#card").bind('focus', function(event) {
		$("#userName_error").hide();
	})
	$("#password").bind('focus', function(event) {
		$("#password_error").hide();
	})
})
function cardLogin() {
	$("#able").hide();
	$("#disable").show();
	var card = trim($("#card").val());
	var password = trim($("#password").val());
	if (checkNetWorkState()) {
		showLoading();
		refreshCardLoginData(card, password);
	} else {
		var width = (document.body.scrollWidth - parseInt($("#save_account").css("width"))) / 2;
		$("#save_account").css("left", width);
		$(".cancel-com").html("网络异常，请检查您的网络！");
		$("#save_account").fadeIn();
		setTimeout(function() {
			$("#save_account").fadeOut();
		}, 2000);
	}
}

function refreshCardLoginData(card, password) {
	ajaxRequest("cardLogin", cardLoginUrl, goDeviceParameters() + "&cardNo=" + card + "&password=" + password, null, cardLoginSuccess, cardLoginError, false);
}

function cardLoginSuccess() {
	cancelLoading()
	var returnData = str2obj(window.localStorage.getItem("cardLogin"));
	if (returnData.status == 0) {
		var data = returnData.data;
		var token = data.token;
		var userId = data.userId;
		var isMember = data.isMember;
		var s = {
				"checkStr" : token,
				"loginUserId" : userId,
				"isMember" : isMember
			};
		if (data.upgraded) {
			window.localStorage.setItem("checkStr", token);
			window.localStorage.setItem("loginUserId", userId);
			window.localStorage.setItem("isMember", isMember);									
			loginSuccessed(obj2str(returnData), obj2str(s))
		} else {
			setLocalvalue("cardLoginUserInfo",obj2str(s));
			window.location.href="register.html";
		}

	} else {
		window.localStorage.removeItem("checkStr", token)
		window.localStorage.removeItem("loginUserId", userId)
		window.localStorage.removeItem("isMember", isMember)
		$("#card").blur();
		var width = (document.body.scrollWidth - parseInt($("#save_account").css("width"))) / 2;
		$("#save_account").css("left", width);
		$(".cancel-com").html(returnData.message);
		$("#save_account").fadeIn();
		setTimeout(function() {
			$("#save_account").fadeOut();
		}, 2000);
	}
}

function cardLoginError() {
	//TODO
}

