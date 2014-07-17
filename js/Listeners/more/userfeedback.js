/**
 * 意见反馈，游客和会员均可访问
 * @author kevin
 */
var flag = true;
$(function(){

	init();
	
	$("#feedback").bind("input propertychange click blur focus",function(event){
		countFeedback($("#feedback"),200,true,cb);
		
	});
	$("#feedback").unbind("keydown keyup").bind("focus keydown click keyup",function(event){
		if (isNull()) {
		$("#disable").show();
		$("#able").hide();
	} else  if(flag){
		$("#disable").hide();
		$("#able").show();
	}
	});
	$("#feedback").focus();
	$("#p_e").unbind("focus keydown click keyup").bind("focus keydown click keyup",function(event){
		if (isNull()) {
		$("#message_error").hide();
		$("#disable").show();
		$("#able").hide();
	} else if(flag){
		$("#disable").hide();
		$("#able").show();
	}
	});
	$("#feedback").blur( function () {
		var feedback = trim($("#feedback").val());
		setLocalvalue("feedbackContent",feedback);
	});
	$("#p_e").blur( function () {
		var phoneOrEmail = trim($("#p_e").val());
		setLocalvalue("phoneOrEmail",phoneOrEmail);
	});
	
});
function init(){
		var width = $(window).width();
	var height = $(window).height();
	$("#feedback").css("height",height * 0.28);
	var feedback = getLocalValue("feedbackContent");
	var phoneOrEmail = getLocalValue("phoneOrEmail");
	if(feedback != null){
		$("#feedback").val(feedback);
	} 
	if(phoneOrEmail != null){
		$("#p_e").val(phoneOrEmail);
	}
}
 function cb(remain){
 	$("#feedback-info_error").css("color","");
  if(remain >= 0){
  	flag = true;
    	$("#feedback-info_error").html("您还可以输入<span style='color:red;' class='tip_feedback'>"+ remain +"</span>个字!"); 
    }else{  
    	flag = false;
       $("#feedback-info_error").html("已经超过<span style='color:red;' class='tip_feedback'>"+(-remain) +"</span>个字");
       $("#disable").show();
		$("#able").hide();
    }  
 }   
/*
 * textarea:文本框jquery对象
 * limit:字数限制
 * isByte: true:视limit位字节数  
 * 		   false:视limit位字符数
 * cb:回调函数，参数为可输入的字数
 */
function countFeedback(textarea,limit,isByte,cb) {
		var str = trim(textarea.val());
		var charLen;
		var byteLen = 0;
		if(isByte){
			for(var i = 0 ; i < str.length ; i++){
				if(str.charCodeAt(i) > 255) {
					byteLen += 2 ;
				}else{
					byteLen++ ;
				}
			}
			charLen = Math.floor((limit - byteLen)/2);
		} else {
			byteLen = str.length;
			charLen = limit - byteLen;
		}
		cb(charLen);
}
function userFeedback(){
	var feedback = trim($("#feedback").val());
	var phoneOrEmail = trim($("#p_e").val());
	/*if(feedback == ""){
		$("#feedback-info_error").show();
		return;
	}else if(validateFeedback(feedback) == false){
		$("#feedback-info_error").hide();
		$("#feedback-info_error2").show();
		return;
	}*/
	if(phoneOrEmail == ""){
		$("#message_error").show();
		return;
	}else {
		if (validatePhoneNum(phoneOrEmail) == false && validateEmailAddress(phoneOrEmail) == false) {
				$("#message_error").show();
				return;
		}else{
			$("#message_error").hide();
		}
	}
	if (checkNetWorkState()) {
			//提交服务器
		refreshFeedBackData(feedback, phoneOrEmail);
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
function refreshFeedBackData(feedback, phoneOrEmail){
	var checkStr = getLocalUserValue("checkStr");
	var loginUserId = getLocalUserValue("loginUserId");
	var isMember = getLocalUserValue("isMember");
	setLocalvalue("feedbackContent","");
	setLocalvalue("phoneOrEmail","");
	if (isMember == 0 || isMember == undefined || isMember == null) {
		ajaxRequest("feedback",feedbackUrl,"description=" + feedback + "&contact=" + phoneOrEmail , null, feedbackSuccess, feedbackError, false);
	} else {
		ajaxRequest("feedback",feedbackUrl,"description=" + feedback + "&contact=" + phoneOrEmail + "&loginUserId=" + loginUserId +"&checkStr="+checkStr, null, feedbackSuccess, feedbackError, false);
	}
}
function feedbackSuccess() {
	var width = (document.body.scrollWidth - parseInt($("#feedback-submit").css("width"))) / 2;
	//alert(width);
	$("#feedback-submit").css("left", width);
	//$("#_mask").show();
	var returnData = str2obj(window.localStorage.getItem("feedback"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		if (debug == true) {
			console.log(message);
		}
		var status = message.status;
		var s={"status":status};
		if(!status) {
			$(".cancel-com").html("发送失败,请重新填写!");
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
			window.location.reload();
		},2000);
			/*$("#feedback-submit").fadeIn();
			setTimeout(function() {
			$("#feedback-submit").fadeOut();
			//$("#_mask").hide();
			window.location.reload();
			}, 2000);*/
			return;
		}else{
			$(".cancel-com").html("发送成功!谢谢您的宝贵意见，我们将继续努力!");
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
			closePage(obj2str(s));
		},2000);
			/*$("#feedback-result").html("发送成功！<br/>谢谢您的宝贵意见，我们将继续努力！");
			$("#feedback-submit").fadeIn();
			setTimeout(function() {
			$("#feedback-submit").fadeOut();
			//$("#_mask").hide();
			closePage(obj2str(s));
			}, 2000);*/
		}
	} 
}

function feedbackError() {
}
