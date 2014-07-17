/**
 * @author wang
 */
var favoritePromotionListPage = 1;
var favoritePromotionListCacheName;
var listLastPageData = "";
$(document).ready(function() {
	favoritePromotionListCacheName = "favoritePromotionListCacheName";
	if (window.localStorage.getItem(favoritePromotionListCacheName + "_" + 1) == null) {
		if (checkNetWorkState()) {
			//缓存中没有数据,向服务器发送请求
			refreshFavoritePromotionListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
		
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshFavoritePromotionListData();
		} else {
			//将缓存中的数据渲染到页面中
			favoritePromotionListSuccess();
		}
	}
	$("#next").bind('click', function(event) {
		if (window.localStorage.getItem(favoritePromotionListCacheName + "_" + favoritePromotionListPage) == null) {
			if (checkNetWorkState()) {
			favoritePromotionListPage++;
			refreshFavoritePromotionListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
		} else {
			if (checkNetWorkState()) {
				favoritePromotionListPage++;
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshFavoritePromotionListData();
			} else {
				//将缓存中的数据渲染到页面中
				favoritePromotionListSuccess();
			}
		}
		parent.scroll(0, 0);
	});
	$("#prev").bind('click', function(event) {
		if (window.localStorage.getItem(favoritePromotionListCacheName + "_" + favoritePromotionListPage) == null) {
			if (checkNetWorkState()) {
			favoritePromotionListPage--;
			refreshFavoritePromotionListData();
		} else {
			//将缓存中的数据渲染到页面中
			goError();
		}
		} else {
			if (checkNetWorkState()) {
				favoritePromotionListPage--;
				//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
				refreshFavoritePromotionListData();
			} else {
				//将缓存中的数据渲染到页面中
				favoritePromotionListSuccess();
			}
		}
		parent.scroll(0, 0);
	});
});
function refreshFavoritePromotionListData() {
	ajaxRequest(favoritePromotionListCacheName + "_" + favoritePromotionListPage, userCarePromotionListUrl, "condition.curPage=" + favoritePromotionListPage + "&condition.fetchNum=5", favoritePromotionListPage, favoritePromotionListSuccess, favoritePromotionListError, true);
}

function favoritePromotionListSuccess() {
	var returnData = str2obj(window.localStorage.getItem(favoritePromotionListCacheName + "_" + favoritePromotionListPage));
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
			$("#page").hide();
			$("#emptyDataError").show();
			return;
		};
		if (resultList.length == 0) {
			$("#dataList").html("");
			$("#page").hide();
			$("#emptyDataError").show();
			return;
		}
		var totalPage = message.page.totalPage;
		if (totalPage>1) {
			$("#page").show();
			//var currentPage = message.currentPage;			
			showOrHide(favoritePromotionListPage, totalPage)
			$("#pageNum").html(favoritePromotionListPage + "/" + totalPage);
		};	
		for (var i = 0; i < resultList.length; i++) {
			var promotionId = resultList[i].id;
			var digest = resultList[i].digest;
			var price = resultList[i].price;
			var pictureUrl = resultList[i].pictureUrl;
			var remainDay = resultList[i].remainDay;
			var locator = resultList[i].locator;
			var title = resultList[i].title;
			var display = resultList[i].display;
			pictureUrl = pictureUrl.replace("/b/","/100/100/");
			productListHTML += '<a href="javascript:toPromotionDetail(\'' +locator + '\',\'' + title + '\',\'' + price + '\','+promotionId+','+display+');" ><div class="box first" style="height:auto;background:url(../../images/right.png) center right no-repeat;padding: 6px 0 6px 0;">';
			productListHTML += '<table cellspacing="0" cellpadding="0" class="tab" width="95%" ><tbody><tr><td style="width:24px;"><div class="squaredTwo_1" ><input type="checkbox" alt="' + title + '" value="' + promotionId + '" id="squaredTwo_' + promotionId + '" name="check" /><label for="squaredTwo_' + promotionId + '"><img check-flag="false" id="'+promotionId+'_unchecked" src="../../images/unchecked.png" style="margin-left:-6px;margin-top:-6px;" onclick="checkbox(this,'+promotionId+')" /><img check-flag="true" id="'+promotionId+'_checked" style="margin-left:-6px;margin-top:-6px;display:none;" src="../../images/checked.png" style="margin-left:-6px;" onclick="checkbox(this,'+promotionId+')" /></label></div></td>';
			productListHTML += '<td class="p-img" style="padding-left:10px;" width="100px">';
			if (window.localStorage.getItem(pictureUrl) != undefined && window.localStorage.getItem(pictureUrl) != 'undefined') {
					var obj = window.localStorage.getItem(pictureUrl);
					var imageBase64 = obj;
					console.warn(imageBase64);
					productListHTML += '<img src="data:image/png;base64,' + imageBase64 + '"  height="100" width="100"/></td>';
			} else {
					
					//如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
					if (window.localStorage.getItem("pic") == null) {
						window.localStorage.setItem("pic", pictureUrl);
					} else {
						window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + pictureUrl);
					}
				   productListHTML += '<img src="' + pictureUrl + '"  alt="" height="100" width="100"/></td>';
				}
			productListHTML += '<td valign="top" class="text"><div class="p-name" style="color: #3C3C3C;font-size: 14px;" >'+ title + '<br/> '+ digest + '<br/>剩余' + remainDay + '天</div><div class="p-detail" style="float:left;margin-top: 20px"><span style="float:left">价格： <font color="red" style="font-family:Arial;font-weight:bold">&yen;' + price + '</font> <span></div></td></tr></tbody></table></div></a>';
		};
		$("#dataList").html(productListHTML);
		storePic();
	};
}

function favoritePromotionListError() {
	//TODO
}

function cancelPromotion(promotionId) {
	if (checkNetWorkState()) {
		ajaxRequest("cancelPromotionCacheName", userCareOrCancelPromotionUrl, "type=0&promotionId=" + promotionId, null, cancelPromotionSuccess, carePromotionError, true);
	} else {
			$("#toast").css("left", (document.body.scrollWidth - parseInt($("#toast").css("width"))) / 2);
		$("#toast").show();
		setTimeout(function(){
			$("#toast").hide();
		},2000);
	}
}

function cancelPromotionSuccess() {
	favoritePromotionListPage = 1;
	refreshFavoritePromotionListData();
}

function carePromotionError() {
}

function toPromotionDetail(locator,title,price,id,display) {
	setLocalvalue("fpromotionDetail",locator);//add
	setLocalvalue("fpromotionId",id);//add
	setLocalvalue("fpromotionTitle",title);//addsetLocalvalue("price", price);
	setLocalvalue("fprice",price);//addsetLocalvalue("price", price);
	setLocalvalue("fpromotionId_"+id,display);
	
	var message = '';
	if(price == 0 || price == null){
		message = title + "就在掌上"+partnerName+"！";
	}else {
		message = title +"仅售"+ price +  "元,就在掌上"+partnerName+"!"+shareUrl;
	}
	setLocalvalue("favorShareMessage",message);
	console.warn("locator="+locator+";title="+title+";id="+id);
	var url=domain+"/html/home/fpromotionDetail.html"
	showBottombarDetail(url,title,message);
}

//删除收藏促销信息
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
			$(".cart-succ").html("确认删除促销信息： "+$("input:checked").attr("alt").substring(0,5)+"...吗？");
		}else{
			$(".cart-succ").html("确认删除促销信息： "+$("input:checked").attr("alt").substring(0,5)+"吗？");
		}
	}else{
		$(".cart-succ").html("确认删除选中的 "+$("input:checked").length+" 个促销信息吗？");
	}
	$("#favourite").css("width", $(document).width() * 0.6252 + "px");
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
			$("#netError").html("请选择一个促销信息");
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
