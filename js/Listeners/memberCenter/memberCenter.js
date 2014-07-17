/**
 * @author wang
 */
var userCardCacheName = "userCardList";
var totalPage;
var currentPage;
$(function () {
    setTimeout(function(){
        refreshUserCardData();
    },200)
})
function refreshUserCardData() {
    ajaxRequest(userCardCacheName, userCardNoPageList, "", userCardSuccess, userCardError, userLogin, true);
}

function userLogin() {

    $("#login-content").animate({
        height: "0",
        translate3d: '0,0,0'
    }, "slow", "ease-in-out", function () {
    });
    $("#member-content").animate({
        height: "0",
        translate3d: '0,1000px,0'
    }, "fast", "ease-in-out", function () {
    });
}

function userCardSuccess() {
    var returnData = str2obj(window.localStorage.getItem(userCardCacheName));
    if (returnData.status == 0) {
        var data = returnData.data;
        var cardFormList = data.cardFormList;
        $("#username").html("用户名："+data.userName)
        $("#userLevel").html("等级："+data.userLevel)

        if (data.cardFormList != null) {
            var imgHtml = '';
            for (var i = 0; i < cardFormList.length; i++) {
                var card=cardFormList[i].card;

                $("#cardname").html(card.cardName);
                $("#score").html("积分："+card.score)
                $("#cardNo").html("卡号："+card.cardCode)
                if (cardFormList[i].imageStr == undefined) {
                } else {
                    var imageStr = cardFormList[i].imageStr;
                    imgHtml += '<div data-cardname="'+card.cardName+'" data-cardno="'+card.cardCode+'" data-score="'+card.score+'"><img  height="100px" style="margin-top: 23px;" width="200px" src="data:image/png;base64,' + imageStr + '" ></div>';
                }
            }
            $("#slider").html(imgHtml).slider({
                slideend: function (e, index) {
                    switchIcon(index,cardFormList.length);

                    $("#cardname").html($("img").eq(index).parent().data("cardname"));
                    $("#score").html("积分："+$("img").eq(index).parent().data("score"))
                    $("#cardNo").html("卡号："+$("img").eq(index).parent().data("cardno"))
                },
                slide: function (e, to, from) {

                },
                ready: function () {
                    switchIcon(this.index,cardFormList.length);
                }
            });
        }
    }

}

function switchIcon(index,lenth){
    if (index == lenth- 1) {
        $(".ui-slider-next").removeClass("ui-slider-red");
        $(".ui-slider-pre").addClass("ui-slider-red");
    }else{
        $(".ui-slider-next").addClass("ui-slider-red");
        $(".ui-slider-pre").addClass("ui-slider-red");
        if (index == 0) {
            $(".ui-slider-pre").removeClass("ui-slider-red")
        }
    }
}
function userCardError() {

}

