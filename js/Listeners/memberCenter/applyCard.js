$(function() {
	$("#realName").bind('focus', function(event) {
		$("#realName_error").hide();
	})
	$("#phone").bind('focus', function(event) {
		$("#phone_error").hide();
	})
	$("#identityNum").bind('focus', function(event) {
		$("#identityNum_error").hide();
	})
	$("#email").bind('focus', function(event) {
		$("#email_error").hide();
	})
})
function applyCard() {
	var phone = trim($("#phone").val());
	var realName = trim($("#realName").val());
	var identityNum = trim($("#identityNum").val());
	var email = trim($("#email").val());
	var gender = $("input:checked").val();
	if (gender == undefined){
		gender = -1;
	}
	if (realName == "" || validateRealName(realName) == false) {
		if ($("#realName_error").hide()) {
			$("#realName_error").show();
		};
		$("#realName_error").show();
		return;
	}
	if (phone == "") {
		$("#phone_error").html("请输入合法的手机号或小灵通号！");
		if ($("#phone_error").hide()) {
			$("#phone_error").show();
		};
		$("#phone_error").show();
		return;
	} else {
		if (phone.length > 8) {
			if (validatePhoneNum(phone) == false) {
				$("#phone_error").html("请输入合法的手机号！");
				if ($("#phone_error").hide()) {
					$("#phone_error").show();
				};
				$("#phone_error").show();
				return;
			};
		} else {
			if (validateTelPhoneNum(phone) == false) {
				$("#phone_error").html("请输入合法的小灵通号！");
				if ($("#phone_error").hide()) {
					$("#phone_error").show();
				};
				$("#phone_error").show();
				return;
			};
		}
	}
	if (identityNum == "" || CheckIdCard(identityNum) == false) {
		if ($("#identityNum_error").hide()) {
			$("#identityNum_error").show();
		};
		$("#identityNum_error").show();
		return;
	}
	if (email != "" && validateEmailAddress(email) == false) {
		if ($("#email_error").hide()) {
			$("#email_error").show();
		};
		$("#email_error").show();
		return;
	}
	//
	if (checkNetWorkState()) {
			//提交服务器
			showLoading();
		refreshApplyCardData(realName, phone, identityNum,email,gender);
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

function refreshApplyCardData(realName, phone, identityNum,email,gender) {
	ajaxRequest("applyCard", applyCardUrl, "identityNum=" + identityNum + "&phone=" + phone + "&realName=" + realName + "&email=" + email + "&gender=" + gender, null, applyCardSuccess, applyCardError, true);
}

function applyCardSuccess() {
	cancelLoading()
	var returnData = str2obj(window.localStorage.getItem("applyCard"));
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
			alert("申请失败");
			window.localStorage.removeItem("applyCard");
			return;
		};
	} else{
		callBackMessage(returnData.message,null);
		return;
	}
	window.localStorage.removeItem("cardId");
	window.localStorage.removeItem("curMemCardNum");
	window.localStorage.removeItem("userCardList");
	window.localStorage.removeItem("userInfo");
	//window.location.href = "memberCenter.html";
	//window.ljhWebview.clearHistory();//清除webview的历史浏览记录
	goMemberCenter();
}

function applyCardError() {
	//TODO
}
function checkbox(e,id){
	var result = $(e).attr("check-flag");
	if(id == 'n'){
			$("#nv_uncheck").show();
  			$("#nv_check").hide();
  			$(e).siblings("input[type='radio']")[0].click();
		} else {
			$("#n_uncheck").show();
  			$("#n_check").hide();
  			$(e).siblings("input[type='radio']")[1].click();
		}
	if (result == 'false')  {
		$("#"+id+"_uncheck").hide();
   		$("#"+id+"_check").show();
  	 } 
}
