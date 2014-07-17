var userCardConsumeListPage = 1;
var queryType = '';
if (queryType == null || queryType == undefined || queryType == '') {
	queryType = 1;
	setLocalvalue("queryType", queryType);
};
var cardId = getLocalValue("cardId");
var userCardConsumeListCacheName;
$(document).ready(function() {
	userCardConsumeListCacheName = "userCardConsumeListCacheName";
	if (window.localStorage.getItem(userCardConsumeListCacheName + "_" + cardId + "_" + queryType + "_" + userCardConsumeListPage) == null) {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshuserCardConsumeListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}

	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshuserCardConsumeListData();
		} else {
			//将缓存中的数据渲染到页面中
			userCardConsumeListSuccess();
		}
	}
	$("#next").bind('click', function(event) {

		if (window.localStorage.getItem(userCardConsumeListCacheName + "_" + cardId + "_" + queryType + "_" + userCardConsumeListPage) == null) {
			if (checkNetWorkState()) {
				userCardConsumeListPage++;
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshuserCardConsumeListData();
			} else {
				//将缓存中的数据渲染到页面中
				goError();
			}
		} else {
			userCardConsumeListPage++;
			if (checkNetWorkState()) {
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshuserCardConsumeListData();
			} else {
				//将缓存中的数据渲染到页面中
				userCardConsumeListSuccess();
			}
		}
		parent.scroll(0, 0);
	});
	$("#prev").bind('click', function(event) {

		if (window.localStorage.getItem(userCardConsumeListCacheName + "_" + cardId + "_" + queryType + "_" + userCardConsumeListPage) == null) {

			if (checkNetWorkState()) {
				userCardConsumeListPage--;
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshuserCardConsumeListData();
			} else {
				//将缓存中的数据渲染到页面中
				goError();
			}
		} else {
				userCardConsumeListPage--;
			if (checkNetWorkState()) {
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshuserCardConsumeListData();
			} else {
				//将缓存中的数据渲染到页面中
				userCardConsumeListSuccess();
			}
		}
		parent.scroll(0, 0);
	});
	$(".tab-lst>li[class='tab-li']>a").bind('click', function(event) {
		if ($(this).attr("class") != 'on') {
			$(".tab-lst>li[class='tab-li']>a").removeClass('on');
			$(this).addClass("on");
		};
		queryType = $(this).attr("name");
		setLocalvalue("queryType", queryType);
		userCardConsumeListPage = 1;
		if (window.localStorage.getItem(userCardConsumeListCacheName + "_" + cardId + "_" + queryType + "_" + userCardConsumeListPage) == null) {
			if (checkNetWorkState()) {
				refreshuserCardConsumeListData();
			} else {
				//将缓存中的数据渲染到页面中
				goError();
			}

		} else {
			if (checkNetWorkState()) {
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshuserCardConsumeListData();
			} else {
				//将缓存中的数据渲染到页面中
				userCardConsumeListSuccess();
			}
		}
	});
});
function refreshuserCardConsumeListData() {
	ajaxRequest(userCardConsumeListCacheName + "_" + cardId + "_" + queryType + "_" + userCardConsumeListPage, userCardConsumeListUrl, "queryType=" + queryType + "&cardId=" + cardId + "&pageIndex=" + userCardConsumeListPage + "&pageSize=10", userCardConsumeListPage, userCardConsumeListSuccess, userCardConsumeListError, true);
}

function userCardConsumeListSuccess() {
	var returnData = str2obj(window.localStorage.getItem(userCardConsumeListCacheName + "_" + cardId + "_" + queryType + "_" + userCardConsumeListPage));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		var userCardConsumeListHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.cardConsumeList;
		if (resultList == null) {
			$("#dataList").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			return;
		};
		if (resultList.length == 0) {
			$("#dataList").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			return;
		}
		$("#page").show();
		$("#emptyDataError").hide();
		var totalPage = message.totalPage;
		showOrHide(userCardConsumeListPage, totalPage);
		$("#pageNum").html(userCardConsumeListPage + "/" + totalPage);
		for (var i = 0; i < resultList.length; i++) {
			var tranId = resultList[i].tranId;
			var cardNo = resultList[i].cardNo;
			var consumeTime = resultList[i].consumeTime;
			var storeName = resultList[i].storeName;
			var money = resultList[i].money;
			var score = resultList[i].score;
			userCardConsumeListHTML += '<a href="javascript:;" onclick="toConsumeDetail(' + cardNo + ',\'' + tranId + '\',' + money + ',' + score + ')"><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;margin-right:6px;margin-top: -10px">';
			userCardConsumeListHTML += '<table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr style="height:36px"><td colspan="2" style="color: #373737;font-size: 15px;">' + consumeTime + '</td></tr>';
			userCardConsumeListHTML += '<tr><td width="50%" ><span style="color:#da2c2c;font-size:15px">消费金额：￥' + money + '</span></td><td><span style="color:#373737 ;font-size:15px">获得积分：' + score + '</span></td></tr></tbody></table></div></a>';
		};
		$("#dataList").html(userCardConsumeListHTML);
	};
}

function userCardConsumeListError() {
	//TODO
}

function toConsumeDetail(cardNo,tranId,money,score) {
	setLocalvalue("tranId", tranId);
	setLocalvalue("cardNo", cardNo);
	setLocalvalue("consumeDetail_money", money);
	setLocalvalue("consumeDetail_score", score);
	var locator = domain + "/html/memberCenter/consumeDetail.html";
	//alert(locator)
	toDetail(locator, "账单详情");
}