/**
 * @author wang
 */
var productListPage = 1;
var productListCacheName;
var categoryId = (Request("categoryId"));
var productListByCategoryUrl = "http://mall.v2.linjiahui.com:8080/appclient/productListByCategory.do?";
$(document).ready(function() {
	if (window.localStorage.orderType == undefined) {
		window.localStorage.setItem("orderType", 0);
	}
	var orderType = window.localStorage.orderType;
	productListCacheName = "productListCacheName";
	if (window.localStorage.getItem(productListCacheName + "_" + categoryId + "_" + orderType + "_" + 1) == null) {
		refreshProductListData(categoryId, orderType);
	} else {
		if (true) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshProductListData(categoryId, orderType);
		} else {
			//将缓存中的数据渲染到页面中
			productListSuccess();
		}
	}
	$("#next").bind('click', function(event) {
		var orderType = window.localStorage.getItem("orderType");
		if (window.localStorage.getItem(productListCacheName + "_" + categoryId + "_" + orderType + "_"+productListPage) == null) {
			productListPage++;
			refreshProductListData(categoryId, orderType)
		} else {
			if (true) {
				productListPage++;
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshProductListData(categoryId, orderType)
			} else {
				//将缓存中的数据渲染到页面中
				productListSuccess();
			}
		}
		parent.scroll(0, 0);
	});
	$("#prev").bind('click', function(event) {
		var orderType = window.localStorage.getItem("orderType");
		if (window.localStorage.getItem(productListCacheName + "_" + categoryId + "_" + orderType + "_"+productListPage) == null) {
			productListPage--;
			refreshProductListData(categoryId, orderType)
		} else {
			if (true) {
				productListPage--;
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshProductListData(categoryId, orderType)
			} else {
				//将缓存中的数据渲染到页面中
				productListSuccess();
			}
		}
		parent.scroll(0, 0);
	});
	$("#hotsale").bind('click', function(event) {
		$("#hotsale").addClass("on");
		$("#none-money").show()
		$("#up-money").hide()
		$("#down-money").hide()
		window.localStorage.setItem("orderType", 0);
		productListPage = 1;
		refreshProductListData();
	});
	$("#none-money").click(function() {
		$("#none-money").hide()
		$("#up-money").show()
		$("#down-money").hide()
		$("#hotsale").removeClass("on");
		window.localStorage.setItem("orderType", 1);
		productListPage = 1;
		refreshProductListData();
	});
	$("#up-money").click(function() {
		$("#none-money").hide()
		$("#up-money").hide()
		$("#down-money").show()
		$("#hotsale").removeClass("on");
		window.localStorage.setItem("orderType", 2);
		productListPage = 1;
		refreshProductListData();
	});
	$("#down-money").click(function() {
		$("#none-money").hide()
		$("#up-money").show()
		$("#down-money").hide()
		$("#hotsale").removeClass("on");
		window.localStorage.setItem("orderType", 1);
		productListPage = 1;
		refreshProductListData();
	});
});

function refreshProductListData() {
	var orderType = window.localStorage.getItem("orderType");
	ajaxRequest(productListCacheName + "_" + categoryId + "_" + orderType + "_"+productListPage, productListByCategoryUrl, "condition.curPage=" + productListPage + "&condition.fetchNum=5&categoryId=" + categoryId + "&orderType=" + orderType, productListPage, productListSuccess, productListError, false);
}

function productListSuccess() {
	var orderType = window.localStorage.getItem("orderType");
	var returnData = str2obj(window.localStorage.getItem(productListCacheName + "_" + categoryId + "_" + orderType + "_"+productListPage));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		var Detail = "";
		if (debug == true) {
			console.log(message);
		}
		if (jQuery.isEmptyObject(message)) {
			$("#categoryListDetail").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			return;
		};
		var resultList = message.page.result;
		if (resultList == null) {
			$("#categoryListDetail").html("");
			$("#page").hide();
			$("#emptyDataError").show();
			return;
		};
		if (resultList.length == 0) {
			$("#categoryListDetail").html("");
			$("#emptyDataError").show();
			$("#page").hide();
			return;
		}
		$("#page").show();
		var totalPage = message.page.totalPage;
		showOrHide(productListPage, totalPage)
		$("#pageNum").html(productListPage + "/" + totalPage);
		for (var i = 0; i < resultList.length; i++) {
			var Name = resultList[i].name;
			var imageUrl = resultList[i].pictureUrl;
			var Price = resultList[i].price;
			var productId = resultList[i].id;
			Detail += '<a href="javascript:toProductDetail(' + productId + ',\'' + '商品详情' + '\');"><div class="box first" style="height:auto;background:url(../../img/lib/arrow.png) center right no-repeat;margin-right:6px;"><table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + imageUrl + '" alt="" width="98"/></td><td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br><span style="float:left;margin-top: 35px"> <font color="red" style="font-family:Arial;font-size: 0.875em;">价格：&yen;' + Price + '</font> <span><div class="p-detail" style="width:180px; float:right"></div></td></tr></tbody></table></div> </a>';
		};
		$("#categoryListDetail").html(Detail);
	};
}
function toProductDetail(id, name) {
	var locator = "http://m.v2.linjiahui.com/html/shop/productDeatil.html?id=" + id
	toDetail(locator, name);
}
function productListError() {
	//TODO
}
