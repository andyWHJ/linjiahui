//用户登陆参数整合
var localreqData = str2obj(window.localStorage.localreqData);

if (localreqData == null) {
	//登录用户Id
	var loginUserId = Request("loginUserId");
	//校验字符串
	var checkStr = Request("checkStr");
	//是否是会员标识
	var isMember = Request("isMember");
	//用户登陆参数定义
	var reqData = "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	//将用户信息写入到本地数据库
	var localreqData = {
		"loginUserId" : loginUserId,
		"checkStr" : checkStr,
		"isMember" : isMember
	};
	window.localStorage.setItem("localreqData", obj2str(localreqData));
} else {
	//登录用户Id
	var loginUserId = localreqData.loginUserId;
	//校验字符串
	var checkStr = localreqData.checkStr;
	//是否是会员标识
	var isMember = localreqData.isMember;
	var reqData = "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
}
/*
//鎵撳紑澶у浘浣跨敤showad鏂规硶
function goDetail(locator) {
window.ljhWebview.showAd(locator);
}*/

//商品推荐数据获取
function recommendProduct() {
	var action = recommendProductUrl;
	var reqData = "";
	var name = "recommendProduct";
	ajaxJson(name, action, reqData, recommendProductPage);
}

//商品推荐渲染
function recommendProductPage() {

	var returnData = str2obj(window.localStorage.recommendProduct);
	var Detail = "";
	for (var i = 0; i < returnData.data.page.result.length; i++) {
		var Name = returnData.data.page.result[i].title;
		var imageUrl = returnData.data.page.result[i].pictureUrl;
		imageUrl = replacePic(imageUrl, 's') ;
		Price = returnData.data.page.result[i].price;
		locator = returnData.data.page.result[i].locator;
		Detail += '<a onclick="showAd(\'' + locator + '\')"><div class="box first" style="height:auto;background:url(../../img/lib/arrow.png) center right no-repeat;margin-right:6px;"><table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + imageUrl + '" alt="" width="98" height="98"/></td><td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br><span style="float:left;margin-top: 35px"> <font color="red" style="font-family:Arial;font-size: 0.875em;">价格：&yen;' + Price + '</font> <span><div class="p-detail" style="width:180px; float:right"></div></td></tr></tbody></table></div> </a>';
	}

	$("#categoryListDetail").html(Detail);

}

//推荐广告跳转带机型判断
function showAd(locator) {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("android") >= 0) {
		var loginUserId = Request("loginUserId");
		//校验字符串
		var checkStr = Request("checkStr");
		//是否是会员标识
		var isMember = Request("isMember");
		locator = locator + "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember;
		window.ljhWebview.showAd(locator);
	} else if (ua.indexOf("iphone") >= 0) {
		window.location.href = 'objc://m.v2/fun=showAd:&param1=' + locator;
	}
}

//商品详情跳转带机型判断
function goDetail(locator, name) {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("android") >= 0) {
		window.ljhWebview.showDetail(locator, name);
	} else if (ua.indexOf("iphone") >= 0) {
		window.location.href = "objc://m.v2/fun=showDetail:url:&param1=" + name + "&param2=" + locator;
	}
}

function toProductDetail(id, name) {
	var locator = "http://m.v2.linjiahui.com/html/shop/productDeatil.html?id=" + id
	toDetail(locator, name);
}

//商品分类数据获取
function categoryList() {
	var action = categoryListUrl;
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	var name = "categoryList";
	ajaxJson(name, action, reqData, categoryListPage);
}

//商品分类渲染
function categoryListPage() {

	var returnData = str2obj(window.localStorage.categoryList);

	var Detail = "";
	for (var i = 0; i < returnData.data.list.length; i++) {
		var Name = returnData.data.list[i].name;
		var imageUrl = returnData.data.list[i].pictureUrl;
		imageUrl = replacePic(imageUrl, 's') ;
		var categoryId = returnData.data.list[i].id;
		Detail += '<a href="categoryListPage.html?categoryId=' + categoryId + '&' + 'name=' + Name + '"><div class="box first" style="height:auto;background:url(../../img/lib/arrow.png) center right no-repeat;margin-right:6px;"><table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + imageUrl + '" alt="" width="100"/></td><td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;margin-top: 35px" >' + Name + '</div><br><div class="p-detail" style="width:180px; float:right"></div></td></tr></tbody></table></div> </a>';
	}

	$("#categoryListDetail").html(Detail);

}

$(function() {
	var curPage = 1;
	$("#next").bind('click', function(event) {
		curPage++;
		var orderType = window.localStorage.orderType;
		var categoryId = Request("categoryId");
		productListByCategory(categoryId, orderType, curPage)
	});
	$("#prev").bind('click', function(event) {
		curPage--;
		var orderType = window.localStorage.orderType;
		var categoryId = Request("categoryId");
		productListByCategory(categoryId, orderType, curPage)
	});
})
//商品列表数据获取
function productListByCategory(categoryId, orderType, curPage) {

	var action = productListByCategoryUrl;
	var reqData = "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&categoryId=" + categoryId + "&orderType=" + orderType + "&condition.curPage=" + curPage + "&condition.fetchNum=10";
	var name = "productListByCategory";
	window.localStorage.setItem("orderType", orderType);
	//window.localStorage.setItem("categoryListName", Name);
	ajaxJson(name, action, reqData, productListByCategoryDetail);
}

//商品列表渲染
function productListByCategoryDetail() {

	var returnData = str2obj(window.localStorage.productListByCategory);

	//当前分类ID
	var categoryId = Request("categoryId");
	if (returnData.data.page.result == "") {
		var Detail = '<div class="t-lists"><div class="refill tc" style="margin-top:200px">此分类下还没有商品，<a href=categoryList.html>点我回列表</a><div></div>';
		$("#page").hide();
	} else {
		$("#page").show();
		var Detail = "";
		for (var i = 0; i < returnData.data.page.result.length; i++) {
			var Name = returnData.data.page.result[i].name;
			var imageUrl = returnData.data.page.result[i].pictureUrl;
			imageUrl = replacePic(imageUrl, 's') ;
			Price = returnData.data.page.result[i].price;
			productId = returnData.data.page.result[i].id;
			Detail += '<a href="javascript:toProductDetail(' + productId + ',\'' + '商品详情' + '\');"><div class="box first" style="height:auto;background:url(../../img/lib/arrow.png) center right no-repeat;margin-right:6px;"><table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td class="p-img" style="float:none;" width="105px"><img src="' + imageUrl + '" alt="" width="98"/></td><td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;" >' + Name + '</div><br><span style="float:left;margin-top: 35px"> <font color="red" style="font-family:Arial;font-size: 0.875em;">价格：&yen;' + Price + '</font> <span><div class="p-detail" style="width:180px; float:right"></div></td></tr></tbody></table></div> </a>';
		}
	}
	//当前排序方式
	var orderType = window.localStorage.orderType;
	if (orderType == 0) {
		var TopButton = '<ul class="tab-lst"><li class="tab-li"><a onclick="productListByCategory(' + categoryId + ',0,1)" class="on" ><span class="on"></span>热卖</a></li><li class="tab-li"><a onclick="productListByCategory(' + categoryId + ',1,1)">价格</a></li></ul>';
	} else if (orderType == 1) {
		var TopButton = '<ul class="tab-lst"><li class="tab-li"><a onclick="productListByCategory(' + categoryId + ',0,1)" >热卖</a></li><li class="tab-li"><a onclick="productListByCategory(' + categoryId + ',2,1)" class="on" style="background:url(../../img/navigation_up.png) 85% 50% no-repeat" ><span class="on"></span>价格</a></li></ul>';
	} else if (orderType == 2) {
		var TopButton = '<ul class="tab-lst"><li class="tab-li"><a onclick="productListByCategory(' + categoryId + ',0,1)" >热卖</a></li><li class="tab-li"><a onclick="productListByCategory(' + categoryId + ',1,1)"  class="on" style="background:url(../../img/navigation_down.png) 85% 50% no-repeat" ><span class="on"></span>价格</a></li></ul>';
	}
	//当前页码
	var pageIndex = returnData.data.page.currentPage;

	//总页数
	var totalPage = returnData.data.page.totalPage;
	//上一页
	if (pageIndex > 1) {
		var backPageNumber = pageIndex - 1;
	} else {
		var backPageNumber = pageIndex;
	}
	//下一页
	if (returnData.data.page.totalPage > pageIndex) {
		//		console.log("page="+pageIndex);
		var nextPageNumber = pageIndex + 1;
	} else {
		var nextPageNumber = pageIndex;
	}

	//页码与翻页
	//var page = '<div class="refill tc"><a class="next" href="#" onclick=productListByCategory(' + categoryId + ',' + orderType + ',' + backPageNumber + ')  style="color:grey;">上一页</a>  ' + pageIndex + '/' + totalPage + ' <a class="next" href="#" onclick=productListByCategory(' + categoryId + ',' + orderType + ',' + nextPageNumber + ')>下一页<span></span></a></div>';
	//if (returnData.data.page.result == "") {
	//	page = "";
	//}
	
	showOrHide(pageIndex, totalPage);
	$("#pageNum").html(pageIndex + "/" + totalPage);
	$("#categoryListDetail").html(Detail);
	$("#TopButton").html(TopButton);

}

//商品详情数据获取
function productById(productId) {
	var action = productByIdUrl;
	//登录用户Id
	var loginUserId = Request("loginUserId");
	//校验字符串
	var checkStr = Request("checkStr");
	//是否是会员标识
	var isMember = Request("isMember");

	var reqData = "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&productId=" + productId + "&";
	var name = "productById";
	ajaxJson(name, action, reqData, productDetail);
}

//商品详情渲染
function productDetail() {
	var returnData = str2obj(window.localStorage.productById);
	var Name = returnData.data.product.name;
	var PictureUrls = returnData.data.product.pictureUrls;
	console.warn(PictureUrls)
	var productId = returnData.data.product.id;
	var imgHTML = "";
	var liHTML = "";
	for (var i = 0; i < PictureUrls.length; i++) {
		imgHTML += '<figure><div class="wrap"><div class="image"><img onclick="toDetail(\'' + PictureUrls[i] + '\',\'' + '商品详情' + '\')"  src="' + PictureUrls[i] + '" height="100px" width="200px" style="line-height:100px;margin-top:12px;"/></div></div></figure>';
		if (i == 0) {
			liHTML += '<li class="on"></li>';
		} else {
			liHTML += '<li class=""></li>';
		}
	};
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
	var ShortDescription = '<br>' + returnData.data.product.description;
	var Price = returnData.data.product.skus[0].price;
	var Detail = '<h3 class="h_h3">' + Name + '</h3>';
	var ProductToShoppingCart = '<span class="btn-tbl-cell"><a id="add_cart" onclick="addProductToShoppingCart(' + productId + ')" class="btn-add-cart">加入购物车</a></span>';
	var admessage = Name + '仅售' + Price + '元就在中百商城';
	var share_a = '<a href="javascript:share(\'' + admessage + '\');"><img id="share" src="../../images/new/share_icon.png" style="float: right;"></a>';

	var favored = returnData.data.favored;

	if (favored == false) {
		var favor = '<a id="save" onclick="userCareOrCancelProduct(' + productId + ')"><img src="../../images/new/icon_27.png" style="float: left;"></a>';
		var unfavor = '<a id="unsave" onclick="userCareCancelProduct(' + productId + ')"  style="display:none"><img src="../../images/new/icon_27.png" style="float:left;"></a>';
	} else if (favored == true) {
		var favor = '<a onclick="userCareOrCancelProduct(' + productId + ')"" id="save" style="display:none"><img src="../../images/new/icon_27.png" style="float: left;"></a>';
		var unfavor = '<a onclick="userCareCancelProduct(' + productId + ')" id="unsave" ><img src="../../images/new/icon_27.png" style="float:left;"></a>';
	}

	
	if (Price == null) {
		$('#price_text').hide();
	} else {
		$("#price").html('&yen;' + Price);
	}
	var OldPrice = returnData.data.product.skus[0].oldPrice;
	var discount = returnData.data.product.skus[0].discount;
	if (OldPrice == null) {
		$('#oldprice_text').hide();
		$('#discount').hide();
	} else {
		var timer = returnData.data.product.skus[0].remainDay;
		$("#olePrice").html('&yen;' + OldPrice);
		$("#timer").html('剩余时间：' + timer + '天');
		$("#discount").html('(' + discount + ')折');
		$('#timer').show();
	}
	//如果有分公司名称则显示
	var subPartnerName = returnData.data.product.subPartnerName;
	if (subPartnerName == null) {
		$('#subPartnerName').hide();
	} else {
		$("#subPartnerName").html('分公司：' + subPartnerName);
	}
	//如果有商品编号则显示
	var partnerPartNumber = returnData.data.product.partnerPartNumber;
	if (partnerPartNumber == null) {
		$('#partnerPartNumber').hide();
	} else {
		$("#partnerPartNumber").html('商品编号：' + partnerPartNumber);
	}

	if (returnData.data.product.skus[0].name != null) {
		var typeHtml = "规格：";
		for (var i = 0; i < returnData.data.product.skus.length; i++) {
			var typeName = returnData.data.product.skus[i].name;
			if (i == 0) {
				typeHtml += '<a title="' + typeName + '" date="current" class="color-opt  on" style="margin-top:5px;margin-bottom:5px;"  onclick="typeChanage(' + i + ')" id="product_type_' + i + '">' + typeName + '<span class="ico-chk"></span></a>';
			} else {
				typeHtml += '<a title="' + typeName + '" date="current" class="color-opt"    style="margin-top:5px;margin-bottom:5px;" onclick="typeChanage(' + i + ')" id="product_type_' + i + '">' + typeName + '<span class="ico-chk"></span></a>';

			}

		};
	}
	$("#name").html(Name);
	$("#share_a").html(share_a);
	$("#favor").html(favor);
	$("#unfavor").html(unfavor);
	$("#price").html('&yen;' + Price);
	$("#olePrice").html('&yen;' + OldPrice);
	$("#ShortDescription").html(ShortDescription);
	$("#ProductToShoppingCart").html(ProductToShoppingCart);
	$("#type").html(typeHtml);

}

//商品添加关注
function userCareOrCancelProduct(productId) {
	//登录用户Id
	var loginUserId = Request("loginUserId");
	//校验字符串
	var checkStr = Request("checkStr");
	//是否是会员标识
	var isMember = Request("isMember");
	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == '' || isMember == 0) {
		goLogin();
	} else {
		var action = userCareOrCancelProductUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&productId=" + productId + "&Type=" + 1 + "&";
		var name = "userCareOrCancelProduct";
		ajaxJson(name, action, reqData, userCareOrCancelProductSuccess);
	}
}

function userCareOrCancelProductSuccess() {
	iconShow("saved")
	$("#saved").fadeIn();
	setTimeout(function() {
		$("#saved").fadeOut();
	}, 1000);
	$("#save").hide();
	$("#unsave").show();

}

//	商品取消关注
function userCareCancelProduct(productId) {
	//登录用户Id
	var loginUserId = Request("loginUserId");
	//校验字符串
	var checkStr = Request("checkStr");
	//是否是会员标识
	var isMember = Request("isMember");
	if (loginUserId == undefined || loginUserId == null || loginUserId == '' || checkStr == undefined || checkStr == null || checkStr == '' || isMember == undefined || isMember == null || isMember == '' || isMember == 0) {
		goLogin();
	} else {
		var action = userCareOrCancelProductUrl;
		var reqData = "&from=native&" + "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&productId=" + productId + "&Type=" + 0 + "&";
		var name = "userCareOrCancelProduct";
		ajaxJson(name, action, reqData, userCareCancelProductSuccess);
	}
}

//规格切换
function typeChanage(id) {
	var returnData = str2obj(window.localStorage.productById);
	var Price = returnData.data.product.skus[id].price;
	var oldPrice = returnData.data.product.skus[id].oldPrice;
	var timer = returnData.data.product.skus[id].remainDay;
	var discount = returnData.data.product.skus[id].discount;
	if (oldPrice != null) {
		$("#olePrice").html('&yen;' + oldPrice);
		$('#oldprice_text').show();
		$("#olePrice").html('&yen;' + oldPrice);
		if (timer > 0) {
			$("#timer").html('剩余时间：' + timer + '天');
			$('#timer').show();
			$("#discount").html('(' + discount + ')折');

		} else {
			$("#timer").html('已经结束');
			$('#timer').show();
		}

	} else {
		$('#oldprice_text').hide();
		$('#timer').hide();
		$('#discount').hide();
	}

	$("#price").html('&yen;' + Price);
	$(".color-opt").removeClass("color-opt on").addClass('color-opt');
	$("#product_type_" + id).removeClass("color-opt").addClass('color-opt on');
}

function userCareCancelProductSuccess() {
	iconShow("unsaved")
	$("#unsaved").fadeIn();
	setTimeout(function() {
		$("#unsaved").fadeOut();
	}, 1000);
	$("#unsave").hide();
	$("#save").show();
}
function replacePic(pic, size) {
	return pic.replace("/b/", "/" + size + "/");
}