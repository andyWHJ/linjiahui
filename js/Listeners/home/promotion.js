var promotionListPage = 1;
var promotionListCacheName = "promotionListCacheName";
var categoryCacheName = "categoryCacheName";
function back(){
    location.href="index.html"
}
$(document).ready(function () {
    $("footer i").first().animate({
        color:"red"
    },500,"easy-out");

    $("section").swipeRight(function () {
        back();
    })
    refreshcategoryData();
})
function refreshcategoryData() {
    ajaxRequest(categoryCacheName, categoryUrl,"", categorySuccess, categoryError, false);
}

function categorySuccess() {
    var returnData = str2obj(window.localStorage.getItem(categoryCacheName));
    if (returnData == undefined || returnData == null) {
        return;
    }
    if (returnData.status == 0) {
        var message = returnData.data;
        if (debug == true) {
            console.log(message);
        }
        var resultList = message.list;
        if (resultList == null) {
            $("#category").html("");
            window.localStorage.removeItem(categoryCacheName);
            return;
        }
        if (resultList.length == 0) {
            $("#category").html("");
            window.localStorage.removeItem(categoryCacheName);
            return;
        }
        var categoryHTML = '';

        for (var i = 0; i < returnData.data.list.length; i++) {
            var name = returnData.data.list[i].name;
            var categoryId = returnData.data.list[i].id;
            categoryHTML += '<li><a href="#" id="' + categoryId + '">' + name + '</a></li>';
        }
        $("#nav2").find("ul").html(categoryHTML);
        var bar = $('#nav2 span.bar');
        // left = $('#nav2 ul').offset().left;
        $('#nav2').navigator({
            select: function (e, index, li) {

                bar.css({
                    left: li.offsetLeft,
                    width: li.childNodes[0].offsetWidth
                });
            },
            ready: function () {
                bar.appendTo($('#nav2').find('.ui-scroller'));
            }
        })
        $("#wrapper").swipeLeft(function () {
            $('#nav2').navigator("switchTo",($('#nav2').navigator("getIndex")+1)==6?0:$('#nav2').navigator("getIndex")+1);
            $("#nav2 a").eq($('#nav2').navigator("getIndex")).triggerHandler("tap");
        })
        $('.arrow').on('tap', function () {
            $('#nav2').iScroll('scrollTo',$(this).index()==0?-100:100, 0, 400, true);
        });
        $("#nav2 a").on("tap", function () {
            var categoryId = $(this).attr("id");
            localStorage.setItem("promotionCategoryId", categoryId);
            promotionListPage = 1;
            refreshpromotionData();
        });
        $("#1").triggerHandler("tap");
    }
}

function categoryError() {

}

function refreshpromotionData() {
    var categoryId = window.localStorage.getItem("promotionCategoryId");
    ajaxRequest(promotionListCacheName + "_" + categoryId + "_" + promotionListPage, promotionUrl,  "categoryId=" + categoryId + "&condition.curPage=" + promotionListPage + "&condition.fetchNum=4", promotionListSuccess, promotionListError, false);
}

function promotionListSuccess() {
    var categoryId = window.localStorage.getItem("promotionCategoryId");
    var returnData = str2obj(window.localStorage.getItem(promotionListCacheName + "_" + categoryId + "_" + promotionListPage));
    if (returnData == undefined || returnData == null) {
        return;
    }
    if (returnData.status == 0) {
        var message = returnData.data;
        if (debug == true) {
            console.log(message);
        }
        var resultList = message.page.result;
        var totalPage = message.page.totalPage;
        var currentPage = message.page.currentPage;
        if (resultList == null) {
            $("#nextpage").hide();
            $("#dataList").html("");
            $("#emptyDataError").show();
            $("#topBar").css("position", "relative");
            return;
        }
        ;
        if (resultList.length == 0) {
            $("#nextpage").hide();
            $("#dataList").html("");
            $("#emptyDataError").show();
            $("#topBar").css("position", "relative");
            return;
        }
        var leftPicObj = $("#leftPic");
        var rightPicObj = $("#rightPic");
        if (currentPage == 1) {
            leftPicObj.html('');
            rightPicObj.html('');
        }
        var leftHeight = 0;
        var rightHeight = 0;

        for (var i = 0; i < resultList.length; i++) {
            var item = resultList[i];
            var pictureUrl = item.pictureUrl;
            var trPic = '';
            leftHeight = $("#leftPic").height();
            rightHeight = $("#rightPic").height();

            if (leftHeight > rightHeight) {
                if (i == 0 || i == 1) {
                    //如果右侧高度小，则追加到右侧
                    var trHead = '<div class="blockRight"  onclick="goDetail(\'' + item.locator + '\',\'' + item.title + '\',\'' + item.price + '\',' + item.id + ')">';

                    if (window.localStorage.getItem(pictureUrl) != undefined && window.localStorage.getItem(pictureUrl) != 'undefined') {
                        var obj = window.localStorage.getItem(pictureUrl);
                        var imageBase64 = obj;
                        trPic = '<img src="data:image/png;base64,' + imageBase64 + '"   style="min-height:7em"/>';

                    } else {
                        //如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
                        if (window.localStorage.getItem("pic") == null) {
                            window.localStorage.setItem("pic", pictureUrl);
                        } else {
                            window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + pictureUrl);
                        }
                        trPic = '<img src="' + pictureUrl + '"  style="min-height:7em"/>';
                    }
                    var trTitle = '<div class="pictitle"><div class="subject">' + item.title + '</div>';
                    var trDigest = '<div ><div class="subject" style="color:#373737">' + item.digest + '</div>';
                    var trAddinfo = "";
                    if (item.remainDay != 0 || item.price != 0) {
                        trAddinfo += '<div class="addinfo">';
                    }
                    ;
                    if (item.remainDay != 0 && item.remainDay != null && item.remainDay != '' && item.remainDay != undefined) {
                        trAddinfo += '<div class="author">有效期:剩余' + item.remainDay + '天 </div>';
                    }
                    ;
                    if (item.price != null && item.price != '' && item.price != undefined) {
                        trAddinfo += '<div class="promotion-price">￥' + item.price + '</div>';
                    }
                    ;
                    tr = trHead + trPic + trTitle + trDigest + trAddinfo + '</div></div>';
                } else {
                    //如果右侧高度小，则追加到右侧
                    var trHead = '<div class="blockRight" onclick="goDetail(\'' + item.locator + '\',\'' + item.title + '\',\'' + item.price + '\',' + item.id + ')">';

                    if (window.localStorage.getItem(pictureUrl) != undefined && window.localStorage.getItem(pictureUrl) != 'undefined') {
                        var obj = window.localStorage.getItem(pictureUrl);
                        var imageBase64 = obj;
                        trPic = '<img src="data:image/png;base64,' + imageBase64 + '"   style="min-height:7em"/>';

                    } else {
                        //如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
                        if (window.localStorage.getItem("pic") == null) {
                            window.localStorage.setItem("pic", pictureUrl);
                        } else {
                            window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + pictureUrl);
                        }
                        trPic = '<img src="' + pictureUrl + '"  style="min-height:7em"/>';
                    }
                    var trTitle = '<div class="pictitle"><div class="subject">' + item.title + '</div>';
                    var trDigest = '<div ><div class="subject" style="color:#373737">' + item.digest + '</div>';
                    var trAddinfo = "";
                    if (item.remainDay != 0 || item.price != 0) {
                        trAddinfo += '<div class="addinfo">';
                    }
                    ;
                    if (item.remainDay != 0 && item.remainDay != null && item.remainDay != '' && item.remainDay != undefined) {
                        trAddinfo += '<div class="author">有效期:剩余' + item.remainDay + '天 </div>';
                    }
                    ;
                    if (item.price != null && item.price != '' && item.price != undefined) {
                        trAddinfo += '<div class="promotion-price">￥' + item.price + '</div>';
                    }
                    ;
                    tr = trHead + trPic + trTitle + trDigest + trAddinfo + '</div></div>';

                }
                if (i == (resultList.length - 1) && promotionListPage == totalPage && !(i & 1) != 0) {
                    leftPicObj.append(tr);
                    $("#leftPic").children(".blockRight").removeClass("blockRight").addClass("blockLeft");
                } else {
                    rightPicObj.append(tr).animate({
                         display:"block"
                    }, 500, 'ease-out');
                }

            } else {
                if (i == 0 || i == 1) {
                    //反之，如果右侧高度大，则追加到左侧
                    var trHead = '<div class="blockLeft"  onclick="goDetail(\'' + item.locator + '\',\'' + item.title + '\',\'' + item.price + '\',' + item.id + ')">';
                    if (window.localStorage.getItem(pictureUrl) != undefined && window.localStorage.getItem(pictureUrl) != 'undefined') {
                        var obj = window.localStorage.getItem(pictureUrl);
                        var imageBase64 = obj;
                        trPic = '<img src="data:image/png;base64,' + imageBase64 + '"   style="min-height:7em" id="p' + item.id + '"/>';
                    } else {
                        //如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
                        if (window.localStorage.getItem("pic") == null) {
                            window.localStorage.setItem("pic", pictureUrl);
                        } else {
                            window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + pictureUrl);
                        }
                        trPic = '<img src="' + pictureUrl + '"  style="min-height:7em" id="p' + item.id + '"/>';
                    }
                    var trTitle = '<div class="pictitle"><div class="subject">' + item.title + '</div>';
                    var trDigest = '<div ><div class="subject" style="color:#373737">' + item.digest + '</div>';
                    var trAddinfo = "";

                    if (item.remainDay != 0 || item.price != 0) {
                        trAddinfo += '<div class="addinfo">';
                    }
                    ;
                    if (item.remainDay != 0 && item.remainDay != null && item.remainDay != '' && item.remainDay != undefined) {
                        trAddinfo += '<div class="author">有效期:剩余' + item.remainDay + '天 </div>';
                    }
                    ;
                    if (item.price != 0 && item.price != null && item.price != '' && item.price != undefined) {
                        trAddinfo += '<div class="promotion-price">￥' + item.price + '</div>';
                    }
                    ;
                    tr = trHead + trPic + trTitle + trDigest + trAddinfo + '</div></div>';
                } else {
                    //反之，如果右侧高度大，则追加到左侧
                    var trHead = '<div class="blockLeft"  onclick="goDetail(\'' + item.locator + '\',\'' + item.title + '\',\'' + item.price + '\',' + item.id + ')">';
                    if (window.localStorage.getItem(pictureUrl) != undefined && window.localStorage.getItem(pictureUrl) != 'undefined') {
                        var obj = window.localStorage.getItem(pictureUrl);
                        var imageBase64 = obj;
                        trPic = '<img src="data:image/png;base64,' + imageBase64 + '"   style="min-height:7em" id="p' + item.id + '"/>';
                    } else {
                        //如果缓存中没有以url为id的内容，则直接显示图片并开始下载离线内容
                        if (window.localStorage.getItem("pic") == null) {
                            window.localStorage.setItem("pic", pictureUrl);
                        } else {
                            window.localStorage.setItem("pic", window.localStorage.getItem("pic") + "," + pictureUrl);
                        }
                        trPic = '<img src="' + pictureUrl + '"  style="min-height:7em" id="p' + item.id + '"/>';
                    }
                    var trTitle = '<div class="pictitle"><div class="subject">' + item.title + '</div>';
                    var trDigest = '<div ><div class="subject" style="color:#373737">' + item.digest + '</div>';
                    var trAddinfo = "";

                    if (item.remainDay != 0 || item.price != 0) {
                        trAddinfo += '<div class="addinfo">';
                    }
                    ;
                    if (item.remainDay != 0 && item.remainDay != null && item.remainDay != '' && item.remainDay != undefined) {
                        trAddinfo += '<div class="author">有效期:剩余' + item.remainDay + '天 </div>';
                    }
                    ;
                    if (item.price != 0 && item.price != null && item.price != '' && item.price != undefined) {
                        trAddinfo += '<div class="promotion-price">￥' + item.price + '</div>';
                    }
                    ;
                    tr = trHead + trPic + trTitle + trDigest + trAddinfo + '</div></div>';
                }
                leftPicObj.append(tr);
            }
        }
        storePic();
    }
    myScroll.refresh();
}

function promotionListError() {

}
