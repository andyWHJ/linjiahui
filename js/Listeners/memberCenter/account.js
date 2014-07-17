var userInfoUpdateCacheName = "userInfoUpdate";
$(document).ready(function() {
	if (window.localStorage.getItem("accountInfo") == null) {
		//缓存中没有数据,向服务器发送请求
		refreshUserInfo()
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshUserInfo()
		} else {
			userInfoSuccess()
		}
	}
	if (isNull()) {
			$("#able").hide()
			$("#disable").show()
		} else {
			$("#able").show()
			$("#disable").hide()
		}
		
	$("#phone").bind('focus', function(event) {
		$("#phone_error").hide();
	})
	$("#email").bind('focus', function(event) {
		$("#email_error").hide();
	})

});
function editUserInfo() {
	var phone = trim($("#phone").val());
	var email = trim($("#email").val());
	if (phone == "" || validatePhoneNum(phone) == false) {
		if ($("#phone_error").hide()) {
			$("#phone_error").show();
		};
		$("#phone_error").show();
		return;
	}
	if (email != "" && validateEmailAddress(email) == false) {
		if ($("#email_error").hide()) {
			$("#email_error").show();
		};
		$("#email_error").show();
		return;
	}
	if (checkNetWorkState()) {
			showLoading()
	refreshUserInfoUpdate(phone, email);
	} else {
		var width = (document.body.scrollWidth - parseInt($("#save_account").css("width"))) / 2;
		$("#save_account").css("left",width);
		$(".cancel-com").html("网络异常，请检查您的网络！");
		$("#save_account").fadeIn();
		setTimeout(function() {
			$("#save_account").fadeOut();
		}, 2000);
	}
}

function refreshUserInfoUpdate(phone, email) {
	ajaxRequest("userInfoUpdate", userInfoUpdateUrl, "phone=" + phone + "&email=" + email, null, userInfoUpdateSuccess, userInfoUpdateError, true);
}

function userInfoUpdateSuccess() {
	cancelLoading()
	var returnData = str2obj(window.localStorage.getItem("userInfoUpdate"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		if (debug == true) {
			console.log(message);
		}
		var changeStatus = message.changeStatus;
		if (!changeStatus) {
			alert("更新失败");
			window.localStorage.removeItem("userInfoUpdate");
			return;
		}
		var width = (document.body.scrollWidth - parseInt($("#save_account").css("width"))) / 2;
		$("#save_account").css("left", width);
		$(".cancel-com").html("已保存");
		$("#save_account").fadeIn();
		setTimeout(function() {
			$("#save_account").fadeOut();
		}, 2000);
	};
}

function userInfoUpdateError() {

}

function refreshUserInfo() {
	ajaxRequest("accountInfo", userInfoUrl, "", null, userInfoSuccess, userInfoError, true);
}

function userInfoSuccess() {
	var returnData = str2obj(window.localStorage.getItem("accountInfo"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var data = returnData.data;
		if (debug == true) {
			console.log(data);
		}
		var userForm = data.userForm;
		if (userForm == null) {
			window.localStorage.removeItem("accountInfo");
			return;
		};
		if (userForm.length == 0) {
			window.localStorage.removeItem("accountInfo");
			return;
		}
		var userInfo = userForm.userInfo;
		var phone = userInfo.phone;
		var email = userInfo.email;
		$("#phone").val(phone)
		$("#email").val(email);
		if (isNull()) {
			$("#able").hide()
			$("#disable").show()
		} else {
			$("#able").show()
			$("#disable").hide()
		}
	};
}

function userInfoError() {

}
