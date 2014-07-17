$(document).ready(function() {
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
function findPassword() {
	var account = trim($("#account").val());
	var phone = trim($("#phone").val());
	if (account == "" || validateRealName(account) == false) {
		if ($("#account_error").hide()) {
			$("#account_error").show();
		};
		$("#account_error").show();
		return;
	}
	if (phone == "" || validatePhoneNum(phone) == false) {
		if ($("#phone_error").hide()) {
			$("#phone_error").show();
		};
		$("#phone_error").show();
		return;
	}
	//
	if (checkNetWorkState()) {
		refreshFindPW(account, phone);
	} else {
		var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
		$("#toast").css("left",width);
		$(".cancel-com").html("网络异常，请检查您的网络！");
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
	}
}

function refreshFindPW(account, phone) {
	ajaxRequest("retrievePasswd", retrievePasswdUrl, "account=" + account + "&mobile=" + phone, null, retrievePasswdSuccess, retrievePasswdError, false);
}

function retrievePasswdSuccess() {
	var returnData = str2obj(window.localStorage.getItem("retrievePasswd"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		var retrieveStatus=message.retrieveStatus;
		if (retrieveStatus) {
			callBackMessage("密码已重置，请注意查收短信!",callBack);
		}else{
			
		}
	}else if (returnData.status==5001) {
		callBackMessage(returnData.message,null);
	};
}
function callBack(){
	window.location.href='login.html';
}
function retrievePasswdError() {

}

