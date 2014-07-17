var display = "true";
//积分商品详情数据获取
function detail(id,d) {
	display = d;
	var action = detailUrl;
	//登录用户Id
	//var checkStr = window.localStorage.getItem("checkStr");
	//var loginUserId = window.localStorage.getItem("loginUserId");
	//var isMember = window.localStorage.getItem("isMember");
	var loginUserId = getLocalUserValue("loginUserId");//add
    var checkStr = getLocalUserValue("checkStr");//add
	var isMember = getLocalUserValue("isMember");//add
	var reqData = "scoreId=" + id + "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	var name = "fscoredetail_"+id;
	if (window.localStorage.getItem(name) != undefined) {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			ajaxJson(name, action, reqData, detailpage);
		} else {
			//将缓存中的数据渲染到页面中
			detailpage();
		}
	}else{
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			ajaxJson(name, action, reqData, detailpage);
		} else {
			$("#body").empty();
			goError();
		}
	}
}

//积分商品详情渲染
function detailpage() {
	var width = $(document).width();
	var fscoreId = getLocalValue("fscoreId");//add
	var returnData = str2obj(window.localStorage.getItem("fscoredetail_"+fscoreId));
	var Name = returnData.data.scoreProduct.product.name;
	var PictureUrls = returnData.data.scoreProduct.pictures;
	var productId = returnData.data.scoreProduct.id;
	if(display == "true"){
		var time=returnData.data.scoreProduct.endTime;
		showTimeIsBegin(new Date(Date.parse(time.replace(/-/g,"/"))));
	} else {
		$("#remainTime").html("已下架");
	}
	var liHTML = "";
	var imgHTML = "";
	for (var i = 0; i < PictureUrls.length; i++) {
		PictureUrls[i] = PictureUrls[i].replace('/b/','/'+ 0.6*width +'/'+0.6*width+'/');
		imgHTML += '<figure><div class="wrap"><div class="image">';
		if (window.localStorage.getItem(PictureUrls[i]) != undefined && window.localStorage.getItem(PictureUrls[i]) != 'undefined') {
				var obj = window.localStorage.getItem(PictureUrls[i]);
				var imageBase64 = obj;
				imgHTML += '<img onclick="showAdWithTitle(\'' + PictureUrls[i] + '\',\'' + '商品详情' + '\')" src="data:image/png;base64,' + imageBase64 + '"  style="line-height:100px;margin-top:12px;"/>';
		} else {
			//如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
				if(window.localStorage.getItem("pic") == null){
					window.localStorage.setItem("pic", PictureUrls[i]);
				} else {
					window.localStorage.setItem("pic",window.localStorage.getItem("pic") + "," + PictureUrls[i]);
				}
			imgHTML += '<img onclick="showAdWithTitle(\'' + PictureUrls[i] + '\',\'' + '商品详情' + '\')"  src="' + PictureUrls[i] + '"  style="line-height:100px;margin-top:12px;"/>';
		}
		imgHTML += '</div></div></figure>';
		if (i == 0) {
			liHTML += '<li class="on"></li>';
		} else {
			liHTML += '<li class=""></li>';
		}
	};
	$("#memberCard").css("height", 0.6*width + 50);
	$("#i_pre").css("margin-top", 0.273*width);
	$("#i_next").css("margin-top", 0.273*width);
	$(".swipe-wrap").html(imgHTML);
	$("#position").html(liHTML);
	$("#position").css("left", (document.body.scrollWidth - parseInt($("#position").css("width"))) / 2);
	var bullets = document.getElementById('position').getElementsByTagName('li');
	var slider = Swipe(document.getElementById('slider'), {
		continuous : false,
		callback : function(pos) {
			var i = bullets.length;
			while (i--) {
				bullets[i].className = ' ';
			}
			bullets[pos].className = 'on';
		}
	});
	$("#i_pre").bind('click', function(event) {
		slider.prev();
	});
	$("#i_next").bind('click', function(event) {
		slider.next();
	});
	var ShortDescription =returnData.data.scoreProduct.product.fullDescription;
	var score = returnData.data.scoreProduct.skus[0].score;
	var favored = returnData.data.favored;
	if (favored == false) {
		var favor = '<a id="save" onclick="userCareScoreProduct(' + productId + ')"><img src="../../images/icon_27.png" style="float: left;"></a>';
		var unfavor = '<a id="unsave" onclick="userCareScoreProductCancel(' + productId + ')"  style="display:none"><img src="../../images/icon_14.png" style="float:left;"></a>';
	} else if (favored == true) {
		var favor = '<a onclick="userCareScoreProduct(' + productId + ')"" id="save" style="display:none"><img src="../../images/icon_27.png" style="float: left;"></a>';
		var unfavor = '<a onclick="userCareScoreProductCancel(' + productId + ')" id="unsave" ><img src="../../images/icon_14.png" style="float:left;"></a>';
	}
	var admessage = Name + '仅需' + score + '积分就在掌上'+partnerName+'！'+shareUrl;
	var share_a = '<a href="javascript:share(\'' + admessage + '\');"><img id="share" src="../../images/share_icon.png" style="float: right;"></a>';
	$("#name").html(Name);
	$("#share_a").html(share_a);
	$("#ShortDescription").html(ShortDescription);
	$("#score").html(score);
	$("#favor").html(favor);
	$("#unfavor").html(unfavor);
	setTimeout(function(){
		storePic();
	},500);
}

/**
 * @author wang
 */
var productDetailCacheName;
var brandFavActionTrigger = false;
var scoreId = window.localStorage.getItem("fscoreId");
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
function addsuccess() {
	var width = (document.body.scrollWidth - 228) / 2;
	$("#cart").css("left", width);
	$("#cart").show();
	$("#_mask").show();
}

//商品添加关注
function userCareScoreProduct(productId) {
	var checkStr = getLocalUserValue("checkStr");
	var loginUserId = getLocalUserValue("loginUserId");
	var isMember = getLocalUserValue("isMember");

	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == ''||isMember == 0) {
		goLogin();
	}else {

		var action = userCareScoreProductCancelUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&scoreId=" + productId + "&Type=" + 1 + "&";
		var name = "userCareOrCancelProduct";
		if (checkNetWorkState()) {
			ajaxJson(name, action, reqData, userCareScoreProductSuccess);
		} else {
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
		},2000);
		}
		
	}
}

function userCareScoreProductSuccess() {
	iconShow("saved")
	$("#saved").fadeIn();
	setTimeout(function() {
		$("#saved").fadeOut();
	}, 1000);
	$("#save").hide();
	$("#unsave").show();

}

//商品取消关注
function userCareScoreProductCancel(productId) {
	var checkStr = getLocalUserValue("checkStr");
	var loginUserId = getLocalUserValue("loginUserId");
	var isMember = getLocalUserValue("isMember");
	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == ''||isMember == 0) {
		goLogin();
	}else {
		var action = userCareScoreProductCancelUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&scoreId=" + productId + "&Type=" + 0 + "&";
		var name = "userCareScoreProductCancel";
		if (checkNetWorkState()) {
			ajaxJson(name, action, reqData, userCareScoreProductCancelSuccess);
		} else {
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
		},2000);
		}
		
	}
}

function userCareScoreProductCancelSuccess() {
	iconShow("unsaved")
	$("#unsaved").fadeIn();
	setTimeout(function() {
		$("#unsaved").fadeOut();
	}, 1000);
	$("#unsave").hide();
	$("#save").show();
}
function showTimeIsBegin(time) {
	var self = this;
	window.setTimeout(function() {
		self.showTimeIsBegin(time);
	}, 1000);
	endDay = new Date(time);
	today = new Date();
	timeold = (endDay.getTime() - today.getTime());
	sectimeold = timeold / 1000
	secondsold = Math.floor(sectimeold);
	msPerDay = 24 * 60 * 60 * 1000
	e_daysold = timeold / msPerDay
	daysold = Math.floor(e_daysold);
	e_hrsold = (e_daysold - daysold) * 24;
	hrsold = Math.floor(e_hrsold);
	e_minsold = (e_hrsold - hrsold) * 60;
	minsold = Math.floor((e_hrsold - hrsold) * 60);
	seconds = Math.floor((e_minsold - minsold) * 60);
	if (daysold < 0) {
		$("#remainTime").html("已过期!");
	} else {
		$("#remainTime").html("剩余" + daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒");

	}
}