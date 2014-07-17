$(function() {
	$("menu>ul>li").bind('mouseover', function(event) {
		$(this).removeClass("transparent_class");
		$(this).css("background-color", "#666666");
		$('menu>ul>li').not(this).addClass("transparent_class");
		$('menu>ul>li').not(this).css("background-color", "#000000");
	});
	$("menu>ul>li").bind('click', function(event) {
		$(this).removeClass("transparent_class");
		$(this).css("background-color", "#666666");
		$('menu>ul>li').not(this).addClass("transparent_class");
		$('menu>ul>li').not(this).css("background-color", "#000000");
	});
	if (window.localStorage.getItem("searchIndex") == null) {
		refreshSearchIndexData();
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshSearchIndexData();
		} else {
			//将缓存中的数据渲染到页面中
			searchIndexSuccess();
		}
	}
})
function refreshSearchIndexData() {
	ajaxRequest("searchIndex", advertKeywordListUrl, "", null, searchIndexSuccess, searchIndexError, false);
}

function searchIndexSuccess() {
	var returnData = str2obj(window.localStorage.getItem("searchIndex"));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		var searchIndexHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.advertKeywordList;
		if (resultList == null || resultList == '') {
			$("#data").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			window.localStorage.removeItem("searchIndex");
			return;
		};
		if (resultList.length == 0) {
			$("#data").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			window.localStorage.removeItem("searchIndex");
			return;
		}
		var searchHTML = "";
		for (var i = 0; i < resultList.length; i++) {
			var locator = resultList[i].locator;
			var pictureUrl = resultList[i].pictureUrl;
			var keyWord = resultList[i].keyWord;
			searchHTML += '<div class="search-div" onclick="toKeyWordDetail(\'' + locator + '\',\'' + keyWord + '\')">';
			searchHTML += '<p style="text-align: center;padding-top:10px;"><img src="' + pictureUrl + '" class="div-img"></p><p style="text-align: center;padding-top: 10px"><strong>' + keyWord + '</strong></p></div>';
		};
		$("#data").html(searchHTML)
	};
}

function searchIndexError() {

}

function toKeyWordDetail(locator, keyWord) {
	if (locator == '' || locator == null || locator == undefined) {
		$("#keyword").val(keyWord)
		search();
	} else {
		showAdWithTitle(locator,keyWord);
	}

}
