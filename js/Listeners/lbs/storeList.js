var storeListCacheName;
var begin = 0;
var longtitudeAndLatitude;
if (debug) {
	longtitudeAndLatitude = "longtitude=" + 116.386 + "&latitude=" + 39.98;
} else {
	longtitudeAndLatitude = getLongtitudeAndLatitudeStr();
}
function searchStore() {
	if (checkNetWorkState()) {
			var keyword = $("#keyword").val();
	if (keyword == '') {
		$(".cart-succ").html("请输入搜索关键字");
		var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	begin=0;
	refreshStoreListData();
		}else{
			$(".cart-succ").html("网络异常,请检查您的网络!");
			var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
		}
	
}

$(function() {
	var scrollleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var left = scrollleft - 115 + (allWidth / 2);
	$("#emptyDataError").css('text-align', "center");
	$("form").bind("submit", function(e) {
		searchStore();
		return false;
	})
	storeListCacheName = "storeListCacheName_" + begin;
	if (window.localStorage.getItem(storeListCacheName) == null) {
		refreshStoreListData();
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshStoreListData();
		} else {
			//将缓存中的数据渲染到页面中
			storeListSuccess();
		}
	}
	$("#next").bind('click', function(event) {
		begin++;
		if (window.localStorage.getItem(storeListCacheName) == null) {
		refreshStoreListData();
		} else {
			if (checkNetWorkState()) {
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshStoreListData();
			} else {
				//将缓存中的数据渲染到页面中
				storeListSuccess();
			}

		}
		parent.scroll(0, 0);
	});
	$("#prev").bind('click', function(event) {
		begin--;
		if (window.localStorage.getItem(storeListCacheName) == null) {
			refreshStoreListData();
		} else {
			if (checkNetWorkState()) {
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshStoreListData();
			} else {
				//将缓存中的数据渲染到页面中
				storeListSuccess();
			}

		}
		parent.scroll(0, 0);
	});
})
function refreshStoreListData() {
	var reqData = longtitudeAndLatitude + "&fetchNum=10&begin=" + begin+"&maxDistance=6000";
	var keyword = $("#keyword").val();
	if (!keyword == '') {
		reqData += ('&searchStoreName=' + keyword);
	}
	ajaxRequest(storeListCacheName, complexLbsStorePageList, reqData, begin, storeListSuccess, storeListErroe, false);
}

function storeListSuccess() {
	var returnData = str2obj(window.localStorage.getItem(storeListCacheName));
	if (returnData.status == 0) {
		$("#emptyDataError").hide();
		var message = returnData.data;
		if (message == null) {
			alert("没有相关数据");
			return;
		};
		var markers = message.lbsData.markers;
		var totalPage = message.lbsData.allPages;
		if (totalPage>1) {
			$("#page").show();
			showOrHide((begin+1), totalPage)
			$("#pageNum").html((begin+1) + "/" + totalPage);
		}else{
			$("#page").hide();
		}
		var storeHtml = '';
		for (var i = 0; i < markers.length; i++) {
			var title = markers[i].title;
			var content = markers[i].content;
			var storeId = markers[i].storeId;
			var point = markers[i].point;
			var storeData=obj2str(markers[i]);
			if (i == 0) {
				storeHtml += "<a href='javascript:;' onclick='toStoreDetail("+storeData+")'><div class='box first' style='height:auto;background:url(../../images/right.png) center right no-repeat;margin-right: 6px;padding:15px 6px;'><table cellspacing='0' cellpadding='0' class='tab' width='95%'><tbody><tr style='height:36px'><td colspan='2' style='color: #373737;font-size: 16px;'>" + title + "：</td></tr><tr><td width='50%'><div style='color:#da2c2c;font-size:16px;padding-right:50px;'>" + content + "</div></td></tr></tbody></table></div></a>";
			} else {
				storeHtml += "<a href='javascript:;' onclick='toStoreDetail("+storeData+")'><div class='box first' style='height:auto;background:url(../../images/right.png) center right no-repeat;margin-right:6px;margin-top: -10px;'><table cellspacing='0' cellpadding='0' class='tab' width='95%'><tbody><tr style='height:36px'><td colspan='2' style='color: #373737;font-size: 16px;'>"+ title + "：</td></tr><tr><td width='50%'><div style='color:#da2c2c;font-size:16px;padding-right:50px;'>" + content + "</div></td></tr></tbody></table></div></a>";
			}
		};
		$("#dataList").html(storeHtml)
	} else if (returnData.status == 5001) {
		$("#dataList").html("");
		$("#emptyDataError").show();
		$("#page").hide();
	}
}

function storeListErroe() {

}

function toStoreDetail(obj) {
	goMapDetail(obj);
}
