$(function() {
	$("#cardCode").bind('focus', function(event) {
		$("#cardCode_error").hide();
	})
	$("#phone").bind('focus', function(event) {
		$("#phone_error").hide();
	})
	$("#identityNum").bind('focus', function(event) {
		$("#identityNum_error").hide();
	})
})
function bindCard() {
	var cardCode = trim($("#cardCode").val());
	var phone = trim($("#phone").val());
	var identityNum = trim($("#identityNum").val());
	if (cardCode == "" || validateDigitalCard(cardCode) == false) {
		if ($("#cardCode_error").hide()) {
			$("#cardCode_error").show();
		};
		$("#cardCode_error").show();
		return;
	}
	if (phone == "" || validatePhoneNum(phone) == false) {
		if ($("#phone_error").hide()) {
			$("#phone_error").show();
		};
		$("#phone_error").show();
		return;
	}
	if (identityNum == "" || validateidentityNum(identityNum) == false) {
		if ($("#identityNum_error").hide()) {
			$("#identityNum_error").show();
		};
		$("#identityNum_error").show();
		return;
	}
	//
	if (checkNetWorkState()) {
			//提交服务器
			showLoading();
		refreshBindCardData(cardCode, phone, identityNum);
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

function refreshBindCardData(cardCode, phone, identityNum) {
	ajaxRequest("bindCard", bindCardUrl, "identityNum=" + identityNum + "&phone=" + phone + "&cardCode=" + cardCode+"&cardTypeId=1", null, bindCardSuccess, bindCardError, true);
}

function bindCardSuccess() {
	cancelLoading()
	var returnData = str2obj(window.localStorage.getItem("bindCard"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		if (debug == true) {
			console.log(message);
		}
		var bindStatus = message.bindStatus;
		if (!bindStatus) {
			alert("绑定失败");
			window.localStorage.removeItem("bindCard");
			return;
		};
	} else {
		callBackMessage(returnData.message,null);
		return;
	}
	window.localStorage.removeItem("cardId");
	window.localStorage.removeItem("curMemCardNum");
	window.localStorage.removeItem("userCardList");
	window.localStorage.removeItem("userInfo");
	//window.location.href = "memberCenter.html";
	goMemberCenter();
}

function bindCardError() {
	//TODO
}

