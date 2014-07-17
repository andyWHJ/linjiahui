$(function() {
	var head_heigth = $("#pageHeadInfo").height();
	var tab_heigth = $(".tab-lst").height();
	var heigth = tab_heigth + head_heigth + 135.6;
	var scrollleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
	//var left = scrollleft - 90 + (allWidth / 2);
	$("#emptyDataError").css('text-align', "center");
	$("#emptyDataError").css('margin-top', heigth);
})
function validatePhoneNum(phoneNum) {
	var myreg = /^(((13[0-9]{1})|14[0-9]{1}|15[0-9]{1}|18[0-9]{1})+\d{8})$/;
	return myreg.test(phoneNum);
}

function validateTelPhoneNum(telePhoneNum) {
	var myreg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{8}$/;
	return myreg.test(telePhoneNum);
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
function validateFeedback(feedback){
	if(feedback.length > 0 && feedback.length <= 100){
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

/**
 * 验证身份证号合法性
 * @param request
 * CardNo 身份证号
 * Sex 性别
 * Birthday 生日
 * @param response
 * 如果符合,返回true
 * 如果不符合,返回false
 */
function CheckIdCard(CardNo, Sex, Birthday) {
	//性别　1：男　0：女
	//生日　19811010
	if ((trim(CardNo) == "") || (!(isNumber(CardNo)) && (CardNo.length == 15)) || (!(isNumber(CardNo.substr(0, 17))) && (CardNo.length == 18)) || ((CardNo.length != 15) && (CardNo.length != 18))) {
		//alert("您的身份证号码输入有误，必需是15或18位的数字,请重新检查并输入!");
		return false;
	} else if (CardNo.length == 15) {
		if (CardNo.substr(8, 2) > 12 || CardNo.substr(8, 2) < 1) {
			//alert("您的身份证号码输入有误,请重新检查并输入!");
			return false;
		}
		if (CardNo.substr(10, 2) > 31 || CardNo.substr(10, 2) < 1) {
			//alert("您的身份证号码输入有误,请重新检查并输入!");
			return false;
		}
		if (Birthday != null) {
			if (Birthday != "" && ("19" + CardNo.substr(6, 6)) != Birthday) {
				//alert("您的身份证号码输入有误,请重新检查并输入!");
				return false;
			}
		}
		if (Sex != null) {
			if (Sex != "" && CardNo.charAt(14) % 2 != Sex) {
				//alert("您的身份证号码输入有误,请重新检查并输入!");
				return false;
			}
		}
		return true;
	} else if (CardNo.length == 18) {
		if (CardNo.substr(6, 4) < 1900 || CardNo.substr(6, 4) > 2100) {
			//alert("您的身份证号码输入有误,请重新检查并输入!");
			return false;
		}
		if (CardNo.substr(10, 2) > 12 || CardNo.substr(10, 2) < 1) {
			//alert("您的身份证号码输入有误,请重新检查并输入!");
			return false;
		}
		if (CardNo.substr(12, 2) > 31 || CardNo.substr(12, 2) < 1) {
			//alert("您的身份证号码输入有误,请重新检查并输入!");
			return false;
		}
		if (Birthday != null) {
			if (Birthday != "" && CardNo.substr(6, 8) != Birthday) {
				//alert("您的身份证号码输入有误,请重新检查并输入!");
				return false;
			}
		}

		if (Sex != null) {
			if (Sex != "" && CardNo.charAt(16) % 2 != Sex) {
				//alert("您的身份证号码输入有误,请重新检查并输入!");
				return false;
			}
		}

		var Wi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		var Ai = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');

		if (CardNo.charAt(17) == 'x') {
			CardNo = CardNo.replace("x", "X");
		}

		var checkDigit = CardNo.charAt(17);
		var cardNoSum = 0;

		for (var i = 0; i < CardNo.length - 1; i++) {
			cardNoSum = cardNoSum + CardNo.charAt(i) * Wi[i];
		}

		var seq = cardNoSum % 11;
		var getCheckDigit = Ai[seq];

		if (checkDigit != getCheckDigit) {
			//alert("您的身份证号码输入有误，请重新检查并输入!");
			return false;
		}
		return true;
	} else {
		return true;
	}
}