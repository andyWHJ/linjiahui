/**
 * @author wang
 */
var productDetailCacheName;
var brandFavActionTrigger = false;
var productId = (Request("productId"));
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
		var max = $("#div_img>a>img").length;
		$("#showPic" + cp).hide();
		cp = cp + 1;
		if (cp == (max + 1)) {
			cp = 1;
		}
		$("#showPic" + cp).show();
	});
	$("#i_next").bind('click', function(event) {
		var max = $("#div_img>a>img").length;
		$("#showPic" + cp).hide();
		cp = cp - 1;
		if (cp == 0) {
			cp = max;
		}
		$("#showPic" + cp).show();
	});
	//关注商品
	$("#unsave").bind('click', function(event) {
		if (brandFavActionTrigger == true) {
			return;
		}
		brandFavActionTrigger = true;
		ajaxRequest("careProductCacheName", userCareOrCancelProductUrl, "productId=" +productId+"&Type="+1,null , careProductSuccess, careProductError, true);
		setTimeout(function() {
			brandFavActionTrigger = false;
		}, doubleClickTime);
		function careProductSuccess() {
			try {
				var returnData = str2obj(window.localStorage.getItem("careProductCacheName"));
				if (returnData.status == 0) {
					iconShow("saved")
					$("#saved").fadeIn();
					setTimeout(function() {
						$("#saved").fadeOut();
					}, 1000);
					$("#unsave").hide();
					$("#save").show();
				} else {
					alert(returnData.message);
				}
				window.localStorage.removeItem("careBrandCacheName");
			} catch (e) {
				if (debug == true) {
					alert(e);
				}
				window.localStorage.removeItem("careBrandCacheName");
			}
		}

		function careProductError() {
		}

	});
	//取消关注商品
	$("#save").bind('click', function(event) {
		if (brandFavActionTrigger == true) {
			return;
		}
		brandFavActionTrigger = true;
		ajaxRequest("uncareProductCacheName", userCareOrCancelProductUrl, "productId=" + productId+"&Type="+0, null, uncareProductSuccess, uncareProductError, true);
		setTimeout(function() {
			brandFavActionTrigger = false;
		}, doubleClickTime);
		function uncareProductSuccess() {
			try {
				var returnData = str2obj(window.localStorage.getItem("uncareProductCacheName"));
				if (returnData.status == 0) {
					iconShow("unsaved")
					$("#unsaved").fadeIn();
					setTimeout(function() {
						$("#unsaved").fadeOut();
					}, 1000);
					$("#save").hide();
					$("#unsave").show();
				} else {
					alert(returnData.message);
				}
				window.localStorage.removeItem("uncareProductCacheName");
			} catch (e) {
				if (debug == true) {
					alert(e);
				}
				window.localStorage.removeItem("uncareProductCacheName");
			}
		}

		function uncareProductError() {
		}

	});
})

function productDetailError() {

}

function checkCareProductStatusSuccess() {
	try {
		var returnData = str2obj(window.localStorage.getItem("checkCareProductStatus"));
		if (returnData.status == 0) {
			if (returnData.data.checkStatus == 1) {
				$("#unsave").hide();
				$("#save").show();
			} else {
				$("#unsave").show();
				$("#save").hide();
			}
		} else {
			alert(returnData.message);
		}
		window.localStorage.removeItem("checkCareProductStatus");
	} catch (e) {
		if (debug == true) {
			alert(e);
		}
		window.localStorage.removeItem("checkCareProductStatus");
	}
}

function checkCareProductStatusError() {
	window.localStorage.removeItem("checkCareProductStatus");
}

function addsuccess() {
	var width = (document.body.scrollWidth - 228) / 2;
	$("#cart").css("left", width);
	$("#cart").show();
	$("#_mask").show();
}

