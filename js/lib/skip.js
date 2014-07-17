//跳转商品搜索页
function skipToProductSearch() {
	window.location.href = '/html/search/productSearchList.html';
}
//跳转积分商品搜索页
function skipToScoreSearch() {
	window.location.href = '/html/search/productScoreSearchList.html';
}
//跳转促销信息搜索页
function skipToPromotionSearch() {
	window.location.href = '/html/search/promotionSearchList.html';
}
//跳转搜索主页
function skipToIndexSearch() {
	window.location.href = '/html/search/index.html.html';
}
//跳转会员中心页面
function skipToIndexSearch() {
	window.location.href = '/html/memberCenter/memberCenter.html';
}
//删除收藏商品
function deleteFavouriteProduct() {
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	$("#favourite").css("left", (document.body.scrollWidth - parseInt($("#favourite").css("width"))) / 2);
	$("#favourite").show();
	$("#_mask").show();
	$("#ok").bind('click', function(event) {
		$("input:checked").each(function(index) {
			var productId = $(this).val();
			cancelCareProduct(productId);
		});
		$("#favourite").hide();
		$("#_mask").hide();
	});
	$("#cancel").bind('click', function(event) {
		$('#favourite').hide();
		$('#_mask').hide();
		$(":checkbox").attr("checked", null);
	});
}
//删除收藏积分商品
function deleteFavouriteScore() {
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	$("#favourite").css("left", (document.body.scrollWidth - parseInt($("#favourite").css("width"))) / 2);
	$("#favourite").show();
	$("#_mask").show();
	$("#ok").bind('click', function(event) {
		$("input:checked").each(function(index) {
			var scoreExchangeId = $(this).val();
			cancelCareScoreProduct(scoreExchangeId);
		});
		$("#favourite").hide();
		$("#_mask").hide();
	});
	$("#cancel").bind('click', function(event) {
		$('#favourite').hide();
		$('#_mask').hide();
		$(":checkbox").attr("checked", null);
	});
}
//删除收藏促销信息
function deleteFavouritePromotion() {
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", width);
		$("#toast").fadeIn();
		setTimeout(function() {
			$("#toast").fadeOut();
		}, 2000);
		return;
	};
	$("#favourite").css("left", (document.body.scrollWidth - parseInt($("#favourite").css("width"))) / 2);
	$("#favourite").show();
	$("#_mask").show();
	$("#ok").bind('click', function(event) {
		$("input:checked").each(function(index) {
			var promotionId = $(this).val();
			cancelPromotion(promotionId);
		});
		$("#favourite").hide();
		$("#_mask").hide();
	});
	$("#cancel").bind('click', function(event) {
		$('#favourite').hide();
		$('#_mask').hide();
		$(":checkbox").attr("checked", null);
	});
}
