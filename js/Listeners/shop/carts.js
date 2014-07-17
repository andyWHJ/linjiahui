/**
 * 购物车功能
 */
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
//发起查看购物车请求并返回数据
function shoppingCart() {
	// 查看购物车
	var action = "http://mall.linjiahui.com:8080/appclient/shoppingCart.do?partnerKey=zhongbai&partnerId=1&from=native&";

	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	//	alert (reqData);
	//lotalstorage名称
	var name = "shoppingCart";
	ajaxJson(name, action, reqData, jsonSuccess);
	//发起请求
	// jsonSuccess();
	//页面渲染

}

//页面渲染
function jsonSuccess() {
	var returnData = str2obj(window.localStorage.shoppingCart);
	if (returnData.data.shoppingCartForm == null) {
		var cart_totalnum = 0;
		var cart_realPrice = 0;
		var CartsDisplayPageHTML = "您的购物车内还没有添加商品！";

	} else {
		var cart_totalnum = returnData.data.shoppingCartForm.toatalAmount;
		var cart_realPrice = returnData.data.shoppingCartForm.totalFee;
		var CartsDisplayPageHTML = "";
		// console.log("jsonsuccess");
		for (var i = 0; i < returnData.data.shoppingCartForm.skuList.length; i++) {

			var skuId = JSON.stringify(returnData.data.shoppingCartForm.skuList[i].skuId);
			var productPicUrl = returnData.data.shoppingCartForm.skuList[i].productPicUrl;
			var productName = returnData.data.shoppingCartForm.skuList[i].productName;
			var productId = returnData.data.shoppingCartForm.skuList[i].productId;
			var price = returnData.data.shoppingCartForm.skuList[i].price;
			var amount = returnData.data.shoppingCartForm.skuList[i].amount;
			var shoppingCartId = returnData.data.shoppingCartForm.skuList[i].shoppingCartId;

			CartsDisplayPageHTML += '<li data-theme="c" class="first" id="' + skuId + '"><div class="clear"><div class="p-img p-img-v1 fl"><img class="p-img p-img-v1 fl" width="50" height="50" src="' + productPicUrl + '"></div><div class="fl fl-v1"><p class="p-name">' + productName + '</p><p class="p-num gray">' + "编号：" + productId + '</p><p>单价：<span class="red">￥' + price + '</span></p>';
			CartsDisplayPageHTML += '<p class="p-amount">数量：<a href="javascript:reductProductAmountInCart(' + shoppingCartId + ',' + 1 + ')" class="redu">-</a> <input type="text" size="4" value="' + amount + '" name="num"  id="num864722" class="common-input" onchange=""> <a href="javascript:changeProductAmountInCart(' + shoppingCartId + ',' + 1 + ')" class="add">+</a>　';

			CartsDisplayPageHTML += '    <a href="javascript:deleteProductsFromShoppingCart(' + shoppingCartId + ')" class="btn">删除</a></p></div></div></li>'
		}
	}
	$("#cart_totalnum").html(cart_totalnum);
	$("#CartsDisplayPageHTML").html(CartsDisplayPageHTML);
	$("#cart_realPrice").html(cart_realPrice);
}

//购物车商品数量减少
function reductProductAmountInCart(shoppingCartId, amount) {
	var action = reductProductAmountInCartUrl;
	var name = "changeProductAmountInCart";
	// console.log(amount);
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	reqData += "&id=" + shoppingCartId + "&amount=" + amount;
	if (amount > 0) {
		// console.log(reqData);
		ajaxJson(name, action, reqData, shoppingCart);
		//shoppingCart("shoppingCart", shoppingCartUrl, "checkStr=DCE75109823B85DEC11BC50634B6BF01&isMember=1")
		//jsonSuccess();
	} else {
		deleteProductsFromShoppingCart(shoppingCartId)
	}

}

//购物车删除
function deleteProductsFromShoppingCart(ids) {
	var ids = "&ids=" + ids;
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	var action = deleteProductsFromShoppingCartUrl + reqData;
	var name = "deleteProductsFromShoppingCart";
	if (confirm("确定要删除吗？")) {
		ajaxJson(name, action, ids, shoppingCart);
	}

	//shoppingCart("shoppingCart", shoppingCartUrl, "checkStr=DCE75109823B85DEC11BC50634B6BF01&isMember=1")
	//jsonSuccess();

}

//购物车添加商品
function addProductToShoppingCart(number) {
	if (loginUserId == "")
	{
		window.ljhWebview.goLogin()
	}
	else 
	{
			var action = addProductToShoppingCartUrl;
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	reqData += "&skuId=" + number+"&amount="+1;
	var name = "addProductToShoppingCart";
	//alert (reqData);
	// console.log (action+   +  reqData);
	ajaxJson(name, action, reqData, addsuccess);
	//shoppingCart("shoppingCart", shoppingCartUrl, reqData);
	}


}

//购物车商品数量添加
function changeProductAmountInCart(shoppingCartId, amount) {
	var action = changeProductAmountInCartUrl;
	var name = "changeProductAmountInCart";
	var reqData = "loginUserId=" + loginUserId + "&checkStr=" + checkStr + "&isMember=" + isMember + "&";
	// console.log(amount);
	reqData += "id=" + shoppingCartId + "&amount=" + amount;
	if (amount > 0) {
		// console.log(reqData);
		ajaxJson(name, action, reqData, shoppingCart);
		//	shoppingCart("shoppingCart", shoppingCartUrl, "checkStr=DCE75109823B85DEC11BC50634B6BF01&isMember=1")
		//	jsonSuccess();
	} else {
		deleteProductsFromShoppingCart(shoppingCartId)
	}

}

//购物车商品清空
function clearShoppingCart(reqData) {
	ajaxJson(action, reqData, jsonSuccess);
	jsonSuccess();
}

//下单
function orderSubmit () {
	var returnData = str2obj(window.localStorage.shoppingCart);
	if (returnData.data.shoppingCartForm == null)
	{
			alert ("购物车没有商品，无法下单！")
	}
	else 
	{
			window.location.href = 'order.html';
	}
	
	
}
