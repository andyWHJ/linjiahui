var productSearchPage = 1;
var productSearchListCacheName;
var productScoreSearchPage = 1;
var productScoreSearchListCacheName;
var productPromotionSearchPage = 1;
var productPromotionSearchListCacheName;
var keyword = $("#keyword").val();
$(function() {
	$("form").bind("submit", function(e) {
		search();
		return false;
	})
	$("#relativity").bind('click', function(event) {
		$("#relativity").addClass("on");
		moneySort();
		hotSort();
		window.localStorage.setItem("sortType", 0);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	$("#none-money").click(function() {
		$("#none-money").hide()
		$("#up-money").show()
		$("#down-money").hide()
		hotSort();
		$("#relativity").removeClass("on");
		window.localStorage.setItem("sortType", 1);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	$("#up-money").click(function() {
		$("#none-money").hide()
		$("#up-money").hide()
		$("#down-money").show()

		hotSort();
		$("#relativity").removeClass("on");
		window.localStorage.setItem("sortType", 2);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	$("#down-money").click(function() {

		$("#none-money").hide()
		$("#up-money").show()
		$("#down-money").hide()

		hotSort();
		$("#relativity").removeClass("on");
		window.localStorage.setItem("sortType", 1);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	$("#none-hot").click(function() {

		moneySort();

		$("#none-hot").hide()
		$("#up-hot").show()
		$("#down-hot").hide()
		$("#relativity").removeClass("on");
		window.localStorage.setItem("sortType", 3);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	$("#up-hot").click(function() {

		moneySort();

		$("#none-hot").hide()
		$("#up-hot").hide()
		$("#down-hot").show()
		$("#relativity").removeClass("on");
		window.localStorage.setItem("sortType", 4);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	$("#down-hot").click(function() {

		moneySort();

		$("#none-hot").hide()
		$("#up-hot").show()
		$("#down-hot").hide()
		$("#relativity").removeClass("on");
		window.localStorage.setItem("sortType", 3);
		productSearchPage = 1;
		refreshProductSearchListData();
	});
	moneySort = function() {
		$("#none-money").show()
		$("#up-money").hide()
		$("#down-money").hide()
	}
	hotSort = function() {
		$("#none-hot").show()
		$("#up-hot").hide()
		$("#down-hot").hide()
	}
	if ($("#keyword").val()) {
		if (window.localStorage.getItem("searchType") == 1) {
			var sepcSortType = window.localStorage.getItem("sepcSortType")
			search()
			if (parseInt(sepcSortType) == 0) {
				$("#relativity").click();
			} else if (parseInt(sepcSortType) == 1) {
				$("#down-money").click();
			} else if (parseInt(sepcSortType) == 2) {
				$("#up-money").click();
			} else if (parseInt(sepcSortType) == 3) {
				$("#down-hot").click();
			} else if (parseInt(sepcSortType) == 4) {
				$("#up-hot").click();
			};
		} else if (window.localStorage.getItem("searchType") == 2) {

		} else if (window.localStorage.getItem("searchType") == 3) {

		}
	}

})
$("#next").bind('click', function(event) {
	var searchType = window.localStorage.getItem("searchType");
	if (searchType == 1) {
		productSearchPage++;
		refreshProductSearchListData();
	} else if (searchType == 3) {
		productScoreSearchPage++;
		refreshProductScoreSearchListData();
	}
	parent.scroll(0, 0);
});
$("#prev").bind('click', function(event) {
	var searchType = window.localStorage.getItem("searchType");
	if (searchType == 1) {
		productSearchPage--;
		refreshProductSearchListData();
	} else if (searchType == 3) {
		productScoreSearchPage--;
		refreshProductScoreSearchListData();
	}
	parent.scroll(0, 0);
});
function search() {
	if (checkNetWorkState()) {
			keyword = $("#keyword").val();
	if (keyword == '') {
		$(".cart-succ").html("请输入搜索关键字");
		var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	}
	//window.localStorage.setItem("productKeyWord", keyword);
	//window.location.href = "productSearchList.html";\
	var searchType = $("#default").attr("name");
	window.localStorage.setItem("searchType", searchType);
	if (searchType == 1) {
		$("#relativity").click();
		productSearchListCacheName = "productSearchListCacheName" + productSearchPage;
		if (window.localStorage.getItem(productSearchListCacheName) == null) {
			refreshProductSearchListData();
		} else {
			productSearchSuccess();
			refreshProductSearchListData();
		}
	} else if (searchType == 2) {
		productPromotionSearchPage=1;
		productPromotionSearchListCacheName = "productPromotionSearchListCacheName" + productPromotionSearchPage;
		if (window.localStorage.getItem(productPromotionSearchListCacheName) == null) {
			refreshProductPromotionSearchListData();
		} else {
			productPromotionSearchSuccess();
			refreshProductPromotionSearchListData();
		}
	} else if (searchType == 3) {
		productScoreSearchPage=1;
		productScoreSearchListCacheName = "productScoreSearchListCacheName" + productScoreSearchPage;
		if (window.localStorage.getItem(productScoreSearchListCacheName) == null) {
			refreshProductScoreSearchListData();
		} else {
			productScoreSearchSuccess();
			refreshProductScoreSearchListData();
		}
	}
		} else {
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

function refreshProductSearchListData() {
	var sortType = window.localStorage.getItem("sortType");
	ajaxRequest(productSearchListCacheName, productSearchUrl, "sortType=" + sortType + "&keyWord=" + encodeURI(keyword) + "&condition.curPage=" + productSearchPage + "&condition.fetchNum=10", productSearchPage, productSearchSuccess, productSearchError, false)
}

function productSearchSuccess() {
	$("#dataList").hide();
	$("#nextpage").hide();
	var returnData = str2obj(window.localStorage.getItem(productSearchListCacheName));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {

		var message = returnData.data;
		var productHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.result.result;
		if (resultList == null) {
			$("#data").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			$("#sortTypeMenus").hide();
			window.localStorage.removeItem(productSearchListCacheName);
			return;
		};
		if (resultList.length == 0) {
			$("#data").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			$("#sortTypeMenus").hide();
			window.localStorage.removeItem(productSearchListCacheName);
			return;
		}
		$("#data").show();
		$("#emptyDataError").hide();
		$("#sortTypeMenus").show();
		$("#page").show();
		var currentPage = message.result.currentPage;
		var totalPage = message.result.totalPage;
		showOrHide(currentPage, totalPage);
		$("#pageNum").html(currentPage + "/" + totalPage);

		for (var i = 0; i < resultList.length; i++) {
			var id = resultList[i].id;
			var pictureUrl = resultList[i].pictureUrl;
			var name = resultList[i].name;
			var price = resultList[i].price;
			productHTML += '<a href="javascript:toSearchProductDetail(' + id + ',\'' + name + '\');"><div class="box first" style="height:auto;background:url(../../images/new/right.png) center right no-repeat;margin-right:6px;">';
			productHTML += '<table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + pictureUrl + '"  alt="" height="100" width="100"/></td>';
			productHTML += '<td  valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 14px;" >' + name + '</div><div class="p-detail" style="width:180px; float:left;margin-top: 20px">';
			productHTML += '<span style="float:left">价格： <font color="red" style="font-family:Arial;font-weight:bold">&yen;' + price + '</font> <span></div></td></tr></tbody></table></div></a>';
		};
		$("#data").html(productHTML);
	};
}

function productSearchError() {

}

function toSearchProductDetail(id, name) {
	window.localStorage.setItem("sepcSortType",window.localStorage.getItem("sortType"));
	var locator="../../html/shop/productDeatil.html?id="+id
	toDetail(locator,name);
}

function refreshProductPromotionSearchListData() {
	ajaxRequest(productPromotionSearchListCacheName, promotionSearchUrl, "keyWord=" + encodeURI(keyword) + "&condition.curPage=" + productPromotionSearchPage + "&condition.fetchNum=4", productPromotionSearchPage, productPromotionSearchSuccess, productPromotionSearchError, false);
}

function productPromotionSearchSuccess() {
	$("#sortTypeMenus").hide();
	$("#page").hide();
	var returnData = str2obj(window.localStorage.getItem(productPromotionSearchListCacheName));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		
		var message = returnData.data;
		var productPromotionHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.result.result;
		if (resultList == null) {
			$("#leftPic").html('');
			$("#rightPic").html('');
			$("#nextpage").hide();
			$("#data").hide();
			$("#emptyDataError").show();
			window.localStorage.removeItem(productPromotionSearchListCacheName);
			return;
		};
		if (resultList.length == 0) {
			$("#leftPic").html('');
			$("#rightPic").html('');
			$("#nextpage").hide();
			$("#data").hide();
			$("#emptyDataError").show();
			window.localStorage.removeItem(productPromotionSearchListCacheName);
			return;
		}
		$("#emptyDataError").hide();
		$("#data").hide();
		$("#parting-line").show();
		$("#dataList").show();
		var totalPage = message.result.totalPage;
		var currentPage = message.result.currentPage;
		if (currentPage == totalPage) {
			$("#nextpage").hide();
		} else {
			$("#nextpage").show();
		}
		var leftPicObj = $("#leftPic");
		var rightPicObj = $("#rightPic");
		if (currentPage == 1) {
			leftPicObj.html('');
			rightPicObj.html('');
		};
		var leftHeight = 0;
		var rightHeight = 0;

		for (var i in resultList) {
			var item = resultList[i];
			leftHeight = $("#leftPic").height();
			rightHeight = $("#rightPic").height();

			if (leftHeight > rightHeight) {
				//如果右侧高度小，则追加到右侧
				var trHead = '<div class="blockRight" onclick="goPromotionDetail(\'' + item.locator + '\',\'' + item.title + '\',\'' + item.price + '\',' + item.id + ')">';
				var trPic = '<img style="min-height:7em" src="' + item.pictureUrl + '" id="p' + item.id + '">';
				var trTitle = '<div class="pictitle"><div class="subject">' + item.title + '</div>';
				var trDigest = '<div ><div class="subject" style="color:#373737">' + item.digest + '</div>';
				var trAddinfo = "";
				if (item.remainDay != 0 || item.price != 0) {
					trAddinfo += '<div class="addinfo">';
				};
				if (item.remainDay != 0 && item.remainDay != null && item.remainDay != '' && item.remainDay != undefined) {
					trAddinfo += '<div class="author">有效期:剩余' + item.remainDay + '天 </div>';
				};
				if (item.price != 0 && item.price != null && item.price != '' && item.price != undefined) {
					trAddinfo += '<div class="promotion-price">￥' + item.price + '</div>';
				};
				tr = trHead + trPic + trTitle + trDigest + trAddinfo + '</div></div>';
				rightPicObj.append(tr);
			} else {
				//反之，如果右侧高度大，则追加到左侧
				var trHead = '<div class="blockLeft" onclick="goPromotionDetail(\'' + item.locator + '\',\'' + item.title + '\',\'' + item.price + '\',' + item.id + ')">';
				var trPic = '<img style="min-height:7em" src="' + item.pictureUrl + '" id="p' + item.id + '">';
				var trTitle = '<div class="pictitle"><div class="subject">' + item.title + '</div>';
				var trDigest = '<div ><div class="subject" style="color:#373737">' + item.digest + '</div>';
				var trAddinfo = "";

				if (item.remainDay != 0 || item.price != 0) {
					trAddinfo += '<div class="addinfo">';
				};
				if (item.remainDay != 0 && item.remainDay != null && item.remainDay != '' && item.remainDay != undefined) {
					trAddinfo += '<div class="author">有效期:剩余' + item.remainDay + '天 </div>';
				};
				if (item.price != 0 && item.price != null && item.price != '' && item.price != undefined) {
					trAddinfo += '<div class="promotion-price">￥' + item.price + '</div>';
				};
				tr = trHead + trPic + trTitle + trDigest + trAddinfo + '</div></div>';
				leftPicObj.append(tr);
			}
		}
		$("#nextpage").text("点击查看更多");
	};
}

function productPromotionSearchError() {

}

function goPromotionDetail(locator,title,price,id) {
	setLocalvalue("promotionDetail",locator);
	setLocalvalue("promotionId",id);
	setLocalvalue("promotionTitle",title);
	setLocalvalue("price", price);
	var message = '';
	if(price == 0 || price == null){
		message = title + "就在掌上"+partnerName+"！";
	}else {
		message = title +"仅售"+ price +  "元,就在掌上"+partnerName+"!"+shareUrl;
	}
	setLocalvalue("shareMessage",message);
	var url=domain+"/html/home/promotionDetail.html"
	showBottombarDetail(url,title, message);
}

function getMorePic() {
	productPromotionSearchPage++;
	$("#nextpage").text("数据加载中……");
	refreshProductPromotionSearchListData();
}

function refreshProductScoreSearchListData() {
	ajaxRequest(productScoreSearchListCacheName, productScoreSearchUrl, "keyWord=" + encodeURI(keyword) + "&condition.curPage=" + productScoreSearchPage + "&condition.fetchNum=5", productScoreSearchPage, productScoreSearchSuccess, productScoreSearchError, false);
}

function productScoreSearchSuccess() {
	$("#sortTypeMenus").hide();
	$("#dataList").hide();
	$("#nextpage").hide();
	$("#data").show();
	var returnData = str2obj(window.localStorage.getItem(productScoreSearchListCacheName));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		var productScoreHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.result.result;
		if (resultList == null) {
			$("#data").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			window.localStorage.removeItem(productScoreSearchListCacheName);
			return;
		};
		if (resultList.length == 0) {
			$("#data").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			window.localStorage.removeItem(productScoreSearchListCacheName);
			return;
		}
		$("#emptyDataError").hide();
		var totalPage = message.result.totalPage;
		if (totalPage>1) {
			$("#page").show();
			var currentPage = message.result.currentPage;			
			showOrHide(currentPage, totalPage);
			$("#pageNum").html(currentPage + "/" + totalPage);
		}else{
			$("#page").hide();
		}
		for (var i = 0; i < resultList.length; i++) {
			var id = resultList[i].id;
			var pictureUrl = resultList[i].pictureUrl;
			var title = resultList[i].title;
			var digest = resultList[i].digest;
			var score = resultList[i].score;
			var remainDay = resultList[i].remainDay;
			productScoreHTML += '<a href="javascript:toScoreDetail(' + id + ',\'' + title + '\');"><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;padding:6px 0 6px 0;">';
			productScoreHTML += '<table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;padding-left:16px;" width="78px"><img src="' + pictureUrl + '"  alt="" height="72" width="78"/></td>';
			productScoreHTML += '<td  valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + title  + '</div><br/>';
			//productScoreHTML += '<div class="p-detail" style="width:180px; float:left;margin-top: 20px"><span style="float:left">积分： <font color="red" style="font-family:Arial;font-weight:bold">' + score + '</font> <span></div></td></tr></tbody></table></div></a>';
			productScoreHTML += '<div style="float:left;"> <font color="red" style="font-family:Arial;font-weight:bold">剩余' + remainDay + '天</font></div> <div style="float:right;padding-right:' + 0.1 * $(window).width() + 'px;"> <font color="red" style="font-family:Arial;font-weight:bold">积分：' + score + '</font> </div></td></tr></tbody></table></div> </a>';
		};
		$("#data").html(productScoreHTML);
	};
}

function productScoreSearchError() {

}

function toScoreDetail(id, name) {
	setLocalvalue("scoreExchangeId",id);//add
	var locator=domain+"/html/userPoints/productDeatil.html"
	toDetail(locator,name);
}
