/**
 * @author wang
 */

if(true){
	var queryType = 2;
	var cardId = 474;
	var tranId = "EE0AFACA90533FF1E04348A864CAF6E2";
	var cardNo = 86452835;
}else {
	var queryType = getLocalValue("queryType");
    var cardId = getLocalValue("cardId");
 	var tranId = getLocalValue("tranId");
 	var cardNo = getLocalValue("cardNo");
}
var consumeDetailCacheName = "consumeDetailCacheName" + "_" + cardId + "_" + queryType + "_" + tranId;
$(function() {
	if (window.localStorage.getItem(consumeDetailCacheName) == null) {
		//缓存中没有数据,向服务器发送请求
		if (true) {
				refreshConsumeDetailData();
			} else {
				//将缓存中的数据渲染到页面中
				goError();
			}
		
	} else {
		if (true) {
			//向服务器发送请求,更新Cache中的数据,同时渲染到页面中
			refreshConsumeDetailData();
		} else {
			//将缓存中的数据渲染到页面中
			consumeDetailSuccess();
		}
	}
})
function refreshConsumeDetailData() {
	ajaxRequest(consumeDetailCacheName, cardConsumeDetailListUrl, "tranId=" + tranId+"&cardNo="+cardNo, null, consumeDetailSuccess, consumeDetailError, true);
}

function consumeDetailSuccess() {
	var returnData = str2obj(window.localStorage.getItem(consumeDetailCacheName));
	if (returnData.status == 0) {
		var message = returnData.data;
		var consumeDetailForm = message.consumeDetailForm;
		var consumeTime = consumeDetailForm.consumeTime;
		var money = getLocalValue("consumeDetail_money");
		var score = getLocalValue("consumeDetail_score");
		if (money== undefined) {
			money=0;
		};
		if (score== undefined) {
			score=0;
		};
		var storeName = consumeDetailForm.storeName;
		$("#consume_head").append(consumeTime + "<br/>" + storeName);
		$("#money").append("消费金额：￥" + 352.25);
		$("#score").append("获得积分：" + 240);
		var consumeDetailHTML = "";
		if (consumeDetailForm.cardConsumeDetailList == null || consumeDetailForm.cardConsumeDetailList.length == 0) {
			consumeDetailHTML = '暂无数据';
		} else {
			var resultList = consumeDetailForm.cardConsumeDetailList;
			consumeDetailHTML += '<table class="consumeTable"><tr class="first"><td>名称</td><td>单价</td><td>数量</td></tr>';
			for (var i = 0; i < resultList.length; i++) {
				var productName = resultList[i].productName;
				var productNum = resultList[i].productNum;
				var productPrice = resultList[i].productPrice;
				if ($(window).width()<400&&productName.length>30) {
					productName=productName.substring(0,23)+"...";
				};	
				
				consumeDetailHTML += '<tr><td>'+productName+'</td>';
				consumeDetailHTML += '<td>'+productPrice+'</td>';
				consumeDetailHTML += '<td>'+productNum+'</td></tr>';
				
				//consumeDetailHTML += '<div class="c-detail"><div class="c-name"><span>'+productName+'</span></div><div  class="c-ms-detail"><div class="c-ms-m">￥'+productPrice+'</div><div style="float:left;">数量：'+productNum+'</div></div><div style="clear:both"></div></div>';
			}
			consumeDetailHTML += '</table>';
		}
		$("#consumeDeatil").append(consumeDetailHTML);
	};
}

function consumeDetailError() {

}

