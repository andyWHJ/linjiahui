//var storeId=window.localStorage.getItem("storeId");
var storeId =getLocalValue("storeId");//add
var storeDetailCacheName="storeDetail_"+storeId;
$(function(){
	if (window.localStorage.getItem(storeDetailCacheName) == null) {
		//缓存中没有数据,向服务器发送请求
		refreshStoreDetailData();
	} else {
		if (checkNetWorkState()) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshStoreDetailData();
		}else{
			//将缓存中的数据渲染到页面中
			storeDetailSuccess();
		}
	}

})
function refreshStoreDetailData(){
	ajaxRequest(storeDetailCacheName, storeDetailUrl, "storeId="+storeId, null, storeDetailSuccess, storeDetailErroe, false);
}
function storeDetailSuccess(){
	var returnData = str2obj(window.localStorage.getItem(storeDetailCacheName));
	if (returnData.status == 0) {
		var message = returnData.data;
		if (message== null) {
			callBackMessage("没有相关数据",null)
			return;
		};
		var store = message.store;
		var pictureUrl = store.pictureUrl;
		if (pictureUrl==undefined) {
			pictureUrl="store.jpg";
		}
		var picHTML='<div class="view-photo tc" style="margin-top: 6px;"><img id="showPic1"src="'+pictureUrl+'" width="84.16%"></div></div>';
				
		$("#div").html(picHTML);		
		var id = store.id;
		var name = store.name;
		var phone = store.phone;
		var address = store.address;
		var workTime = store.workTime;
		var description = store.description;
		if (description==undefined) {
			description="暂无";
		};
		var busLine = store.busLine;
		
		var storeHTML='<div class="parting-line"></div><li class="mu_l"><span class="h_h3" id="name" style="font-size: 20px">'+name+'</span></li>';
		storeHTML+='<li class="mu_l"><span class="mu_lh" style="font-size: 16px" id="address">地址：'+address+'</span></li>';
		if (browser.versions.iPhone) {
		storeHTML+='<li class="mu_l" ><span class="mu_lh" style="font-size: 16px" id="phone">电话：<a style="color: #1459EE;text-decoration: underline;" href="tel:'+phone+'">'+phone+'</a></span></li><div class="parting-line"></div>';
	} else if (browser.versions.android) {
		storeHTML+='<li class="mu_l" ><span class="mu_lh" style="font-size: 16px" id="phone">电话：<a style="color: #1459EE;text-decoration: underline;"  href="javascript:callPhone(\''+phone+'\')">'+phone+'</a></span></li><div class="parting-line"></div>';
	}
		storeHTML+='<li class="mu_l" ><span class="mu_lh" style="font-size: 16px" id="description">详情：'+description+'</span></li>';
		storeHTML+='<li class="mu_l" ><span class="mu_lh" style="font-size: 16px" id="workTime">门店营业时间：'+workTime+'</span></li>';
		storeHTML+='<li class="mu_l" ><span class="mu_lh" style="font-size: 16px" id="busLine">公交路线：'+busLine+'</span></li><div class="parting-line"></div>';
		
		$("#detail").html(storeHTML);
	}else{
		callBackMessage("门店参数有误", null)
	};
}
function storeDetailErroe(){
	
}
