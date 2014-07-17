/**
 *注册会员
 *  @author kevin 
 */
$(function() {
	var width = $(document).width();
	if(width<360){
		$("#zc").css("margin-left",0.1 * width);
		$("#unzc").css("margin-left",0.1 * width);
		$("#zc").css("width",0.3 * width);
		$("#unzc").css("width",0.3 * width);
	}else if(width<400){
		$("#zc").css("margin-left",0.125 * width);
		$("#unzc").css("margin-left",0.125 * width);
		$("#zc").css("width",0.33 * width);
		$("#unzc").css("width",0.33 * width);
	}else {
		$("#zc").css("margin-left",0.125 * width);
		$("#unzc").css("margin-left",0.125 * width);
		$("#zc").css("width",0.4 * width);
		$("#unzc").css("width",0.4 * width);
	}
	
    $("#account").bind('focus', function(event) {
        $("#message").html("");
        $("#message_content").hide();
    })
    $("#password").bind('focus', function(event) {
        $("#message").html("");
        $("#message_content").hide();
    })
    $("#conpassword").bind('focus', function(event) {
        $("#message").html("");
        $("#message_content").hide();
    })
    //goUserStr_m();
})
function checkStatus(ele) {
        var id =  $(ele).attr("id");
        if(id == "unchecked"){
            $("#checked").show();
            $("#unchecked").hide();
        } else {
            $("#unchecked").show();
            $("#checked").hide();
        }
     }
 
function register() {
	//$("#able").hide();
	//$("#disable").show();
	//var loginUserId = window.localStorage.getItem("loginUserId");
	//var checkStr = window.localStorage.getItem("checkStr");
	//var isMember = window.localStorage.getItem("isMember");
	var loginUserId = getLocalUserValue("loginUserId");//add
    var checkStr = getLocalUserValue("checkStr");//add
	var isMember = getLocalUserValue("isMember");//add
	var account = trim($("#account").val());
	var password = trim($("#password").val());
	var conpassword = trim($("#conpassword").val());
	var agree = $("input:checked").val();
	var flag = validateAccount(account);
	if (account == "" && account.length == 0) {
		$("#message").html("用户名不能为空");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	} else if (flag == -1) {
		$("#message").html("用户名不能是纯数字");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	} else if (flag == -2) {
		$("#message").html("用户名只能是字母和数字，并且长度不能小于4位或大于20位");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	}
	if (password != "" && validatePassword(password) == false) {
		$("#message").html("请输入密码(密码长度6-20位)");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	}
	if (conpassword != "" && validatePassword(conpassword) == false) {
		$("#message").html("两次密码不一致");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	} else if ((password == conpassword) == false) {
		$("#message").html("两次密码不一致");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	}

	if (agree == undefined) {
		$("#message").html("请确认阅读并同意注册协议");
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
		}, 2000);
		return;
	}
	//
	if (checkNetWorkState()) {
		if(getLocalValue("cardLoginUserInfo")!=null&&getLocalValue("cardLoginUserInfo")!=""){
			var cardLoginUserInfo=str2obj(getLocalValue("cardLoginUserInfo"));
			loginUserId=cardLoginUserInfo.loginUserId;
			checkStr=cardLoginUserInfo.checkStr;
			isMember=cardLoginUserInfo.isMember;
		}
		showLoading();
		ajaxRequest("register", registerUrl, goDeviceParameters() + "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&account=" + account + "&password=" + password, null, registerSuccess, registerError, false);
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

    
function registerSuccess() {
	cancelLoading();
	var returnData = str2obj(window.localStorage.getItem("register"));
	if (returnData.status == 0) {
		var data = returnData.data;
		var token = data.token;
		var userId = data.userId;
		var isMember = data.isMember;
		//window.ljhWebview.registerSuccessed(obj2str(returnData));
		window.localStorage.setItem("checkStr",token)
		window.localStorage.setItem("loginUserId",userId)
		window.localStorage.setItem("isMember",isMember)
		//$("#message").html("注册成功，请绑定会员卡!"); 去掉注册成功后的提示。
		//$("#message_content").fadeIn();
		var s={"checkStr":token,"loginUserId":userId,"isMember":isMember};
		if (getLocalValue("cardLoginUserInfo")!=null&&getLocalValue("cardLoginUserInfo")!="") {
			//从用户验证过来  到我的会员卡页面。显示
			if (browser.versions.android) {
				registerSuccessed(obj2str(returnData),obj2str(s));//add
			};
			cardLoginGoMemberCenter(obj2str(s));
		}else{
			registerSuccessed(obj2str(returnData),obj2str(s));//add
			if (browser.versions.android) {
				window.location.href = '../memberCenter/bindCard.html';
			};
		}
	} else {
		$("#message").html(returnData.message);
		$("#message_content").fadeIn();
		setTimeout(function() {
			$("#message_content").fadeOut();
			//window.location.href = '../user/register.html';
		}, 2000);
	}
}
function registerError() {
}

 
function validateAccount(account) {
	var valid = true;
	if (valid) {
		var reg_num = /^[0-9]+$/;
		if (reg_num.test(account)) {
			valid = false;
			return -1;
		}
	}
	if (valid) {
		var reg_account = /^([0-9]|[a-zA-Z]){4,20}$/;
		if (!reg_account.test(account)) {
			valid = false
			return -2;
		}
	}
	return -3;
}

function validatePassword(password) {
	if (password.length > 5 && password.length <= 20) {
		return true;
	} else {
		return false;
	}
}
