/**
 * 订单功能
 */
var localreqData = str2obj(window.localStorage.localreqData);

if (localreqData == null) {
	//登录用户Id
	var loginUserId = Request("loginUserId");
	//校验字符串
	var checkStr = Request("checkStr");
	//是否是会员标识
	var isMember = Request("isMember");
	//用户登陆参数定义
	//var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
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
}



//查看订单列表
function orderList(begin) {
	var name = "orderList"
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";

	if (begin > 0) {
		var action = orderListUrl + "begin=" + begin + "&";
	} else {
		var action = orderListUrl + "&begin=" + 1 + "&";
	}
	ajaxJson(name, action, reqData, jsonSuccessOrder);
}

//查看订单详情
function orderDetailList(orderId) {
	var name = "orderDetailList";
	var action = orderDetailListUrl;
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&"+"orderId="+orderId;
	ajaxJson(name, action, reqData, jsonSuccessDetailList);
}

//订单列表页面渲染
function jsonSuccessOrder() {
	var returnData = str2obj(window.localStorage.orderList);
	console.log(returnData);
	var detailList = "";
	// console.log("jsonsuccess");
	for (var i = 0; i < returnData.data.orderList.length; i++) {
		//订单ID
		var orderId = returnData.data.orderList[i].orderId;
		//订单金额
		var orderTotal = returnData.data.orderList[i].orderTotal;
		//下单时间
		var createTime = returnData.data.orderList[i].createTime;
		//订单状态
		var orderStatusZh = returnData.data.orderList[i].orderStatusZh;
		//订单完成时间
		var finishTime = returnData.data.orderList[i].finishTime;
		//当前页码
		var currentPage = returnData.data.currentPage;
		//最后页码
		var totalPage = returnData.data.totalPage;
		//上一页
		if (currentPage > 1) {
			var backPageNumber = currentPage - 1;
		} else {
			var backPageNumber = currentPage;
		}
		//下一页
		if (currentPage != totalPage) {
			var nextPageNumber = currentPage + 1;
		} else {
			var nextPageNumber = currentPage;
		}

		//页码与翻页
		var page = '<div class="refill tc"><a class="next" href="javascript:orderList(' + backPageNumber + ');" style="color:grey;">上一页</a>  第' + currentPage + '页 <a class="next" href="javascript:orderList(' + nextPageNumber + ')">下一页<span></span></a></div>';

		detailList += '<a href="orderInfo.html?orderId=' + orderId + '"><ul><li>订单号：' + orderId + '<span class="menu-botton-arrow"></span></li><li class="last clear"><div class="fl">订单金额：<span class="red">&yen;' + orderTotal + '</span>';
		detailList += '<br/>订单状态：<span class="red">' + orderStatusZh + '</span><br/>下单时间：' + createTime + '</div></li></ul> </a>'
	}
	$("#detailList").html(detailList);
	$("#page").html(page);
	//$("#cart_realPrice").html(returnData.data.shoppingCartForm.totalFee);
}

//订单详情页面渲染
function jsonSuccessDetailList() {
	var returnData = str2obj(window.localStorage.orderDetailList);
	// console.log(returnData);
	//订单编号
	var orderId = returnData.data.orderForm.orderId;
	//订单状态
	var orderStatusZh = returnData.data.orderForm.orderStatusZh;
	//下单时间
	var createTime = returnData.data.orderForm.createTime;
	//订单金额
	var orderTotal = returnData.data.orderForm.orderTotal;
	//实付金额
	var orderSubTotal = returnData.data.orderForm.orderSubTotal;
	//送货时间
	var comment = returnData.data.orderForm.comment;
	if (comment == "alldays") {
		comment = "工作日、双休日与假日均可送货"
	};
	//收货地址
	var address = returnData.data.orderForm.address.address;
	//收货人
	var name = returnData.data.orderForm.address.name;
	//电话号码
	var phone = returnData.data.orderForm.address.phone;
	//邮编
	var zipCode = returnData.data.orderForm.address.zipCode;

	var detailList = "";
	var detailList1 = "";
	var detailList2 = "<ul>";
	var detailList3 = "<ul>";
	if (orderStatusZh == "用户取消") {
		detailList3 = "";

	}else if (orderStatusZh == "已付款") {
		detailList3 += '<a onclick="javascript:orderCancelBeforeShipping(' + orderId + ')"><li>取消订单并退款<span class="menu-botton-arrow"></span></li></a></ul>';
	} else {
		detailList3 += '<a onclick="javascript:orderCancelBeforePay(' + orderId + ')"><li>取消订单<span class="menu-botton-arrow"></span></li></a><a  href="javascript:toPay(' + orderId + ')" ><li>在线付款<span class="menu-botton-arrow"></span></li></a></ul>';
	}
	detailList = '<ul><li>订单编号：' + orderId + '<br/>订单金额：<span class="red">￥' + orderTotal + '</span><br/>状态：' + orderStatusZh + '<br/>下单时间：' + createTime + '<br/></li><li class="last full-li"><span class="red">' + orderStatusZh + '</span><li></li></li></ul>';
	detailList1 = '<ul><li>收货地址：' + address + '</li><li>收货人：' + name + '</li><li>送货时间：' + comment + '</li><li>电话号码：' + phone + '</li><li>邮编：' + zipCode + '</li></ul>';

	for (var i = 0; i < returnData.data.orderForm.detailList.length; i++) {
		//商品名称
		var productName = returnData.data.orderForm.detailList[i].productName;
		//商品编号
		var productSkuId = returnData.data.orderForm.detailList[i].productSkuId;
		//单价
		var price = returnData.data.orderForm.detailList[i].price;
		//数量
		var amount = returnData.data.orderForm.detailList[i].amount;

		//detailList2 += '<ul><li>商品名称：'+productName+'</li><li>商品编号：'+productSkuId+'</li><li>单价：'+price+'</li><li>数量：'+amount+'</li></ul>';
		detailList2 += '<li><div class="fl fl-v1">' + productName + '</br><span class="p-num gray">' + "编号：" + productSkuId + '</span></br><span class="p-num gray">价格：<span class="red">￥' + price + '</span></span></br><span  class="p-num gray">数量：' + amount + '</span></div></div></li>';
		//	detailList += '<br/>订单状态：<span class="red">'+orderStatusZh+'</span><br/>下单时间：'+createTime+'</div></li></ul>'
	}
	detailList2 += "</ul>"
	$("#detailList").html(detailList);
	$("#detailList1").html(detailList1);
	$("#detailList2").html(detailList2);
	$("#detailList3").html(detailList3);
}

//提交订单
function orderCreatepage(name, action, reqData) {

	ajaxJson(name, action, reqData, successJump);
	//
}

//取消订单
function orderCancelBeforePay(reqData) {
	name = "orderCancelBeforePay";
	action = orderCancelBeforePayUrl;
	var reqData1 = "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	action += "orderId=" + reqData + reqData1;
	ajaxJson(name, action, reqData, successJump);

}

//取消订单(退款)
function orderCancelBeforeShipping(reqData) {
	name = "orderCancelBeforeShipping";
	action = orderCancelBeforeShippingUrl;
	var reqData1 = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	action += "orderId=" + reqData + reqData1;
	ajaxJson(name, action, reqData, successJump);

}

//获取收货人信息
function addressById() {
	if (window.localStorage.addressId != null) {
		var addressId = window.localStorage.addressId;
		var action = addressByIdUrl;
		var reqData = "addressId=" + addressId + "&loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
		var name = "addressById";
		ajaxJson(name, action, reqData, addressListTopage);
	} else {
		var action = getDefaultAddressUrl;
		var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
		var name = "addressById";
		ajaxJson(name, action, reqData, addressListTopage);

	}

}
function addressListTopage() {

	var returnData = str2obj(window.localStorage.addressById);
	if (returnData.data.addressForm == null) {
		var addressPage;
		addressPage = "请输入您的收货地址";
	} else {
		var address = returnData.data.addressForm.address.address;
		var name = returnData.data.addressForm.address.name;
		var phone = returnData.data.addressForm.address.phone;
		var addressPage;
		addressPage = '<li class="last small">收货人姓名：' + name + '<br/>详细地址： ' + address + '<br/>联系电话：' + phone + '<br/><span class="menu-botton-arrow"></span></li>';
	}

	$("#addressPage").html(addressPage);
}

function successJump() {
	window.location.href = 'orderMessage.html';

}

//订单支付
function toPay(reqData) {
	if (reqData > 0)
	{
		window.location.href = toPayUrl + "orderId=" + reqData;
	}
	else 
	{

		var returnData = str2obj(window.localStorage.orderCreate);
		var orderId = returnData.data.orderId;
		window.location.href = toPayUrl + "orderId=" + orderId;
	}

	//var reqData1 = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
}

//下单返回页
function orderSuccess()
{
		var returnData = str2obj(window.localStorage.orderCreate);
		var orderId = returnData.data.orderId;
		var returnDataShoppingCart = str2obj(window.localStorage.shoppingCart);
		var totalFee = returnDataShoppingCart.data.shoppingCartForm.totalFee;
		
		var orderMessage = '<p>订单号：'+orderId +'</p><p>应付金额：<font style="color:#cc0000; font-weight:bold;">'+totalFee +'元</font></p>'
		var toinfo = '<a href="orderInfo.html?orderId=' + orderId + '"><p><input type="submit" value="查看订单" class="sub_btn_y sub_btn"></p></a>'
		
		$("#orderMessage").html(orderMessage);
		$("#toinfo").html(toinfo);
		
			
			
		
}
