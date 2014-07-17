/**
 * @author wang
 */
var favoriteScoreProductListPage = 1;
var favoriteScoreProductListCacheName;
$(document).ready(function() {
	favoriteScoreProductListCacheName = "favoriteScoreProductListCacheName";
	if (window.localStorage.getItem(favoriteScoreProductListCacheName + "_" + 1) == null) {
		if (checkNetWorkState()) {
			//缓存中没有数据,向服务器发送请求
		refreshFavoriteScoreProductListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshFavoriteScoreProductListData();
		} else {
			//将缓存中的数据渲染到页面中
			favoriteScoreProductListSuccess();
		}
	}
	$("#next").bind('click', function(event) {
		favoriteScoreProductListPage++;
		if (window.localStorage.getItem(favoriteScoreProductListCacheName + "_" + favoriteScoreProductListPage) == null) {
		if (checkNetWorkState()) {
			//缓存中没有数据,向服务器发送请求
		refreshFavoriteScoreProductListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshFavoriteScoreProductListData();
		} else {
			//将缓存中的数据渲染到页面中
			favoriteScoreProductListSuccess();
		}

	}
		parent.scroll(0, 0);
	});
	$("#prev").bind('click', function(event) {
		favoriteScoreProductListPage--;
		if (window.localStorage.getItem(favoriteScoreProductListCacheName + "_" + favoriteScoreProductListPage) == null) {
		if (checkNetWorkState()) {
			//缓存中没有数据,向服务器发送请求
		refreshFavoriteScoreProductListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshFavoriteScoreProductListData();
		} else {
			//将缓存中的数据渲染到页面中
			favoriteScoreProductListSuccess();
		}

	}
		parent.scroll(0, 0);
	});
});
function refreshFavoriteScoreProductListData() {
	ajaxRequest(favoriteScoreProductListCacheName + "_" + favoriteScoreProductListPage, userCareScoreProductListUrl, "condition.curPage=" + favoriteScoreProductListPage + "&condition.fetchNum=5", favoriteScoreProductListPage, favoriteScoreProductListSuccess, favoriteScoreProductListError, true);
}

function favoriteScoreProductListSuccess() {
	var length = 9;
	var width = $(window).width();
	if (width < 400) {
		length = 9;
		$(".p-detail").css("font-size","0.5em");
	} else if (width < 640) {
		length = 14;
	}
	var returnData = str2obj(window.localStorage.getItem(favoriteScoreProductListCacheName + "_" + favoriteScoreProductListPage));
	if (returnData == undefined || returnData == null) {
		return;
	}
	if (returnData.status == 0) {
		var message = returnData.data;
		var productListHTML = "";
		if (debug == true) {
			console.log(message);
		}
		var resultList = message.page.result;
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
		var totalPage = message.page.totalPage;
		if (totalPage>1) {
			$("#page").show();
			var currentPage = message.page.currentPage;
			showOrHide(currentPage, totalPage)
			$("#pageNum").html(currentPage + "/" + totalPage);
		};
		for (var i = 0; i < resultList.length; i++) {
			var id = resultList[i].id;
			var digest = resultList[i].digest;
			var score = resultList[i].score;
			var pictureUrl = resultList[i].pictureUrl;
			var title = resultList[i].title;
			var productId = resultList[i].productId;
			var remainDay = resultList[i].remainDay;
			var display = resultList[i].display;
				pictureUrl = pictureUrl.replace("/b/", "/80/80/");
			productListHTML += '<a href="javascript:toScoreProductDetail(' + id + ',\'' + title + '\',' + display + ');" ><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;padding:6px 0 6px 0;">';
			productListHTML += '<table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td style="width:24px;"><div class="squaredTwo_1" ><input type="checkbox" alt="' + title + '" value="' + id + '" id="squaredTwo_' + id + '" name="check" /><label for="squaredTwo_' + id + '"><img check-flag="false" id="'+id+'_unchecked" src="../../images/unchecked.png" style="margin-left:-6px;margin-top:-6px;" onclick="checkbox(this,'+id+')" /><img check-flag="true" id="'+id+'_checked" style="margin-left:-6px;margin-top:-6px;display:none;" src="../../images/checked.png" style="margin-left:-6px;" onclick="checkbox(this,'+id+')" /></label></div></td>';
			productListHTML += '<td class="p-img" style="float:none;padding-left:10px;" width="80px">';
			if (window.localStorage.getItem(pictureUrl) != undefined && window.localStorage.getItem(pictureUrl) != 'undefined') {
				var obj = window.localStorage.getItem(pictureUrl);
				var imageBase64 = obj;
				productListHTML += '<img src="data:image/png;base64,' + imageBase64 + '" alt="" height="80" width="80"/></td>';
			} else {
			//如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
				if(window.localStorage.getItem("pic") == null){
					window.localStorage.setItem("pic", pictureUrl);
				} else {
					window.localStorage.setItem("pic",window.localStorage.getItem("pic") + "," + pictureUrl);
				}
			productListHTML += '<img src="' + pictureUrl + '" alt="" height="80" width="80"/></td>';
		}
		if (title.length > length) {
				productListHTML += '<td  valign="top" class="text"><div class="p-name" style="#3C3C3C;font-size: 16px;line-height: 44px">' + title.substring(0, length) + '...</div>';
			} else {
				productListHTML += '<td  valign="top" class="text"><div class="p-name" style="#3C3C3C;font-size: 16px;line-height: 44px">' + title + '</div>';
			}
			//productListHTML += '<td  valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 0.875em;padding-right:50px;" >' + title + '</div><br/>';
			productListHTML += '<div  style="float:left;"> <font color="red" class="p-detail" style="font-family:Arial;font-weight:bold">剩余' + remainDay + '天</font></div> <div class="test" style="padding-left:' + 0.38 * $(window).width() + 'px;"> <font color="red" class="p-detail" style="font-family:Arial;font-weight:bold">积分：' + score + '</font> </div></td></tr></tbody></table></div> </a>';
			//productListHTML += '<div class="p-detail" style="float:left;margin-top: 20px"><span style="float:left">积分： <font color="red" style="font-family:Arial;font-weight:bold">' + score + '</font> <span></div></td></tr></tbody></table></div></a>';
		};
		$("#dataList").html(productListHTML);
		if (width < 400) {
			$(".p-detail").css("font-size","0.75em");
			$(".test").css("padding-left",0.25 * $(window).width()+"px");
		}
		storePic();
	};
}

function favoriteScoreProductListError() {
	//TODO
}

function cancelCareScoreProduct(scoreExchangeId) {
	ajaxRequest("uncareScoreProductCacheName", userCareScoreProductCancelUrl, "scoreId=" + scoreExchangeId + "&type=0", null, uncareScoreProductSuccess, uncareScoreProductError, true);
}

function uncareScoreProductSuccess() {
	favoriteScoreProductListPage = 1;
	refreshFavoriteScoreProductListData();
}

function uncareScoreProductError() {
}

function toScoreProductDetail(id, name,display) {
	setLocalvalue("fscoreId",id);//add
	setLocalvalue("fscoreId_"+id,display);//add
	var locator=domain+"/html/userPoints/fproductDeatil.html"
	toDetail(locator,name);
}

//删除收藏积分商品
function deleteFavourite() {
	if(checkNetWorkState()){
	var width = (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2;
	if ($("input:checked").length == 0) {
		$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
		},2000);
		return;
	};
	if($("input:checked").length==1){
		if ($("input:checked").attr("alt").length>5) {
			$(".cart-succ").html("确认删除积分商品:"+$("input:checked").attr("alt").substring(0,5)+"...吗？");
		}else{
			$(".cart-succ").html("确认删除积分商品:"+$("input:checked").attr("alt").substring(0,5)+"吗？");
		}
	}else{
		$(".cart-succ").html("确认删除选中的 "+$("input:checked").length+"个积分商品？");
	}
	$("#favourite").css("width", $(document).width() * 0.6252 + "px");
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
		$("img[id]").each(function(){
			var id = $(this).attr("id").split("_")[0];
			$("#"+id+"_unchecked").show();
			$("#"+id+"_checked").hide();
		});  
	});
	}else{
		$("#netError").html("网络异常,请检查您的网络!");
		$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
			$("#netError").html("请选择一个积分商品");
		},2000);
	}
}
function checkbox(e,id) {
	var result = $(e).attr("check-flag");
    if (result=='false')  {
    	$("#"+id+"_unchecked").hide();
   		 $("#"+id+"_checked").show();
   		 
  	 } else {
   		 $("#"+id+"_unchecked").show();
  		$("#"+id+"_checked").hide();
   	}
   }