var partnerName="中百";
//接口定义
//商品分类列表
var categoryListUrl = "http://mall.zb2.linjiahui.com:80/appclient/categoryList.do?partnerKey=zhongbai&pageSize=100&partnerId=1&pageIndex=0&"

//某分类的商品列表
var productListByCategoryUrl = "http://mall.zb2.linjiahui.com:80/appclient/productListByCategory.do?condition.fetchNum=15";

//根据商品Id获取单个商品
var productByIdUrl = "http://mall.zb2.linjiahui.com:80/appclient/productById.do?partnerKey=zhongbai&partnerId=1&from=native";


//添加商品到购物车
var addProductToShoppingCartUrl = "http://mall.zb2.linjiahui.com:80/appclient/addProductToShoppingCart.do?from=native&";

//删除购物车商品
var deleteProductsFromShoppingCartUrl = "http://mall.zb2.linjiahui.com:80/appclient/deleteProductsFromShoppingCart.do?from=native&";

//购物车某个商品数量添加
var changeProductAmountInCartUrl = "http://mall.zb2.linjiahui.com:80/appclient/changeProductAmountInCart.do?from=native&";

//购物车某个商品数量减少
var reductProductAmountInCartUrl = "http://mall.zb2.linjiahui.com:80/appclient/reductProductAmountInCart.do?from=native&";

//购物车清空
var clearShoppingCartUrl = "http://mall.zb2.linjiahui.com:80/appclient/clearShoppingCart.do?from=native&";

//查看购物车
var shoppingCart = "http://mall.zb2.linjiahui.com:80/appclient/shoppingCart.do?from=native&";

//获取收货人地址
var addressByIdUrl = "http://mall.zb2.linjiahui.com:80/appclient/addressById.do?from=native&";

//获取默认收货地址：
var getDefaultAddressUrl = "http://mall.zb2.linjiahui.com:80/appclient/getDefaultAddress.do?from=native&";

//创建收货人地址
var addressCreateUrl = "http://mall.zb2.linjiahui.com:80/appclient/addressCreate.do?from=native&";

//收货人地址信息列表
var addressListUrl = "http://mall.zb2.linjiahui.com:80/appclient/addressList.do?from=native&";

//地址信息（逻辑）删除
var addressDeleteUrl = "http://mall.zb2.linjiahui.com:80/appclient/addressDelete.do?from=native&";

//设置默认收货地址
var setDefaultAddressUrl = "http://mall.zb2.linjiahui.com:80/appclient/setDefaultAddress.do?from=native&";
//生成订单
var orderCreateUrl = "http://mall.zb2.linjiahui.com:80/appclient/orderCreate.do?from=native&";

//订单列表
var orderListUrl = "http://mall.zb2.linjiahui.com:80/appclient/orderList.do?&from=native&fetchNum=5&";

//订单详情
var orderDetailListUrl = "http://mall.zb2.linjiahui.com:80/appclient/orderDetailList.do?from=native&";

//取消订单（支付前）
var orderCancelBeforePayUrl = "http://mall.zb2.linjiahui.com:80/appclient/orderCancelBeforePay.do?from=native&";

//取消订单（支付后发货前）
var orderCancelBeforeShippingUrl = "http://mall.zb2.linjiahui.com:80/appclient/orderCancelBeforeShipping.do?from=native&";

//订单支付
var toPayUrl = "http://mall.zb2.linjiahui.com:80/appclient/toPay.do?"; 

//我收藏的商城商品
var userCareMallProductListUrl = "http://mall.zb2.linjiahui.com:80/appclient/userFavorProductList.do?"
//取消关注商城商品
var userCareOrCancelProductUrl = "http://mall.zb2.linjiahui.com:80/appclient/userFavorProductOp.do?";
//商城商品详情
var productDeatilUrl = "http://mall.zb2.linjiahui.com:80/appclient/productById.do?";

//我收藏的积分商品
var userCareScoreProductListUrl = "http://score.zb2.linjiahui.com:80/appclient/favorList.do?"
//取消关注积分商品
var userCareScoreProductCancelUrl = "http://score.zb2.linjiahui.com:80/appclient/favorOp.do?";

//DM列表
var userDmUrl="http://dm.zb2.linjiahui.com:80/appclient/userDm.do?";
//DM详情
var userDmDetail = "http://dm.zb2.linjiahui.com:80/appclient/dmMessage.do?dmId=";
//DM删除
var userDmDelUrl="http://dm.zb2.linjiahui.com:80/appclient/userDmDel.do?";
//促销信息分类
var categoryUrl = "http://promotion.zb2.linjiahui.com:80/appclient/categoryList.do?";
//促销信息列表
var promotionUrl = "http://promotion.zb2.linjiahui.com:80/appclient/listByCategory.do?";
//搜索商品
var productSearchUrl="http://search.zb2.linjiahui.com:80/appclient/product.do?";
//搜索促销信息
var promotionSearchUrl="http://search.zb2.linjiahui.com:80/appclient/promotion.do?";
//搜索积分商品
var productScoreSearchUrl="http://search.zb2.linjiahui.com:80/appclient/score.do?";
//我的收藏促销信息列表
var userCarePromotionListUrl="http://promotion.zb2.linjiahui.com:80/appclient/favorList.do?";
//收藏OR取消促销信息 (type  操作类型（0：取消收藏；1：收藏）)
var userCareOrCancelPromotionUrl="http://promotion.zb2.linjiahui.com:80/appclient/favorOp.do?";
//判断是否收藏促销信息
var promotionFavorUrl="http://promotion.zb2.linjiahui.com:80/appclient/favor.do?";
//电子账单
var userCardConsumeListUrl="http://card.zb2.linjiahui.com:80/appclient/userCardConsumeList.do?";
//电子账单详情
var cardConsumeDetailListUrl="http://card.zb2.linjiahui.com:80/appclient/cardConsumeDetailList.do?";
//关键字广告
var advertKeywordListUrl = "http://tg.zb2.linjiahui.com:80/appclient/advertKeywordList.do?";
//会员卡列表
var userCardListUrl="http://card.zb2.linjiahui.com:80/appclient/userCardList.do?";
//默认会员卡
var userDefaultCardUrl="http://card.zb2.linjiahui.com:80/appclient/userDefaultCard.do?";
//生成条形码
var outputCardBarCodeUrl="http://card.zb2.linjiahui.com:80/appclient/outputCardBarCode.do?";
//查询用户信息
var userInfoUrl ="http://user.zb2.linjiahui.com:80/appclient/userInfo.do?";
//更新用户信息   9-13 edit 
var userInfoUpdateUrl = "http://user.zb2.linjiahui.com:80/appclient/userInfoUpdate.do?";
//申请会员卡
var applyCardUrl ="http://card.zb2.linjiahui.com:80/appclient/applyCard.do?";
//绑定卡
var bindCardUrl ="http://card.zb2.linjiahui.com:80/appclient/bindCard.do?";
//门店详情
var storeDetailUrl = "http://partner.zb2.linjiahui.com:80/appclient/store.do?";
//首页广告
var advertBannerUrl = "http://tg.zb2.linjiahui.com:80/appclient/banners.do?";
//积分商品分类列表:
var userPointcategoryListUrl = "http://score.zb2.linjiahui.com:80/appclient/categoryList.do?";

//积分商品列表按分类:
var listByCategoryUrl = "http://score.zb2.linjiahui.com:80/appclient/listByCategory.do?&condition.curPage=1&condition.fetchNum=15&";

//积分商品列表按id:
var listById = "http://score.zb2.linjiahui.com:80/appclient/listById.do?scoreIdList=1&scoreIdList=2";
//积分商品详情
var detailUrl = "http://score.zb2.linjiahui.com:80/appclient/detail.do?from=native&";
//用户反馈
var feedbackUrl = "http://user.zb2.linjiahui.com:80/appclient/userFeedback.do?from=native&";
var complexLbsStorePageList = 'http://partner.zb2.linjiahui.com:80/appclient/complexLbsStorePageList.do?';
var userCardNoPageList = "http://card.zb2.linjiahui.com:80/appclient/userCardNoPageList.do?";
var retrievePasswdUrl ="http://user.zb2.linjiahui.com:80/appclient/retrievePasswd.do?";
var registerUrl = "http://user.zb2.linjiahui.com:80/appclient/register.do?";
var loginUrl='http://user.zb2.linjiahui.com:80/appclient/login.do?';
var toBase64Url="http://pic.zb2.linjiahui.com:80/picToBase64.do?picUrls=";
var shareUrl='http://d.linjiahui.com:8080/zhongbai/pc/downloadPage.do?partnerId=1&channel=LJH6002';
var cardLoginUrl="http://card.zb2.linjiahui.com:8090/appclient/cardLogin.do?";
