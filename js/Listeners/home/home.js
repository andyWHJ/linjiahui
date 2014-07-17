//广告图片数据获取
function advertBanner(data) {
	var reqData = "keyValues=" + data;
	var name = "advertBanner";
    ajaxRequest(name,advertBannerUrl,reqData,advertBannerpage,advertError,null,false)
}

function toTgDetail(uri,title) {
	showAdWithTitle(uri,title);
}
function advertError(){
    $('#slider').slider({loop:true});
}
//广告渲染
function advertBannerpage() {

    var width = $(window).width();
    var height = $(window).height();
    var returnData=str2obj(localStorage.getItem("advertBanner"));
    var advertBannerSortList=returnData.data.banners[0].advertBannerSortList;
    var imgHtml='';
    console.log(advertBannerSortList)
    for(var i in advertBannerSortList){
        imgHtml+=' <div><a href="'+advertBannerSortList[i].locator+'"><img src="../../image/default_banner.png" lazyload="'+advertBannerSortList[i].pictureUrl+'"></a> </div>';
    }
    $("#slider").html(imgHtml);
    $('#slider').slider("destroy").slider({loop:true});
    $("#slider").find("img").css("width",width);

    var adpic1, adpic2, adpic3, adtext1, adtext2, adtext3;
    var pictureUrl1 = returnData.data.banners[1].advertBannerSortList[0].pictureUrl;
    var pictureUrl2 = returnData.data.banners[2].advertBannerSortList[0].pictureUrl;
    var pictureUrl3 = returnData.data.banners[3].advertBannerSortList[0].pictureUrl;

    var picwidth = width * 0.58;
    var picheight = height * 0.6 * 0.326;
    var textwidth = width * 0.4;
    var picArray = [pictureUrl1,pictureUrl2,pictureUrl3];
    var adpic = [adpic1, adpic2, adpic3];
    $(".column_sild").css("width", width);
    for (var i = 0; i < 3; i++) {
        picArray[i]  = picArray[i].replace("/b/", "/" +  Math.round(picwidth) + "/" + Math.round(picheight)+ "/");
        var j = i + 1;
        var h = '<div class="leftBox"><a href="javascript:toTgDetail(\'' + returnData.data.banners[j].advertBannerSortList[0].locator + '\',\'' + returnData.data.banners[j].advertBannerSortList[0].title + '\')">';
        if (window.localStorage.getItem(picArray[i]) != undefined && window.localStorage.getItem(picArray[i]) != '') {
            var obj = window.localStorage.getItem(picArray[i]);
            var imageBase64 = obj;
            h += '<img src="data:image/png;base64,' + imageBase64 + '" alt="" width="' + picwidth + '" height="' + picheight + '"/>';
        } else {
            //如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
            window.localStorage.setItem("pic",window.localStorage.getItem("pic") + "," + picArray[i]);
            h += '<img src="' + picArray[i] + '" alt="" width="' + picwidth + '" height="' + picheight + '"/>';
        }
        h += '</a></div>';
        adpic[i] = h;
    }

    //adpic1 = '<td><a href="javascript:toTgDetail(\'' + returnData.data.banners[1].advertBannerSortList[0].locator + '\')"><dd style="margin:1.3px 0 0 0"><img width="' + picwidth + '" height="' + picheight + '" src="' + pictureUrl1 + '" style=""></a></td>'
    //adpic2 = '<td><a href="javascript:toTgDetail(\'' + returnData.data.banners[2].advertBannerSortList[0].locator + '\')"><dd style="margin:1.3px 0 0 0"><img width="' + picwidth + '" height="' + picheight + '" src="' + pictureUrl2 + '" style=""></a></td>'
    //adpic3 = '<td><a href="javascript:toTgDetail(\'' + returnData.data.banners[3].advertBannerSortList[0].locator + '\')"><dd style="margin:1.3px 0 0 0"><img width="' + picwidth + '" height="' + picheight + '" src="' + pictureUrl3 + '" style=""></a></td>'
    var padding_left=(0.02)*width+"px";
    var margin_left="-8px";
    if (width>=400) {
        var letter_spacing=3+"px";
        var font_size="110%";
    }else if (width<400&&width>=360) {
        var letter_spacing=1.5+"px";
        var font_size="100%";
    };
    adtext1 = '<div class="rightBox"><a href="../../html/memberCenter/memberCenter.html"><div class="box1" style="display:-webkit-box;width:' + textwidth + 'px;line-height:' + picheight + 'px;height:' + picheight + 'px"><div class="card" style="text-align: -webkit-auto;padding-left:'+padding_left+';-webkit-box-flex:2;">数字会员卡</div><div style="-webkit-box-flex:1;margin-left:'+margin_left+';font-size:'+font_size+';">></div></div> </a></div>';
    adtext2 = '<div class="rightBox"><a href="promotionList.html"><div class="box2" style="display:-webkit-box;width:' + textwidth + 'px;line-height:' + picheight + 'px;height:' + picheight + 'px"><div style="text-align: -webkit-auto;padding-left:'+padding_left+';-webkit-box-flex:2;letter-spacing:'+letter_spacing+';font-size: '+font_size+';">促销信息</div><div style="-webkit-box-flex:1;font-size:'+font_size+';">></div></div> </div>';
    adtext3 = '<div class="rightBox"><a href="../userPoints/index.html.html"><div class="box3" style="display:-webkit-box;width:' + textwidth + 'px;line-height:' + picheight + 'px;height:' + picheight + 'px"><div style="text-align: -webkit-auto;padding-left:'+padding_left+';-webkit-box-flex:2;letter-spacing:'+letter_spacing+';font-size: '+font_size+';">积分商品</div><div style="-webkit-box-flex:1;font-size:'+font_size+';">></div></div> </div>';
    var ad1 = adpic[0] + adtext1;
    var ad2 = adpic[1] + adtext2;
    var ad3 = adpic[2] + adtext3;
    $("#ad1").html(ad1);
    $("#ad2").html(ad2);
    $("#ad3").html(ad3);
    myScroll.refresh();
}
function toMemberCenter() {
	homeTomember();
}